<template>
   <m-form :options="options" label-width="120px"></m-form>
</template>

<script setup lang="ts">
import { FormOptions } from './components/form/src/types/types';

let options: FormOptions[] = [
    {
        type: 'input',
        value: '',
        label: '用户名',
        prop: 'username',
         placeholder: 'please input',
        rules: [{required: true , message: 'please input', trigger: 'blur'}]
    },
      {
        type: 'input',
        value: '',
        label: '密码',
        prop: 'password',
         placeholder: 'please input',
        rules: [{required: true , message: 'please input', trigger: 'blur'}],
        attrs: {
            showPassword: true,
        }
    },
    {
        type: 'select',
        value:'',
        label: '性别',
        placeholder: 'please select',
        prop: 'role',
        rules: [{required: true, message: 'please select must!', trigger: 'blur'}],
        children: [
            {
                type: 'option',
                label: '男',
                value: '1'
            },
            {
                type: 'option',
                label: '女',
                value: '2'
            }
        ],
       attrs: {
         style: {
            width: '90%'
        }
       }
    },
    {
        type: 'checkbox-group',
        value: [],
        prop: 'like',
        label: '多选',
        children: [
            {
                type: 'checkbox',
                label: '足球',
                value: '1'
            },
              {
                type: 'checkbox',
                label: '篮球',
                value: '2'
            }
        ],
         rules: [{required: true, message: 'please select must!', trigger: 'blur'}],
    },
     {
        type: 'radio-group',
        value: '',
        prop: '单选',
        label: '单选',
        children: [
            {
                type: 'radio',
                label: '足球',
                value: '1'
            },
              {
                type: 'radio',
                label: '篮球',
                value: '2'
            }
        ],
         rules: [{required: true, message: 'please select must!', trigger: 'blur'}],
    }
]
</script>

<style lang="scss" scoped></style>