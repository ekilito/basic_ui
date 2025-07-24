<template>
  <div class="app-page">
    <a-form>
      <template #appendSlots>input append slot</template>
      <template #footerSlots>select footer slot</template>
      <template #suffixSlots> RMB </template>
      <template #keySlot>keySlot</template>
      <template #action>
        <el-button @click="handelClick" type="primary">提交</el-button>
      </template>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from "vue";
import { useAForm } from "../../hooks/useAForm.ts";
import { type OptionItem } from "../../components/form/src/types/types.ts";
import { ElMessage } from "element-plus";
import { validatePosition } from "../../utils/index.ts";

const formData = ref<any>({
  data: {
    input: "",
  },
  ces: "",
  password: "",
  number: undefined,
  number2: undefined,
  text: "",
  time: "",
  file: "",
  startTimes: "",
  // position: null,
  position: {
    longitude: null,
    latitude: null,
    altitude: null,
  },
  switch: true,
  radioGroup: 1,
  radioGroupButton: 1,
  checkboxGroup: [],
  checkboxGroupButton: [],
  select: "",
  city: "",
  jd: "",
  treeSelect: "",
  startTime: "",
  timeRange: "",
  rate: 3,
  color: "",
  slider: 24,
  cascader: [],
  sync_test1: "",
  async_test2: "",
  async_test1: "",
  keySlot: "",
  lineList: []
});

const options1 = ref([
  { label: "ces1", value: "1" },
  { label: "ces2", value: "2" },
  { label: "ces3", value: "3" },
]);

