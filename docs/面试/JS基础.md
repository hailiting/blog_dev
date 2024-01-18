# JS 基础

## javascript 的 typeof 返回哪些数据类型

```javascript
var a;
typeof a; // undefined
a = null;
typeof a; // object
a = true;
typeof a; // boolean
a = 666;
typeof a; // number
a = "hello";
typeof a; // string
a = Symbol();
typeof a; // symbol
a = function() {};
typeof a; // function
a = [];
typeof a; // object
a = {};
typeof a; // object
a = /aa/g;
typeof a; // object
```

instanceof: 用来判断某个构造函数的 prototype 属性所指向的对象是否存在于另一个要检测对象的原型链上，即判断一个引用类型的变量具体是不是某个类型的对象

```javascript
({} instanceof Object); // true
[] instanceof Array; // true
/aa/g instanceof RegExp; // true
(function() {} instanceof Function); // true
```

## 列举 3 种类型转换和 2 种隐式类型转换

强制： parseInt, parseFloat, Number()
隐式： '==' => 1==true null == undefined // true

## slice() splice() split() join() 区别

- `arrayObject.slice(start,end)` 从已有数组返回选定元素 【原数组不变】
- `arrayObject.splice(index, howmany, item1,item2....itemX)`向|从 数组中 添加|删除 项目，然后返回被删除的项目【原数组改变】
- `stringObject.split(separator, howmany)` 字符串分割成字符串数组
- `arrayObject.join(separator)` 把数组所有元素放到一个字符串

## 4 null 与 Undefined

```js
console.log(null == undefined); // true
console.log(null === undefined); // false
```

### null

- 代表`空置`，代表一个空对象指针，即没有对象；
- `typeof null === "object"` true，所有可以把`null`看成特殊对象值；

#### 常见用法是

1. 作为函数的参数，表示该函数的参数不是对象
2. 作为对象原型链的终点 【`Object.prototype.__proto__ === null`】

### undefined

当一个变量声明未初始化时，得到 undefined，undefined 值派生自 null 值

#### 常见用法是

1. 变量被声明却没有赋值，这时候是 Undefined
2. 调用函数时，应该提供的参数没有提供，该参数等于`undefined`
3. 对象没有赋值的属性，该属性也是`undefined`
4. 函数没有返回值时，默认返回`undefined`

## 变量类型

- JS 数据类型分类和判断
- 值类型和引用类型

JavaScript 是一种弱类型脚本语言，所谓弱类型指的是定义变量时，不需要什么类型，在程序运行过程中会判断类型。

- ECMAScript 中定义了 6 种原始类型
  - Boolean String Number Null Undefined Symbol
  - 原始类型不包含 Object

### 如何判断类型

**typeof**
`typeof xxx`得到的值有以下几种类型：`undefined`, `boolean`, `number`, `string`, `object`, `function`, `symbol`。这里需要注意的有三点：

- `typeof null`结果是`object`，实际上这是`typeof`的 bug，null 是原始值，非引用类型
- `typeof [1,2]`结果是`object`，结果中没有`array`这一项，引用类型除了`function`其他的全部都是`object`
- `typeof Symbol()`用`typeof`获取`symbol`类型的值得到的是`symbol`，这是 ES6 新增的知识点
  **instanceof**
  用于实例和构造函数的对应。例如判断一个变量是否是数组，使用`typeof`无法判断，但可以使用`[1, 2] instanceof Array`来判断。因为`[1, 2]`是数组，它的构造函数就是`Array`。同理：

```js
function Foo(name) {
  this.name = name;
}
var foo = new Foo("bar");
console.log(foo instanceof Foo); // true
```

### 值类型 vs 引用类型

除了原始类型，ES 还有引用类型，上文提到的`typeof`识别出来的类型中，只有`object`和`function`是引用类型，其他都是值类型。
根据 JavaScript 中的变量类型传递方式，又分为值类型和引用类型，值类型变量包括 Boolean、String、Number、Undefined、Null，引用类型包括了 Object 类的所有，如 Date、Array、Function 等。在参数传递方式上，值类型是按值传递，引用类型是按共享传递。

```js
var a = 10;
var b = a;
b = 20;
console.log(a); // 10
console.log(b); // 20

var a = { x: 10, y: 20 };
var b = a;
b.x = 100;
b.y = 300;
console.log(a); // {x: 100, y: 300}
console.log(b); // {x: 100, y: 300}
```

上述代码中，`a`, `b`都是引用类型。在执行了`b=a`之后，修改`b`的属性值，`a`的也跟着变化。因为`a`和`b`都是引用类型，指向同一个内存地址，即两者引用的是同一个值，因此`b`修改属性时，`a`的值随之改动。

```js
function foo(a) {
  a = a * 10;
}
function bar(b) {
  b.value = "new";
}
var a = 1;
var b = {
  value: "old",
};
foo(a);
bar(b);
console.log(a); // 1
console.log(b); // {value: "new"}
```

`Number`类型的`a`是按值传递的类型，复制一份存入栈内存，这类类型一般不占用太多内存，而且按值传递保证了其访问速度。按共享传递的类型，是复制其引用，而不是整个复制其值（C 语言中的指针），保证过大的对象等不会因为不停的复制内容而造成内存的浪费。
引用类型经常会在代码中按照下面的写法使用，或者说容易不知不觉中造成错误。

