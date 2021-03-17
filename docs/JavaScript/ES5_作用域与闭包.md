# ES5 作用域与闭包

## js 是函数级作用域，在内外部的变量，内部能够访问，外部的不能访问内部的

```js
function test() {
  if (false) {
    var i = 10;
  }
  console.log(i); // undefined
  console.log(j); // Uncaught ReferenceError: j is not defined
}
test();

test(); // undefined
j = 100;
// test(); // 100
function test() {
  console.log(j);
}
```

```js
// `~` 将函数提升为表达式
var j = 100;
~(function test() {
  console.log(j);
})();
```

```js
// 变量声明会前置
var j = 100;
function test() {
  console.log(j); // undefined
  var j;
}
test();
```

## 闭包：拿到不该拿到的对象

```js
function test() {
  var k = 100;
  return function () {
    return k;
  };
}
var kk = test()();
console.log(kk);
kk = null; // 内存泄露 置空
```

## this

```js
this.a = 1000;
function A() {
  this.a = 1;
}
A.prototype.a = 10;
A.prototype.geta = function () {
  return this.a;
};
var p = new A();
// p 是A的实例化，指向 A
console.log(p.geta());
```
