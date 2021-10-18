# webpack 源码解析

koa2(di 框架 egg) awilix
webpack
vue|react
css next
js 基础
typescript

## webpack 优化

- 1. webpack 代码执行或压缩的时候慢，

  - 分析哪慢 speed-measure-webpack-plugin 告诉 webpack 哪里慢
  - loader 慢 cache-loader 哪里慢 加哪里
  - plugins 慢 i-版本是否是最新的
  - entry 多会直接导致 webpack 变慢 -> 使用集群编译 插 entry，按照项目维度，项目独立
  - 多核编译 webpack-parallel-uglify-plugin
  - friendly-errors-webpack-plugin 错误美化
  - set-iterm2-badge 美化 iterm
  - node-bash-title iterm 设置窗口 小标题
  - splitchunks runtime + common 包
  - devtool eval 最快

- 2. 上线后

  - webpack 排除公用包
  - webpack-dashboard 分析上线包内容，找到哪个比较大
  - webpack-bundle-analyzer -> webpack --profile --json > stats.json

- 3. 编译中

```js
// 准备两份html
// index.html -> vue.development.js
// index.html -> vue.min.js
module.exports = {
  externals: {
    jquery: "jQuery",
  },
};
```

### 集群编译

- 1 号服务器->订单 git webpack.config.js
- git 拉取
- npm run dev
- webpack --mode development

## webpack4

```js
// webpack最终生成的js函数
// webpack commonjs
(function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    // 判断缓存情况
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = (installedModules[moduleId] = {
      exports: {},
    });
    // 执行key对应的匿名函数
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    return module.exports;
  }
  return __webpack_require__("./src/index.js");
})({
  "./src/index.js": function(module, exports) {
    console.log("👮🏻：wawo wawo");
  },
});
```

```js
// webpack.config.js
module.exports = {
  optimization: {
    moduleIds: "hashed",
    // chunkIds: "hashed",
  },
};
```

## webpack5

```js
// webpack.config.js
module.exports = {
  optimization: {
    moduleIds: "deterministic",
    //  "natural" | "named" | "deterministic" | "size" | "total-size" | false
    chunkIds: "deterministic",
  },
};
```

```js
(() => {
  var __webpack_modules__ = {
    "./src/index.js": () => {
      eval(
        'console.log("e222");\nconsole.log("🍌")\n\n//# sourceURL=webpack://webpack_source_code_dome/./src/index,js?'
      );
    },
  };
  var __webpack_exports__ = {};
  __webpack_modules__["./src/index.js"]();
})();
```
