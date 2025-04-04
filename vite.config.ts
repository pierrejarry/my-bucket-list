import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my-bucket-list/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist'
  }
})