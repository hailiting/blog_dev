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
