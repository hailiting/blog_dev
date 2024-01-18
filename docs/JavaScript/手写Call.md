# 手写 apply call bind

```js
Function.prototype.myCall = function () {
  var thisArg = arguments[0];
  var args = [...arguments].slice(1);
  var invokeFunc = this;
  var isStrict = (function () {
    return this === undefined;
  })();
  if (isStrict) {
    if (typeof thisArg === "number") {
      thisArg = new Number(thisArg);
    } else if (typeof thisArg === "string") {
      thisArg = new String(thisArg);
    } else if (typeof thisArg === "boolean") {
      thisArg = new Boolean(thisArg);
    }
  }
  if (!thisArg) {
    return invokeFunc(...args);
  }
  var uniqueProp = Symbol();
  thisArg[uniqueProp] = invokeFunc;
  return thisArg[uniqueProp](...args);
};
function greet() {
  console.log("Hello, " + this.name + "!");
}

var person = {
  name: "Alice",
};

greet.myCall(person);
```
