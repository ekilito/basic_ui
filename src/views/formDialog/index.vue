

<template>
  <div class="form-dialog-page">
    <el-button type="primary" @click="handleOpen">open</el-button>
    <a-form-dialog v-model:visible="visible" title="编辑用户" width="50%">
      <template #footer>
        <el-button @click="handleCancel">cancel</el-button>
        <el-button @click="handleOK" type="primary">OK</el-button>
      </template>
    </a-form-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref<boolean>(false)

const handleOpen = () => {
  visible.value = true;
};

const handleCancel = () => {
  visible.value = false
}

const handleOK = () => {
  visible.value = false
}
</script>

<style lang="scss" scoped></style>
