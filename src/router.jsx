import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Called once on the server and once in the browser. Must return a fresh
// instance each time so request state never leaks between renders.
export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
  })

  return router
}
