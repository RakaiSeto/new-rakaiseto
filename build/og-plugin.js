import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { runnerImport } from 'vite'

// The homepage's hero tagline. It only appears when the homepage rendered in
// full, so its absence means SPA mode handed '/' to the shell and index.html
// shipped without the page content. See the note in vite.config.js.
const HOME_MARKER = 'I build systems that survive production.'

// Renders the OG cards into the client output directory after the prerender
// step, then checks that every card a page advertises was actually written.
//
// Hook order matters: TanStack Start's own post-build plugin is
// `enforce: 'post'` with a `buildApp` hook of order 'post', and that is what
// prerenders. Declaring the same shape here — and listing this plugin after
// `tanstackStart()` — puts this work after every HTML file exists.
export function ogImages() {
  let outDir

  return {
    name: 'rakaiseto:og-images',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      outDir = path.resolve(config.root, config.environments.client.build.outDir)
    },
    buildApp: {
      order: 'post',
      async handler() {
        // `runnerImport` resolves its own default config (no configFile), which
        // is all the card module needs: Vite's built-in JSX transform plus the
        // `import.meta.glob` in src/lib/projects.js. `takumi-js` stays external,
        // so the renderer is the native Node backend rather than WASM.
        const { module } = await runnerImport('/build/og-cards.jsx', { root: process.cwd() })
        const { siteUrl, written } = await module.default(outDir)
        const bytes = written.reduce((total, card) => total + card.bytes, 0)
        console.log(
          `[og] Rendered ${written.length} cards (${(bytes / 1024).toFixed(0)} KB) into ${path.relative(process.cwd(), outDir)}/og`
        )

        await assertEveryCardExists(outDir, siteUrl)
        await assertHomepageIsPrerendered(outDir)
      },
    },
  }
}

// Walks the prerendered HTML and checks that every same-origin `og:image` the
// pages advertise is a file that exists. This is what makes `ogKeys` a real
// contract: add a route with an `ogKey` the build does not know about and the
// build fails instead of shipping a page whose preview card 404s.
async function assertEveryCardExists(outDir, siteUrl) {
  const pages = await walkHtml(outDir)
  const missing = []

  for (const page of pages) {
    const html = await readFile(page, 'utf8')
    for (const [, url] of html.matchAll(/<meta property="og:image" content="([^"]+)"/g)) {
      if (!url.startsWith(`${siteUrl}/`)) continue
      const target = path.join(outDir, url.slice(siteUrl.length + 1))
      if (!(await exists(target))) missing.push(`${path.relative(outDir, page)} → ${url}`)
    }
  }

  if (missing.length) {
    throw new Error(
      `These pages advertise an OG image that the build did not write:\n  ${missing.join('\n  ')}\n` +
        'Add the route key to `ogKeys` in src/lib/route-meta.js, or point the route at the static home card.'
    )
  }
}

async function walkHtml(dir) {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) found.push(...(await walkHtml(full)))
    else if (entry.name.endsWith('.html')) found.push(full)
  }
  return found
}

async function exists(file) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

// Guards the other fragile part of the static setup: '/' is prerendered by SPA
// mode's shell page when `spa` is enabled, so whether index.html holds the
// homepage or an empty shell depends on how shell detection resolves.
async function assertHomepageIsPrerendered(outDir) {
  const file = path.join(outDir, 'index.html')
  const html = await readFile(file, 'utf8')

  if (!html.includes(HOME_MARKER)) {
    throw new Error(
      `index.html is missing the homepage content (looked for "${HOME_MARKER}").\n` +
        'If SPA mode was turned back on, its shell page claims "/" and prerenders the root route ' +
        'only, so index.html becomes an empty shell instead of the homepage.'
    )
  }
}
