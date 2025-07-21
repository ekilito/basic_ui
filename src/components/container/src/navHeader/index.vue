<template>
  <div class="header">
       <span @click="toggle" class="header-icon">
            <el-icon v-if="isCollapse">
              <Expand />
            </el-icon>
            <el-icon v-else>
              <Fold />
            </el-icon>
          </span>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  isCollapse: boolean
}>()

const emits = defineEmits(['update:isCollapse'])

const toggle = () => {
  emits('update:isCollapse', !props.isCollapse)
};
</script>

<style scoped lang="scss">
.header {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: var(--color-bg-color);
  border-bottom: 1px solid var(--color-light-line);

  &-icon {
    cursor: pointer;
  }
}
</style>