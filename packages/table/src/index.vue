<template>
  <el-table
    :data="tableData"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    :element-loading-background="elementLoadingBackground"
    :element-loading-custom-class="elementLoadingCustomClass"
    @row-click="rowClick"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
          </template>
          <template v-else>
            <template v-if="scope.$index + scope.column.id === currentEdit">
              <div class="edit-box">
                <el-input size="small" v-model="scope.row[item.prop!]"></el-input>
                <div @click="handleEditCell">
                  <slot name="editCell" v-if="$slots.editCell" v-bind="scope"></slot>
                  <div class="action-icons" v-else>
                    <el-icon class="action-icons-check" @click.stop="checkClick(scope)"><CircleCheck /></el-icon>
                    <el-icon class="action-icons-close" @click.stop="closeClick(scope)"><CircleClose /></el-icon>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <slot v-if="item.slot" :name="item.slot" v-bind="scope"></slot>
              <slot v-else>{{ scope.row[item.prop!] }}</slot>
              <!-- <el-icon v-if="item.editable" class="edit-icon" @click="clickEdit(scope)"><Edit /></el-icon> -->
              <component
                :is="editIcon"
                v-if="item.editable"
                class="edit-icon"
                @click.stop="clickEdit(scope)"
              ></component>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column :label="actionOptions!.label" :align="actionOptions!.align" :width="actionOptions!.width">
      <template #default="scope">
        <slot name="editRow" v-if="scope.row.rowEdit" v-bind="scope"></slot>
        <slot name="action" v-bind="scope" v-else></slot>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination" v-if="pagination" :style="{ justifyContent: paginationAlignJustify }">
    <el-pagination
      v-model:current-page="localCurrentPage"
      v-model:page-size="localPageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch, type PropType } from "vue";
import type { TableOptions } from "./types";
import { cloneDeep } from "lodash-es";

const props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // loading
  elementLoadingText: {
    type: String,
  },
  elementLoadingSpinner: {
    type: String,
  },
  elementLoadingBackground: {
    type: String,
  },
  elementLoadingSvg: {
    type: String,
  },
  elementLoadingSvgViewBox: {
    type: String,
  },
  elementLoadingCustomClass: {
    type: String,
  },
  // 可编辑单元格显示的图标
  editIcon: {
    type: String,
    default: "Edit",
  },
  // 是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false,
  },
  // 编辑行按钮的标识
  editRowIndex: {
    type: String,
    default: "",
  },
  // 分页数据
  pagination: {
    type: Boolean,
    default: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSizes: {
    type: Array as PropType<Number[]>,
    default: [10, 20, 30, 40],
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
  },
  paginationAlign: {
    type: String as PropType<"left" | "center" | "right">,
    default: "right",
  },
});

// 过滤操作选项
const tableOptions = computed(() => props.options.filter((item) => !item.action));

// 找出操作项配置
const actionOptions = computed(() => props.options.find((item) => item.action));

// 表格是否在加载中
const isLoading = computed(() => !props.data || !props.data.length);

const paginationAlignJustify = computed(() => {
  if (props.paginationAlign === "left") return "flex-start";
  else if (props.paginationAlign === "center") return "center";
  else return "flex-end";
});

const emits = defineEmits(["confirm", "cancel", "update:editRowIndex", "pageSizeChange", "currentPageChange"]);

// 当前点击的单元格
const currentEdit = ref<string>("");

const tableData = ref<any[]>(cloneDeep(props.data));
const cloneEditRowIndex = ref<string>(props.editRowIndex);

const localCurrentPage = ref(props.currentPage);
const localPageSize = ref(props.pageSize);

const rowClick = (row: any, column: any) => {
  // 判断点击是否操作项
  if (column.label === actionOptions.value!.label) {
    // 编辑行的操作
    if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex && props.editRowIndex) {
      // 可编辑的操作
      row.rowEdit = !row.rowEdit;
      // 重置其它数据的 rowEdit
      tableData.value.map((item) => {
        if (item !== row) item.rowEdit = false;
      });
      // 重置按钮的标识
      if (!row.rowEdit) emits("update:editRowIndex", "");
    }
  }
};

const clickEdit = (scope: any) => {
  currentEdit.value = scope.$index + scope.column.id; // 唯一标识
};

const checkClick = (scope: any) => {
  currentEdit.value = "";
  emits("confirm", scope.row);
};

const closeClick = (scope: any) => {
  currentEdit.value = "";
  emits("cancel", scope.row);
};

const handleEditCell = () => {};

// 分页
const handleSizeChange = (val: number) => {
  localPageSize.value = val;
  emits("pageSizeChange", val);
};

const handleCurrentChange = (val: number) => {
  localCurrentPage.value = val;
  emits("currentPageChange", val);
};

// 监听父组件传递的data数据
watch(
  () => props.data,
  (val) => {
    tableData.value = cloneDeep(val);
    tableData.value.map((item) => {
      item.rowEdit = false;
    });
  },
  { deep: true },
);

// 监听父组件传递的标识
watch(
  () => props.editRowIndex,
  (val) => {
    if (val) cloneEditRowIndex.value = val;
  },
);

watch(
  () => props.currentPage,
  (val) => {
    localCurrentPage.value = val;
  },
);
watch(
  () => props.pageSize,
  (val) => {
    localPageSize.value = val;
  },
);

onMounted(() => {
  tableData.value.map((item) => {
    // 代表当前是否是可编辑的状态
    item.rowEdit = false;
  });
});
</script>

<style lang="scss" scoped>
.edit-icon {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  left: 4px;
  cursor: pointer;
  color: green;
}

.edit-box {
  display: flex;
  align-items: center;
}

.action-icons {
  display: flex;
  margin-left: 6px;

  &-check {
    color: green;
    cursor: pointer;
    margin-right: 6px;
  }
  &-close {
    color: red;
    cursor: pointer;
  }
}

.pagination {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
</style>

