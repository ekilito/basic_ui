<template>
  <el-table :data="data">
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        v-if="!item.slot"
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      ></el-table-column>
        <el-table-column
        v-else
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
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
});

// 过滤操作选项
const tableOptions = computed(() => props.options.filter((item) => !item.action));

// 找出操作项配置
const actionOptions = computed(() => props.options.find((item) => item.action));
</script>

<style lang="scss" scoped></style>

