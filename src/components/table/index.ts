import {type App} from 'vue'
import aTable from './src/index.vue'

export default {
  install(app: App) {
    app.component('a-table', aTable)
  }
}