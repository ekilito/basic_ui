import {h,reactive,ref} from 'vue'
import basicForm from '../components/basicForm/index.vue'

export const useBasicForm = (props) => {

  const formRef = ref()

  const Component = (_, {slots}) => {
    return h(basicForm, {...reactive(props) , ref: formRef } , slots)
  }

  return {
    basicForm: Component,
    validate() {
      return formRef.value?.validate()
    },
    resetFields() {
      return formRef.value?.resetFields()
    },
  }
}