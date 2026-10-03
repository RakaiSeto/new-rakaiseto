import { createFileRoute } from '@tanstack/react-router'
import { ogCard } from '../lib/route-meta.js'
import { renderOgCard } from '../og/render.jsx'

// Resource route: no component, returns a PNG. Route-keyed (never query-param
// driven) so it cannot be abused as an open image generator.
//
//   /og/projects.png
//   /og/vibes.png
//   /og/wall.png
//   /og/projects/<slug>.png
export const Route = createFileRoute('/og/$')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const key = String(params._splat || '').replace(/\.png$/i, '')
        const card = ogCard(key)

        if (!card) {
          return new Response('Unknown OG card', { status: 404 })
        }

        return renderOgCard(card, request)
      },
    },
  },
})
