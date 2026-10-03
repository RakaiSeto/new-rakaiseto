import { ImageResponse } from 'takumi-js/response'
import { env } from 'cloudflare:workers'
import { OgCard } from './card.jsx'

// Fonts and logo live in public/ and are read through the ASSETS binding —
// a Worker cannot touch the filesystem, and subrequesting its own origin is
// unreliable. Cached per isolate: one fetch per asset per cold start.
let assetCache = null

async function loadAssets(request) {
  if (assetCache) return assetCache

  const bytes = async (path) => {
    const res = await env.ASSETS.fetch(new URL(path, request.url))
    if (!res.ok) throw new Error(`OG asset ${path} responded ${res.status}`)
    return res.arrayBuffer()
  }

  assetCache = {
    jakarta: await bytes('/fonts/plus-jakarta-sans-latin.woff2'),
    mono400: await bytes('/fonts/jetbrains-mono-400-latin.woff'),
    mono500: await bytes('/fonts/jetbrains-mono-500-latin.woff'),
    logo: await bytes('/images/logo.png'),
  }

  return assetCache
}

export async function renderOgCard(card, request) {
  const assets = await loadAssets(request)

  const fonts = [
    // Variable font: numeric `weight` alone does not drive the wght axis —
    // the template sets fontVariationSettings per element.
    { name: 'Plus Jakarta Sans', data: assets.jakarta, weight: 700, style: 'normal' },
    { name: 'JetBrains Mono', data: assets.mono400, weight: 400, style: 'normal' },
    { name: 'JetBrains Mono', data: assets.mono500, weight: 500, style: 'normal' },
  ]

  const response = new ImageResponse(<OgCard {...card} logo={assets.logo} />, {
    width: 1200,
    height: 630,
    fonts,
    headers: {
      // Card content is derived from build-time content, so it is safe to
      // cache hard at the edge; a content change ships a new deploy.
      'Cache-Control': 'public, max-age=86400, s-maxage=31536000, immutable',
    },
  })

  // Buffer before responding so a render failure surfaces as a 500 rather
  // than an empty 200 that social scrapers would cache as a broken card.
  await response.ready

  return response
}
