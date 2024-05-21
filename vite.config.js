import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import proxy from 'vite-plugin-proxy'
import App from './src/App'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()],
  server: {
    proxy: {
      '/cope': {
        target: 'http://cont.multidatagroup.it/cope/api/cope/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cope/, ''),
      },
    },
  },
})

