import { useEffect } from 'react'

// Canonical origin. The static tags in index.html carry the home-page values so
// scrapers that never run JS still get a full preview; this hook keeps them
// accurate when React Router moves between routes.
const SITE_URL = 'https://rakaiseto.com'

const DEFAULT_DESCRIPTION =
  'Rakai Seto Sembodo — fullstack developer in Jakarta. Backend-heavy systems in Go, Laravel, and React that survive production.'

// Upsert a head tag by selector, e.g. 'meta[property="og:title"]'.
function upsert(selector, create, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(create.tag)
    for (const [name, value] of Object.entries(create.attrs)) el.setAttribute(name, value)
    document.head.appendChild(el)
  }
  for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value)
}

export function usePageMeta(title, description) {
  useEffect(() => {
    const desc = description || DEFAULT_DESCRIPTION
    const url = SITE_URL + window.location.pathname

    document.title = title

    const tags = [
      ['meta[name="description"]', { name: 'description' }, { content: desc }],
      ['meta[property="og:title"]', { property: 'og:title' }, { content: title }],
      ['meta[property="og:description"]', { property: 'og:description' }, { content: desc }],
      ['meta[property="og:url"]', { property: 'og:url' }, { content: url }],
      ['meta[name="twitter:title"]', { name: 'twitter:title' }, { content: title }],
      ['meta[name="twitter:description"]', { name: 'twitter:description' }, { content: desc }],
    ]
    for (const [selector, createAttrs, attrs] of tags) upsert(selector, { tag: 'meta', attrs: createAttrs }, attrs)

    // og:image stays the one static card — every route shares it.
    upsert('link[rel="canonical"]', { tag: 'link', attrs: { rel: 'canonical' } }, { href: url })
  }, [title, description])
}
