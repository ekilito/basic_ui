<script setup lang="ts">
defineProps(['msgProps'])

const modelValue = defineModel()

</script>

<template>
  <div>{{ msgProps }}</div>
  <el-input v-model="modelValue" placeholder="请输入"></el-input>
</template>

<style></style>