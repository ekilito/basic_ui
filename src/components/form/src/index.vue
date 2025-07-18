<template>
  <el-form v-if="model" :model="model" :rules="rules" v-bind="$attrs" :validate-on-rule-change="false">
    <template v-for="(item, index) in options" :key="index">
      <el-form-item v-if="!item.children || !item.children!.length" :label="item.label" :prop="item.prop">
        <component
          v-if="item.type !== 'upload'"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        ></component>
        <el-upload
          v-else
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :on-exceed="onExceed"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
        >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="item.children && item.children.length" :label="item.label" :prop="item.prop">
        <component
          :placeholder="item.placeholder"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
          ></component>
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted, watch } from "vue";
import { FormOptions } from "./types/types";
import cloneDeep from "lodash-es/cloneDeep";
import { UploadFile, UploadFiles, UploadProgressEvent, UploadUserFile } from 'element-plus';

const emits = defineEmits([
  "on-preview",
  "on-remove",
  "on-success",
  "on-error",
  "on-progress",
  "on-change",
  "on-exceed",
  "before-upload",
  "before-remove",
  "http-request",
]);

let props = defineProps({
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
});

let model = ref<any>(null);
let rules = ref<any>(null);

// 初始化表单
const initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;
    });
    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
};

onMounted(() => {
  initForm();
});

// 监听options
watch(
  () => props.options,
  () => {
    initForm();
  },
  { deep: true },
);

// 上传组件的方法
const onPreview = (uploadFile: UploadFile) => {
  emits("on-preview", uploadFile);
};
const onRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits("on-remove", { uploadFile, uploadFiles });
};
const onSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits("on-success", { response, uploadFile, uploadFiles });
};
const onError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits("on-error", { error, uploadFile, uploadFiles });
};
const onProgress = (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits("on-progress", { evt, uploadFile, uploadFiles });
};
const onChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits("on-change", { uploadFile, uploadFiles });
};
const onExceed = (files: File[], uploadFiles: UploadUserFile[]) => {
  emits("on-exceed", { files, uploadFiles });
};
const beforeUpload = (uploadFile: UploadFile) => {
  emits("before-upload", uploadFile);
};
const beforeRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emits("before-remove", { uploadFile, uploadFiles });
};
const httpRequest = () => {
  emits("http-request");
};
</script>

<style lang="scss" scoped></style>

