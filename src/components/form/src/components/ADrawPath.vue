<template>
  <div class="path-mars3d">
    <div class="draw-path">
      <div class="add-line" @click="handleDrawLine">
        <img src="../assets/pinter.png" alt="" />
        <span>绘制轨迹</span>
      </div>
    </div>
    <!-- 坐标列表 -->
    <div class="coordinates-list" v-if="lineList.length > 0">
      <div v-for="(coord, index) in lineList" :key="index" class="coord-item">
        <div class="coord-header">
          <span>轨迹坐标 {{ index + 1 }}:</span>
        </div>
        <div class="coord-inputs">
          <el-input v-model.number="lineList[index][0]" placeholder="经度" type="number" :disabled="true" />
          <el-input v-model.number="lineList[index][1]" placeholder="纬度" type="number" :disabled="true" />
          <el-input v-model.number="lineList[index][2]" placeholder="高程" type="number" :disabled="true" />
        </div>
      </div>
    </div>
    <pathDraw @DrawPath="handleDrawPathSuccess" ref="pathDrawRef"></pathDraw>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import pathDraw from "../../../PathDraw/index.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const pathDrawRef = ref(null);
const lineList = ref([...props.modelValue]);

// 绘制轨迹
const handleDrawLine = () => {
  pathDrawRef.value?.openDialog(lineList.value);
};

const handleDrawPathSuccess = (newCoordinates) => {
  lineList.value = newCoordinates;
  pathDrawRef.value?.closeDialog();
  emit("update:modelValue", newCoordinates);
  emit("change", newCoordinates);
  // console.log('map-line:',lineList.value);
};

// 同步外部数据变化
watch(
  () => props.modelValue,
  (newVal) => {
    lineList.value = [...newVal];
  },
  { deep: true },
);
</script>

<style scoped lang="scss">
.draw-path {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  .add-line {
    display: flex;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
    }
  }
}

.coordinates-list {
  .coord-item {
    display: flex;
    margin-bottom: 16px;
    .coord-header {
      min-width: 86px;
      color: #606266;
    }
    .coord-inputs {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
  }
}
</style>

