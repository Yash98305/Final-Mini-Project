import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://final-mini-project-e6ol.onrender.com',
        ws: true,           // Proxy WebSocket
        changeOrigin: true, // Needed for cross-origin
        secure: false,      // Ignore SSL warnings in dev (optional)
      },
    },
  },
})
