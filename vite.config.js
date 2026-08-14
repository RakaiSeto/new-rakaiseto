import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Live tokscale data for /ai: the browser can't read tokscale.ai
      // directly (no CORS headers), so same-origin /toks/<user> maps to
      // the public API. Mirrors the nginx location in nginx.conf.
      '/toks': {
        target: 'https://tokscale.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/toks/, '/api/users'),
      },
    },
  },
})
