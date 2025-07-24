import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { mars3dPlugin } from "vite-plugin-mars3d"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),vueJsx(),mars3dPlugin()],
  server: {
    port: 8080
  }
})
