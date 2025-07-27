<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <nav-side v-model:isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <nav-header v-model:isCollapse="isCollapse" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import navHeader from "./navHeader/index.vue";
import navSide from "./navSide/index.vue";

const isCollapse = ref(false);
</script>

<style scoped lang="scss">
.el-header {
  padding: 0;
}
</style>

