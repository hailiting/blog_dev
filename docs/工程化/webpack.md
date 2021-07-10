# webpack

## 模块化

> 可维护 可复用 开发效率 【高内聚、低耦合】

CommonJS

```
var math = require("math");
math.add(2,3);
```

RequireJS(AMD) / Sea.js(CMD)

```
import math from "math";
math.add(2,3);
```

ES6 Module

## 作用

打包成浏览器可认识的语言
everything is module

- 拆分依赖到代码块，按需加载
- 快速初始化加载
- 所有静态资源都可当成模块
- 第三方库模块化
- 自定义模块化打包
- 适合大型项目

```
npm i webpack
webpack ./app.js app.bundle.js
```

```
entry: 配置入口资源
output: 配置编译后的资源
module: 资源处理
resolve: 配置资源别名/扩展名
plugins: 插件
```

### loader features

- 链式调用，资源通过管道 最后一个 loader 返回 javascript
- 可以同步或异步执行
- 运行在 Nodejs 无所不能
- loaders 可以接受参数，你可以在配置文件中设置 loaders
- 可以通过资源扩展名或正则表达式来匹配每个 loader 生效范围
- loaders 可以通过 npm 安装和发布
- 插件可以提供给 loaders 更多功能

```js
module: {
  rules: {
    [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
      },
      {
        test: /\.(scss|css)$/,
        exclude: [/\.krem.(scss|css)$/],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              // modules: true,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ];
  }
}
```

### 模式【mode】

```js
// 只在配置中提供mode
module.exports = {
  mode: "production",
}
// 从CLI参数中传递
webpack --mode=production
```

tips: 只设置`NODE_ENV`，则不会自动设置`mode`，
