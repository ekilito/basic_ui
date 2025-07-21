import { type App } from 'vue';

import chooseArea from './chooseArea';
import chooseIcon from './chooseIcon';
import menu from './menu';
import form from './form';
import mForm from './mForm'

const components = [
  chooseArea,
  chooseIcon,
  menu,
  form,
  mForm
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}