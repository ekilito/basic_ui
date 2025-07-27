const path = require("path");
const { defineConfig, build } = require("vite");
const vue = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");
const fsExtra = require('fs-extra')
const fs = require('fs')

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
const rollupOptions = {
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
       outDir: path.resolve(__dirname, "../lib"), 
    },
  });
};

// 单组件打包构建
const  buildSingle = async (name) => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, name),
        name: 'index',
        formats: ['es', 'umd'],
        fileName: (format) => `index.${format}.js`
      },
      outDir: path.resolve(outDir, name)
    }
  })
}

// 每个组件单独生成 package.json
const createPackageJson = (name) => {
  const fileStr = `
  {
   "name": "${name}",
   "main": "index.umd.js",
   "module": "index.es.js",
   "style": "aura-ui.css"
  }`
fsExtra.outputFile(
  path.resolve(outDir, `${name}/package.json`),
  fileStr,
  'utf-8'
)
}

// 打包成库
const buildLib = async()=> {
  await buildAll()

  // 获取组件名称组成的数据
  const components = fs.readdirSync(entryDir).filter(name => {
    const componentDir = path.resolve(entryDir, name)
    const isDir = fs.lstatSync(componentDir).isDirectory()
    return isDir && fs.readdirSync(componentDir).includes('index.ts')
  })

  // 循环构建
  for(const name of components) {
    await buildSingle(name)
    createPackageJson(name)
  }
}

buildLib()