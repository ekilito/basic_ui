<template>
  <el-dialog v-model="visibleDialog" v-bind="$attrs">
    <template #default></template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref,watch} from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default:  false
  }
})

const emits = defineEmits(["update:visible"])

const visibleDialog = ref<boolean>(props.visible)

watch(()=> props.visible, (val)=> {
  visibleDialog.value =val
})

watch(()=> visibleDialog.value, (val)=> {
  emits('update:visible', val)
})

</script>

<style lang="scss" scoped></style>