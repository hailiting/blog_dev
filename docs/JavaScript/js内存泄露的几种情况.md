# js 内存泄露的几种情况

## 什么是内存泄露

内存泄露是指一块被分配的内存即不能使用，也不能回收，直到浏览器进程结束。
在 C++中，因为是手动管理内存，内存泄露是经常出现的事情，而现在流行的 C#和 Java 等语言采用了自动垃圾回收方法管理内存，正常使用的话，内存不会泄露。浏览器中也采用自动垃圾回收方法管理内存，但由于浏览器垃圾回收方法有 bug，也会产生内存泄露。

## 内存泄露的几种情况

- 1. 当页面中元素被移除或替换时，若元素绑定的事件仍没被移除，在 IE 中不会作出恰当处理，此时要先手工移除事件，不然会存在内存泄露。

```html
<div id="myDiv">
  <input type="button" value="Click me" id="myBtn" />
</div>
<!-- bad -->
<script type="text/javascript">
  var btn = document.getElementById("myBtn");
  btn.onclick = function() {
    document.getElementById("myDiv").innerHTML = "Processing..";
  };
</script>
<!-- god -->
<script type="text/javascript">
  document.onclick = function(event) {
    event = event || window.event;
    if (event.target.id === "myBtn") {
      document.getElementById("myDiv").innerHTML = "Processing..";
    }
  };
</script>
```

- 2. 对于纯粹的 ECMAScript 对象而言，只要没有其他对象引用对象 a、b，也就是说他们相互引用，那么自然不会被垃圾收集系统识别并处理。但在 InternetExplorer 中，如果循环引用中的任何对象是 DOM 节点或 ActiveX 对象，垃圾收集系统则不会发现他们之间的循环关系与系统中的其他对象是隔离的并释放他们。最终他们将被保留在内存中，直到浏览器关闭。

```js
var a = document.getElementById("xx");
var b = document.getElementById("xxx");
a.r = b;
b.r = a;
```

- 3. 闭包可以维持函数内局部变量，使其得不到释放。

```js
// bad
function bindEvent() {
  var obj = document.createElement("xx");
  obj.onclick = function() {};
}
// good
function bindEvent() {
  var obj = document.createElement("xx");
  obj.onClick = onclickHandler;
}
function onclickHandler() {}
// else good
function bindEvent() {
  var obj = document.createElement("xx");
  obj.onclick = function() {};
  obj = null; // 置空
}
```

- 4. 在销毁对象是，删除的不干净，需要遍历属，依次删除

```js
a = { p: { x: 1 } };
b = a.p;
delete a.p;
```

- 5. 自动类型装箱转换

```js
var s = "lalala";
console.log(s.length);
```

`s`本身是一个`string`【基本类型】，并不是 object，没有 length 属性，当访问.length 的时候，后台会隐式创建一个临时的 String 对象封装 s，而这个对象会泄露。主要把基本类型转换为 Object 就可以了。

```js
var s = "lalala";
console.log(String(s).length);
```

- 6. IE 系列特有的问题，在向不在的 DOM 树上的 DOM 元素 appendChild 的时候会造成泄露
