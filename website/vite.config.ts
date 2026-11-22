import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// `import url from 'x.pdf?preview=560'` is a 560px wide JPEG of the PDF's first page.
// Only imported PDFs are drawn, so nothing private ends up in the build. Needs pdftoppm (poppler-utils).
function pdfPreviews(): Plugin {
  const dir = `${import.meta.dirname}/node_modules/.cache/previews`
  return {
    name: 'pdf-previews',
    enforce: 'pre',
    load(id) {
      const [, pdf, width] = /^(.+\.pdf)\?preview=(\d+)$/.exec(id) ?? []
      if (!pdf) return
      const image = `${dir}/${createHash('sha256').update(readFileSync(pdf)).digest('hex').slice(0, 16)}-${width}`
      if (!existsSync(`${image}.jpg`)) {
        mkdirSync(dir, { recursive: true })
        execFileSync('pdftoppm', ['-jpeg', '-singlefile', '-scale-to-x', width, '-scale-to-y', '-1', pdf, image])
      }
      return { code: `export { default } from ${JSON.stringify(`${image}.jpg`)}`, moduleType: 'js' }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react(), pdfPreviews()],
  // Keeps the logos as files, so they load lazily instead of growing the JS
  build: { assetsInlineLimit: 0 },
  // The PDFs are imported from the repo root, one level up
  server: { fs: { allow: ['..'] } },
})
