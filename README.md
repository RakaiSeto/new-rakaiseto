# rakaiseto.com — portfolio

Personal portfolio for Rakai Seto Sembodo. **TanStack Start SSR on Cloudflare Workers**, no separate backend — all content lives in markdown files.

## Stack

- TanStack Start (SSR) + TanStack Router (file-based routing)
- React 19
- Vite 8 + `@cloudflare/vite-plugin`
- Tailwind CSS v4 (CSS-first config in `src/index.css`)
- Framer Motion (scroll reveals, magnetic buttons, masked type, scroll progress)
- Plus Jakarta Sans + JetBrains Mono, self-hosted via Fontsource
- Phosphor icons
- Takumi (Rust→WASM) for runtime OG image generation

## Content

All content is markdown with frontmatter:

- `content/projects/*.md` — one file per case study. Frontmatter (`title`, `order`, `summary`, `role`, `stack`, `image`, `status`, `demo`, `repo`, `mock`) drives the UI; the body is rendered with react-markdown.
- `content/about.json` — the "now" strip: current roles, employer timeline, education. Edit the JSON, the section updates. Timeline and "other experiences" entries sharing the same `company`/`org` render as one grouped block (name on top, one row per position) — just add a second entry with the same company name.
- Add a project: drop a new `.md` file in, set `order`. It appears on the home page (if `order <= 3`), the index, gets its own `/projects/:slug` page, and gets its own OG card automatically.
- `mock: true` renders the CSS-drawn POS interface instead of a screenshot.

## Dev

```sh
npm install
npm run dev      # http://localhost:3000 (runs in the Workers runtime via the CF vite plugin)
npm run build    # prerenders the content routes into dist/client, bundles the Worker into dist/server
npm run preview  # preview the production build
npm run lint
```

## Rendering strategy

| Route | How it is served |
|---|---|
| `/`, `/projects`, `/projects/:slug`, `/vibes`, `/wall` | **Prerendered to HTML at build time**, served as static assets |
| `/og/*.png` | **Dynamic** — rendered per request by the Worker |
| anything else | Worker renders the 404 |

Content routes are static markdown, so they are baked at build time for speed. Only the OG cards need to be dynamic.

## Social previews (OG images)

Every route except the homepage gets a generated 1200×630 card.

- `src/lib/route-meta.js` is the **single source of truth**: it builds both the per-route `<head>` tags (`pageHead`) and the card content (`ogCard`), so the URL a scraper reads always matches the card that renders.
- `src/routes/og.$.jsx` is a resource route (no component) that maps `/og/<key>.png` → `ogCard(key)` → `renderOgCard`. Keys are `projects`, `vibes`, `wall`, and `projects/<slug>`.
- `src/og/render.jsx` renders via takumi's `ImageResponse`. Fonts and the logo are read from the `ASSETS` binding (a Worker has no filesystem), cached per isolate.
- Cards are **route-keyed, not query-param driven** — so the endpoint can't be abused as an open image generator.
- Cache-Control is `immutable`; card content is derived from build-time content, so a content change ships a new deploy.
- The **homepage keeps its hand-made static `public/og-image.jpg`** (no `ogKey` on that route).

Two SSR/hydration gotchas worth keeping in mind when editing:

- Don't read `window`/`matchMedia` during render — it makes the server and first client render disagree. `Cursor.jsx` does this in an effect for that reason.
- Don't use `Math.random()` during render (`computeDoodles` in `src/lib/wall.js` uses a stable hash instead) — the server and client would generate different values.

## Deploy (Cloudflare Workers)

`wrangler.jsonc` holds the Worker config: the `ASSETS` binding, observability, and the `routes` that attach `rakaiseto.com` and `www.rakaiseto.com` to the Worker.

```sh
npm run deploy   # vite build + wrangler deploy
```

CI (`.github/workflows/cd.yml`) builds and deploys on push to `main` via `cloudflare/wrangler-action`. It needs two repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

`VITE_LASTFM_USER` / `VITE_LASTFM_KEY` are baked into the client bundle at build time; without them `/vibes` degrades to its notice state.

## Notes

- Dark-only — light mode and the toggle were removed; the shell sets `class="dark"` unconditionally.
- Cursor & background: custom 8px brand cursor (grows to 24px over links/buttons, squashes on press) and an ambient canvas background. Both gate off on coarse pointers / reduced motion.
- Above-the-fold hero content uses `initial={false}` so it paints from the HTML instead of waiting on JS.
- Old `/blog/*` URLs intentionally 404 (blog retired in the redesign); the 404 page explains it.
