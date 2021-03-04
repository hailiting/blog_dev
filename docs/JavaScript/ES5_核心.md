# ES5 核心

## 严格模式`use strict`

- 未声明的变量赋值抛出`ReferenceError`
- 不止一次对**对象**字面量分配相同的属性，会抛出`SyntaxError`
- 使用 with 语句抛出`SyntaxError`

```js
"use strict";
function a{
  aa = 1; // ReferenceError
  var i = {
    test: 5,
    test: 6,// SyntaxError
  }
}
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
