<template>
  <m-form
    :options="options"
    label-width="120px"
    @on-success="onSuccess"
  >
    <template #uploadArea>
      <el-button size="small" type="primary"> click to upload</el-button>
    </template>
    <template #uploadTip>
      <div class="el-upload__tip">jpg files with a size less than 500kb</div>
    </template>
    <template #action="scoped">
         <el-button type="primary" @click="onSubmit(scoped)">Create</el-button>
         <el-button>Cancel</el-button>
    </template>
  </m-form>
</template>

<script setup lang="ts">
import { type FormInstance } from 'element-plus';
import { type FormOptions } from "../../components/mForm/src/types/types";

interface Scoped {
    form: FormInstance,
    model: any
}

let options: FormOptions[] = [
  {
    type: "input",
    value: "",
    label: "用户名",
    prop: "username",
    placeholder: "please input",
    rules: [{ required: true, message: "please input", trigger: "blur" }],
  },
  {
    type: "input",
    value: "",
    label: "密码",
    prop: "password",
    placeholder: "please input",
    rules: [{ required: true, message: "please input", trigger: "blur" }],
    attrs: {
      showPassword: true,
    },
  },
  {
    type: "select",
    value: "",
    label: "性别",
    placeholder: "please select",
    prop: "role",
    rules: [{ required: true, message: "please select must!", trigger: "blur" }],
    children: [
      {
        type: "option",
        label: "男",
        value: "1",
      },
      {
        type: "option",
        label: "女",
        value: "2",
      },
    ],
    attrs: {
      style: {
        width: "90%",
      },
    },
  },
  {
    type: "checkbox-group",
    value: [],
    prop: "like",
    label: "多选",
    children: [
      {
        type: "checkbox",
        label: "足球",
        value: "1",
      },
      {
        type: "checkbox",
        label: "篮球",
        value: "2",
      },
    ],
    rules: [{ required: true, message: "please select must!", trigger: "blur" }],
  },
  {
    type: "radio-group",
    value: "",
    prop: "单选",
    label: "单选",
    children: [
      {
        type: "radio",
        label: "足球",
        value: "1",
      },
      {
        type: "radio",
        label: "篮球",
        value: "2",
      },
    ],
    rules: [{ required: true, message: "please select must!", trigger: "blur" }],
  },
  {
    type: "upload",
    label: "上传",
    prop: "file",
    uploadAttrs: {
      action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
    },
  },
];

const onSuccess = ({response, uploadFile, uploadFiles}) => {
  console.log(response, uploadFile,uploadFiles);
};

const onSubmit = (scoped: Scoped) => {
    scoped.form.validate((valid) => {
        if(valid) {
            console.log(scoped.model)
        }
    })
}

</script>

<style lang="scss" scoped></style>

