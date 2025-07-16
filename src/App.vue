<template>
  <div class="app-page">
    <basic-form>
      <template #prefixInput> input slot </template>
      <template #headerSelect> select slot </template>
      <template #optionsLabelSlots> 男 </template>
      <template #keySlot>
        <div>keySlot</div>
      </template>
    </basic-form>
    <el-button @click="handelClick">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useBasicForm } from "./hooks/useBasicForm";

const formData = ref<any>({
  data: {
    input: undefined,
  },
  select: undefined,
  number: undefined,
  switch: false,
  radioGroup: 1,
  keySlot: "",
});

const formItems = computed(() => [
  { type: "title", label: "个人信息" },
  {
    label: "姓名",
    key: "data.input",
    type: "input",
    labelWidth: 110,
    placeholder: "请输入",
    slots: {
      prefix: "prefixInput",
    },
    onInput: () => {
      console.log("输入了");
    },
    defaultValue: "defaultValue",
    unit: "dm",
    trim: true,
    hidden: formData.value.select == 2,
    span: 24,
    // rules: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  },
  { type: "divider" },
  { type: "blank" },

  {
    label: "密码",
    key: "password",
    type: "password",
    placeholder: "请输入",
    defaultValue: "123456",
  },
  {
    label: "数字框",
    key: "number",
    type: "number",
    max: "100",
    min: "0",
    placeholder: "请输入",
    controls: false,
  },
  {
    label: "文本框",
    key: "text",
    type: "textarea",
    placeholder: "请输入",
    resize: "none",
  },
  {
    label: "时间",
    key: "date",
    type: "datetime",
    placeholder: "请输入时间",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
  },
  {
    label: "switch",
    key: "switch",
    type: "switch",
  },
  {
    label: "radioGroup",
    key: "radioGroup",
    type: "radioGroup",
    options: [
      { label: "radio1", value: 1 },
      { label: "radio2", value: 2 },
    ],
  },
  {
    label: "checkboxGroup",
    key: "checkboxGroup",
    type: "checkboxGroup",
    options: [
      { label: "box1", value: 1 },
      { label: "box2", value: 2 },
    ],
  },
  {
    label: "time",
    key: "time",
    type: "time",
    placeholder: "请输入时间",
    disabled: formData.value.switch === true,
  },
  {
    label: "timeRange",
    key: "timeRange",
    type: "timeRange",
    rangeSeparator: "To",
    startPlaceholder: "Start time",
    endPlaceholder: "End time",
    // isRange: true
  },
  {
    label: "rate",
    key: "rate",
    type: "rate",
  },
  {
    label: "color",
    key: "color",
    type: "color",
  },
  {
    label: "slider",
    key: "slider",
    type: "slider",
  },
  {
    label: "性别",
    key: "select",
    type: "select",
    placeholder: "请选择",
    required: true,
    span: 24,
    options: [
      { name: "男", id: 1, slots: "optionsLabelSlots" },
      { name: "女", id: 2 },
    ],
    fieldNames: {
      label: "name",
      value: "id",
    },
    onChange: (value, formData) => {
      // 联动
      console.log(value, formData);
    },
    slots: {
      header: "headerSelect",
    },
  },
  {
    label: "treeSelect",
    key: "treeSelect",
    type: "treeSelect",
    // treeSelect 多包一层props（如果传了props格式化data字段， 需要包一层props）
    props: {
      placeholder: "请选择",
      data: [
        {
          id: "1",
          name: "Level one 1",
          children: [
            {
              id: "1-1",
              name: "Level two 1-1",
              children: [
                {
                  id: "1-1-1",
                  name: "Level three 1-1-1",
                },
              ],
            },
          ],
        },
      ],
      props: {
        label: "name",
        value: "id",
        children: "children",
      },
    },
  },
  {
    label: "cascader",
    key: "cascader",
    type: "cascader",
    // 如果传了props格式化字段，需要包一层props
    props: {
      placeholder: "please select",
      options: [
        {
          id: "guide",
          name: "Guide",
          children: [
            {
              id: "disciplines",
              name: "Disciplines",
              children: [
                {
                  id: "consistency",
                  name: "Consistency",
                },
                {
                  id: "feedback",
                  name: "Feedback",
                },
              ],
            },
          ],
        },
      ],
      props: {
        label: "name",
        value: "id",
      },
    },
  },
  {
    label: "transfer",
    key: "transfer",
    type: "transfer",
    data: [
      { key: 1, label: "Option 1", disabled: false },
      { key: 2, label: "Option 2", disabled: false },
      { key: 3, label: "Option 3", disabled: false },
      { key: 4, label: "Option 4", disabled: true },
      { key: 5, label: "Option 5", disabled: false },
    ],
  },
  {
    label: "keySlot",
    key: "keySlot",
  },
]);

const rules = {};

const { basicForm, validate } = useBasicForm({
  rules,
  formItems,
  modelValue: formData,
});

const handelClick = async () => {
  await validate();
  console.log("formData", formData.value);
};
</script>

<style scoped lang="scss">
.app-page {
  width: 800px;
}
:deep(.el-input-number .el-input__inner) {
  text-align: left;
}
</style>

