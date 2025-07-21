import { createApp } from 'vue'
import './styles/base.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as AIcons from '@element-plus/icons-vue'

import aUI from './components/index.ts'


const app = createApp(App)

// 全局注册图标
for (const [key, component] of Object.entries(AIcons)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)
app.use(aUI)
app.mount('#app')
