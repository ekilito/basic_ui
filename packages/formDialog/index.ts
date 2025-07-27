
import { type App } from 'vue';
import formDialog from './src/index.vue';

export default {
  install(app: App) {
    app.component('a-form-dialog', formDialog);
  }
};