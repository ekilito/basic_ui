<template>
  <div>
     <a-choose-icon title='选择图标' v-model:visible="visible">打开选择</a-choose-icon>
  </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue'

const visible = ref<boolean>(false)

</script>

<style scoped lang="scss">

</style>