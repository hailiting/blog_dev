# Object.create 原理

## 源码

```js
Object.myCreate = function (proto, propertyObject = undefind) {
  if (propertyObject === null) {
    throw "TypeError";
  } else {
    function Fn() {}
    Fn.prototype = proto;
    const obj = new Fn();
    if (propertyObject !== undefined) {
      Object.defineProperties(obj, propertyObject);
    }
    if (proto === null) {
      // 创建一个没有原型对象的对象，Object.create(null);
      obj.__proto__ = null;
    }
    return obj;
  }
};

// 示例：
// 第二个参数null时，抛出TypeError
const throwErr = Object.myCreate({ a: "aa" }, null);
const obj2 = Object.myCreate(
  { a: "aa" },
  {
    b: {
      value: "bb",
      enumerable: true,
    },
  }
);
```
