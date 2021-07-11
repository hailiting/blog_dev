# rollup 配置

## 介绍

rollup 是一个 JavaScript 模块化打包器，可以将小块代码编译成大块复杂代码，例如 library 或 应用程序。

## 实例

`./scripts/clearTrash.js`

```js
var fs = require("fs");
var path = require("path");
function deleteDir(url) {
  var files = [];
  if (fs.existsSync(url)) {
    files = fs.readdirSync(url);
    files.forEach(function(file) {
      var curPath = path.join(url, file);
      if (fs.statSync(curPath).isDirectory()) {
        deleteDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(url);
  } else {
    console.log("给定的路径不存在！");
  }
}
deleteDir(path.resolve("./lib/trash"));
```

`./scripts/constants.js`

```js
// 默认的外部引用库
const defaultExternalArr = [
  "react",
  "react-dom",
  "antd",
  "lodash",
  "rc-calendar",
  "moment",
  "rc-notification",
  "classnames",
];

// 补充外部引用文件
const extraExternalArr = ["antd/lib/style/index.css"];

// 在搜索components目录时需要排除的文件名
const searchExclude = ["__test__", "index.mdx", ".DS_Store"];

module.exports = {
  defaultExternalArr,
  extraExternalArr,
  searchExclude,
};
```

`./scripts/rollup.config.lib.js`

```js
const commonjs = require("rollup-plugin-commonjs");
const typescript = require("rollup-plugin-typescript2");
const resolve = require("rollup-plugin-node-resolve");
const json = require("rollup-plugin-json");
const tsImportPluginFactory = require("ts-import-plugin");
const postcss = require("rollup-plugin-postcss");
const generateModuleMap = require("./helpers").generateModuleMap;
const searchStyleImportDeep = require("./helpers").searchStyleImportDeep;
const defaultExternalArr = require("./constants").defaultExternalArr;
const extraExternalArr = require("./constants").extraExternalArr;
const image = require("rollup-plugin-img");
const path = require("path");

const tsImportPlugin = tsImportPluginFactory({
  libraryDirectory: "es",
  libraryName: "antd",
  style: true,
});

// 找出每一个组件引用过的ant样式
let externalStyle = [];
searchStyleImportDeep(path.resolve("src/components"), externalStyle);
externalStyle = Array.from(new Set(externalStyle));

export default {
  input: generateModuleMap(),
  external: defaultExternalArr.concat(extraExternalArr).concat(externalStyle),
  output: {
    dir: "lib",
    entryFileNames: "[name]/index.js",
    chunkFileNames: "common/[name].js",
    experimentalOptimizeChunks: true,
    chunkGroupingSize: 50000,
    format: "es",
  },
  plugins: [
    resolve(),
    commonjs({
      include: "node_modules/**",
    }),
    json(),
    typescript({
      typescript: require("typescript"),
      tsconfig: "tsconfig.build.json",
      transformers: () => ({
        before: [tsImportPlugin],
      }),
    }),
    postcss({
      extract: "lib/trash/style.css",
      use: [["less", { javascriptEnabled: true }]],
      plugins: [],
    }),
    image({
      output: `lib/images`,
      extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      limit: 8192,
      exclude: "node_modules/**",
    }),
  ],
};
```

`package.json`

```json
{
  "scripts": {
    "start": "NODE_ENV=development webpack-dev-server --config ./webpack.config.js --mode development",
    "compile": "npm run compile_bundle && npm run compile_lib",
    "compile_bundle": "NODE_ENV=build rollup --config ./scripts/rollup.config.bundle.js",
    "compile_lib": "npm run compile_js_file_to_lib && npm run compile_css_file_to_lib && node scripts/clearTrash.js",
    "compile_js_file_to_lib": "NODE_ENV=build rollup --config ./scripts/rollup.config.lib.js",
    "compile_css_file_to_lib": "NODE_ENV=build node ./scripts/rollup_Build_CSS_file.js",
    "test": "jest",
    "test:xunit": "JEST_JUNIT_CLASSNAME=\"{filename}\" jest --ci --testResultsProcessor=jest-junit"
  }
}
```
