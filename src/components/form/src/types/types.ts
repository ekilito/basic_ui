import { RuleItem } from "./rule";
import { CSSProperties } from 'vue';

// 表单Item的配置选项
export interface FormOptions {
  // 表单项显示的类型
  type:
    | "cascader"
    | "checkbox"
    | "checkbox-group"
    | "checkbox-button"
    | "color-picker"
    | "date-picker"
    | "input"
    | "input-number"
    | "radio"
    | "radio-group"
    | "radio-button"
    | "rate"
    | "select"
    | "option"
    | "slider"
    | "switch"
    | "time-picker"
    | "time-select"
    | "transfer"
    | "upload";
  // 表单项的值
  value: any;
  // 表单项 label
  label?: string;
  // 表单项标识
  prop?: string;
  // 表单项规则
  rules?: RuleItem[];
  // 表单项占位符
  placeholder?: string
  // 透传表单属性
  attrs?: {
    clearable?: boolean
    showPassword?: boolean
    disabled?: boolean
      // css 样式
  style?: CSSProperties
  },
  // 表单项的子元素
  children?: FormOptions[]

}
