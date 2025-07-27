import { type App } from "vue";

import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import menu from "./menu";
import form from "./form";
import mForm from "./mForm";
import aFormDialog from "./formDialog";
import aTable from "./table";
import "./styles/base.css";
import * as AIcons from "@element-plus/icons-vue";

const components = [chooseArea, chooseIcon, menu, form, mForm, aFormDialog, aTable];

export default {
  install(app: App) {
    // 全局注册图标
    for (const [key, component] of Object.entries(AIcons)) {
      app.component(key, component);
    }
    components.map((item) => {
      app.use(item);
    });
  },
};

