component
<script setup lang="ts">
import {
  ElForm,
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
  ElRadioButton,
  ElCheckboxButton,
  type FormInstance,
  type FormProps,
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
  reactive,
} from "vue";
import { get, omit, set } from "lodash-es";
import { type OptionItem } from "./types/types";
import AUpload from "./components/AUpload.vue";
import ATimerPicker from "./components/ATimerPicker.vue";
import ACoordinatePicker from "./components/ACoordinatePicker.vue";

// const props = defineProps(["formItems", "rules"]);
// const props = defineProps<{
//   formItems: OptionItem[];
//   rules?: Record<string, any>;
//   formConfig: Partial<FormProps> & { model?: any }
// }>();

const props = withDefaults(
  defineProps<{
    formItems: OptionItem[];
    rules?: Record<string, any>;
    formConfig?: Partial<FormProps>;
  }>(),
  {
    rules: () => ({}),
    formConfig: () => ({
      labelWidth: "120px",
      labelSuffix: ":",
    }),
  },
);

const formInstance = useTemplateRef<FormInstance>("formRef");

// 双向绑定
const formData = defineModel() as Ref<Record<string, any>>;

defineOptions({
  name: "aForm",
});

const slots = useSlots();

/**
 *
 * @param component
 * @param optionsComponent
 * 作用：处理如 select, radioGroup, checkboxGroup 这类有多个选项的控件。
 * 实现：根据传入的 options，用 h 函数渲染外层容器组件（如 ElSelect）和每个选项组件（如 ElOption）。
 * 支持 options 里每项定义 slots，灵活渲染选项插槽。
 * 支持合并传入的具名插槽。
 */
