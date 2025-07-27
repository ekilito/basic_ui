export const toLine = (value: string) => {
  return value.replace(/(A-Z)g/,'-$1').toLocaleLowerCase()
}

export const validatePosition = (rule:any, value:any, callback:any) => {
  const { longitude, latitude, altitude } = value || {};
  
  if (longitude == null || latitude == null || altitude == null) {
    return callback(new Error("经度、纬度和高度不能为空"));
  }
  if (longitude < -180 || longitude > 180) {
    return callback(new Error("经度范围应在 -180 到 180 之间"));
  }
  if (latitude < -90 || latitude > 90) {
    return callback(new Error("纬度范围应在 -90 到 90 之间"));
  }
  if (altitude < 0) {
    return callback(new Error("高度不能为负数"));
  }
  callback();
};