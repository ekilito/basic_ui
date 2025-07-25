import * as mars3d from "mars3d";

export let map, pathGraphicLayer;
const configUrl = "config/config.json";

export let loadMap = async (id) => {
  let data = await mars3d.Util.fetchJson({ url: configUrl });
  // 构造地图
  map = await new mars3d.Map(id, data.map3d);
  pathGraphicLayer = new mars3d.layer.GraphicLayer({
    name: "轨迹图层",
  });

  await map.addLayer(pathGraphicLayer);
};

export function destroyMap() {
  if (map) {
    map.destroy();
    map = null;
    pathGraphicLayer = null;
 
  }
}