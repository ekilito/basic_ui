import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import mForm from './components/form/index'

const app = createApp(App)
app.use(ElementPlus)
app.use(mForm)
app.mount('#app')
