# rakaiseto.com — portfolio redesign

Personal portfolio for Rakai Seto Sembodo. React SPA (Vite + React Router), no backend — all content lives in markdown files.

## Stack

- Vite 8 + React 19
- Tailwind CSS v4 (CSS-first config in `src/index.css`)
- Framer Motion (scroll reveals, magnetic buttons, masked type, scroll progress)
- React Router 7 (lazy route chunks)
- Plus Jakarta Sans + JetBrains Mono, self-hosted via Fontsource
- Phosphor icons

## Content

All content is markdown with frontmatter:

- `content/projects/*.md` — one file per case study. Frontmatter (`title`, `order`, `summary`, `role`, `stack`, `image`, `status`, `demo`, `repo`, `mock`) drives the UI; the body is rendered with react-markdown.
- `content/about.json` — the "now" strip: current roles, employer timeline, education. Edit the JSON, the section updates.
- Add a project: drop a new `.md` file in, set `order`. It appears on the home page (if `order <= 3`), the index, and gets its own `/projects/:slug` page automatically.
- `mock: true` renders the CSS-drawn POS interface instead of a screenshot (used for Moneta POS, whose production screenshots are under NDA).

## Dev

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # serve the production build
```

## Deploy (Dokploy + Traefik)

The `Dockerfile` builds `dist/` and serves it with nginx:

```sh
docker build -t rakaiseto .
```

Point a Dokploy service at this repo, Traefik routes `rakaiseto.com` to it. `nginx.conf` handles the SPA fallback (every route → `index.html`), hard-caches hashed assets, and never caches the shell.

## Notes

- Theme: dark-only — light mode and the toggle were removed; the shell sets `class="dark"` unconditionally.
- Cursor & background: custom 8px brand cursor (grows to 24px over links/buttons, squashes on press) and an ambient canvas background — soft color orbs plus drifting dust motes with rare brand/violet accents. The canvas renders a static frame under `prefers-reduced-motion` and pauses while the tab is hidden. Both gate off on coarse pointers for the cursor.
- Old `/blog/*` URLs intentionally 404 (blog retired in the redesign); the 404 page explains it.
- Moneta POS screenshots no longer exist on the old server — the POS page uses a drawn interface mock. Swap in real shots anytime: add files under `public/images/projects/monetapos/` and set `mock: false` (or just `image:` in the frontmatter).
