# ES6 在企业中的应用

## 前端的发展

- html4 -> xhtml1.1 -> html5 -> html -> html5.1
- css2.1 -> css3 -> css module
- js -> es3 -> es5 -> es6
- ie6 7 8 9 firefox chrome
- notepad -> frontpage -> dreamweaver -> aptama -> sublime -> vscode

## 历史

- 一：网景 Netscape 通讯公司
- 二：Mozilla 火狐
- 三：JS 之父：布兰登·莱恩

## 新特性

### 模块-现有模块

- AMD requirejs
- CMD CDS
- commonjs Nodejs 规范
- UMD 兼容
- 。。。

### 模块特色

- 静态模块
- 声明式语法

```js
import {$} from "jquery.js"; // es6
var $ = require("jquery.js")["$"]; // amd

export {$}; // es6;
export.$ = $; // amd
```

- 按需引用 vs 全局引入
- 多点暴漏 vs 全局暴漏

```js
import { each, ... } from "underscore.js";
var _ = require("underscore.js"); // amd

export {each, map, ...}; // es6
module.exports = _; // amd
```

#### 转码

- 浏览器目前还不支持 es6 模块
- SystemJS
- transpiler(转码器)，如 ES6 module transpiler, babel, Traceur
- webpack

## ES6 新特性

- 字符串
- 解构赋值
- 对象
- 数组
- 函数
- Class
- Promise

### 字符串

- 多行字符串
- 字符串插值（不能代替前端模板)
- Unicode 的支持（nodejs)

### 解构赋值

```js
// 数组的解构
var arr = [1, 2, 3, 4];
var [first, second] = arr;
// 对象的解构
var obj = { a: 1, b: 2 };
var { a, b } = obj;
// 函数参数的解构
function add([x, y]) {
  return x + y;
}
add([1, 2]);
```

### 数组 - Spread

```js
var arr1 = [1,2,3,4];
var arr2 = [...arr1]; // es6浅拷贝
var arr2 = [].concat(arr1);
var arr2 = arr1.slice(0);
min(..arr2)
```

### 函数

- 箭头函数
- rest 参数
- 默认值

```js
[1, 2, 3].map((x) => x + 1);
// 等同于
[1, 2, 3].map(
  function(x) {
    return x + 1;
  }.bind(this)
);
[1, 2, 3].filter((x) => {
  return x > 2;
});
(x,y,z)=>{***}
```

```js
function aaa(...args) {
  /// args 是真数组
  return args.join(",");
}
function aaa() {
  return [].slice.call(arguments, 0).join(",");
}

function bbb(x, y, ...args) {}
bbb(1, 2, 1, 3, 4);
```

### class

- new 构造函数
- 公有共享属性/方法
- 公有静态属性/方法
- 公有特权方法（访问私有成员）
- 公有成员
- 私有静态成员/方法
- 私有成员/方法

```js
class Child extends Parent {
  constructor() {
    super();
    this.value = 1;
  }
  get() {
    return this.value;
  }
}
```

### promise

- 思想的转变
- es6promise 创建

```js
// Promise
function async() {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(123);
    }, 1000);
  });
}
async().then(function() {
  // xxx
});

function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, time);
  });
}
// 异步调用
delay(100)
  .then(function() {
    return delay(200);
  })
  .then(function() {
    return delay(300);
  })
  .then(function() {
    return delay(400);
  })
  .then(function() {
    return delay(500);
  })
  .then(function() {
    return delay(600);
  })
  .then(function() {
    return delay(700);
  })
  .then(function() {
    console.log(2222);
  });
```

## es6 其他特性

- generators
- unicode
- module loaders
- map+set+weakmap+weakset
- proxies
- symbols
- subclassable build-ins
- math+number+string+array+objectAPIs
- binary and octal literals
- reflect api
- tail calls
