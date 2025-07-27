const path = require("path");
const { defineConfig, build } = require("vite");
const vue = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");

// 打包入口
const entryDir = path.resolve(__dirname, "../packages");
// 出口
const outDir = path.resolve(__dirname, "../lib");

// vite 配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
});

// rollup配置
const rollOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "vue",
    },
  },
};

// 全量打包构建
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, "index.ts"),
        name: "aura-ui",
        fileName: "aura-ui",
        formats: ["es", "umd"],
      },
    },
  });
};

// 打包成库
const buildLib = async()=> {
  await buildAll()
}

buildLib()