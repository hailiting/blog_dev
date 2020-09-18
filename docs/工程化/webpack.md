# webpack

## 模块化

> 可维护
> 可复用
> 开发效率
> 【高内聚、低耦合】

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

- Split the dependency tree into chunks loaded on demand (拆分依赖到代码块，按需加载)
- keep initial loading time low (快速初始化加载)
- Every static asset should be able to be a module (所有静态资源都可当成模块)
- Ability to integrate 3rd-party libraries as modules(第三方库模块化)
- Ability to customize nearly every part of the module bundler(自定义模块化打包)
- Suited for big project(适合大型项目)

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

- Loaders can be chained. They are applied in a pipeline to the resource. The final loader is expected to return JavaScript: each other loader can return source in arbitrary format. which is passed to the next loader. (链式调用，资源通过管道 最后一个 loader 返回 javascript)
- Loaders can be synchronous or asynchronous. (可以同步或异步执行)
- Loaders run in Node.js and can do everything that's possible there. (运行在 Nodejs 无所不能)
- Loaders accept query parameters. This can be used to pass conofiguration to the loader. (loaders 可以接受参数，你可以在配置文件中设置 loaders)
- Loaders can be bound to extensions / RegExps in the configuration. (可以通过资源扩展名或正则表达式来匹配每个 loader 生效范围)
- Loaders can be published /install through npm.(loaders 可以通过 npm 安装和发布)
- Plugins can give loaders more feature.（插件可以提供给 loaders 更多功能）
  24：00
