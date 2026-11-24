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

Production values live in the committed [`.env.production`](.env.production),
which Vite reads on every production build (Netlify and the GitHub deploy
gate). Both values are public by design: they ship in the site's JavaScript
anyway, and access is enforced by row level security. Never put a
`service_role` / `sb_secret_` key there. A Netlify environment variable with
the same name overrides the file. For local development copy `.env.example` to
`.env` (gitignored).

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable (`sb_publishable_...`) or legacy anon key |

> **The site currently shares another Supabase project** (`arogya-diagnostics`).
> All DzireTechX tables live in a separate `dziretechx` schema so they never
> touch that project's own tables. To move to a dedicated project: run
> [`supabase/dziretechx.sql`](supabase/dziretechx.sql) in it, add `dziretechx`
> under Data API → Exposed schemas, copy the rows across, then change these two
> values in `.env.production` and deploy. No other code change is required.
>
> Visitors can only add messages. Reading them in `/admin` requires a login
> listed in `dziretechx.admins` (see the SQL file for the one-line insert);
> being signed in alone is not enough.

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
