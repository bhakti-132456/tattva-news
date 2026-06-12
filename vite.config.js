import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/tts': 'http://localhost:3001',
            '/api/publish': 'http://localhost:3001',
            '/api/census': 'http://localhost:3001'
        }
    }
})
