# ES5 严格模式 `"use strict";`

- ECMAScript 5 的严格模式是采用具有限制性 JavaScript 变体的一种方式，从而使代码显示地脱离`马虎、稀松、懒散模式`。
- 严格模式对正常 JavaScript 语义做了一些更改
  - 1. 严格模式通过抛出错误来消除原有的静默错误
  - 2. 严格模式修复一些导致 JavaScript 引擎难以执行优化的缺陷，有时候，相同的代码，严格模式比非严格模式运行的更快
  - 3. 严格模式禁用了在 ES 未来可能会定义的一些语法

```js
function strict() {
  // 函数级别严格模式语法
  "use strict";
  function nested() {
    return "And so am I!";
  }
  return "Hi!  I'm a strict mode function!  " + nested();
}

function notStrict() {
  return "I'm not strict.";
}
```

## 将过失错误转为异常的几个情况

- 一，严格模式下无法再意外的创建全局变量

```js
"use strict";
mistypedVaraible = 17; // 未声明
```

- 二，严格模式会使引起静默失败的赋值操作抛出异常【例如：给 NaN 赋值会抛出异常】

```js
"use strict";
var obj1 = {};
Object.defineProperty(obj1, "x", {
  value: 42,
  writable: false, // 值不可修改
});
obj1.x = 9; // TypeError 给不可写属性赋值

// 给只读属性赋值
var obj2 = {
  get x() {
    return 17;
  },
};
obj2.x = 5; // TypeError

// 给不可扩展对象的新属性赋值
var fixed = {};
Object.preventExtensions(fixed); // 将对象标记为不可再扩展
fixed.newProp = "ohai"; // TypeError
```

- 三，删除不可删除的属性会抛出异常

```js
"use strice";
delete Object.prototype; // TypeError
```

- 四，对象内属性名【在 es6 不存在】

```js
"use strice";
var o = {
  p: 1,
  p: 2,
};
```

- 五，要求函数参数唯一

```js
function sum(a, a, c) {
  // !!! 语法错误
  "use stract";
  return a + a + c; // 代码运行到这会出错
}
```

- 六，禁止八进制数字语法【es 不包含八进制语法】

```js
var a = 0o10; // es6
// !!! 语法错误
var sum =
  015 + // !!! 语法错误
  197 +
  142;
```

- 七，禁止设置`primitive`值的属性

```js
(function () {
  "use strict";
  false.true = ""; // TypeError
  (13).sailing = "home"; // TypeError
  "with".you = "far away"; // TypeError
})();
```

## 简化变量的使用

严格模式简化了代码中变量名字映射到变量定义的方式。

- 严格模式禁用`with`【作用域的变量在代码运行之前无法得知，只能在运行时决定】

```js
"use strict";
var x = 17;
with (obj) {
  x; // with中的x指向with上面的x，还是obj.x？只有运行时才能确定，引擎无法优化，速度会变慢
}
```

- `eval`不在为上层范围引入新变量
- `eval(string)`,string 为 JavaScript 表达式或要执行的函数式语句

```js
var x = 17;
var evalX = eval("'use strict'; var x = 42; x");
console.assert(x === 17);
console.assert(evalX === 42);
```

- 禁止删除声明变量

```js
"use strict";
var x;
delete x; // !!! 语法错误
eval("var y; delete y;"); //  !!! 语法错误
```

## 让 eval 和 arguments 变的简单

- 名称`eval`和`arguments`不能通过程序语法被绑定或赋值，以下所有尝试都会引起语法错误。

```js
"use strict";
eval = 17;
arguments++;
++eval;
var obj = {
  set p(arguments) {},
};
var eval;
try {
} catch (arguments) {}
function x(eval) {}
function arguments() {}
var y = function eval() {};
var f = new Function("arguments", "use strict'; return 17;");
```

```js
"use strict";
// ok
let obj = {
  a: 1,
};
let newValue = 45;
Object.defineProperty(obj, "b", {
  get() {
    value++;
    return value++;
  },
  set(newValue) {
    console.log("newValue" + newValue);
    value = newValue;
  },
});
obj.b = 6;
console.log(obj.b);
```

- 严格模式下，参数的值不会随着 arguments 对象的值改变而变化

```js
function f(a) {
  "use strict";
  a = 42;
  return [a, arguments[0]];
}
var pair = f(17);
console.assert(pair[0] === 42);
console.assert(pair[1] === 17);
```

- 不在支持`arguments.callee`

```js
"use strict";
var f = function () {
  return arguments.callee; // 非严格模式下，arguments.callee会指向正在执行的函数
};
f(); // TypeError
```

## `安全的`JavaScript

- this 传递给一个函数的值不会被强制转换为一个对象

```js
"use strict";
function fun() {
  return this;
}
console.assert(fun() === undefined);
console.assert(fun.call(2) === 2);
console.assert(fun.apply(null) === null);
console.assert(fun.call(undefined) === undefined);
console.assert(fun.bind(true)() === true);
```

- 不能使用 ES 扩展存在与 JavaScript 栈中
  - `fun.caller`和`fun.arguments`都是不可删除的属性，且存值、取值都会报错

```js
function restricted() {
  "use strict";
  restricted.caller; // 抛出类型错误
  restricted.arguments; // 抛出类型错误
}

function privilegedInvoker() {
  return restricted();
}

privilegedInvoker();
```

- `arguments`不再提供访问和调用这个函数相关的变量途径
  - `arguments.caller`不可删除的属性，且存值、取值都会报错

```js
"use strict";
function fun(a, b) {
  "use strict";
  var v = 12;
  return arguments.caller; // 抛出类型错误
}
fun(1, 2); // 不会暴露v（或者a，或者b）
```

- 严格模式保存了关键字
- 禁止不在脚本或函数层面上的函数声明

```js
"use strict";
if (true) {
  function f() {} // !!! 语法错误
  f();
}

for (var i = 0; i < 5; i++) {
  function f2() {} // !!! 语法错误
  f2();
}

function baz() {
  // 合法
  function eit() {} // 同样合法
}
```
