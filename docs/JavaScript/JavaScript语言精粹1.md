# JavaScript 语言精粹 1

- 数据驱动 UI，
  - 所有的变化都是是可控的，所有的变化都是确定的，程序是可描述的
  - 指令式编程是糟糕的，程序是需要设计的
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
    function () {
      console.log(this.i++);
    }.bind(this), // 闭包，保留this的环境
    500
  );
}
fn();
```

### 箭头函数

拥有词法作用域和 this 值

- 什么时候不能使用箭头函数
  - 箭头函数的缺点
    - 没有 arguments
    - 无法通过 apply call bind 改变 this
  - 对象方法
  - 原型方法
  - 箭头函数无法当做构造函数
  - 动态上下文中的回调函数
  - Vue 生命周期和 method
    - Vue 组件本质上是一个 js 对象
    - React 组件（非 Hooks）它本质上是一个 es6 class

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

```js
const btn1 = document.getElementById("btn1");
btn1.addEventListener("click", () => {
  // console.log(this === window);
  this.innerHTML = "clicked";
});

const obj = {
  name: "ss",
  getName01: function () {
    console.log(this.name);
  },
  getName02: () => {
    console.log(this === window);
    console.log(this.name); // undefined
  },
};
// 原型
obj.__proto__.getName = () => {
  console.log(this === window);
  return this.name; // undefined
};
console.log(obj.getName());
console.log(obj.getName01());
console.log(obj.getName02());

// Vue生命周期和method
{
  data(){
    return {name:"ss"}
  },
  methods: {
    getName: ()=>{
      // 报错 cannot read properties of undefinded (reading 'name')
      return this.name
    }
  },
  mounted: ()=>{
    // 报错 cannot read properties of undefinded (reading 'name')
    console.log("msg",this.name)
  },
  mounted(){
    console.log("msg",this.name) // 正常
  }
}
// class
class Foo {
  constructor(name,city){
    this.name = name
    this.city = city
  }
  getName = ()=>{
    console.log(this.name+this.city)
  }
}
const foo = new Foo("sa", "dd")
foo.getName()
```

### 继承

子类需要父类的

- 对象属性
- 对象方法

prototype(parent) constract (child)

```js
// es5
function inherit(P, C) {
  C.prototype.constructor = C;
  C.prototype = Object.create(P.prototype);
}
function Parent(a) {
  this.a = a;
}
Parent.prototype.AAA = function () {
  console.log("AAA");
  return this.a;
};
function Child(a, b) {
  Parent.call(this, a);
}
inherits(Parent, Child);
const a = new Child("aaa", "bbb");
console.log(a.AAA());
/// es6   语法糖
class People {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name;
  }
}
class English extends People {
  // 如果构建的和父类一样，可以不写constructor
  constructor(name, age, language) {
    super(name, age);
    this.language = language;
  }
  introduce() {
    console.log(this.getName());
    console.log(this.language);
  }
}
```

## 语法

### label statement

```js
loop: for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 5; j++) {
    console.log(j);
    if (j === 1) {
      break loop;
    }
  }
}
console.log(i);
```

### 语句与表达式

```js
var x = { a: 1 };
// 语句优先
{a:2};
{a:2, b:2};
```

`()`,`+`, `-`,` !``~ `里要求必须是一个表达式

```js
/// function(){}()  方法的声明
(function () {})();
// 与
(function () {})(); // 原理不一样
```

## 高阶函数

高阶函数是把函数当做参数或返回值是函数的函数  
函数式编程 vs 指令式编程  
确定的输入 肯定会得到 确定的输出

#### 回调函数

```js
[1, 2, 3, 4].forEach(function (item) {
  console.log(item);
});
```

#### 闭包

闭包由两部分组成，函数的嵌套，并返回函数

- 1. 函数
- 2. 环境：函数创建时作用域内的局部变量
- 3. 解决全局污染的问题

```js
function makeCounter(init) {
  var init = init || 0;
  return function () {
    return ++init;
  };
}
var counter = makeCounter(10);
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
counter = null;
```

##### 滥用闭包

```js
const doms = [0, 1, 2, 3, 4, 5];
for (var i = 0; i < doms.length; i++) {
  doms.eq(i).on("click", function (ev) {
    console.log(i); // 因为i没被释放掉，没有被销毁，并且保存下来了
  });
}

for (var i = 0; i < doms.length; i++) {
  // 利用函数的特点  实参  把每一次的i值都保留下来
  (function (i) {
    doms.eq(i).on("click", function (ev) {
      console.log(i);
    });
  })(i);
}
```

### 惰性函数

```js
// 执行一次   之后就能确定用哪一个
function eventBinderGenerator() {
  if (window.addEventListener) {
    return function (element, type, handler) {
      element.addEventListener(type, hanlder, false);
    };
  } else {
    return function (element, type, handler) {
      element.attachEvent("on" + type, handler.bind(element, window.event));
    };
  }
}
const fun = eventBinderGenerator();
fun(element, type, handler);
```

### 柯里化

一种允许使用部分参数生成函数的方式

#### 抽象变化

- 每次都变
- 确定一次改变后 就不变了 一次性变化 抽象到 type

```js
function isType(type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === "[object " + type + "]";
  };
}
var isNumber = isType("Number");
console.log(isNumber(1));
console.log(isNumber("d"));
var isArray = isType("Array");

function pipe(f, g) {
  return function () {
    return f.call(null, g.apply(null, arguments));
  };
}
var fn = pipe(f, g);
console.log(fn(5));
```

## 尾递归

- 1. 尾调用是指某个函数的最后一步是调用另一个函数
- 2. 函数调用自身，称为递归
- 3. 如果尾调用自身，就称为尾递归
     斐波那契数列

**递归很容易发生`栈溢出`错误（stack overflow）**
**但对于尾递归来说，由于只存在一个调用记录，所以永远不会发生`栈溢出`**

```js
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
```

## 反柯里化

```js
Function.prototype.uncurry = function () {
  return this.call.bind(this);
};
// push 通用化
var push = Array.prototype.push.uncurry();
var arr = [];
push(arr, 1);
push(arr, 3);
push(arr, 4);
```
