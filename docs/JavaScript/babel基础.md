# 不可不知的 babel 基础

摘自：[知乎](https://zhuanlan.zhihu.com/p/43249121)
babel 有好多相关的名词

- babel-cli
- babel-core
- babel-runtime
- babel-node
- babel-polyfill
- ...

## 所以 babel 到底是干嘛的

可以说 Babel 是一个工具链，主要将 ES2015+的代码转换为向后兼容的 JavaScript 语法，以便运行在当前或旧的版本浏览器或其他环境中。

## 怎么用

- 1. 使用单体文件（standalone script）
- 2. 命令行（cli）
- 3. 构建工具的插件（webpack 的`babel-loader`, rollup 的`rollup-plugin-babel`）

第二种常见于`package.json`中的 scripts 段落中的某条命令，第三种直接集成到构建工具中

## 运行方式和插件

babel 总共分为三个阶段：解析，转换，生成。  
babel 本身是不具有任何转换功能的，它把转化的功能分解到一个个 plugin 里，因此当我们不配置任何插件的时候，经过 babel 的代码和输入是相同的。  
插件总共分为两种：

- 当我们添加**语法插件**后，在解析的这一步就使得 babel 能够解析更多语法（babel 内部使用的解析类库叫`babylon`，并非 babel，但 babel7 时被 babel 收入了）
- 当我们添加**转译插件**后，在转换这一步把源码转换并输出。
  比如 箭头函数`(a)=>a` 就会转化为`function(a){return a}`，完成这个工作的插件叫做`babel-plugin-transform-es2015-arrow-functions`（babel7 命名规范把`-es2015-`，`-es3-`之类的删除了， 直接变为`@babel/plugin-transform-arrow-functions`）  
  同一类语法可能同时存在语法插件版本和编译插件版本，** 如果使用了转译插件，就不能再使用语法插件 **

## 文件配置

总共两个步骤

- 将插件的名字增加到配置文件中（根目录下创建`.babelrc`或`package.json`的 babel 里，格式相同）
- 使用`npm i babel-plugin-xx`进行安装

### `preset`

preset 分为以下几种

- 官方内容：包括`env`,`react`,`flow`,`minify`等
- stage-x(babel7 已经去除)
  - stage0 - 稻草人，只是一个想法，tc39 成员提出
  - stage1 - 提案：初步试试
  - stage2 - 初稿：完成初步规范
  - stage3 - 候选
  - stage4 - 完成 stage-4 在下一年会直接放到 env，所以没有单独的 stage-4 可用
- es201x, latest （不建议使用）

### 执行顺序

很简单的几条原则

- plugin 会一下在 preset 之前
- plugin 会从前到后顺序执行
- preset 的顺序则**刚好相反**(从后向前)

### 插件和 preset 的配置项

```.babelrc
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    },]
    // "stage-2"
  ],
}
```

```.babelrc
{
  "presets": [
    ["@babel/env", {
      "targets": {
        "node": "6.10"
      }
    }]
  ]
}
```

### babel-cli

安装了`babel-cli`就能够在命令行中使用`babel`命令来编译文件
把`babel-cli`安装为`devDependencies`

### babel-node

babel7 把 babel-node 从 babel-cli 分离出来  
作用是在 node 环境中，直接运行 es2015 代码，而不需要额外进行转码  
`babel-node = babel-polyfill+babel-register`

### babel-register

babel-register 模块改写`require`命令，为她加上一个钩子，每当`require`js 模块时，就会先用 babel 进行转码

- 只会对`require`命令加载的文件转码，而不会对当前 的文件转码
- 它属于实时转码，所以只适合开发环境

### babel-polyfill

如果想在 es5-上用 es5+的语法，得用`babel-polyfill`（内部集成了`core-js`和`regenerator`）

- 常规操作是在`webpack.config.js`中将`babel-polyfill`作为第一个 entry。因此`babel-polyfill`作为 `dependencies` 而不是 `devDependencies`

#### babel-polyfill 两个缺点

- 包大，可以单独使用`core-js`的某个类库解决
- 会污染全局变量，给很多类的原型链上做修改

所以实际开发中使用`babel-plugin-transform-runtime`

### babel-plugin-transform-runtime

在未使用 babel-plugin-transform-runtime，以`async/await`为例，babel 后

```js
// babel添加一个方法，把async转化为generator
function _asyncToGenerator(fn){return function(){...}}

// 具体使用处
var _ref = _asyncToGenerator(function* (arg1, arg2){
  yield (0, something)(arg1, arg2);
})
```

也就是说，每一个被转化的文件都会包含\_asyncToGenerator，这导致重复和浪费。  
在使用了`babel-plugin-transform-runtime`后，转化后的代码会变为

```js
// 从直接定义改为引用，这样就不会重复定义了
var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");
var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// 具体使用处
var _ref = _asyncToGenerator3(function*(arg1, arg2) {
  yield (0, something)(arg1, arg2);
});
```

从定义方法改为引用，那重复定义就变为重复引用，就不存在代码重复的问题了

### babel-runtime

内部集成了：

- core-js: 转换一些内置类 (Promise, Symbols 等等) 和静态方法 (Array.from 等)。绝大部分转换是这里做的。自动引入。
- regenerator: 作为`core-js`的补漏，主要是`generator/yield`,`async/await`两组的支持，当代码有`generator/yield`,`async/await`时自动引入
- helpers 上面的`asyncToGenerator`就是，避免重复代码

### babel-loader

用到构建工具里（如：webpack、rollup），进行代码的构建和压缩(uglify),babel-loader 也是读取`.babelrc`或`package.json`里的 babel 配置

```js
// webpack
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader",
    },
  ];
}
```

如果想在这里传入 babel 的配置项，可以改为如下

```js
// loader: "babel-loader"
use: {
  loader: "babel-loader";
  options: {
    // 配置
  }
}
```

### babel-upgrade

自动化的帮助用户把 babel6 升级到 7  
用法：

```sh
npx babel-upgrade --write
```

## # babel7

babel 7 版本一般都是以`@babel`开头

```js
  "scripts": {
    "build": "babel src -d lib",
  }
  // ...
  "devDependencies": {
    "@babel/cli": "^7.10.1",
    "@babel/core": "^7.10.2",
    "@babel/plugin-transform-runtime": "^7.10.1",
    "@babel/preset-env": "^7.10.2"
  }
  ...
```

```js
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```
