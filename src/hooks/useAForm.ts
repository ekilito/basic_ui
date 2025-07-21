import { h, reactive, ref } from "vue";
import aForm from "../components/form/src/index.vue";

// props
export const useAForm = (initialProps: Record<string, any>) => {
  const formRef = ref();
  
  const reactiveProps = reactive({ ...initialProps }); // ✅ reactive props

  const Component = (_, { slots }) => {
    return h(aForm, { ...reactiveProps, ref: formRef }, slots);
  };

  return {
    aForm: Component,
    validate() {
      return formRef.value?.validate();
    },
    resetFields() {
      return formRef.value?.resetFields();
    },
    getFieldsValue: (fieldNames?: string[]) => {
      return formRef.value?.getFieldsValue?.(fieldNames);
    },
    setFieldsValue: async <T extends Record<string, any>>(values: T): Promise<void> => {
      return formRef.value?.setFieldsValue?.(values);
    },
    validateFields: (nameList?: (string | number)[]): Promise<any> => {
      return formRef.value?.validateFields?.(nameList);
    },
    clearValidate: async (name?: string | string[]) => {
      return formRef.value?.clearValidate?.(name);
    },
    setProps: async (newProps: Partial<typeof reactiveProps>) => {
      Object.assign(reactiveProps, newProps);
    }
  };
};
