<template>
  <a-table :data="tableData" :options="options" elementLoadingText="加载中...">
    <template #dateSlot="{ row }">
      {{ row.date }}
    </template>
    <template #action="{ row }">
      <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
      <el-button size="small" type="danger" @click="handleDel">删除</el-button>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TableOptions } from "../../components/table/src/types";

const tableData = ref<any>([]);

setTimeout(() => {
  tableData.value = [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ];
}, 3000);

// const tableData = [
//   {
//     date: '2016-05-03',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-02',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-04',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     date: '2016-05-01',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   }
// ]

const options: TableOptions[] = [
  {
    label: "Date",
    prop: "date",
    align: "center",
    slot: "dateSlot",
  },
  {
    label: "Name",
    prop: "name",
    align: "center",
  },
  {
    label: "Address",
    prop: "address",
    align: "center",
  },
  {
    label: "操作",
    align: "center",
    action: true,
  },
];

const handleEdit = (row: any) => {
  console.log(row);
};

const handleDel = () => {};
</script>

<style lang="scss" scoped></style>
