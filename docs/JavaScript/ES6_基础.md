# ES6 基础

- const, let
- 对象解构
- 字符串模板
- 对象和数组
- 函数
- Iterator
- Generator
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
