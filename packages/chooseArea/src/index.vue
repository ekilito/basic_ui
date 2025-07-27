<template>
  <div class="choose-area-page">
    <el-select clearable placeholder="请选择省份：" v-model="province">
      <el-option v-for="item in areas" :key="item.code" :value="item.code" :label="item.name"></el-option>
    </el-select>
    <el-select clearable :disabled="!province" placeholder="请选择城市：" v-model="city" class="city">
      <el-option v-for="item in selectCity" :key="item.code" :value="item.code" :label="item.name"></el-option>
    </el-select>
    <el-select clearable :disabled="!province || !city" placeholder="请选择区域：" v-model="area">
      <el-option v-for="item in selectArea" :key="item.code" :value="item.code" :label="item.name"></el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import allAreas from "../lib/pca-code.json";

export interface AreaItem {
  name: string;
  code: string;
  children?: AreaItem[];
}

export interface Data {
  name: string;
  code: string;
}

const province = ref<string>("");

const city = ref<string>("");

const area = ref<string>("");

const areas = ref(allAreas);

const selectCity = ref<AreaItem[]>([]);

const selectArea = ref<AreaItem[]>([]);

// 分发事件
const emits = defineEmits(["change"]);

watch(
  () => province.value,
  (val) => {
    if (val) {
      selectCity.value = areas.value.find((item) => item.code === province.value)!.children;
    }
    city.value = "";
    area.value = "";
  },
);

watch(
  () => city.value,
  (val) => {
    if (val) {
      selectArea.value = selectCity.value.find((item) => item.code === city.value)!.children!;
    }
    area.value = "";
  },
);

watch(
  () => area.value,
  (val) => {
    if(val) {
       let provinceData: Data = {
      code: province.value,
      name: province.value && allAreas.find((item) => item.code === province.value)!.name,
    };
    let cityData: Data = {
      code: city.value,
      name: city.value && selectCity.value.find((item) => item.code === city.value)!.name,
    };
    let areaData: Data = { code: val, name: val && selectArea.value.find((item) => item.code === val)!.name };

    emits("change", {
      province: provinceData,
      city: cityData,
      area: areaData,
    });
    }
  },
);
</script>

<style scoped lang="scss">
.choose-area-page {
  width: 50%;
  display: flex;

  .city {
    margin: 0 20px;
  }
}
</style>
