# Object 对象

- `Object.getPrototypeOf`
- `Object.getOwnPropertyDescriptor`
- `Object.getOwnPropertyNames`
- `Object.create`
- `Object.defineProperty`
- `Object.defineProperties`
- `Object.seal`
- `Object.freeze`
- `Object.preventExtensions`
- `Object.isSealed`
- `Object.isFrozen`
- `Object.isExtensible`
- `Object.keys`

## `Object.defineProperty()`

直接在一个对象上定义一个新属性，或修改一个对象的现有属性，并返回此对象

### 语法

`Object.defineProperty(obj, prop, descriptor)`

- `obj` 要定义属性的对象
- `prop` 要定义或修改的属性名称或`Symbol`
- `desciptor` 要定义或修改的属性描述符
  - value 值
  - writable 对象的这个值是否可改 bool
  - enumerable 对象的这个值是否可枚举 bool for in
  - configurable 对象的这个值的配置是否可改 bool

```js
const object1 = {};
Object.defineProperty(object1, "property1", {
  value: 42,
  writable: false,
});
Object1.property = 77; // throws an error in strict mode
console.log(object1.property1); // 42
```

## `Object.keys()`

```js
var json = {
  a: 1,
  b: 2,
};
console.log(Object.keys(json));
console.log(Object.values(json));
```

## `Object.create()`

创建一个拥有指定原型和若干个指定属性的对象
`Object.create(proto, [, propertiesObject])`

```js
var json = {
  a: 1,
  b: 2,
};
var json02 = Object.create(json);
console.log({ json });
console.log({ json02 });
console.log(json === json02); // false
```

```js
function Shape() {
  this.x = 0;
  this.y = 0;
}
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.log("Shape moved");
};
function RectAngle() {
  Shape.call(this);
}
RectAngle.prototype = Object.create(Shape.prototype);
var rect = new RectAngle();
console.log(rect instanceof RectAngle);
console.log(rect instanceof Shape);
rect.move(1, 1);
```
