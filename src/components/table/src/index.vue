<template>
  <el-table
    :data="data"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    :element-loading-background="elementLoadingBackground"
    :element-loading-custom-class="elementLoadingCustomClass"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        v-if="!item.slot"
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      ></el-table-column>
      <el-table-column v-else :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
        <template #default="scope">
          <slot :name="item.slot" v-bind="scope"></slot>
        </template>
      </el-table-column>
    </template>
    <el-table-column :label="actionOptions!.label" :align="actionOptions!.align" :width="actionOptions!.width">
      <template #default="scope">
        <slot name="action" v-bind="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";
import type { TableOptions } from "./types";

const props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  elementLoadingText: {
    type: String,
  },
  elementLoadingSpinner: {
    type: String,
  },
  elementLoadingBackground: {
    type: String,
  },
  elementLoadingSvg: {
    type: String,
  },
  elementLoadingSvgViewBox: {
    type: String,
  },
  elementLoadingCustomClass: {
    type: String,
  },
});

// 过滤操作选项
const tableOptions = computed(() => props.options.filter((item) => !item.action));

// 找出操作项配置
const actionOptions = computed(() => props.options.find((item) => item.action));

// 表格是否在加载中
const isLoading = computed(() => !props.data || !props.data.length);
</script>

<style lang="scss" scoped></style>

