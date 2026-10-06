# rakaiseto.com — portfolio

Personal portfolio for Rakai Seto Sembodo. **TanStack Start prerendered to static assets on Cloudflare**, no server — all content lives in markdown files.

## Stack

- TanStack Start (build-time prerendering) + TanStack Router (file-based routing)
- React 19
- Vite 8
- Tailwind CSS v4 (CSS-first config in `src/index.css`)
- Framer Motion (scroll reveals, magnetic buttons, masked type, scroll progress)
- Plus Jakarta Sans + JetBrains Mono, self-hosted via Fontsource
- Phosphor icons
- Takumi (Rust) for build-time OG image generation

## Content

All content is markdown with frontmatter:

- `content/projects/*.md` — one file per case study. Frontmatter (`title`, `order`, `summary`, `role`, `stack`, `image`, `status`, `demo`, `repo`, `mock`) drives the UI; the body is rendered with react-markdown.
- `content/about.json` — the "now" strip: current roles, employer timeline, education. Edit the JSON, the section updates. Timeline and "other experiences" entries sharing the same `company`/`org` render as one grouped block (name on top, one row per position) — just add a second entry with the same company name.
- Add a project: drop a new `.md` file in, set `order`. It appears on the home page (if `order <= 3`), the index, gets its own `/projects/:slug` page, and gets its own OG card automatically.
- `mock: true` renders the CSS-drawn POS interface instead of a screenshot.

## Dev

```sh
npm install
npm run dev      # http://localhost:3000 — Vite dev, SSR in Node
npm run build    # prerenders every route into dist/client and writes the OG cards
npm run preview  # serves the built dist/client the way production does (wrangler dev)
npm run lint
```

## Rendering strategy

The site is a **static SPA**: every route is prerendered to HTML at build time, the client router takes over from there, and any URL that matches no asset falls back to `index.html`.

| Route | How it is served |
|---|---|
| `/`, `/projects`, `/projects/:slug`, `/vibes`, `/wall` | **Prerendered to HTML at build time**, served as static assets |
| `/og/*.png` | **Static PNGs written at build time** |
| anything else | `index.html`, and the client router renders the 404 |

Content routes are static markdown, so they are baked at build time. The fallback is Cloudflare's `not_found_handling: single-page-application` in `wrangler.jsonc` — there is no Worker and no server-side rendering at request time.

TanStack's `spa` option is deliberately **not** enabled. Its shell page always claims the `/` path, which would prerender the shell (root route only) at `index.html` instead of the homepage. `build/og-plugin.js` fails the build if `index.html` ever loses the homepage content.

## Social previews (OG images)

Every route except the homepage gets a generated 1200×630 card. The cards are rendered **at build time**, not per request.

- `src/lib/route-meta.js` is the **single source of truth**: it builds both the per-route `<head>` tags (`pageHead`) and the card content (`ogCard`), so the URL a scraper reads always matches the card that renders. Its `ogKeys` export is the list of cards to generate.
- `build/og-plugin.js` runs after the prerender step and writes `dist/client/og/<key>.png` for every key. It loads `build/og-cards.jsx` through Vite's module runner, so the cards read the same content modules (and `import.meta.glob`) the site does.
- `src/og/card.jsx` is the card layout, rendered by takumi's Node backend. Fonts and the logo are read straight off `public/` — a build script has a filesystem, unlike the Worker this replaced.
- Keys are `projects`, `vibes`, `wall`, and `projects/<slug>`. Add a project and its card is generated on the next build with no other edit.
- The **homepage keeps its hand-made static `public/og-image.jpg`** (no `ogKey` on that route).

Two SSR/hydration gotchas worth keeping in mind when editing:

- Don't read `window`/`matchMedia` during render — it makes the server and first client render disagree. `Cursor.jsx` does this in an effect for that reason.
- Don't use `Math.random()` during render (`computeDoodles` in `src/lib/wall.js` uses a stable hash instead) — the server and client would generate different values.

## Deploy (Cloudflare)

`wrangler.jsonc` holds the asset config and nothing else: `directory` points at the Vite client output, `html_handling: auto-trailing-slash` maps `/projects` to `projects.html`, `not_found_handling: single-page-application` provides the SPA fallback, and the `routes` attach `rakaiseto.com` and `www.rakaiseto.com`. There is no `main` — nothing is uploaded but static files.

```sh
npm run deploy   # vite build + wrangler deploy
```

CI (`.github/workflows/cd.yml`) builds and deploys on push to `main` via `cloudflare/wrangler-action`. It needs two repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

`VITE_LASTFM_USER` / `VITE_LASTFM_KEY` are baked into the client bundle at build time; without them `/vibes` degrades to its notice state.

The OG cards are rendered by takumi's native Node backend, resolved through `optionalDependencies` (`@takumi-rs/core-linux-x64-gnu` on a standard CI runner). An install that skips optional dependencies has no renderer and the build fails at the OG step.

If `wrangler deploy` complains about a redirect at `.wrangler/deploy/config.json` pointing at a missing `dist/client/wrangler.json`, that file is left over from the old `@cloudflare/vite-plugin` setup. Delete `.wrangler/`.

## Notes

- Dark-only — light mode and the toggle were removed; the shell sets `class="dark"` unconditionally.
- Cursor & background: custom 8px brand cursor (grows to 24px over links/buttons, squashes on press) and an ambient canvas background. Both gate off on coarse pointers / reduced motion.
- Above-the-fold hero content uses `initial={false}` so it paints from the HTML instead of waiting on JS.
- Old `/blog/*` URLs are retired (blog retired in the redesign). No asset matches them, so the SPA fallback serves `index.html` with a **200** and the client router renders the 404 page, which explains it. A crawler that does not run JS sees the homepage's head tags instead of a 404 status.
