import { type App } from 'vue';

import chooseArea from './chooseArea';
import chooseIcon from './chooseIcon';
import menu from './menu';
import form from './form';
import mForm from './mForm';
import aFormDialog from './formDialog'


const components = [
  chooseArea,
  chooseIcon,
  menu,
  form,
  mForm,
  aFormDialog
]

export default {
  install(app: App) {
    components.map(item => {
      app.use(item)
    })
  }
}