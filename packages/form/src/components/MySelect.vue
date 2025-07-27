<script setup lang="ts">
import {computed, ref, watch} from 'vue'
const props = defineProps(["code", "format", "formData"]);

const modelValue = defineModel();

const options = ref<any>([])

const cOptions = computed(() => {
  const _options = options.value
  if(!props.format) return _options
  return props.format(_options) 
})

const getOptions = (code: any) => {
   // await getOptionsApi()
   console.log(code)
}

watch(()=> props.code, (newVal)=> {
  console.log('newVal => ' , newVal),
  {
    immediate: true
  }
})

getOptions(props.code)
</script>

<template>
  <el-select v-bind="$attrs" v-model="modelValue" placeholder="请选择">
    <el-option v-for="item in cOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
  </el-select>
</template>

<style></style>
