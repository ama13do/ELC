import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    tailwindcss(),
    ViteImageOptimizer({
      webp: { quality: 85 },
      png: { quality: 85 },
      jpg: { quality: 85 },
      svg: { multipass: true }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})