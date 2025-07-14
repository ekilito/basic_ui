component
<script setup lang="ts">
import {
  ElCheckbox,
  ElCheckboxGroup,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
 type FormInstance,
} from "element-plus";
import { type Component, computed, defineAsyncComponent, h, provide, type Ref, useSlots, useTemplateRef, watch } from "vue";
import { get, omit, set } from "lodash-es";
import  { OptionItem } from './index.d'
import MySelect from "./components/MySelect.vue";

const props = defineProps(["formItems", "rules"]);

const formInstance = useTemplateRef<FormInstance>('formRef')

const formData = defineModel() as Ref<Record<string, any>>;

defineOptions({
  name: "BasicForm",
});

const slots = useSlots();

function transformOptions(component: Component, optionsComponent: Component) {
  return (props: { options: OptionItem[] }) => {
    const { options = [] } = props;
    return h(component, props, () =>
      options.map((item) => {
        let _slots = item.slots;
        if (typeof _slots === "string") {
          _slots = slots[_slots];
        }
        return h(
          optionsComponent,
          {
            label: item.label,
            value: item.value,
          },
          _slots,
        );
      }),
    );
  };
}

const componentMap: Record<string, any> = {
  input: ElInput,
  number: ElInputNumber,
  select: transformOptions(ElSelect, ElOption),
  radioGroup: transformOptions(ElRadioGroup, ElRadio),
  checkboxGroup: transformOptions(ElCheckboxGroup, ElCheckbox),
  date: ElDatePicker,
  // mySelect: MySelect
  // 异步导入
  mySelect: defineAsyncComponent(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        import("./components/MySelect.vue").then((comp) => resolve(comp.default)); // 支持远程加载组件
      }, 500);
    });
  }),
};

/**
 * 
 * {
    label: "number",
    key: "number",
    type: "input",
    span: 12,
    placeholder: "请输入",
  },
 * 
 */

const rootProps = ["label", "key", "type", "span"];

function getProps(item: Record<string, any>) {
  if (item.props) return item.props;
  // rootsProps 不是组件的props，不传给组件
  return omit(item, rootProps);
}

provide('formData', formData)

const items = computed(() => props.formItems.filter((item) => !item.hidden));

function getComponent(item: Record<string, any>) {
  const { type } = item;
  if (type === undefined) return ElInput;
  if (typeof type !== "string") {
    // 函数式组件
    return type;
  }
  return componentMap[type];
}

const ComponentItem = {
  props: ["item"],
  setup(props: { item: Record<string, any> }) {
    return () => {
      const { item } = props;
      /**
       * MutableHandler
       * 
       */
      return h(
        // 表单 type 组件
        getComponent(item),
        {
          
          // v-model
          modelValue: get(formData.value,item.key),
          "onUpdate:modelValue": (value: any) => {
            if(item.trim) {
              value = value.trim()
            }
            // formData.value[item.key] = value;
            set(formData.value, item.key, value)
          },
          ...getProps(item),
          // ...reactive(getProps(item))

           formData: formData.value // 透传自定义组件
        },
        Object.assign(
           item.slots || {},
          Object.entries(item.slots || {}).reduce((acc, [key, value]) => {
            if (typeof value === "string") {
              if (slots[value]) {
                acc[key] = slots[value];
              }
            }
            return acc;
          }, {} as Record<string, any>),
        ),
      );
    };
  },
};

watch(
  () => props.formItems,
  (newItems) => {
    newItems.forEach(item => {
      if (item.hidden && item.key && formData.value.hasOwnProperty(item.key)) {
        delete formData.value[item.key];
      }
    });
  },
  { deep: true }
);


defineExpose({
  validate(...args) {
     return formInstance.value?.validate(...args)
  },
  resetFields() {
    return formInstance.value?.resetFields()
  },
   /**
   * 获取表单值
   * - 不传参数时，返回所有字段
   * - 传字段名数组时，返回指定字段（支持嵌套路径）
   */
 getFieldsValue(fieldNames?: string[]) {
    const values = formData.value;
    if (!fieldNames || fieldNames.length === 0) {
      return { ...values };
    }
    return fieldNames.reduce((res, field) => {
      res[field] = get(values, field); // 支持嵌套路径
      return res;
    }, {} as Record<string, any>);
  },
  // 设置表单字段值
  setFieldsValue<T extends Record<string, any>>(values: T): Promise<void> {
    Object.entries(values).forEach(([key, value]) => {
      set(formData.value, key, value);
    });
    return Promise.resolve();
  }
})
</script>

<template>
  <el-form ref="formRef" :model="formData" :rules="rules" label-width="200px">
   <el-row :gutter="10">
    <el-col v-for="item in items" :key="item.key" :span="item.span || 24">
       <el-form-item :label="item.label"  :prop="item.key">
      <slot :name="item.key">
        <ComponentItem :item="item"></ComponentItem>
      </slot>
      <!-- <component :is="getComponent(item)" v-model="formData[item.key]" v-bind="getProps(item)"></component> -->
    </el-form-item>
    </el-col>
   </el-row>
  </el-form>
</template>

