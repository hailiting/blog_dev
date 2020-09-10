# Object 对象

## `Object.defineProperty()`

直接在一个对象上定义一个新属性，或修改一个对象的现有属性，并返回此对象

### 语法

`Object.defineProperty(obj, prop, descriptor)`

- `obj` 要定义属性的对象
- `prop` 要定义或修改的属性名称或`Symbol`
- `desciptor` 要定义或修改的属性描述符

```js
const object1 = {};
Object.defineProperty(object1, "property1", {
  value: 42,
  writable: false,
});
Object1.property = 77; // throws an error in strict mode
console.log(object1.property1); // 42
```
