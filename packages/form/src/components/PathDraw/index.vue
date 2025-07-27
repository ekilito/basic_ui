<script setup>
import { nextTick, ref } from "vue";
import { loadMap, pathGraphicLayer , destroyMap} from "./map";
import * as mars3d from "mars3d";
import { ElMessage } from "element-plus";

let dialogVisible = ref(false);
let curGraphicPath = null;

const emits = defineEmits(["DrawPath"]);

const openDialog = async (positions = [], equip = null) => {
  destroyMap()
  dialogVisible.value = true;
  await nextTick(async () => {
    await loadMap("path-draw-map");
    pathGraphicLayer.bindContextMenu([
      {
        text: "删除轨迹",
        callback: (e) => {
          e.graphic.remove();
        },
      },
    ]);
    drawCreated();
    if (positions.length > 0) {
      pathGraphicLayer.addGraphic({
        type: "polyline",
        positions: positions,
        style: {
          width: 4,
          color: "red",
          opacity: 0.7,
          clampToGround: true,
          visibleDepth: false,
          distanceDisplayCondition: true,
          label: {
            pixelOffsetY: -20,
            pixelSize: 10,
            color: "#fff",
            outline: true,
            clampToGround: true,
            visibleDepth: false,
          },
        },
      });
    }
  });
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const drawCreated = () => {
  // 监听装备绘制完成事件
  pathGraphicLayer.on(mars3d.EventType.drawCreated, function (event) {
    let graphic = event.graphic;
  });
};

const handleDrawPath = () => {
  pathGraphicLayer.clear();
  pathGraphicLayer.startDraw({
    type: "polyline",
    style: {
      width: 4,
      color: "red",
      opacity: 0.7,
      clampToGround: true,
      visibleDepth: false,
      distanceDisplayCondition: true,
      label: {
        pixelOffsetY: -20,
        pixelSize: 10,
        color: "#fff",
        outline: true,
        clampToGround: true,
        visibleDepth: false,
      },
    },
    success: function (graphic) {
      curGraphicPath = graphic;
    },
  });
};

const handleSave = () => {
  if (curGraphicPath) {
    let { positions } = curGraphicPath.toJSON();
    emits("DrawPath", positions);
  } else {
    if (pathGraphicLayer.graphics.length) {
      emits("DrawPath", pathGraphicLayer.graphics[0].options.positions);
    } else {
      ElMessage({
        message: "请绘制区域",
        type: "warning",
      });
    }
  }
};

defineExpose({
  openDialog,
  closeDialog,
});
</script>

<template>
  <el-dialog v-model="dialogVisible" width="70%" title="绘制轨迹">
    <div id="path-draw-map"></div>
    <div class="draw-btn" @click="handleDrawPath">
      <span>绘制轨迹</span>
    </div>
    <el-button type="primary" @click="handleSave" class="confirm-button">保存</el-button>
  </el-dialog>
</template>

<style lang="scss" scoped>
#path-draw-map {
  height: 600px;
}

.draw-btn {
  position: absolute;
  width: 160px;
  height: 40px;
  top: 80px;
  right: 20px;
  z-index: 2;
  cursor: pointer;
  background: url("../../assets/title.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: #fff;
    font-size: 16px;
  }
}

.confirm-button {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