const formItems = computed<OptionItem[]>(() => [
  {
    label: "AForm",
    type: "title",
  },
  // 同步测试
  {
    label: "同步()=>{[]}",
    key: "sync_test1",
    type: "select",
    options: () => {
      console.log("同步()=>{[]}");
      return [
        { label: "测试1", value: "1" },
        { label: "测试2", value: "2" },
      ];
    },
  },

  {
    label: "api异步",
    key: "async_test2",
    type: "select",
    options: async () => {
      console.log("api异步async");
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await response.json();
      return users.map((user: any) => ({
        label: user.name,
        value: user.id,
      }));
    },
  },
  // 异步测试
  {
    label: "条件异步",
    key: "async_test1",
    type: "select",
    deps: ["sync_test1"],
    options: async (formData: any) => {
      console.log("select条件异步");
      if (formData.sync_test1 == 1) {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        return users.map((user: any) => ({
          label: user.name,
          value: user.id,
        }));
      } else if (formData.sync_test1 == 2) {
        return [{ label: "测试2", value: "2" }];
      }
      return [];
    },
  },
  {
    label: '',
    key: "lineList",
    type: "ADrawPath",
    labelWidth: '35px',
    onChange: (positions: any) => {
      console.log('positions:', positions)
      console.log('formData.lineList', formData.value.lineList)
    }
  },

  {
    label: "姓名",
    key: "data.input",
    type: "input",
    labelWidth: 120,
    placeholder: "请输入",
    // tooltip: "请输入你的登录用户名",
    slots: {
      append: "appendSlots",
      prefix: () => h("i", "前缀"),
    },
    onInput: () => {
      console.log("输入了");
    },
    unit: "dm",
    trim: true,
    rules: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    if: (formData) => !(formData.ces == 3),
    disabled: (formData) => formData.ces == 1,
  },
  {
    label: "ces",
    key: "ces",
    type: "select",
    placeholder: "请选择",
    required: true,
    span: 24,
    filterable: true,
    options: options1.value,
    appendButton: {
      text: "操作",
      onClick: (item: any, formModel: any) => {
        console.log("当前项：", item);
        console.log("当前表单数据：", formModel);
        formModel.number = 100;
        console.log(formData.value);
      },
    },
    slots: {
      label: ({ label, value }: { label: string; value: any }) =>
        h("span", [h("span", `${label}: `), h("span", { style: { fontWeight: "bold" } }, value)]),

      footer: "footerSlots",
    },
    onChange: (e: any) => {
      if (e == 1) {
        formData.value.data.input = "input";
      }
    },
  },

  {
    label: "密码",
    key: "password",
    type: "password",
    clearable: true,
    placeholder: "请输入",
  },
  {
    label: "数字框",
    key: "number",
    type: "number",
    max: 100,
    min: 0,
    placeholder: "请输入",
    controls: false,
    defaultValue: 20,
    disabled: (formData) => formData.password == 123,
    rules: [{ required: true, message: "请输入数字", trigger: "blur" }],
  },
  {
    label: "数字框2",
    key: "number2",
    type: "number",
    placeholder: "请输入",
    precision: 2,
    step: 0.1,
    slots: {
      prefix: () => h("span", {}, "￥"),
      suffix: "suffixSlots",
    },
  },
  {
    label: "文本框",
    key: "text",
    type: "textarea",
    placeholder: "请输入",
    resize: "none",
    required: true,
  },
  {
    label: "时间",
    key: "time",
    type: "datetime",
    placeholder: "请选择时间",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    required: true,
    style: {
      width: "100%",
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
          name: "one",
          children: [
            {
              id: "1-1",
              name: "two",
              children: [
                {
                  id: "1-1-1",
                  name: "three",
                },
              ],
            },
          ],
        },
      ],
      onNodeClick: (e: any) => {
        console.log(e);
      },
      props: {
        label: "name",
        value: "id",
        children: "children",
      },
    },
  },
  {
    label: "城市",
    key: "city",
    type: "select",
    placeholder: "please select",
    deps: ["select"],
    options: (formData: any) => {
      if (formData.select == "1") return [{ label: "海淀", value: "1" }];
      if (formData.select == "2")
        return [
          { label: "海淀", value: "1" },
          { label: "浦东", value: "2" },
        ];
      return [];
    },
    if: (formData) => !!formData.select,
  },
  {
    label: "性别",
    key: "select",
    type: "select",
    placeholder: "请选择",
    required: true,
    span: 24,
    options: [
      { name: "男", id: 1 },
      { name: "女", id: 2 },
    ],
    fieldNames: {
      label: "name",
      value: "id",
    },
    onChange: (value: any) => {
      console.log(value, formData.value);
    },
    slots: {
      header: () => h("div", "我是 select 的 header slot"), // 推荐函数式插槽
    },
  },

  {
    label: "街道",
    key: "jd",
    type: "input",
    placeholder: "请输入街道",
    disabled: (formData) => !formData.city, // 没有选择城市就禁用
  },
  {
    label: "文件上传",
    key: "file",
    type: "AUpload",
    accept: ".png,.pdf",
    onChange: async (e: any) => {
      console.log("开始上传文件...", e);
      // 模拟异步等待（如上传耗时）
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("选择的文件:", e);
      ElMessage({ message: "上传成功", type: "success" });
    },
    rules: [{ required: true, message: "upload", trigger: "change" }],
  },
  {
    label: "开始时间",
    key: "startTimes",
    type: "ATimerPicker",
    rules: [{ required: true, message: "ATimerPicker", trigger: "blur" }],
  },
  {
    label: "经纬度坐标",
    key: "position",
    type: "ACoordinatePicker",
    disabled: true,
    onChange: (e: any) => {
      console.log(e);
    },
    rules: [
      {
        required: true,
        message: "请选择经纬度坐标",
        trigger: "change",
      },
      {
        validator: validatePosition,
        trigger: "change",
      },
    ],
  },
  {
    label: "switch",
    key: "switch",
    type: "switch",
    style: "--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949",
    inlinePrompt: true,
    activeText: "是",
    inactiveText: "否",
  },
  {
    label: "radioGroup",
    key: "radioGroup",
    type: "radioGroup",
    for: "", // 禁用 label 关联
    options: [
      { label: "radio1", value: 1 },
      { label: "radio2", value: 2 },
    ],
    onChange: (e: any) => {
      console.log(e);
    },
  },
  {
    label: "radioGroupButton",
    key: "radioGroupButton",
    type: "radioGroupButton",
    for: "", // 禁用 label 关联
    options: () => {
      return [
        { label: "radio1", value: 1 },
        { label: "radio2", value: 2 },
      ];
    },
    if: (formData) => formData.switch === true,
  },
  {
    label: "checkboxGroup",
    key: "checkboxGroup",
    type: "checkboxGroup",
    for: "",
    options: [
      { label: "box1", value: 1 },
      { label: "box2", value: 2 },
    ],
    if: (formData) => formData.switch === true,
  },
  {
    label: "checkboxGroupButton",
    key: "checkboxGroupButton",
    type: "checkboxGroupButton",
    for: "",
    options: [
      { label: "box1", value: 1 },
      { label: "box2", value: 2 },
    ],
    if: (formData) => formData.switch === true,
  },

  {
    label: "startTime",
    key: "startTime",
    type: "time",
    placeholder: "请输入时间",
    if: (formData) => formData.switch === true,
  },
  {
    label: "timeRange",
    key: "timeRange",
    type: "timeRange",
    rangeSeparator: "To",
    startPlaceholder: "Start time",
    endPlaceholder: "End time",
    if: (formData) => formData.switch === true,
    // isRange: true
  },
  {
    label: "rate",
    key: "rate",
    type: "rate",
    for: "",
    if: (formData) => formData.switch === true,
  },
  {
    label: "color",
    key: "color",
    type: "color",
    for: "",
    if: (formData) => formData.switch === true,
  },
  {
    label: "slider",
    key: "slider",
    type: "slider",
    for: "",
    if: (formData) => formData.switch === true,
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

const { aForm, validate } = useAForm({
  rules,
  formItems,
  modelValue: formData,
  formConfig: { labelWidth: "120px", size: "small"},
});

const handelClick = async () => {
  try {
    await validate();
    console.log("formData", formData.value);
  } catch (err) {
    console.warn("error rules!");
  }
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

