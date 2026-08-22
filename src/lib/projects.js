import { parseFrontmatter } from './frontmatter.js'

// Build-time content: every markdown file in content/projects becomes a
// case study. Frontmatter drives the UI; the body drives the page.
const files = import.meta.glob('../../content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Group by category (work/personal before school), then by order. The
// school appendix lands at the bottom on every page that lists projects.
const GROUP_ORDER = { work: 0, personal: 0, school: 1 }

export const projects = Object.entries(files)
  .map(([path, source]) => {
    const { data, content } = parseFrontmatter(source)
    return {
      ...data,
      slug: path.match(/([^/]+)\.md$/)[1],
      body: content,
    }
  })
  .sort(
    (a, b) =>
      (GROUP_ORDER[a.category] ?? 0) - (GROUP_ORDER[b.category] ?? 0) ||
      a.order - b.order
  )

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}

export function nextProject(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
