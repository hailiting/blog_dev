# js 严格模式有什么特点

- 1. 全局变量必须先声明
- 2. 禁止用 with
- 3. 创建 eval 作用域(有单独的作用域)
- 4. 禁止 this 指向 window （this 会变为 undefined）
- 5. 函数参数不能重名

```js
"use strict";
const obj = { x: 100, y: 300 };
with (obj) {
  console.log(x, y);
}

("use strict");
var x = 10;
eval("var x=20; console.log('in eval', x);"); // in eval 20
console.log("out eval", x); // out eval 10
```
