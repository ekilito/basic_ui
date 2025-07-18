component
<script setup lang="ts">
import {
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTransfer,
  ElTreeSelect,
  ElUpload,
  type FormInstance,
} from "element-plus";
import {
  type Component,
  computed,
  defineAsyncComponent,
  h,
  provide,
  type Ref,
  useSlots,
  useTemplateRef,
  watch,
} from "vue";
import { get, omit, set } from "lodash-es";
import { OptionItem } from "./types/types";

const props = defineProps(["formItems", "rules"]);

const formInstance = useTemplateRef<FormInstance>("formRef");

// 双向绑定
const formData = defineModel() as Ref<Record<string, any>>;

defineOptions({
  name: "BasicForm",
});

const slots = useSlots();


function transformOptions(component: Component, optionsComponent: Component) {
  return (props: {
    options: OptionItem[];
    fieldNames?: { label: string; value: string | number };
    slots?: Record<string, any>;
  }) => {
    const { options = [], fieldNames = { label: "label", value: "value" } } = props;
    return h(
      component,
      props,
      {
        default: () =>
          options.map((item) => {
            let _slots = item.slots;
            if (typeof _slots === "string") {
              _slots = slots[_slots];
            }
            return h(
              optionsComponent,
              {
                label: item[fieldNames.label],
                value: item[fieldNames.value],
              },
              _slots,
            );
          }),
        ...(props.slots ?? {}), // 显式合并具名插槽
      },
    );
  };
}

// 组件映射
const componentMap: Record<string, any> = {
  input: ElInput,
  number: ElInputNumber,
  textarea: ElInput,
  password: ElInput,

  select: transformOptions(ElSelect, ElOption),
  radioGroup: transformOptions(ElRadioGroup, ElRadio),
  checkboxGroup: transformOptions(ElCheckboxGroup, ElCheckbox),

  treeSelect: ElTreeSelect,

  date: ElDatePicker,
  datetime: ElDatePicker,
  daterange: ElDatePicker,
  datetimerange: ElDatePicker,
  month: ElDatePicker,
  year: ElDatePicker,

  switch: ElSwitch,
  slider: ElSlider,
  time: ElTimePicker,
  timeRange: ElTimePicker,

  cascader: ElCascader,
  rate: ElRate,
  color: ElColorPicker,
  transfer: ElTransfer,
  upload: ElUpload,

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

const dateTypeMap: Record<string, string> = {
  data: "date",
  datetime: "datetime",
  daterange: "daterange",
  datetimerange: "datetimerange",
  month: "month",
  year: "year",
};

const rootProps = ["label", "key", "type", "span"];

function getProps(item: Record<string, any>) {
  if (item.props) return item.props;
  // rootsProps 不是组件的props，不传给组件
  // return omit(item, rootProps);

  // const props = omit(item, rootProps);

  const props = {
    ...item.props, // 用户手动设置的优先生效
    ...omit(item, rootProps), // 去掉非组件属性
  };

  // 补充 date 类型的 type
  if (item.type && dateTypeMap[item.type]) {
    props.type = dateTypeMap[item.type];
  }

  const timeTypes = ["time", "timeRange"];
  if (timeTypes.includes(item.type)) {
    props.isRange = item.type === "timeRange";
    props.type = "time";
  }

  // textarea、password 类型处理
  if (item.type === "textarea") {
    props.type = "textarea";
  }
  if (item.type === "password") {
    props.showPassword = true;
  }

  // // ✅ 支持函数式 disabled
  // if (typeof props.disabled === "function") {
  //   props.disabled = props.disabled(formData.value);
  // }

  // // ✅ 支持函数式 options
  // if (typeof props.options === "function") {
  //   props.options = props.options(formData.value);
  // }

  return props;
}

provide("formData", formData);

// 设置默认值 （只会初始化时执行一次）
props.formItems.forEach((item) => {
  if (item.key && item.defaultValue !== undefined && get(formData.value, item.key) === undefined) {
    set(formData.value, item.key, item.defaultValue);
  }
});


const lastOptionsCache = new Map<string, any[]>();

const resolveItem = (item: any, formData: any) => {
  const clone = { ...item };

  typeof clone.if === "function" && (clone.hidden = !clone.if(formData));
  typeof clone.disabled === "function" && (clone.disabled = clone.disabled(formData));

  if (typeof clone.options === "function") {
    //const oldOptions = lastOptionsCache.get(clone.key) || [];
    const newOptions = clone.options(formData);
    clone.options = newOptions;

    // 不自动清空值
    // const changed = JSON.stringify(oldOptions) !== JSON.stringify(newOptions);
    // const needReset = changed && get(formData, clone.key) != null;

    // if (needReset) {
    //   set(formData, clone.key, undefined);
    // }
    // 新选项里不包含旧值时，才清空
    const oldValue = get(formData, clone.key);
    const optionValues = newOptions.map((opt) => opt.value ?? opt.id ?? opt.key);
    // 如果旧值不在新选项中，就清空为 null
    if (oldValue != null && !optionValues.includes(oldValue)) {
      set(formData, clone.key, null); // 更安全
    }

    lastOptionsCache.set(clone.key, newOptions);
  }

  return clone;
};

// const items = computed(() => props.formItems.filter((item) => !item.hidden));
const items = computed(() =>
  props.formItems.map((item) => resolveItem(item, formData.value)).filter((item) => !item.hidden),
);

// 组件动态渲染 支持直接传入组件
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
          modelValue: get(formData.value, item.key),
          "onUpdate:modelValue": (value: any) => {
            if (item.trim) {
              value = value.trim();
            }
            // formData.value[item.key] = value;
            set(formData.value, item.key, value);
          },
          ...getProps(item),
          // ...reactive(getProps(item))

          formData: formData.value, // 透传自定义组件
        },
        // Object.assign(
        //   item.slots || {},
        //   Object.entries(item.slots || {}).reduce((acc, [key, value]) => {
        //     if (typeof value === "string") {
        //       if (slots[value]) {
        //         acc[key] = slots[value];
        //       }
        //     }
        //     return acc;
        //   }, {} as Record<string, any>),
        // ),
        Object.entries(item.slots || {}).reduce((acc, [slotName, slotValue]) => {
          if (typeof slotValue === "string" && slots[slotValue]) {
            acc[slotName] = slots[slotValue];
          }
          return acc;
        }, {} as Record<string, any>),
      );
    };
  },
};

