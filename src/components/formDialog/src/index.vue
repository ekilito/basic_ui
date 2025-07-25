<template>
  <el-dialog v-model="visibleDialog" v-bind="$attrs">
    <template #default>
      <a-form :formItems="formItems" :modelValue="formData" ref="formRef"></a-form>
    </template>
    <template #footer>
      <slot name="footer" :form="formRef"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import {ref,watch} from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default:  false
  },
  formItems: Array,
  formData: Object
})

const formRef = ref<FormInstance | null>()

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