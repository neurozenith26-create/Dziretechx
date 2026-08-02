// Build-time prerender. Renders each marketing route to static HTML and injects
// it into the built index.html so crawlers receive real body content instead of
// an empty <div id="root">.
//
// Runs after both Vite builds — see the "build" script in package.json.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

// Admin routes are deliberately NOT prerendered: they are auth-gated and have
// no SEO value. They keep working as normal client-rendered routes via the
// SPA fallback in netlify.toml / public/_redirects.
const routesToPrerender = ['/']

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const ROOT_PLACEHOLDER = '<div id="root"></div>'

for (const url of routesToPrerender) {
  const appHtml = render(url)

  if (!template.includes(ROOT_PLACEHOLDER)) {
    throw new Error(
      `prerender: could not find ${ROOT_PLACEHOLDER} in dist/index.html — aborting rather than shipping an unrendered page.`
    )
  }

  // Stamp which route this markup was rendered for. The SPA fallback serves this
  // same file for non-prerendered routes (e.g. /admin), so the client must be able
  // to tell "this HTML is mine, hydrate it" from "this HTML is for another route,
  // throw it away and client-render". Without this, /admin hydrates homepage
  // markup and React throws #418/#423.
  const html = template.replace(
    ROOT_PLACEHOLDER,
    `<div id="root" data-prerendered-path="${url}">${appHtml}</div>`
  )

  const outPath = url === '/' ? 'dist/index.html' : `dist${url}.html`
  fs.mkdirSync(path.dirname(toAbsolute(outPath)), { recursive: true })
  fs.writeFileSync(toAbsolute(outPath), html)

  const kb = (Buffer.byteLength(html) / 1024).toFixed(1)
  console.log(`prerendered ${url} -> ${outPath} (${kb} kB)`)
}

// The server bundle is a build artifact only; it must not ship to the CDN.
fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true })
console.log('cleaned dist/server')
