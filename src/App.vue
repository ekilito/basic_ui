<template>
  <div class="app-page">
    <basic-form>
      <template #prefixInput>
        123
      </template>
      <template #prependInput>
        345
      </template>
      <template #headerSelect>
        <span>select</span>
      </template>
    </basic-form>
    <el-button @click="handelClick">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed} from "vue";
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
    slots: {
      prefix: 'prefixInput',
      prepend: 'prependInput'
    }
  },
  {
    label: "性别",
    key: "select",
    type: "select",
    placeholder: "请选择",
    options: [
      { label: "男", value: 1 },
      { label: "女", value: 2 },
    ],
    slots: {
      header: 'headerSelect'
    }
  }
]);

const rules = {};

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
}
</style>

