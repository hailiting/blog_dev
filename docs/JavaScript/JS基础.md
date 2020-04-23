# JS基础
## javascript基本数据类型
值类型(基本类型): String,Number,Boolean,Null,Undefined,Symbol;
引用数据类型: Object, Array, Function
~~~
typeof null; // object
typeof NaN; // number
typeof undefined; // undefined
typeof ''; // string
typeof true; // boolean
typeof []; // object
typeof Symbol; // function
typeof function(){}; // function
typeof isNaN; // function
Array.isArray(); // false
var arr = [];
arr.constructor;  // ƒ Array() { [native code] }
~~~
## 强制类型转换和隐式类型转换
~~~
parseInt(); // 字符串转整数
parseFloat(); // 字符串转number类型
Number(); // 字符串转number类型
==
~~~
## 数组的操作
split(), slice(), join(), pop(), push(),  unshift(), shift()
~~~
arr.split(index, length); //  切割之后还是数组[改变了原数组]
arr.slice(); // 不改变原数组，重新生成一个数组
arr.join(); //  转换为字符串
push();  // 尾部添加
pop(); // 尾部删除 
unshift(); // 头部添加
shift(); 头部删除
~~~
## 传统事件绑定和符合 W3C 标准的事件绑定有什么区别
~~~
// 普通方法
btn.onclick = function(){
    alert(1) // 不执行
}
btn.onclick = function(){
    alert(2) // 执行
}

// W3C标准事件绑定
btn.addEventListener('click',function(){
    alert(3); // 执行
})
btn.addEventListener('click', function(){
    alert(4); // 执行
})
~~~
* 前者只取最后的绑定，后者会依次触发
* 前者不支持Dom事件流（事件捕获阶段=》目标元素阶段=》事件冒泡阶段），后者支持
* 后者绑定没有前缀'on'
## call 和 apply的基本用法和区别
1，基本应用：用另一个对象替换当前对象，B.apply(A, arguments)=>对A对象应用到B对象上的方法
~~~
var a = function(){
    console.log(this.dog)
}
var b={};
b.dog = 'abc';
a.apply(b); // abc
a.call(b); // abc
~~~
2，区别
~~~
var a = function(){
    console.log(arguments)
}
var b={};
var c = [1,2,3];
a.call(b,c); // [[1,2,3]]
a.apply(b,c);// [1,2,3]
~~~
2.1： apply会把数组查封了存入，call会把参数做为一个整体传入
2.2： call接受对象， apply只能接受数组
~~~
function Dog(){
    this.name = 'dog';
    this.showName = function(){
        console.log('这是一条'+this.name+'!')
    }
}
function Cat(){
    this.name="cat";
    this.showName = function(){
        console.log(this.name+' eat fish')
    }
    // Dog.apply(this)
}
var cat = new Cat();
cat.showName(); // 这是一条dog!
~~~
## 闭包是什么，有什么特性，对页面有什么影响
~~~
function a{
    var aa= 12;
    function b(){
        // fnb就是闭包
        console.log(aa)
    }
}
~~~
闭包就是能读取其他函数内部变量的函数。
闭包的缺点：滥用闭包会造成内存泄露，因为闭包中引用到包裹函数中定义的变量永远都不会被释放，所以在必要的时候，及时释放这个闭包函数。
## 如果阻止事件冒泡和默认事件
~~~
e.stopPropagation(); // 标准浏览器
event.canceBubble=true; // ie9之前
// 阻止a点击之后跳转
return false;
e.preventDefault();
~~~
## 添加，删除，替换，插入到某个接点的方法
~~~
obj.appendChild();
obj.removeChild();
obj.replaceChild();
obj.insertBefore();
~~~
## javascript的本地对象，内置对象和宿主对象
本地对象： Array, Object, Regexp等可以new实例化
内置对象: gload Math 等不能实例化的
宿主对象: window, document等
## document load 和 window.onload 的区别
Document.onload: 是结构和样式加载完才执行js
window.onload: 不仅仅要在结构和样式加载完，还要执行完所有的样式、图片这些资源文件，全部加载完才会触发windo.onload事件
Document.ready: jquery中的$().ready(function)



提币提示  放  2：