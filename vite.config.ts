import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import copy from './vite/copy'

const appConfig = await import('./config/default.json');

export default defineConfig({
  plugins: [
    copy({
      'public/app.config.json': 'config/default.json',
      'public/favicon.ico': 'assets/favicon.ico'
    }),
    vue(),
    vueDevTools(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
          @import "./src/styles/main.less";
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api/': {
        target: appConfig.proxy,
        secure: false,
        changeOrigin: true
      }
    }
  }
})
