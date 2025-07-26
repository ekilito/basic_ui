<template>
  <a-table
    v-bind="$attrs"
    :data="tableData"
    :options="options"
    @confirm="handleCheck"
    @cancel="handleClose"
    editIcon="Edit"
    isEditRow
    v-model:editRowIndex="editRowIndex"
    :total="total"
    @pageSizeChange="pageSizeChange"
    @currentPageChange="currentPageChange"
  >
    <template #dateSlot="{ row }"> {{ row.name }} slot </template>
    <template #editRow="{ row }">
      <el-button size="small" type="primary" @click="handleOK(row)">确定</el-button>
      <el-button size="small" @click="handleCancel">取消</el-button>
    </template>
    <template #action="{ row }">
      <el-button size="small" type="primary" @click="handleEditRow">可编辑行</el-button>
      <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
      <el-button size="small" type="danger" @click="handleDel">删除</el-button>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { TableOptions } from "../../components/table/src/types";
import axios from "axios";

const tableData = ref<any>([]);

// 分页数据
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);

// 编辑行标志符
const editRowIndex = ref<string>("");

const options: TableOptions[] = [
  {
    label: "Name",
    prop: "name",
    align: "center",
    slot: "dateSlot",
  },
  {
    label: "Email",
    prop: "email",
    align: "center",
  },
  {
    label: "Gender",
    prop: "gender",
    align: "center",
    editable: true,
  },
  {
    label: "Status",
    prop: "status",
    align: "center",
  },
  {
    label: "操作",
    align: "center",
    action: true,
  },
];

const handleEdit = (row: any) => {
  console.log("编辑", row);
};

const handleDel = () => {
  console.log("删除");
};

const handleCheck = (row: any) => {
  console.log("可编辑单元格 ok", row);
};

const handleClose = (row: any) => {
  console.log("可编辑单元格 close", row);
};

const handleEditRow = () => {
  editRowIndex.value = "edit";
};

const handleOK = (row: any) => {
  console.log("可编辑行 确定", row);
};

const handleCancel = () => {
  console.log("可编辑行 取消");
};

// 分页
const pageSizeChange = (val: number) => {
  console.log("pageSizeChange", val);
  pageSize.value = val;
  getTableData();
};

const currentPageChange = (val: number) => {
  console.log("currentPageChange", val);
  currentPage.value = val;
  getTableData();
};

const getTableData = async () => {
  const res = await axios.get("https://gorest.co.in/public/v2/users", {
    params: { page: currentPage.value, per_page: pageSize.value },
  });
  total.value = res.data.length + 48;
  tableData.value = res.data;
};

onMounted(() => {
  getTableData();
});
</script>

<style lang="scss" scoped></style>

