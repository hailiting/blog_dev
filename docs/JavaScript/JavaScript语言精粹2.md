# JavaScript 语言精粹 2

## 闭包，作用域，原型链

```js
if (!("userName" in window)) {
  console.log("eee");
  var userName = "222";
}
console.log("userName" in window);
console.log(userName);
if (true) {
  console.log(111);
  var a = 222;
}
console.log(a);
```

```js
var obj = {
  user: "sss",
  getName: function() {
    return this.user;
  },
};
var getNameFn = obj.getName;
console.log(getNameFn());
console.log(obj.getName());
```
