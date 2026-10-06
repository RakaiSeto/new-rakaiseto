import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ogImages } from './build/og-plugin.js'

export default defineConfig({
  server: { port: 3000 },
  // The prerender step boots a Vite preview server and fetches every route over
  // HTTP. Left on its default it binds ::1 and advertises `localhost`, which
  // fails on runners that cannot reach IPv6 loopback — CI timed out with
  // ETIMEDOUT ::1 / ECONNREFUSED 127.0.0.1. Pinning the host keeps the bind and
  // the advertised URL on the same IPv4 address. Only prerendering uses this;
  // `npm run preview` goes through wrangler.
  preview: { host: '127.0.0.1' },
  plugins: [
    tailwindcss(),
    tanstackStart({
      // Route files stay plain .jsx; the generated tree is .ts (the generator
      // emits TS-only `import type` syntax, so disableTypes breaks the build).
      router: { disableTypes: false },
      // Every route is baked to HTML at build time, so the deploy is static
      // assets and the client router owns navigation from there. Unknown URLs
      // are the fallback in wrangler.jsonc, not a server route.
      //
      // TanStack's `spa` option is deliberately NOT used: its shell page always
      // claims the '/' path, so '/' would prerender the shell (root route only)
      // instead of the homepage. build/og-plugin.js fails the build if that
      // ever happens.
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoStaticPathsDiscovery: true,
        // Emit /projects.html rather than /projects/index.html. Cloudflare's
        // asset handler serves the .html form at /projects with a 200; the
        // directory form 307s to /projects/, which would fight our canonical.
        autoSubfolderIndex: false,
      },
    }),
    viteReact(),
    // Must stay last: it runs after TanStack's prerender so every HTML file
    // exists before it writes the OG cards and checks the homepage.
    ogImages(),
  ],
})
