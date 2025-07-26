<template>
  <a-table
    :data="tableData"
    :options="options"
    @confirm="handleCheck"
    @cancel="handleClose"
    editIcon="Edit"
    isEditRow
    :editRowIndex="editRowIndex"
  >
    <template #dateSlot="{ row }"> {{ row.date }} slot </template>
    <template #editRow="{row}">
       <el-button size="small" type="primary" @click="handleOK(row)">确定</el-button>
      <el-button size="small"  @click="handleCancel">取消</el-button>
    </template>
    <template #action="{ row }">
      <el-button size="small" type="primary" @click="handleEditRow(row)">可编辑行</el-button>
      <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
      <el-button size="small" type="danger" @click="handleDel">删除</el-button>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TableOptions } from "../../components/table/src/types";

const tableData = ref<any>([]);

const editRowIndex = ref<string>("");

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
    editable: true,
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

const handleCheck = (row: any) => {
  console.log(row);
};

const handleClose = (row: any) => {
  console.log(row);
};

const handleEditRow = (row: any) => {
  editRowIndex.value = 'edit'
};

const handleOK = (row: any) => {

}

const handleCancel = () => {

}
</script>

<style lang="scss" scoped></style>