```js
var obj = {
  a: 1,
  b: [1, 2, 3],
};
var a = obj.a;
var b = obj.b;
a = 2;
b.push(4);
console.log(obj, a, b);
// {a:1, b: [1,2,3,4]} 2 [1,2,3,4]
```

## 原型和原型链 (继承)

JavaScript 是基于原型的语言。

- 原型和原型链定义
- 继承写法

### 如何理解 JavaScript 的原型

**牢记并理解**

- **所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（`null`除外）**
- **所有的引用类型（数组、对象、函数），都有一个`__proto__`属性，属性值是一个普通的对象**
- **所有函数，都有一个`prototype`属性，属性值也是一个普通的对象**
- **所有的引用类型（数组、对象、函数），`__proto__`属性值指向它的构造函数的`prototype`属性值**

```js
// 要点一：自由扩展属性
var obj = {};
obj.a = 100;
var arr = [];
arr.a = 100;
function fn() {}
fn.a = 100;
// 要点二：__proto__
console.log(obj.__proto__);
console.log(arr.__proto__);
console.log(fn.__proto__);
// 要点三：函数有prototype
console.log(fn.prototype);
// 要点四：引用类型的`__proto__`属性值指向它的构造函数的`prototype`属性值
console.log(obj.__proto__ === Object.prototype);
```

### 原型

```js
// 构造函数
function Car(name, age) {
  this.name = name;
  this.age = age;
}
Car.prototype.alertName = function() {
  alert(this.name);
}; // 创建示例
var f = new Car("aaa", 12);
f.printName = function() {
  alert(this.name);
};
function Cruze(name, age) {
  Car.call(this, name, age);
}
inherits(Cruze, Car);
function inherits(child, parent) {
  const __proto = Object.create(parent.prototype);
  __proto.constructor = child.prototype.constructor;
  child.prototype = __proto;
}
var k = new Cruze("ddddd", 122);
k.aaa = function() {
  alert(this.age);
};
// k.printName(); // not a function
k.alertName();
k.aaa();
// f.aaa(); // not a function
```

**当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么他就会去`__proto__`(即它的构造函数的`prototype`)中去寻找**
如何判断这个属性是不是对象本身的属性，使用`hasOwnProperty`，常用的地方是遍历一个对象的时候。

```js
var item;
for (item in f) {
  // 高级浏览器已经在for in中屏蔽了来自原型的属性，但这里建议大家还是加上这个判断，以保证程序的健壮性
  if (f.hasOwnProperty(item)) {
    console.log(item);
  }
}
```

### 如何理解 js 的原型链

```js
k.toString();
```

当一直向上找，找到最顶层，形成了一个链式的结构，所以叫做"原型链"。如果一直找到最上层都没找到，就宣告失败，返回`undefined`。最上层是`Object.prototype.__proto__ === null`

### 原型链中的 `this`

所有从原型或更高级原型中得到、执行的方法，其中的`this`在执行时，就指向了当前这个触发事件执行对象。因此 `printName`和`alertName`中的`this`都是`f`。

## 作用域和闭包

- 执行上下文
- this
- 闭包是什么

### 现有 HTML 片段，要求编写代码，点击编码为几的链接就`alert`弹出其编号

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

```js
// 闭包
var list = document.getElementsByTagName("li");
for (var i = 0; i < list.length; i++) {
  list[i].addEventListener(
    "click",
    (function(i) {
      return function() {
        alert(i + 1);
      };
    })(i),
    true
  );
}
```

对于理解闭包，就需要我们从**执行上下文**开始讲起

### 执行上下文

先讲一个关于**变量提升**的知识点，面试中可能会遇到下面这个问题

#### 说出下面执行结果

```js
console.log(a);
var a = 100;
fn("zhangss");
function fn(name) {
  console.log(age);
  age = 20;
  console.log(name, age);
  var age;
  console.log(age);
}
console.log(b); // Uncaught ReferenceError: b is not defined
b = 100;
```

在一段 JS 脚本（即`<script>`标签中）执行之前，要先解析代码（所以说 JS 是解析执行的脚本语言），解析的时候会先创建一个**全局执行上下文**环境，先把代码中即将执行的（内部函数的不算，因为你不知道函数何时执行）变量、函数声明都拿出来。变量先暂时赋值为`undefined`，函数则先声明好可使用。这一步做完了，然后再开始正式执行程序。再次强调，这是在代码执行之前才开始的工作。  
我们来看下上面的面试小题，为什么`a`是`undefined`，而`b`却报错，实际上 JS 在代码执行之前，要“全文解析”，发现`var a`，知道有个`a`的变量，存入了执行上下文，而`b`没有找到`var`关键字，这时候没有在执行上下文提前"占位"，所以代码执行的时候，提前报到的`a`是有记录的，只不过暂时还没有赋值，即为`undefined`，而`b`在执行上下文没有找到，自然会报错（没有找到`b`的引用）。  
另外，一个函数在执行之前，也会创建一个**函数执行上下文**环境，跟全局上下文差不多，不过**函数执行上下文**中会多出` this``arguments `和 函数的参数。参数和`arguments`好理解，这里的`this`需要了解一下：

- 范围：一段`<script>`、`js`文件或一个函数
- 全局上下文：变量定义，函数声明
- 函数上下文：变量定义，函数声明，`this`，`arguments`

**this**

## 异步

- 同步 vs 异步
- 异步和单线程
- 前端异步的场景

## 箭头函数

## Module

## Class

## Set 和 Map

## Promise
