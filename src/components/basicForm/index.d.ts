import { Component } from 'vue';

export interface FormItem {
  label: string;
  key: string;
  type: string | Component;
  [key: string]: any;
}

export interface OptionItem {
  label: string;
  value: string;
  slots?: string | (() => any);
}