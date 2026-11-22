import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  // Keeps the logos as files, so they load lazily instead of growing the JS
  build: { assetsInlineLimit: 0 },
  // The PDFs are imported from the repo root, one level up
  server: { fs: { allow: ['..'] } },
})
