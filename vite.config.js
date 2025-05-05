import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://server-spartacus.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    },
    allowedHosts: ['client-spartacus.onrender.com']
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true
  },
  publicDir: 'public', // Копирует содержимое как есть (например, public/images)
})
