# ES6 基础

- const, let
- 对象解构
- 字符串模板
- 对象和数组
- 函数
- Iterator 迭代器
- Generator 生成器
- class
- set, map
- module

## const, let

- 1. const 不能被改变
- 2. const 符合函数式编程
- 3. const, let 本质的区别是**编译器内部对其处理机制**

```js
const arr = [];
arr.push(1123); // ok
```

## 对象的解构

```js
// 数组的解构
const a = [1, 2, 3, 4, 5];
const [first, second, ...p] = a;
// 对象的解构
const {
  a: aaa,
  b,
  c: { aa },
  dd = 222,
} = { a: 1, b: 2, c: { aa: 123 } };
console.log(aaa); // 1
console.log(aa); // 123
console.log(dd); // 222
```

## 字符串模板

```js
const a = "122";
const b = `${a}-bbb`;

b.startsWith("1");
b.endsWith("v");
b.includes("bbb");

const c = test`foo \n ${a} 12321${b}`;
function test(str, ...params) {
  console.log({ str, params });
}
```

## 对象和数组

```js
const a = "kk";
const obj = {
  a,
  [`${a}sss`]: "asdasd",
  q() {
    console.log(111);
  },
  k: null,
};
obj.k = 123;
console.log(obj.kksss);

console.log(NaN == NaN); // false
console.log(Object.is(NaN, NaN)); // true
```

### Object.create()

```js
const eat = {
  getEat() {
    return "🍗";
  },
  aaa() {
    console.log(111);
  },
};
const drink = {
  getDrink() {
    return "🍺";
  },
};
// let sunday = Object.create(eat);
// console.log(Object.getPrototypeOf(sunday));
// // Object.setPrototypeOf(sunday, drink);
// // console.log(Object.getPrototypeOf(sunday));
// // console.log(sunday.getDrink());
// // console.log(sunday.aaa()); //  err
// sunday.__proto__ = drink;
// console.log(sunday.getDrink());
let sunday = {
  __proto__: drink,
  getDrink() {
    return super.getDrink() + "☕️";
  },
};
console.log(sunday.getDrink());
```

```js
const aa = function bb() {};
console.log(aa.name); // bb
```

## 函数

```js
(() => {
  console.log("init");
})();
const result = [1, 2, 3, 4].map((v) => v * 3);
window.a = 50;
const s = {
  a: 40,
  p: function() {
    console.log(this.a);
  },
};
s.p(); // 40
const b = s.p;
b(); // 50

function test(a = 1, { options = true } = {}) {
  console.log(options);
}
test(30, { options: 111 });
```

## Iterator 迭代器（非标准）

`Iterator(object, [keyOnly])`

- object: 要迭代属性的对象
- keyOnly: 如果 keyOnly 是真，Iterator.prototype.next 只返回 property_name

```js
var a = {
  x: 10,
  y: 20,
};
var iter = Iterator(a);
console.log(iter.next()); // ["x", 10]
console.log(iter.next()); // ["y", 20]
console.log(iter.next()); // throws StopIteration
// 使用遗留的解构for-in迭代对象属性
var a = {
  x: 10,
  y: 20,
};
for (var [name, value] in Iterator(a)) {
  console.log([name, value]);
}
// 使用for-of迭代
for (var [name, value] of Iterator(a)) {
  console.log(name, value);
}
// 迭代属性名
for (var name in Iterator(a, true)) {
  console.log(name);
}
// 传入Generator实例
function* f() {
  yield "a";
  yield "b";
}
var g = f();
console.log(g == Iterator(g)); // true
for (var v in Iterator(g)) {
  console.log(v); // a
  // b
}
```

## Generator

生成器对象是由一个`generator function`返回的，并且它符合`可迭代协议`和`迭代器协议`

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
let g = gen(); // g的__proto__ 是Generator   构造器的原型
```

### 方法

- `Generator.prototype.next()` 返回一个由`yield`表达式生成的值
- `Generator.prototype.return()` 返回给定的值并结束生成器
- `Generator.prototype.throw()` 向生成器抛出一个错误

#### 一个 无限迭代器

```js
function* idMaker() {
  let index = 0;
  while (true) yield index++;
}
let gen = idMaker();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
```

### 传统的生成器方法

- `Generator.prototype.next()` 返回`yield`表达式产生的值，与 ES2015 生成器对象的 next()方法对应
- `Generator.prototype.close()` 关闭生成器，因此执行该函数后调用`next()`函数时将会抛出`StopIteration`错误，与 ES2015 生成器对象的`return()`方法对应
- `Generator.prototype.send()`send()对应 ES2015 生成器对象中的 next(x)
- `Generator.prototype.throw()` 向生成器抛出错误，对应 ES2015 生成器对象中的 throw()

```js
function fibonacci(){
  var a = yield 1;
  yield a*2;
}
var it  = fibonacci();
console.log(it);
console.log(it.next());
console.log(it.next(20));
console.log(it.close());
console.log(it.next());
```

## class 类

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(this.name);
  }
}
class Man extends Person {
  constructor(name) {
    super(name);
  }
  set menu(data) {
    this.name = data;
  }
  get menu() {
    return this.name;
  }
  say() {
    super.say();
    console.log("hello");
  }
}
const xiaowang = new Man("xiaowang");
console.log(xiaowang.name);
xiaowang.say();
xiaowang.menu = "小红";
console.log(xiaowang.menu);
console.log(xiaowang.name);
```

## set

```js
let arr = new Set("2,3,4,5");
// [[Entries]]
// 0: "2"
// 1: ","
// 2: "3"
// 3: "4"
// 4: "5"
for (let i of arr) {
  console.log(i);
}
console.log(arr.size);
console.log(arr.delete("3"));
console.log(arr.has("3"));
arr.clear();
console.log(arr.size);
```

## Map

```js
let food = new Map();
let fruit = {},
  cook = function() {};
food.set(fruit, "111");
food.set(cook, "23222");
console.log(food);
console.log(food.get(cook));
console.log(food.size);
console.log(food.delete(fruit));
console.log(food.get(fruit)); // undefined
food.clear();
food.size();
```

## Module

```js
import react as a from "react";
// a.js
export function test1() {}
export function test2() {}
export {
  test1,
  test2
}
export default {test1,test2} // a.test1()
// b.js
import { test1, test2 } from "./a.js";
```

## Promise async await

async 函数就是将 Generator 函数 `*`替换为`async`,将`yield`替换为 `await`,仅此而已

```js
var asyncReadFile = async function() {
  export function test() {}
  var res1 = await readFile("/etc/aaa");
  var res2 = await readFile("/etc/bbb");
};

(async () => {
  function promiseFn(url) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: url,
        success: function(response) {
          resolve(response);
        },
        error: function(e) {
          reject(e);
        },
      });
    });
  }
  const res1 = await promiseFn("/api/a");
  const res2 = await promiseFn("/api/b");
  const p = res1 + res2;
})();
```

### async 函数对 Generator 函数的改进体现在

- 内置执行器，不需要 next

## 修饰器

修改类的行为，编译时发生的

```js
function testable(target) {
  // 修饰的方法添加一个属性
  target.isTestAble = true;
}
@testable
class MyClass {}
console.log(MyClass.isTestAble);

// 等同于
MyClass = testable(MyClass) || MyClass;
```

### `core-decorators.js`

- `@autobind`修改 this 指向
- `@readonly`定量不能改变
- `@override`提示重写是否正确
- `@deprecate`
- `@suppressWarnings`

## Symbol 唯一的，永远不会被改变
