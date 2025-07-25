<template>
  <div>table</div>
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