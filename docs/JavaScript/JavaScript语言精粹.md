# JavaScript 语言精粹

- JavaScript 本身就是一个弱类型语言，是一门面向原型的设计
- JavaScript 本身的不严谨要求用 JavaScript 的人更严谨
- JavaScript 很灵活
- JavaScript 是弱类型，而不是没有类型，靠值来确定具体是那种类型
- 基本类型：
  - 值类型：存储【直接存储，栈】 Boolean Number String null-根本不存在 undefined-只声明，未赋值 Symbol
  - 对象：【地址放在栈内存里，实际上内存在堆内存里】Array RegExp Date Math Function ---
  - 类型检测 操作符 typeof

```js
typeof alert; // function
typeof null; // object
typeof varss; // undefined
```

## 变量

在应用程序中，使用变量来为值命名，变量的名称称为 `identifiers`

#### 声明

- 1. 使用关键字`var`: 函数作用域
- 2. 使用关键字`let`: 块级作用域（block scope local variable）
- 3. 直接使用: 全局作用域
- 4. `const`关键字可以声明不可变变量，同样为块级作用域，对不可变的理解在对象上的理解需要注意【object 的值不可变是指地址不可变，地址指向可以变】

### 变量提升

JavaScript 中可以引用声明的变量，而不会引发异变，这一概念称为变量声明提升

```js
console.log(a); // undefined
var a = 2; // 变量的声明会提前
// 等同于
var a;
console.log(a);
a = 2;
```

## 函数 - JavaScript 精髓，JavaScript 归结到底就是函数

一个函数就是一个可以被外部代码调用（或函数本身递归调用）的程序

#### 声明函数

- 1. 函数声明
- 2. 函数表达式
- 3. function 构造函数
- 4. 箭头函数

```js
// 声明
function fn() {}
// 表达式
var fn = function() {};
var fn = new Function(){}
var a = ()=>{}
```

### arguments

- 1. `arguments`: 一个包含了传递给当前执行函数参数的类似于数组对象
- 2. `arguments.length`: 传给函数的参数的长度，类数组
- ~~3. `arguments.caller`: 调用当前执行函数的函数~~
- ~~4. `arguments.callee`: 当前正在执行的函数~~

```js
function foo() {
  return arguments;
}
foo(1, 2, 3); // evl
// {"0":1,"1":2,"2": 3}
```

### rest （算是 arguments 的一种优化）

```js
function foo(...args) {
  return args;
}
foo(1, 2, 3); // [1,2,3] Array
```

### default

函数的参数设置默认值

```js
function fn(a = 2, b = 3) {
  return a + b;
}
fn();
```

## 对象

JavaScript 中对象是可变的 键控集合（keyed collections)

### 定义对象

- 1. 字面量
- 2. 构造函数
- 3. ...

```js
var obj = {
  prop: "value",
};
var data = new Date();
```

### 构造函数

class 是一种规范，new 出来的才是实体  
构造函数，使用 new 关键字调用就是构造函数，使用构造函数可以实例化一个对象。  
函数的返回值可能有两种：

- 1. 显式调用 return 返回 return 后表达式取值
- 2. 没有调用 return 返回 undefined

### 构造函数返回值

- 1. 没有返回值
- 2. 简单数据类型
- 3. 对象类型
     前两种情况构造函数返回构造对象的实例，实例化对象正是利用这个特性。  
     第三种构造函数和普通函数表现一致，返回`return`后表达式的结果

```js
function People(name, age) {
  this.name = name;
  this.age = age;
}
var people = new People("Hai", 26);
```

### prototype

- 1. 每个函数都有一个`prototype`的对象属性，对象内有一个`constructor`属性，默认指向函数本身
- 2. 每个对象都有一个`__proto__`的属性，属性指向其父类型的`prototype`

```js
function Person(name) {
  this.name = name;
}
// 当做对象属性的时候   -> 方法
// 当单独拿出来用的时候叫 function
Person.prototype.print = function() {
  console.log(this.name);
};
const a = new Person("Ssss");
const b = new Person("Kkkkkkkk");

///
Person: function Person(name)
  arguments: null
  caller: null
  length: 1
  name: "Person"
  prototype: Object
    constructor: function Person(name)
    print: function()
    __proto__: Object
  __proto__: function()
  <function scope>

///
a: Person
  name: "Ssss"
  __proto__: Object
    constructor: function Person(name)
    print: function()
    __proto__: Object
```

### this 和作用域

- 1. 我是谁 this
- 2. 我有哪些马仔 局部变量

#### this 场景

##### 普通函数：

- 1. 严格模式: `undefined`
- 2. 非严格模式: 全局对象
  1. Node: `global`
  1. 浏览器: `window`

##### 构造函数：对象的实例

##### 对象方法：对象本身

### call & apply

- fn.call(context, arg1, arg2, ..., argn)
- fn.apply(context, args)

```js
function isNumber(obj) {
  return Object.prototype.toString.call(obj) === "[object Number]";
}
```

### `Function.prototype.bind`

`bind`返回一个新的函数，函数作用域为 bind 参数

```js
function fn() {
  this.i = 0;
  setInterval(
    function() {
      console.log(this.i++);
    }.bind(this), // 闭包，保留this的环境
    500
  );
}
fn();
```

### 箭头函数

拥有词法作用域和 this 值

```js
function fn() {
  this.i = 0;
  setInterval(
    () => {
      console.log(this.i++);
    }, // 闭包，保留this的环境
    500
  );
}
fn();
```

### 继承

子类需要父类的

- 对象属性
- 对象方法

```js
function inherits(child, parent) {
  var _proptotype = Object.create(parent.prototype);
  _proptotype.constructor = child.prototype.constructor;
  child.prototype = _proptotype;
}
function People(name, age) {
  this.name = name;
  this.age = age;
}
People.prototype.getName = function() {
  return this.name;
};
function English(name, age, language) {
  // 借用构造函数
  People.call(this, name, age);
  this.language = language;
}
inherits(English, People);
```
