# forin 和 forof 的区别

- for in 可枚举数据`enumerable: true`，例如：对象，数组，字符串
  - for in 的原理是`Object.keys()`
- for of 可迭代数据`arr[Symbol.iterator]() 里包含next()方法`，例如：数组，字符串，Map，Set

## 1. 遍历数组通常用 for 循环

ES5 的话也可以使用 forEach, ES5 具有遍历数组功能的还有 map, filter, some, every, reduce, reduceRight 等，只不过他们的返回结果不太一样，但使用 forEach 遍历数组的话，使用 break 不能中断循环，使用 return 也不能返回到外层函数。

```js
Array.prototype.method = function () {
  console.log(this.length);
};
var myArray = [1, 2, 3, 4, 5];
myArray.name = "数组";
for (var index in myArray) {
  console.log(myArray[index]);
}
// 1
// 2
// 3
// 4
// 5
// 数组
// ƒ () {
//    console.log(this.length);
// }
```

## 2. for in 遍历数组的毛病【对象，数据，字符串】

- 遍历对象：`for...in`可以，`for...of`不可以
- 遍历 Map Set: `for...of`可以，`for...in`不可以
- 遍历 generator: `for...of`可以，`for...in`不可以

- 1. index 索引为字符串型数字，不能直接进行几何运算
- 2. 遍历顺序有可能不是按照实际数组的内部顺序
- 3. 使用`for in`会遍历数组所有的可枚举属性，包括原型。例如上例的原型方法 method 和 name 属性
     所以`for in`更适合遍历对象，不要使用`for in`遍历数组
     可以用`for of`遍历数组

> for in 遍历的是数组的索引（即键名），而 for of 遍历的是数组的元素值
> for of 遍历的只是组内的元素，而不包括数组的原型属性 method 和索引 name

```js
Array.prototype.method = function () {
  console.log(this.length);
};
var myArray = [1, 2, 3, 4, 5];
myArray.name = "数组";
for (var value of myArray) {
  console.log(value);
}
```

## 遍历对象

遍历对象 通常用`for in`来遍历对象的键名

```js
Object.prototype.method = function () {
  console.log(this);
};
var myObject = {
  a: 1,
  b: 2,
  c: 3,
};
Object.getOwnPropertyDescriptors(myObject);
for (var key in myObject) {
  console.log(key);
}
```

`for in`可以遍历到 myObject 的原型方法 method,如果不想遍历原型方法和属性，可以在项目内部加判断，`hasOwnPropery`方法可以判断某属性是否是该对象的实例属性

```js
for (var key in myObject) {
  if (myObject.hasOwnProperty(key)) {
    console.log(key);
  }
}
```

同样可以通过 es5 的`Object.keys(myObject)`获取对象的实例属性组成的数组，不包括原型方法和属性

```js
Object.prototype.method = function () {
  console.log(this);
};
var myObject = {
  a: 1,
  b: 2,
  c: 3,
};
for (var key of Object.keys(myObject)) {
  console.log(key + ": " + myObject[key]);
}
```

## 总结

- for in 可枚举数据`enumerable: true`，例如：对象，数组，字符串
  - for in 的原理是`Object.keys()`
- for of 可迭代数据`arr[Symbol.iterator]() 里包含next()方法`，例如：数组，字符串，Map，Set

- `for...of`适用遍历数/数组对象/字符串/map/set 等拥有迭代器对象的集合。但不能遍历对象，因为没有迭代器的对象。与 forEach()不同的是，它可以正确响应 break、continue 和 return 语句。
- `for...of`循环不支持普通对象，但如果你想迭代一个对象属性，你可以用`for-in`循环，或内建 Object.keys()方法

```js
for (var key of Object.keys(someObjec)) {
  console.log(key + ": " + someObjec[key]);
}
```

- 遍历 map 对象时使用解构

```js
for (var [key, value] of phoneBookeMap) {
  console.log(key + "'s phone number is: " + value);
}
```

- 向任意对象添加`[Symbol.itertor]`方法，就可以使用`for..of`循环了
  - 所有拥有`Symbol.iterator`的对象被称为可迭代的。

```js
jQuery.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
```

- for..of 步骤

  - a. 首先调用集合`Symbol.iterator`方法，从而返回一个新的迭代对象
  - b. 迭代器对象可以是任意具有`.next()`方法的对象，forof 循环将重复调用这个方法，每次循环调用一次。

  ```js
  var zeroesForeverIterator = {
    [Symbol.iterator]: function () {
      return this;
    },
    next: function () {
      return {
        done: false,
        value: 0,
      };
    },
  };
  ```

  ```js
  const obj = {
    name: "aaa",
    city: "ci",
  };
  // obj is not iterable
  for (let val of obj) {
    console.log(val);
  }

  const newSet = new Set([1, 2, 3]);
  for (let val of newSet) {
    console.log(val);
  }

  function* foo() {
    yield 10;
    yield 20;
    yield 30;
    yield 40;
    yield 50;
  }
  for (let key of foo()) {
    console.log(key);
  }
  ```
