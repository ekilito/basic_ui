import { defineComponent, useAttrs } from "vue";
import { type PropType } from "vue";
// import { type MenuItem } from "./types";
import * as icons from "@element-plus/icons-vue";
import "./styles/index.scss";

export default defineComponent({
  props: {
    // 导航菜单的数据
    data: {
      type: Array as PropType<any[]>,
      required: true,
    },
    // props
    defaultActive: {
      type: String,
      default: "",
    },
    router: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      default: "name",
    },
    index: {
      type: String,
      default: "index",
    },

    icon: {
      type: String,
      default: "icon",
    },
    children: {
      type: String,
      default: "children",
    },
  },
  setup(props, ctx) {
    // 封装一个渲染无限层级菜单的方法
    let renderMenu = (data: any[]) => {
      return data.map((item: any) => {
        const IconComponent = icons[item[props.icon] as keyof typeof icons];
        let slots = {
          title: () => {
            return (
              <>
                <el-icon>{IconComponent && <IconComponent />}</el-icon>
                <span>{item[props.name]}</span>
              </>
            );
          },
        };
        if (item[props.children] && item[props.children].length) {
          return (
            <el-sub-menu index={item[props.index]} v-slots={slots}>
              {renderMenu(item[props.children])}
            </el-sub-menu>
          );
        }
        return (
          <el-menu-item index={item[props.index]}>
            <el-icon>{IconComponent && <IconComponent />}</el-icon>
            <span>{item[props.name]}</span>
          </el-menu-item>
        );
      });
    };

    let attrs = useAttrs();

    return () => {
      return (
        <el-menu default-active={props.defaultActive} router={props.router} {...attrs} class="el-menu-vertical-demo">
          {renderMenu(props.data)}
        </el-menu>
      );
    };
  },
});

