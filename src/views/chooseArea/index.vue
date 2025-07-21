<template>
  <div>
    <a-choose-area @change="changeArea"></a-choose-area>
  </div>
</template>

<script lang="ts" setup>

const changeArea = (val:any) => {
     console.log(val)
}
</script>

<style scoped lang="scss">

</style>