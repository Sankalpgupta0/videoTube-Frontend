import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy:{
      '/api': 'https://videotube-backend-bynh.onrender.com'
    }
  },
  plugins: [react()],
})
