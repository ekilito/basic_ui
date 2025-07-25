<template>
  <a-table :data="tableData" :options="options"></a-table>
</template>

<script lang="ts" setup>
import type { TableOptions } from '../../components/table/src/types';


const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const options: TableOptions[] = [
  {
    label: 'Date',
    prop: 'date',
    align: 'center'
  },
  {
    label: 'Name',
    prop: 'name',
    align: 'center'
  },
  {
    label: 'Address',
    prop: 'address',
    align: 'center'
  }
]
</script>

<style lang="scss" scoped></style>