function transformOptions(component: Component, optionsComponent: Component) {
  return (props: {
    options: any[];
    fieldNames?: { label: string; value: string | number };
    slots?: Record<string, any>;
  }) => {
    const { options = [], fieldNames = { label: "label", value: "value" } } = props;

    // 处理插槽
    const processedSlots: Record<string, any> = {};

    if (props.slots) {
      Object.entries(props.slots).forEach(([slotName, slotValue]) => {
        if (typeof slotValue === "string") {
          // 如果是字符串，从父组件插槽中查找
          processedSlots[slotName] = slots[slotValue];
        } else if (typeof slotValue === "function") {
          // 如果是函数，直接使用
          processedSlots[slotName] = slotValue;
        }
      });
    }

    return h(component, props, {
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
      ...processedSlots,
    });
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
  radioGroupButton: transformOptions(ElRadioGroup, ElRadioButton),
  checkboxGroup: transformOptions(ElCheckboxGroup, ElCheckbox),
  checkboxGroupButton: transformOptions(ElCheckboxGroup, ElCheckboxButton),

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

  AUpload: AUpload,
  ATimerPicker: ATimerPicker,
  ACoordinatePicker,

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

const rootProps = ["label", "key", "type", "span", "unit", "trim", "hidden", "if", "defaultValue"];

function getProps(item: Record<string, any>) {
  // 如果表单项里存在 props 字段，说明用户手动定义了控件的全部 props，直接返回这个 props，不再继续自动处理。
  if (item.props) return item.props;
  // rootsProps 不是组件的props，不传给组件
  // return omit(item, rootProps);

  // const props = omit(item, rootProps);

  const props = {
    ...item.props, // 用户手动设置的优先生效
    ...omit(item, rootProps), // 去掉非组件属性
  };

  const dateTypeMap: Record<string, string> = {
    data: "date",
    datetime: "datetime",
    daterange: "daterange",
    datetimerange: "datetimerange",
    month: "month",
    year: "year",
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

  return props;
}

// 利用 Vue 的依赖注入机制，让子组件能通过 inject 拿到整个表单的数据，方便二次开发和扩展。
provide("formData", formData);

// 设置默认值 （只会初始化时执行一次）
props.formItems.forEach((item: any) => {
  if (item.key && item.defaultValue !== undefined && get(formData.value, item.key) === undefined) {
    set(formData.value, item.key, item.defaultValue);
  }
});

// 全局状态管理
const asyncOptionsState = reactive(
  new Map<
    string,
    {
      options: any[];
      loading: boolean;
    }
  >(),
);

const optionsCache = new Map<string, any[]>(); // 结果缓存
const optionsLoadingCache = new Map<string, boolean>(); // loading 缓存
const optionsPromiseCache = new Map<string, Promise<any[]>>(); // Promise 缓存
const optionsParamsCache = new Map<string, string>(); // 上次参数快照缓存

const resolveItem = (item: any, formData: any) => {
  const clone = { ...item };
  typeof clone.if === "function" && (clone.hidden = !clone.if(formData));
  typeof clone.disabled === "function" && (clone.disabled = clone.disabled(formData));

  if (!asyncOptionsState.has(item.key)) {
    asyncOptionsState.set(
      item.key,
      reactive({
        options: [],
        loading: false,
      }),
    );
  }

  const state = asyncOptionsState.get(item.key)!;

  // 计算依赖快照（没有 deps 时为 null）
  const paramsKey = item.deps
    ? JSON.stringify(
        item.deps.reduce((acc: any, depKey: string) => {
          acc[depKey] = formData[depKey];
          return acc;
        }, {} as Record<string, any>),
      )
    : null;

  const prevParamsKey = optionsParamsCache.get(item.key);
  const depsChanged = item.deps ? prevParamsKey !== paramsKey : false;

  if (typeof clone.options === "function") {
    if (item.deps) {
      // 只有声明 deps 且依赖变化，才清缓存
      if (depsChanged) {
        optionsCache.delete(item.key);
        optionsPromiseCache.delete(item.key);
        optionsParamsCache.set(item.key, paramsKey as any);
      }
    } else {
      // 没声明 deps 的，只执行一次（第一次没有缓存时执行）
      if (!optionsCache.has(item.key)) {
        optionsParamsCache.set(item.key, "initialized");
      }
    }
  }

  if (optionsCache.has(item.key)) {
    state.options = optionsCache.get(item.key)!;
    state.loading = false;
  } else if (typeof clone.options === "function") {
    if (optionsPromiseCache.has(item.key)) {
      state.loading = true;
      optionsPromiseCache
        .get(item.key)!
        .then((res) => {
          optionsCache.set(item.key, res);
          state.options = res;
          state.loading = false;
          optionsLoadingCache.set(item.key, false);

          const oldValue = get(formData, item.key);
          const optionValues = res.map((opt: any) => opt.value ?? opt.id ?? opt.key);
          if (oldValue != null && !optionValues.includes(oldValue)) {
            set(formData, item.key, null);
          }
        })
        .catch(() => {
          state.options = [];
          state.loading = false;
          optionsLoadingCache.set(item.key, false);
        });
    } else {
      const result = clone.options(formData);

      if (result instanceof Promise) {
        optionsLoadingCache.set(item.key, true);
        state.loading = true;

        optionsPromiseCache.set(item.key, result);

        result
          .then((res) => {
            optionsCache.set(item.key, res);
            state.options = res;
            state.loading = false;
            optionsLoadingCache.set(item.key, false);
            optionsPromiseCache.delete(item.key);

            const oldValue = get(formData, item.key);
            const optionValues = res.map((opt: any) => opt.value ?? opt.id ?? opt.key);
            if (oldValue != null && !optionValues.includes(oldValue)) {
              set(formData, item.key, null);
            }
          })
          .catch(() => {
            state.options = [];
            state.loading = false;
            optionsLoadingCache.set(item.key, false);
            optionsPromiseCache.delete(item.key);
          });
      } else {
        optionsCache.set(item.key, result);
        state.options = result;
        state.loading = false;

        const oldValue = get(formData, item.key);
        const optionValues = result.map((opt: any) => opt.value ?? opt.id ?? opt.key);
        if (oldValue != null && !optionValues.includes(oldValue)) {
          set(formData, item.key, null);
        }
      }
    }
  } else if (Array.isArray(clone.options)) {
    optionsCache.set(item.key, clone.options);
    state.options = clone.options;
    state.loading = false;
  }

  return {
    ...clone,
    options: state.options,
    loading: state.loading,
  };
};

const items = computed(() =>
  props.formItems.map((item: any) => resolveItem(item, formData.value)).filter((item: any) => !item.hidden),
);

// 缓存 & 计算处理表单项 resolveItem 支持函数写法动态计算。
// const lastOptionsCache = new Map<string, any[]>();
// const resolveItem = (item: any, formData: any) => {
//   const clone = { ...item };
//   typeof clone.if === "function" && (clone.hidden = !clone.if(formData));
//   typeof clone.disabled === "function" && (clone.disabled = clone.disabled(formData));
//   if (typeof clone.options === "function") {
//     const newOptions = clone.options(formData);
//     clone.options = newOptions;
//     // 新选项里不包含旧值时，才清空
//     const oldValue = get(formData, clone.key);
//     const optionValues = newOptions.map((opt: any) => opt.value ?? opt.id ?? opt.key);
//     // 如果旧值不在新选项中，就清空为 null
//     if (oldValue != null && !optionValues.includes(oldValue)) {
//       set(formData, clone.key, null); // 更安全
//     }
//     lastOptionsCache.set(clone.key, newOptions);
//   }
//   return clone;
// };

// const items = computed(() => props.formItems.filter((item) => !item.hidden));
// const items = computed(() =>
//   props.formItems.map((item: any) => resolveItem(item, formData.value)).filter((item: any) => !item.hidden),
// );

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
      // 表单项的配置对象
      const { item } = props;

      // 处理插槽
      const componentSlots = Object.entries(item.slots || {}).reduce((acc, [slotName, slotValue]) => {
        if (typeof slotValue === "string" && slots[slotValue]) {
          // 字符串插槽名称 -> 查找对应的插槽内容
          acc[slotName] = slots[slotValue];
        } else if (typeof slotValue === "function") {
          // 直接使用渲染函数
          acc[slotName] = slotValue;
        }
        return acc;
      }, {} as Record<string, any>);

      return h(
        // 获取表单 type 组件
        getComponent(item),
        {
          // v-model
          /**
           * 使用 modelValue 和 onUpdate:modelValue 绑定表单数据，实现类似 v-model 效果。
           * 通过 lodash 的 get 和 set，支持深层路径访问（例如 item.key 是 data.input）。
           */
          modelValue: get(formData.value, item.key),
          "onUpdate:modelValue": (value: any) => {
            if (item.trim) {
              value = value.trim();
            }
            // formData.value[item.key] = value;
            set(formData.value, item.key, value);
          },
          // 组件 props
          ...getProps(item),
          // ...reactive(getProps(item))
          loading: item.loading, // 确保传递 loading 状态

          formData: formData.value, // 透传自定义组件
        },
        componentSlots,
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
    // lastOptionsCache.clear(); // 防止缓存数据过时
  },
  { deep: true },
);

/**
 * 暴露的api方法
 */
defineExpose({
  validate(...args: any) {
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

/**
 * 合并全局 rules 和各表单项的 rules。
 * 自动根据 required 生成简单必填校验。
 */
const innerRules = computed(() => {
  const mergedRules = { ...props.rules };

  props.formItems.forEach((item: any) => {
    if (item.rules) {
      mergedRules[item.key] = item.rules;
    } else if (item.required) {
      const isSelectLike =
        ["select", "radioGroup", "checkboxGroup", "radioGroupButton", "checkboxGroupButton"].includes(item.type) ||
        item.type?.includes("picker");

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

// 过滤出 el-form-item 相关属性
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
  <el-form ref="formRef" :model="formData" :rules="innerRules" v-bind="formConfig" :validate-on-rule-change="false">
    <el-row :gutter="10">
      <el-col v-for="(item, index) in items" :key="item.key || item.type + index" :span="item.span || 24">
        <template v-if="item.type === 'title'">
          <div class="form-title">{{ item.label }}</div>
        </template>

        <template v-else>
          <el-form-item :label="item.label" :prop="item.key" v-bind="getFormItemProps(item)">
            <template #label>
              <span style="display: inline-flex; align-items: center; gap: 4px">
                <span>{{ item.label }}</span>
                <el-tooltip v-if="item.tooltip" :content="item.tooltip" placement="top" effect="dark">
                  <el-icon style="cursor: pointer">
                    <QuestionFilled />
                  </el-icon>
                </el-tooltip>
              </span>
            </template>

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
      <el-form-item>
        <slot name="action"></slot>
      </el-form-item>
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

.form-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98px;
  width: 300px;
  // color: #60d4f7;
  font-size: 16px;
  font-weight: bold;
  background: url("./assets/header.png");
  background-size: 100% 100%;
  margin: 0 auto;
}
</style>

