# arguments详解
`arguments`是一个类似数组的对象，对应于传递给函数的参数。
## 描述
arguments对象是所有函数中可用的局部变量。可以使用arguments对象在函数中引用函数的参数。`arguments`包含传递给函数的每个参数的条目，第一个条目的索引是从0开始。
* 参数可以被设置
~~~js
(function () {
  arguments[1] = "hello world";
  console.log(arguments); // [Arguments] { '1': 'hello world' }
  console.log(arguments.length) // 0
})()
~~~
## 属性
* `arguments.callee` 指向当前执行的函数
* `arguments.caller **` 指向调用当前函数的函数
* `arguments.length` 指向传递给当前函数的参数数量
## 具体使用场景
`arguments`对象不是一个`Array`。它类似于数组，但除了长度，没有其他任何数组属性。
但可以把`arguments`转换为数组，去使用数组属性
~~~js
let args = Array.prototype.slice.call(arguments);
let args = [].slice.call(arguments); // 使用slice会阻止某些js引擎中的优化（如V8）
let args = Array.from(arguments);
let args = [...arguments];

let args = (arguments.length===1?[arguments[0]]:Array.apply(null, arguments));

let args = Array.slice(arguments);

typeof arguments // "object"
~~~
### 需要注意的是
一
~~~js
(function func(a=55){
  // 函数在调用的时候没有传递参数，所以 arguments[0] => undefined
  console.log(arguments[0]); // undefined
})()

(function func(a = 55) {
  a = 99;
  // 通过默认参数，更改参数，都不会更新 arguments[0]
  console.log(arguments[0]); // 10
})(10)

(function func(a = 55) {
  arguments[0] = 99;
  console.log(arguments[0]); // 99
  // 如果a有默认值的话，此时的 a 和 arguments 是在创建时就生成的两个没有联系的局部变量
  console.log(a) // 10
})(10)

(function func(a) {
  arguments[0] = 99;
  // 非严格模式下，参数没有默认参数，会追踪arguments的变化
  console.log(arguments[0]); // 99
  console.log(a) // 10
  a = 100
  console.log(arguments[0]); // 100
})(10)
~~~