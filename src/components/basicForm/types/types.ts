import { RuleItem } from "./rule";

export interface OptionItem {
  type:
    | "input"
    | "number"
    | "textarea"
    | "password"
    | "select"
    | "radioGroup"
    | "checkboxGroup"
    | "treeSelect"
    | "date"
    | "datetime"
    | "daterange"
    | "datetimerange"
    | "month"
    | "year"
    | "switch"
    | "slider"
    | "time"
    | "timeRange"
    | "cascader"
    | "rate"
    | "color"
    | "transfer"
    | "upload"

    // | "checkbox"
    // | "checkbox-group"
    // | "checkbox-button"
    // | "color-picker"
    // | "date-picker"
    // | "radio"
    // | "radio-group"
    // | "radio-button"
    // | "time-picker"
    // | "time-select";

  label?: string;
  key?: string;
  labelWidth?: number | string
  rules?: RuleItem[];
  required?: boolean;
  slots?: string | (() => any);
  options?: any
  unit?: string
  trim?: boolean
  hidden?: boolean
  span?: number;
  fieldNames?: Object
  defaultValue?: number | string
  if?: boolean | Function
  disabled?: boolean | Function
   placeholder?: string;
  [key: string]: any
}



 
  // 透传表单属性
//   attrs?: {
//     clearable?: boolean;
//     showPassword?: boolean;
//     disabled?: boolean;
//     style?: CSSProperties;
//   };
  
   // 处理上传组件的方法和属性
//   uploadAttrs?: {
//     action: string;
//     headers?: object;
//     method?: "post" | "put" | "patch";
//     multiple?: boolean;
//     data?: any;
//     name?: string;
//     withCredentials?: boolean;
//     showFileList?: boolean;
//     drag?: boolean;
//     accept?: string;
//     crossorigin?: "" | "anonymous" | "use-credentials";
//     fileList?: any[];
//     listType?: "text" | "picture" | "picture-card";
//     autoUpload?: boolean;
//     disabled?: boolean;
//     limit?: number;
//   };
// }

