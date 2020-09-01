# JS基础
## 1 javascript的typeof返回哪些数据类型
~~~javascript
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
~~~javascript
({}) instanceof Object; // true
([]) instanceof Array; // true
(/aa/g) instanceof RegExp; // true
(function(){}) instanceof Function; // true
~~~
## 2 列举3种类型转换和2种隐式类型转换
强制： parseInt, parseFloat, Number()
隐式： '==' => 1==true   null == undefined // true
## 3 slice() split() join() 区别
* `arrayObject.slice(start,end)` 从已有数组返回选定元素 【原数组不变】
* `arrayObject.splice(index, howmany, item1,item2....itemX)`向|从 数组中 添加|删除 项目，然后返回被删除的项目【原数组改变】
* `stringObject.split(separator, howmany)` 字符串分割成字符串数组
* `arrayObject.join(separator)` 把数组所有元素放到一个字符串

## 4 null 与 Undefined
~~~js
console.log(null == undefined)  // true
console.log(null === undefined)  // false
~~~
### null
* 代表`空置`，代表一个空对象指针，即没有对象；
* `typeof null === "object"` true，所有可以把`null`看成特殊对象值；
#### 常见用法是
1. 作为函数的参数，表示该函数的参数不是对象          
2. 作为对象原型链的终点 【`Object.prototype.__proto__ === null`】
### undefined
当一个变量声明未初始化时，得到undefined，undefined值派生自null值
#### 常见用法是
1. 变量被声明却没有赋值，这时候是Undefined          
2. 调用函数时，应该提供的参数没有提供，该参数等于`undefined`          
3. 对象没有赋值的属性，该属性也是`undefined`          
4. 函数没有返回值时，默认返回`undefined`          