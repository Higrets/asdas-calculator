import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/asdas-calculator/', // ← ВАЖНО: имя вашего репозитория
})