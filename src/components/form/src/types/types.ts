import {type RuleItem } from "./rule";
import {type CSSProperties } from 'vue';


export interface OptionItem {
  type?:
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
    | "divider"
    | "title"
    | "blank"
    | undefined;

  label?: string;
  key?: string;
  labelWidth?: number | string;
  rules?: RuleItem[];
  required?: boolean;
  slots?: any
  options?: any
  unit?: string;
  trim?: boolean;
  hidden?: boolean;
  span?: number;
  fieldNames?: {
    label?: string;
    value?: string | number;
    [key: string]: any;
  };
  defaultValue?: string | number | null;
  if?: boolean | ((formData: Record<string, any>) => boolean);
  disabled?: boolean | ((formData: Record<string, any>) => boolean);
  placeholder?: string;
  style?: CSSProperties;
  [key: string]: any;
}


