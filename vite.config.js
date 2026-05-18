import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Multi-page app: every top-level route has its own HTML file.
 * Keep paths in source HTML as you already author them (relative); Vite rewrites
 * them in dist for hashed assets.
 */
const inputs = {
  main: resolve(__dirname, 'index.html'),
  resume: resolve(__dirname, 'resume.html'),
  about: resolve(__dirname, 'pages/about.html'),
  playground: resolve(__dirname, 'pages/playground.html'),
  posty: resolve(__dirname, 'projects/posty.html'),
  depop: resolve(__dirname, 'projects/depop.html'),
  basketbuddies: resolve(__dirname, 'projects/basketbuddies.html'),
  caseStudyTemplate: resolve(__dirname, 'projects/case-study-template.html'),
  ferra: resolve(__dirname, 'projects/ferra.html'),
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Use root domain (user site) or set to '/repo-name/' for project Pages.
  base: './',
  publicDir: 'public',
  server: {
    port: 5190,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      input: inputs,
    },
  },
})
