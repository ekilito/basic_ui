import { createApp } from 'vue'
import './styles/base.css'
import App from './App.vue'
import router from './router'
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
import "mars3d/mars3d.css";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as AIcons from '@element-plus/icons-vue'

// import aUI from './components/index.ts'
import aUI from '../lib/aura-ui'
import '../lib/aura-ui.css'

// 单独引入组件
// import aForm from '../lib/form/index.es.js'
// import  '../lib/form/aura-ui.css'

const app = createApp(App)

// 全局注册图标
for (const [key, component] of Object.entries(AIcons)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)
app.use(aUI)
app.mount('#app')
