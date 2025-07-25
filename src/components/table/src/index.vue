<template>
  <el-table :data="data">
    <template v-for="(item,index) in options" :key="index">
      <el-table-column :label="item.label" :prop="item.prop" :align="item.align" :width="item.width"></el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue';
import type { TableOptions } from './types';

const props = defineProps({
  options: {
   type: Array as PropType<TableOptions[]>,
   required: true
  },
  data: {
    type: Array as PropType<any[]>,
     required: true
  }
})

</script>

<style lang="scss" scoped></style>