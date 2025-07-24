<template>
  <div id="map" class="mars3d-container"></div>
</template>

<script setup>
import * as mars3d from "mars3d";
import { onUnmounted, onMounted } from "vue";
const Cesium = mars3d.Cesium;
const configUrl = "config/config.json";

let map, graphicLayer; // 地图对象



const loadMap = async () => {
  let data = await mars3d.Util.fetchJson({ url: configUrl });
  // 构造地图
  map = await new mars3d.Map("map", data.map3d);
  //创建一个 GraphicLayer 图层并将其添加到 Mars3D 地图实例中
  graphicLayer = new mars3d.layer.GraphicLayer();
  await map.addLayer(graphicLayer);
};

onMounted(() => {
  loadMap();
});

onUnmounted(() => {
  if (map) {
    map.destroy();
    map = null;
  }
});
</script>

<style lang="scss" scoped>

</style>

