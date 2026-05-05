import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

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
}

export default defineConfig({
  // Use root domain (user site) or set to '/repo-name/' for project Pages.
  base: './',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: inputs,
    },
  },
})
