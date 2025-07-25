
import { type App } from 'vue';
import aForm from './src/index.vue';

export default {
  install(app: App) {
    app.component('a-form', aForm);
  }
};