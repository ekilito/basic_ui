<template>
  <el-menu :default-active="defaultActive" :router="router" v-bind="$attrs" class="el-menu-vertical-demo">
    <template v-for="(item, i) in data" :key="i">
      <el-menu-item v-if="!item[children] || !item[children].length" :index="item[index]">
        <component v-if="item[icon]" :is="item[icon]"></component>
        <span>{{ item[name] }}</span>
      </el-menu-item>
      <el-sub-menu v-if="item[children]" :index="item[index]">
        <template #title>
          <component v-if="item[icon]" :is="item[icon]"></component>
          <span>{{ item[name] }}</span>
        </template>
        <el-menu-item v-for="(v, i) in item[children]" :key="i" :index="v[index]">
          <component v-if="v[icon]" :is="item[icon]"></component>
          <span>{{ v[name] }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { type PropType } from "vue";
// import { type MenuItem } from "./types";

const props = defineProps({
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
  // 是否是路由模式
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
});
</script>

<style scoped lang="scss">
svg {
  margin-right: 6px;
}
</style>

