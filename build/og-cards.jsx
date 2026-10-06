// Renders every OG card to a PNG at build time, through Vite's module runner
// so this file can import the site's own content modules — including the
// `import.meta.glob` in src/lib/projects.js — exactly as the app does.
//
// This replaces the runtime route that rendered cards per request inside the
// Worker. A Worker has no filesystem and had to read fonts and the logo back
// through the ASSETS binding; here they are ordinary reads off public/.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { render } from 'takumi-js'
import { SITE_URL, ogCard, ogKeys } from '../src/lib/route-meta.js'
import { OgCard } from '../src/og/card.jsx'

const publicFile = (relative) => readFile(path.join(process.cwd(), 'public', relative))

async function loadAssets() {
  const [jakarta, mono400, mono500, logo] = await Promise.all([
    publicFile('fonts/plus-jakarta-sans-latin.woff2'),
    publicFile('fonts/jetbrains-mono-400-latin.woff'),
    publicFile('fonts/jetbrains-mono-500-latin.woff'),
    publicFile('images/logo.png'),
  ])

  return {
    logo,
    fonts: [
      // Variable font: the card sets fontVariationSettings per element, so a
      // numeric weight alone would not drive the wght axis.
      { name: 'Plus Jakarta Sans', data: jakarta, weight: 700, style: 'normal' },
      { name: 'JetBrains Mono', data: mono400, weight: 400, style: 'normal' },
      { name: 'JetBrains Mono', data: mono500, weight: 500, style: 'normal' },
    ],
  }
}

// Writes dist/client/og/<key>.png for every key in `ogKeys` and returns what
// it wrote, plus the origin the pages advertise their cards under, so the
// caller can check those URLs resolve to files.
export default async function renderOgImages(outDir) {
  const { fonts, logo } = await loadAssets()
  const written = []

  for (const key of ogKeys) {
    const card = ogCard(key)
    if (!card) throw new Error(`No OG card content for key "${key}"`)

    const png = await render(<OgCard {...card} logo={logo} />, {
      width: 1200,
      height: 630,
      fonts,
    })

    const file = path.join(outDir, 'og', `${key}.png`)
    await mkdir(path.dirname(file), { recursive: true })
    await writeFile(file, png)
    written.push({ key, bytes: png.byteLength })
  }

  return { siteUrl: SITE_URL, written }
}
