<template>
  <div class="coordinatePicker-item">
    <el-input-number
      :disabled="disabled"
      :model-value="currentCoordinates[0]"
      @update:model-value="handleInput(0, $event)"
      :controls="false"
      :precision="6"
      :placeholder="fieldLabels[0]"
      style="width: 100%"
    />
    <el-input-number
      :disabled="disabled"
      :model-value="currentCoordinates[1]"
      @update:model-value="handleInput(1, $event)"
      :controls="false"
      :precision="6"
      :placeholder="fieldLabels[1]"
      style="width: 100%"
    />
    <el-input-number
      :disabled="disabled"
      :model-value="currentCoordinates[2]"
      @update:model-value="handleInput(2, $event)"
      :controls="false"
      :precision="6"
      :placeholder="fieldLabels[2]"
      style="width: 100%"
    />
    <div class="positioning-icon" @click="handlePosition"></div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [Object, null],
    default: null,
    validator: (value) => {
      if (value === null) return true;
      const keys = Object.keys(value);
      return keys.length === 3 && keys.every((key) => value[key] === null || typeof value[key] === "number");
    },
  },
  disabled: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

// 获取当前字段名数组
const fieldKeys = computed(() => {
  return props.modelValue === null ? ["longitude", "latitude", "altitude"] : Object.keys(props.modelValue);
});

// 生成显示标签
const fieldLabels = computed(() => {
  return fieldKeys.value.map((key) => {
    if (key.toLowerCase().includes("longitude")) return "经度";
    if (key.toLowerCase().includes("latitude")) return "纬度";
    if (key.toLowerCase().includes("altitude")) return "高度";
    return key; // 默认显示原始字段名
  });
});

// 当前坐标值（数组形式，保持顺序）
const currentCoordinates = computed(() => {
  if (props.modelValue === null) return [null, null, null];
  return fieldKeys.value.map((key) => props.modelValue[key]);
});

// 处理输入变化
const handleInput = (index, value) => {
  const newCoordinates = [...currentCoordinates.value];
  newCoordinates[index] = value;

  // 构建返回对象
  const newValue =
    props.modelValue === null
      ? {
          longitude: newCoordinates[0],
          latitude: newCoordinates[1],
          altitude: newCoordinates[2],
        }
      : Object.fromEntries(fieldKeys.value.map((key, i) => [key, newCoordinates[i]]));

  emit("update:modelValue", newValue);
  emit("change", newValue);
};

// 处理定位点击
const handlePosition = () => {
  // 模拟获取坐标数据
  const newValues = [
    116.404 + (Math.random() - 0.5) * 0.01, // 经度值
    39.915 + (Math.random() - 0.5) * 0.01, // 纬度值
    50 + Math.random() * 10, // 高度值
  ];

  // 构建返回对象
  const newValue =
    props.modelValue === null
      ? {
          longitude: newValues[0],
          latitude: newValues[1],
          altitude: newValues[2],
        }
      : Object.fromEntries(fieldKeys.value.map((key, index) => [key, newValues[index]]));

  emit("update:modelValue", newValue);
  emit("change", newValue);
};
</script>

<style lang="scss" scoped>
.coordinatePicker-item {
  width: 95%;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  .positioning-icon {
    content: "";
    position: absolute;
    right: -33px;
    top: 50%;
    width: 24px;
    height: 24px;
    background-image: url("../assets/pinter.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.8;
      transform: translateY(-50%) scale(1.05);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }
  }
}
</style>
