# JavaScript 语言精粹 2

## 闭包，作用域，原型链

```js
if (!("userName" in window)) {
  console.log("eee");
  var userName = "222"; // 声明提前
}
console.log("userName" in window);
console.log(userName);
if (true) {
  console.log(111);
  var a = 222;
}
console.log(a);
```

```js
var obj = {
  user: "sss",
  getName: function() {
    return this.user;
  },
};
var getNameFn = obj.getName;
console.log(getNameFn());
console.log(obj.getName());
```

## 作用域的种类

### 作用域有大到小

- 程序级
- 文件级
- 函数级
- 块级

### JavaScript 的作用域

- 全局作用域
- 函数作用域
- 块级作用域(es6)

```js
// global 全局作用域
var global = 1;
function doSomething() {
  var inner = 2; // 在函数内声明的变量   函数外是访问不到的
  globalA = 3;
}
doSomething();
alert(global); // 1
alert(globalA); // 3
alert(inner); // uncaught ReferenceError: undefined
```

### JavaScript 的作用域链

#### 什么是作用域链

- 函数作用域是通过对象属性`[[Scope]]`连接起来，该内部属性包含了函数被创建的作用域值对象的集合，这个集合被称为函数的作用域链，他决定哪些数据能被函数访问

```js
var x = 1;
function foo() {
  var y = 1 + x;
  return function() {
    var z = 1 + y;
    // 断点
    return z;
  };
}
foo()();

// Scope
// Local
// this: Window
// z:3
// Closure (foo)
// y: 2;
// Global;
```

### 变量与函数的声明提前

```js
var test = "aaa";
function doSomething() {
  alert(test); // undefined
  var test = "bbb";
  alert(test); // bbb
}
doSomething();
alert(test); // aaa

/**
执行顺序：
1. 声明函数doSomething
2. 调用函数doSomething
3. 声明变量test
4. alert(test)
5. test变量赋值为bbb
6. alert(test)
7. 赋值全局变量 test = aaa
8. alert(test) // 全局
*/
```

### JavaScript 中的 this 关键字

#### this 指向哪里

在 JavaScript 中，this 指向函数执行时的当前对象

#### this 的使用场景

- 普通函数中
  - 严格模式： undefined
  - 非严格模式：全局对象(window)
- 构造函数中：对象的实例
- 对象方法：对象本身

#### call, apply, bind

## JavaScript 原型对象和原型链

### 原型对象是什么

- 在 JavaScript 中，每定义一个对象（函数）时，对象中都会包含一些预定义的属性，其中函数对象的一个属性就是原型对象`prototype`。普通对象没有`prototype`属性，但有`__proto__`属性

```js
function f1() {}
console.log(typeof f1.prototype); // object
console.log(typeof Function.prototype); // function
console.log(typeof Object.prototype); // object
console.log(typeof Function.prototype.prototype); // undefined
```

#### 原型对象有什么用

- 面向对象开发、类的继承

```js
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function() {
  return this.name;
};
var x = new Person("sss");
x.getName();
```

#### 构造函数

- 使用 new 关键字调用的函数
- 构造函数可以实例化一个对象
- 返回值，默认返回类的实例
- 特殊情况
  - 没有返回值
  - 简单数据类型
  - 对象类型

### 原型链是如何实现的

| xuz-实例    | Person.prototype | Object.prototype |      |
| ----------- | ---------------- | ---------------- | ---- |
| name        | getName()        | `__proto__`      | null |
| `__proto__` | `__proto__`      |                  |      |

- 1. 每个函数都有一个 prototype 的对象属性
- 2. 每个对象都有一个`__proto__`属性，该属性指向其父类的 prototype 对象

### 原型对象的 constructor

- 每个原型对象`prototype`中都有一个`constructor`属性，默认指向函数本身

```js
Person.prototype.constructor === Person; // true
Function.prototype.constructor === Function; // true
Object.prototype.constructor === Object; // true
Object.constructor === Function; // true
```

```js
var name = "global";
// 参数就是一个变量声明
function A(name) {
  alert(name); // 3
  this.name = name;
  var name = "1";
}
A.prototype.name = "2";
var a = new A("3");
alert(a.name); // 3
delete a.name;
alert(a.name); // 2
```

```js
function fun(n, o) {
  console.log(o);
  return {
    fun: function(m) {
      return fun(m, n);
    },
  };
}
var a = fun(0);
a.fun(1);
a.fun(2);
var b = fun(0)
  .fun(1)
  .fun(2);
  .fun(3);
```