// 清理隐藏字段的值
// watch(
//   () => props.formItems,
//   (newItems) => {
//     newItems.forEach((item) => {
//       if (item.hidden && item.key && formData.value.hasOwnProperty(item.key)) {
//         delete formData.value[item.key];
//       }
//     });
//   },
//   { deep: true },
// );
// 监听自动删除 formData.value 中不再显示的字段对应的值（可选）
// watch(
//   items,
//   (newItems) => {
//     const visibleKeySet = new Set(newItems.map(i => i.key));
//     Object.keys(formData.value).forEach(key => {
//       if (!visibleKeySet.has(key)) {
//         delete formData.value[key];
//       }
//     });
//   }
// );

watch(
  () => formData.value,
  () => {
    // formData 变动后会自动刷新 items 和 props（因为是 computed）
    // 这里不需要额外做事，但必须加 watch 保证响应式连通性
    lastOptionsCache.clear(); // 防止缓存数据过时
  },
  { deep: true },
);

// 暴露的api方法
defineExpose({
  validate(...args) {
    return formInstance.value?.validate(...args);
  },
  resetFields() {
    return formInstance.value?.resetFields();
  },

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

  setFieldsValue<T extends Record<string, any>>(values: T): Promise<void> {
    Object.entries(values).forEach(([key, value]) => {
      set(formData.value, key, value);
    });
    return Promise.resolve();
  },

 
  validateFields(nameList?: (string | number)[]): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!formInstance.value) return reject("表单实例不存在");

      if (!nameList || nameList.length === 0) {
        formInstance.value.validate((valid, fields) => {
          valid ? resolve(formData.value) : reject(fields);
        });
      } else {
        const fieldsToValidate = nameList.map(String); // ✅ 转成 string[]
        formInstance.value.validateField(fieldsToValidate, (errorMessage) => {
          if (!errorMessage) {
            const result = fieldsToValidate.reduce((acc, key) => {
              acc[key] = get(formData.value, key);
              return acc;
            }, {} as Record<string, any>);
            resolve(result);
          } else {
            reject(errorMessage);
          }
        });
      }
    });
  },


  clearValidate(name?: string | string[]): Promise<void> {
    if (!formInstance.value) return Promise.reject("表单实例不存在");
    formInstance.value.clearValidate(name);
    return Promise.resolve();
  },
});

const innerRules = computed(() => {
  const mergedRules = { ...props.rules };

  props.formItems.forEach((item: any) => {
    if (item.rules) {
      mergedRules[item.key] = item.rules;
    } else if (item.required) {
      const isSelectLike =
        ["select", "radioGroup", "checkboxGroup"].includes(item.type) || item.type?.includes("picker");

      const actionWord = isSelectLike ? "请选择" : "请输入";

      mergedRules[item.key] = [
        {
          required: true,
          message: item.message || `${actionWord}${item.label || item.key}`,
          trigger: isSelectLike ? "change" : "blur",
        },
      ];
    }
  });

  return mergedRules;
});

function getFormItemProps(item: Record<string, any>) {
  const allowedProps = [
    "labelWidth",
    "required",
    "rules",
    "error",
    "showMessage",
    "inlineMessage",
    "size",
    "labelPosition",
    "for",
    "validateStatus",
  ];
  return Object.fromEntries(allowedProps.filter((key) => key in item).map((key) => [key, item[key]]));
}
</script>

<template>
  <el-form ref="formRef" :model="formData" :rules="innerRules" label-width="120px" label-suffix=":" :validate-on-rule-change="false">
    <el-row :gutter="10">
      <el-col v-for="(item, index) in items" :key="item.key || item.type + index" :span="item.span || 24">
        <template v-if="item.type === 'divider'">
          <div class="form-divider"></div>
        </template>

        <template v-else-if="item.type === 'title'">
          <div class="form-title">{{ item.label }}</div>
        </template>

        <template v-else-if="item.type === 'blank'">
          <div class="form-blank"></div>
        </template>

        <template v-else>
          <el-form-item :label="item.label" :prop="item.key" v-bind="getFormItemProps(item)">
            <slot :name="item.key">
              <div class="form-item">
                <ComponentItem :key="item.key" :item="item" class="component-item"></ComponentItem>
                <span v-if="item.unit" class="unit-text">{{ item.unit }}</span>
              </div>
            </slot>
            <!-- <component :is="getComponent(item)" v-model="formData[item.key]" v-bind="getProps(item)"></component> -->
          </el-form-item>
        </template>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">
.form-item {
  display: flex;
  align-items: center;
  width: 100%;

  .component-item {
    width: 100%;
  }

  .unit-text {
    width: 80px;
    margin-left: 8px;
    color: #999;
    font-size: 16px;
    white-space: nowrap;
  }
}

.form-divider {
  border-bottom: 1px solid #e0e0e0;
  margin: 16px 0;
  width: 100%;
}

.form-title {
  font-weight: 600;
  font-size: 18px;
  padding: 8px 0;
  color: #333;
  margin-left: 10px;
}

.form-blank {
  height: 24px; /* 空白高度，自己调 */
}
</style>

