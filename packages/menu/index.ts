import { type App } from 'vue'
import menu from './src/index.vue'
import infiniteMenu from './src/menu'

// 让这个组件可以通过use的形式使用
export default {
  install(app: App) {
     app.component('a-menu', menu)
     app.component('a-infinite-menu', infiniteMenu)
  }
}