import {App} from 'vue'
import form from './src/index.vue'

// 这个组件可以通过 use 的形式使用
export default {
  install(app: App) {
    app.component('m-form', form)
  }
}