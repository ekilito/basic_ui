<template>
  <div class="form-dialog-page">
    <el-button type="primary" @click="handleOpen">open</el-button>
    <a-form-dialog v-model:visible="visible" :formItems="formItems" :formData="formData" title="编辑用户" width="48%">
      <template #footer="{ form }">
        <el-button @click="handleCancel">cancel</el-button>
        <el-button @click="handleOK(form)" type="primary">OK</el-button>
      </template>
    </a-form-dialog>
  </div>
</template>

<script setup>
import { ref, h, computed } from "vue";
import { ElMessage} from "element-plus";

const visible = ref(false);

const formData = ref({
  async_test2: "",
  lineList: [],
  password: "",
  number: null,
  number2: null,
  text: "",
  time: "",
  treeSelect: "",
});

const handleOpen = () => {
  visible.value = true;
};

const handleCancel = () => {
  visible.value = false;
};

const handleOK = (form) => {
  form.validate((valid) => {
    if (valid) {
      ElMessage.success("验证成功");
      const data = form.getFieldsValue()
      console.log(data)
    } else {
      ElMessage.error("验证失败");
    }
  });
  //visible.value = false
};

const formItems = computed(() => [
  {
    label: "api异步",
    key: "async_test2",
    type: "select",
    options: async () => {
      console.log("api异步async");
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await response.json();
      return users.map((user) => ({
        label: user.name,
        value: user.id,
      }));
    },
  },

  {
    label: "",
    key: "lineList",
    type: "ADrawPath",
    labelWidth: "32px",
    
    onChange: (positions) => {
      console.log("positions:", positions);
      console.log("formData.lineList", formData.value.lineList);
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
    // disabled: (formData) => formData.password == 123,
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
]);
</script>

<style lang="scss" scoped></style>

