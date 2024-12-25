import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Needed for GitHub pages
  build: {
    assetsInlineLimit: 8192,
  },
  plugins: [svgr(), react()],
})
