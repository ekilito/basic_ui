<script setup lang="ts">
import { ref } from "vue";
import { CircleCheck, CircleClose, Files } from "@element-plus/icons-vue";

// 接收透传的 formData，用于后续扩展
// 接收 props
const props = defineProps<{
  formData?: Record<string, any>;
  accept?: string;
}>();

// 用于 v-model
const modelValue = defineModel<File | string>();

const emit = defineEmits<{
  (e: "change", file: File): void;
}>();

const file = ref<HTMLInputElement | null>(null);
const isHovering = ref(false);

const callFile = () => {
  file.value?.dispatchEvent(new MouseEvent("click"));
};

// 文件改变事件
const fileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const selectedFile = target.files?.[0];

  if (selectedFile) {
    // 更新 modelValue（支持双向绑定）
    modelValue.value = selectedFile;
    emit("change", selectedFile);
    // 清除 input 的值，确保可以选择相同文件触发 change
    target.value = "";
  }
};

const removeFile = () => {
  modelValue.value = "";
};
</script>

<template>
  <div class="a-upload">
    <div class="upload-box" @click="callFile">
      <el-icon><Files /></el-icon>
      <span>{{ modelValue ? "重新上传" : "点击上传" }}</span>
    </div>
    <input
      name="file"
      ref="file"
      id="file"
      type="file"
      :accept="props.accept"
      style="display: none"
      @change="fileChange"
    />
    <!-- ✅ 文件信息区域 -->
    <div class="file-info" v-if="modelValue" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
      <el-icon class="normal-icon"><Document /></el-icon>
      <span :class="['file-name', isHovering ? 'hover' : '']">
        {{ typeof modelValue === "string" ? modelValue : modelValue.name }}
      </span>
      <el-icon class="file-icon" @click.stop="removeFile" :class="isHovering ? 'icon-hover' : 'icon-normal'">
        <component :is="isHovering ? CircleClose : CircleCheck" />
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upload-box {
  width: 180px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #005a9b;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 16px;

  svg {
    // color: #9bb6d5;
  }

  span {
    // color: #9bb6d5;
    font-size: 16px;
    margin-left: 8px;
  }
}

.file-info {
  margin-top: 8px;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: default;

  .normal-icon {
    color: #999;
  }

  .file-name {
    transition: color 0.2s;
    margin-left: 8px;
  }

  .file-name.hover {
    color: #409eff;
  }

  .file-icon {
    margin-left: 28px;
    cursor: pointer;
    transition: color 0.2s;
  }

  .icon-normal {
    color: rgb(5, 128, 5); // 勾：默认蓝色
  }

  .icon-hover {
    color: #333; // X：悬停时灰色
  }
}
</style>

