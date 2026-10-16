import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE: GitHub Pages sirve el repo en /notaspau/. Cambiar a '/' con dominio propio.
export default defineConfig({
  base: process.env.SITE_BASE || '/notaspau/',
  plugins: [react(), tailwindcss()],
  build: { outDir: '.dist', emptyOutDir: true },
})
