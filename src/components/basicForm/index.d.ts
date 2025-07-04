import { Component } from 'vue';

export interface FormItem {
  label: string;
  key: string;
  type: string | Component;
  [key: string]: any;
}