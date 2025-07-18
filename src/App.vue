<template>
  <div class="app-page">
    <basic-form>
      <template #appendSlots>
        附件
      </template>
      <template #keySlot>
        插槽组件
      </template>
      <template #action>
         <el-button @click="handelClick" type="primary">提交</el-button>
      </template>
    </basic-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed , h} from "vue";
import { useBasicForm } from "./hooks/useBasicForm";
import { OptionItem } from './components/basicForm/types/types';


const formData = ref<any>({
  data: {
    input: "",
  },
  password: "123",
  number: undefined,
  text: "",
  time: "",
  switch: false,
  radioGroup: 1,
  checkboxGroup: undefined,
  select: "",
  city: "",
  jd: "",
  treeSelect: "",
  keySlot: "",
});

const formItems = computed<OptionItem[]>(() => [
  {
    label: "姓名",
    key: "data.input",
    type: "input",
    labelWidth: 110,
    placeholder: "请输入",
    slots: {
      append: "appendSlots",
    },
    onInput: () => {
      console.log("输入了");
    },
    defaultValue: "defaultValue",
    unit: "dm",
    trim: true,
    if: (formData) => !(formData.ces == 3),
    rules: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    disabled: (formData) => formData.ces == 1
  },
  {
    label: "ces",
    key: "ces",
    type: "select",
    placeholder: "请选择",
    required: true,
    span: 24,
    options: [
      { label: "ces1", value: 1 },
      { label: "ces2", value: 2 },
      { label: "ces3", value: 3 },
    ],
    onChange: (e) => {
      if(e == 1) {
        formData.value.data.input = 'input'
      }
    }
  },

  {
    label: "密码",
    key: "password",
    type: "password",
    placeholder: "请输入",
    if: (formData) => formData.select != 2,
  },
  {
    label: "数字框",
    key: "number",
    type: "number",
    max: 100,
    min: 0,
    placeholder: "请输入",
    controls: false,
    defaultValue: 66,
    rules: [{ required: true, message: "请输入姓名", trigger: "blur" }],
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
    placeholder: "请输入时间",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    required: true,
    style: {
      width: '100%'
    }
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
    label: "城市",
    key: "city",
    type: "select",
    placeholder: "please select",
    options: (formData) => {
      if (formData.select == "1") return [{ label: "海淀", value: "1" }];
      if (formData.select == "2")
        return [
          { label: "海淀", value: "1" },
          { label: "浦东", value: "2" },
        ];
      return [];
    },
    // if: (formData) => !!formData.select,
  },
  {
    label: "性别",
    key: "select",
    type: "select",
    placeholder: "请选择",
    required: true,
    span: 24,
    options: [
      { name: "男", id: 1},
      { name: "女", id: 2 },
    ],
    fieldNames: {
      label: "name",
      value: "id",
    },
    onChange: (value) => {
      // 联动
      console.log(value, formData.value);
    },
    slots: {
     // header: "headerSelect",
      header : () => h('div', '我是 select 的 header slot'), // 推荐函数式插槽
    },
  },

  {
    label: "街道",
    key: "jd",
    type: "input",
    disabled: (formData) => !formData.city, // 没有选择城市就禁用
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
      onNodeClick: (e) => {
        console.log(e);
      },
      props: {
        label: "name",
        value: "id",
        children: "children",
      },
    },
  },
  // {
  //   label: "time",
  //   key: "time",
  //   type: "time",
  //   placeholder: "请输入时间",
  //   disabled: (formData) => formData.switch === true
  // },
  // {
  //   label: "timeRange",
  //   key: "timeRange",
  //   type: "timeRange",
  //   rangeSeparator: "To",
  //   startPlaceholder: "Start time",
  //   endPlaceholder: "End time",
  //   // isRange: true
  // },
  // {
  //   label: "rate",
  //   key: "rate",
  //   type: "rate",
  //   disabled: true
  // },
  // {
  //   label: "color",
  //   key: "color",
  //   type: "color",
  //   if: false
  // },
  // {
  //   label: "slider",
  //   key: "slider",
  //   type: "slider",
  // },

  // {
  //   label: "cascader",
  //   key: "cascader",
  //   type: "cascader",
  //   // 如果传了props格式化字段，需要包一层props
  //   props: {
  //     placeholder: "please select",
  //     options: [
  //       {
  //         id: "guide",
  //         name: "Guide",
  //         children: [
  //           {
  //             id: "disciplines",
  //             name: "Disciplines",
  //             children: [
  //               {
  //                 id: "consistency",
  //                 name: "Consistency",
  //               },
  //               {
  //                 id: "feedback",
  //                 name: "Feedback",
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //     props: {
  //       label: "name",
  //       value: "id",
  //     },
  //   },
  // },
  // {
  //   label: "transfer",
  //   key: "transfer",
  //   type: "transfer",
  //   data: [
  //     { key: 1, label: "Option 1", disabled: false },
  //     { key: 2, label: "Option 2", disabled: false },
  //     { key: 3, label: "Option 3", disabled: false },
  //     { key: 4, label: "Option 4", disabled: true },
  //     { key: 5, label: "Option 5", disabled: false },
  //   ],
  // },
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

