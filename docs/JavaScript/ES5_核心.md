# ES5 核心

## `Function.prototype.bind[thisArg, [, arg1,[arg2, ...]]]`

`Function.prototype.c`返回一个新的函数对象，该函数对象的 this 绑定到 `thisArg`参数上，从本质上讲，这允许在其对象链中执行一个函数
容许对当前的 function 改变 this

```js
// this的值被bind改变，指向 kitty
function locate() {
  console.log(this.location);
}
function Maru(location) {
  this.location = location;
}
var kitty = new Maru("cardboard box");
var locateMaru = locate.bind(kitty);
locateMaru();
locate.apply(kitty);
locate.call(kitty);
```

## 具体代码

- 1. 立即执行函数
- 2. 闭包
- 3. 原型链
  - 3.1 构造函数里属性的优先级比原型链的要高
  - 3.2 面向对象编程的时候，js 没有类的概念，可以用函数替代
  - 3.3 constructor 实际就是对应的那个函数
  - 3.4 prototype 按引用传递发 Object.create 原型链副本
- 4. 数值 字符串 布尔 按值传递，对象 数组 原型链 按引用传递
- 5. 改变 this 的方法，call apply bind
- 6. 函数提示 变量提升 函数提升的级别比变量高
- 7. jq 内部有很多经典的写法，模块化编程的概念 闭包

### 一

```js
/// 变量提升
/// 闭包 匿名函数 - 布局作用域   在函数体内部的变量，外部无法访问
// var a = 25;
(function () {
  alert(a); // => var a; alert(a);
  var a = 30;
})();
```

```js
(function () {
  var a = 20;
  function a() {} // 函数的提升
  console.log(a); // 20
});
```

```js
(function () {
  var a = 20;
  var b = (c = 20); // b = 20   c = 20
  var k,
    e = 20; // var k   var e
})();
console.log(c); // 20
console.log(e); // error: e is not defined
```

### 二

- `this`的优先级比`prototype`大
- `this`谁调用就指谁【()=>箭头函数】

```js
this.a = 20;
var test = {
  a: 40,
  init: () => {
    console.log(this.a);
    function go() {
      this.a = 60;
      console.log(this.a);
    }
    go.prototype.a = 50;
    return go;
  },
};
var p = test.init(); // 20 [有`=>`]  60
p();
new (test.init())(); // 20  60
```

```js
function f1() {
  var N = 0;
  return function f2() {
    N += 1;
    console.log(N);
  };
}
// console.log(N); // N is not defined
result();
result();
result();
result();
result(); // f2 return 出来 造成内存泄露
result = null; // 释放内存
```

```js
// 原型链  面向对象
// constructor 默认等于（==） car
// 构造函数 和 初始化类 是一个东西
// 按值传递 和 按引用传递【对象，数组，原型链】
// 深拷贝 和 浅拷贝
var a = { test: 123 };
var b = a;
b.test2 = "121zaa"; // a的值会被改掉
var Car = function (color) {
  this.color = color;
};
// class  S{
//   constructor{
//     this.a = 20;
//   }
// }
var s = new Car("red"); // this.color => this指向 s
console.log(s);

Car.prototype.sail = function () {
  console.log("我是：" + this.color + "色");
};
var BMW = function (color) {
  Car.call(this, color);
};
var __pro = Object.create(Car.prototype);
__pro.constructor = BWM;
BMW.prototype = __pro;
var m = new BWM("red");
console.log(m);
```

```js
var user = {
  age: 20,
  init: function () {
    console.log(this);
    console.log(this.age);
  },
};
var data = { age: 40, va: 123 };
user.init(); // 20
// bind 指向改变
user.init.bind(data)(); // 40
```

### 三

```js
$("#test").click(function (argument) {
  console.log(1);
});
setTimeout(function () {
  console.log(2);
}, 0);
while (true) {
  // 到同步队列
  console.log(3);
}
/// 输出3，浏览器卡死
/// 同步队列 与 异步队列
// 异步队列
// - 事件绑定
// - setTimeout setInterView
// - ajax
```

```js
// for循环
var list_li = document.getElementsByTagName("li");
// 01
for (var i = 0; i < list_li.length; i++) {
  (function (i) {
    list_li[i].onclick = function () {
      console.log(i);
    };
  })(i);
}
// 02
for (let i = 0; i < list_li.length; i++) {
  list_li[i].onclick = function () {
    console.log(i);
  };
}
// 03
for (var i = 0; i < list_li.length; i++) {
  list_li[i].onclick = function () {
    console.log(this.innerHTML);
  };
}
// 04
for (var i = 0; i < list_li.length; i++) {
  list_li[i].onclick = function () {
    console.log(i);
  }.bind(this);
}
```

```js
// 模块化
var module = (function () {
  var N = 5;
  function print() {
    console.log(N);
  }
  function add(x) {
    var q = x + N;
    console.log(q);
  }
  return {
    des: "this is a module",
    add: add,
  };
})();
module.add(3);
// 静态化模块
var index = {
  data: {
    age: 20,
  },
  methods: function () {},
};
index.methods();
```

### 块级函数

ES6 块级函数允许在块级作用域中声明函数，并且该函数只在该块级作用域内可见

```js
{
  console.log(foo());
  function foo() {
    return "bar";
  }
}
console.log(foo());
```

### LHS 和 RHS

- LHS(Left-Hand Side) 和 RHS(Right-Hand Side) 主要在编译原理和作用域理论中使用，用于解释变量的赋值和访问操作，广泛应用于编程语言和编译器的设计中
- 对于未声明的变量会产生不同的影响
  - LHS 引用会创建一个全局变量
  - RHS 引用会导致 ReferenceError

```js
function foo() {
  console.log(x); // RHS 查询一个变量，如果变量不存在，就会报错 ReferenceError
  // 非严格模式下，LSH 找到变量的容器，并将新的值分配给该变量
  x = 10;
}
```

## 常见的 JS 语法错误类型

- 引用不存在: ReferenceError
- 类型错误: TypeError
- 语法错误: SyntaxError
- 数值越界: RangeError
- URI 解析错误: URIError
- eval 执行错误: EvalError

## try catch 的 catch 和 with 中定义变量

- try catch 的 catch 和 with 有自己的词法作用域，如果通过 var 定义变量，会直接影响 try-catch 与 with 语句所在的词法作用域
