import { getProject, projects } from './projects.js'

// Canonical origin. Shared by the per-route <head> tags and the OG card route,
// so the URL a scraper reads always matches the card that gets rendered.
export const SITE_URL = 'https://rakaiseto.com'
export const SITE_NAME = 'Rakai Seto Sembodo'

export const DEFAULT_DESCRIPTION =
  'Rakai Seto Sembodo — fullstack developer in Jakarta. Backend-heavy systems in Go, Laravel, and React that survive production.'

// The homepage keeps its hand-made static card. Everything else gets a
// generated one at /og/<key>.png.
const STATIC_HOME_CARD = `${SITE_URL}/og-image.jpg`

// Every route that needs a generated card, in the order the build writes them.
// The build script reads this list and the routes read it back through
// `ogImageUrl`, so a new page or project cannot ship without a card.
export const ogKeys = [
  'projects',
  'vibes',
  'wall',
  ...projects.map((p) => `projects/${p.slug}`),
]

export function ogImageUrl(key) {
  return key ? `${SITE_URL}/og/${key}.png` : STATIC_HOME_CARD
}

// Card content for a route key. `key` is 'projects' | 'vibes' | 'wall' or
// 'projects/<slug>'. Returns null when the key is unknown so callers can fall
// back to the static card instead of rendering an empty one.
export function ogCard(key) {
  if (key === 'projects') {
    const work = projects.filter((p) => p.category !== 'school').length
    const school = projects.filter((p) => p.category === 'school').length
    return {
      eyebrow: 'projects',
      title: 'Every works, told as it is.',
      meta: `${work} case studies · ${school} school assignments`,
    }
  }

  if (key === 'vibes') {
    return {
      eyebrow: 'vibes',
      title: "What I'm listening to, live.",
      meta: 'last.fm · scrobbles, top artists & tracks',
    }
  }

  if (key === 'wall') {
    return {
      eyebrow: 'the wall',
      title: 'Pinned by hand — the other side of Rakai',
      meta: 'music · sport · travel · games',
    }
  }

  if (key?.startsWith('projects/')) {
    const project = getProject(key.slice('projects/'.length))
    if (!project) return null
    return {
      eyebrow: 'project',
      title: project.title,
      description: project.summary || undefined,
      meta: [project.year, ...(project.stack || [])].filter(Boolean).join(' · '),
    }
  }

  return null
}

// Build the head() payload for a route. Every tag a scraper or crawler needs is
// emitted server-side here — no client-side rewriting.
export function pageHead({ title, description, path = '/', ogKey, ogType = 'website' }) {
  const desc = description || DEFAULT_DESCRIPTION
  const url = SITE_URL + path
  const image = ogImageUrl(ogKey)
  const imageAlt = `${title} — social preview card`

  return {
    meta: [
      { title },
      { name: 'description', content: desc },
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: imageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: imageAlt },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
