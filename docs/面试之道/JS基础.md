# JS基础
## 1 javascript的typeof返回哪些数据类型
~~~
var a
typeof a; // undefined
a = null
typeof a; // object
a = true
typeof a; // boolean
a = 666
typeof a; // number
a = "hello"
typeof a; // string
a = Symbol()
typeof a; // symbol
a = function(){}
typeof a; // function
a = []
typeof a; // object
a = {}
typeof a; // object
a = /aa/g;
typeof a; // object
~~~
instanceof: 用来判断某个构造函数的prototype属性所指向的对象是否存在于另一个要检测对象的原型链上，即判断一个引用类型的变量具体是不是某个类型的对象
~~~
({}) instanceof Object; // true
([]) instanceof Array; // true
(/aa/g) instanceof RegExp; // true
(function(){}) instanceof Function; // true
~~~
## 2 列举3种类型转换和2种隐式类型转换
强制： parseInt, parseFloat, Number()
隐式： '==' => 1==true   null == undefined // true
## 3 split() join() 区别
split() 字符串分割成数组
join() 数组转换为字符串
## 4 