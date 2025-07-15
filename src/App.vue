<template>
  <div class="app-page">
    <basic-form></basic-form>
    <el-button @click="handelClick">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h} from "vue";
import { useBasicForm } from './hooks/useBasicForm';

const formData = ref<any>({
  input: undefined,
  select: undefined,
});

const formItems = computed(() => [
  {
    label: "姓名",
    key: "input",
    type: "input",
    placeholder: "请输入",
  },
  {
    label: "性别",
    key: "select",
    type: "select",
    placeholder: "请选择",
    options: [
      { label: "男", value: 1 },
      { label: "女", value: 2 },
    ]
  }
]);

const rules = {
  //input: [{ required: true, message: "rules", trigger: "blur" }]
};

const {basicForm , validate} = useBasicForm({
  rules, formItems, modelValue: formData
})

const handelClick = async () => {
  await validate();
  console.log("formData", formData.value);
};
</script>

<style scoped lang="scss">
.app-page {
  width: 600px;
  border: 1px solid #999;
}
</style>

