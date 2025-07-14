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
    label: "input",
    key: "input",
    type: "input",
    placeholder: "请输入",
    hidden: formData.value.select == 2,
  },
  {
    label: "select",
    key: "select",
    type: "select",
    placeholder: "请选择",
    options: [
      { label: "男", value: 1 },
      { label: "女", value: 2 },
    ],
    onChange:(e) => {
       console.log(e)
       e == 1 && (formData.value.input = 'input')
    }
  }
]);

const rules = {
  input: [{ required: true, message: "rules", trigger: "blur" }],
};

const {basicForm , validate , getFieldsValue} = useBasicForm({
  rules, formItems, modelValue: formData
})

const handelClick = async () => {
  // await validate();
  // console.log("formData", formData.value);
const value = getFieldsValue()
console.log(value)
};
</script>

<style scoped lang="scss">
.app-page {
  width: 600px;
}
</style>

