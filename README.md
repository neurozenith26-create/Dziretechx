# Dzire Techx Official Website

Marketing site for Dzire Techx — React + Vite + Tailwind, deployed on Netlify at
[dziretechx.com](https://dziretechx.com).

## Branch workflow

Three long-lived branches. Work always flows in one direction:

```
development  ->  staging  ->  main
  (build)      (validate)    (live)
```

| Branch | Purpose |
| --- | --- |
| `development` | Day-to-day work. Commit here first. |
| `staging` | Validation. Merge `development` here and check the build before it can reach production. |
| `main` | Production. Merging here and pushing publishes to `dziretechx.com`. |

```bash
# 1. build
git checkout development
git add -A && git commit -m "..."
git push origin development

# 2. validate
git checkout staging
git merge development
git push origin staging

# 3. go live
git checkout main
git merge staging
git push origin main
```

Never commit directly to `main`. Anything pushed there deploys to the live domain
immediately.

## Deployment

Netlify builds `main` on every push and publishes to `dziretechx.com`.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Production branch | `main` |
| Node version | 20 (set in `netlify.toml`) |

`netlify.toml` also holds the SPA redirect, so every route serves `index.html`
and React Router handles it client-side.

## Environment variables

Set in the Netlify UI, never committed. `.env` is gitignored.

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |

> **The current Supabase project is a placeholder.** It belongs to a personal
> account and is not intended for production. When a company-owned database is
> provisioned, change these two values in Netlify and redeploy — no code change
> is required. `src/lib/supabase.js` reads both from the environment and never
> hardcodes them.

These feed the contact form and the `/admin` dashboard. If they are missing the
site still builds and renders correctly, but both of those silently stop working.

## Local development

```bash
npm install
npm run dev      # dev server
npm run build    # production build + prerender
npm run preview  # serve the built site locally
```

Copy `.env.example` to `.env` and fill in the Supabase values to run the form
and admin panel locally.

## Notes

- **SEO** — `prerender.js` runs after the Vite build and writes real HTML into
  `dist/index.html`, so crawlers get ~133 kB of content instead of an empty
  `<div id="root">`.
- **3D** — WebGL scenes exist under `src/components/three/` but are disabled
  site-wide via `ENABLE_3D` in `src/hooks/useCapability.js`. With it `false`,
  three.js is never downloaded and every scene renders its CSS-gradient
  fallback. Set it to `true` to re-enable.
