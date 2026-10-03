import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tailwindcss(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart({
      // Route files stay plain .jsx; the generated tree is .ts (the generator
      // emits TS-only `import type` syntax, so disableTypes breaks the build).
      router: { disableTypes: false },
      // Content routes are static markdown — bake them to HTML at build time.
      // /og/* stays dynamic (it is not link-crawled).
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
  ],
})
