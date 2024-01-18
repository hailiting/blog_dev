# 从原型到原型链

为什么要设计原型 -> 共享属性和方法

- 原型链->继承，继承->构造函数和原型
  每个对象都有原型，对象的原型可以通过其构造函数`prototype`属性访问。
  查找一个对象的属性或方法时，如果在对象本身上没有，就会去其原型上查找。
  而原型本身也是一个对象，如果在原型上找不到，就会继续找原型的原型，从而串起来形成一个原型链，原型链的终点是 null

#### 构造函数创建对象

首先我们用构造函数创建一个对象

```javascript
function Person(argument) {} //= fn 构造函数
var person = new Person(); // => person 实例对象
person.name = "nake";
console.log(person.name); // nake
```

在上面这个例子里，Person 是一个构造函数，我们使用 new 创建一个实例对象 person
很简单吧，接下来进入正题

#### prototype

每个函数都有一个 prototype 属性，就是我们经常在各种例子里看到的 prototype，比如：

```javascript
function Person(argument) {}
Person.prototype.name = "nake";
let person01 = new Person();
let person02 = new Person();
console.log(person01.name); // nake
console.log(person02.name); // nake
```

那这个函数的 prototype 属性指向的是什么呢？是这个函数的原型吗？
其实，函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型，也就是这个例子中的 person01 和 person02 的原型
那什么是原型呢？你可以这样理解：每个 JavaScript 对象（null 除外）在创建的时候会关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型“继承”属性。
![构造函数和实例原型中间的关系](https://upload-images.jianshu.io/upload_images/1338363-1cd7ec5acf52c58e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
那么我们该怎么表示实例与实例原型，也就是 person 和 Person.prototype 之间的关系呢，这时候我们要讲到第二个属性：
_proto_
每一个 JavaScript 对象（除 null）都具有一个属性，叫`__proto__`，这个属性指向该对象的原型。
为了证明证明这一点，可以做一个小 demo

```javascript
function Person() {}
let person = new Person();
console.log(person.__proto__ === Person.prototype); // => true
```

于是我们更新下关系图：
![关系图](https://upload-images.jianshu.io/upload_images/1338363-1674bb91b2311b0b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？

#### constructor

指向实例倒没有，因为一个构造函数可以生成多个实例，但原型指向构造函数的倒是有，这就是第三个属性： constructor，每个原型都有一个 constructor 属性指向关联的构造函数。
为了验证这一点，我们可以尝试

```javascript
function Person() {}
console.log(Person === Person.prototype.constructor); // true
```

当获取到 person.constructor 时，其实 person 中并没有 constructor 属性，当不能读取到 construct 属性时，会向 person 的原型，也就是 Person.prototype 去找，正好该原型中有该属性，所以：

```javascript
person.constructor === Person.prototype.constructor;
```

所以可以更新一下关系图
![关系图](https://upload-images.jianshu.io/upload_images/1338363-4cb05dab83282dbb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
综上，我们可以得出：

```javascript
function Person() {}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
console.log(Person === Person.prototype.constructor); // true
// Es5 获取对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype); // true
```

了解了构造函数、实例原型、和实例中间的关系，接下来我们讲讲实例和实例原型之间的关系

#### 实例与原型

当读取实例属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最底层为止。
举个例子：

```javascript
function Person() {}
Person.prototype.name = "kity";
var person = new Person();
person.name = "hebe";
console.log(person.name); // hebe
delete person.name;
console.log(person.name); // kity
```

那万一最上层没有找到呢？

#### 原型的原型

在上面，我们已经将了原型也是一个对象，既然时对象，那么我们就可以用最原始的方法创建它，那就是：

```
var obj = new Object()
obj.name = 'hitu'
console.log(obj.name) // hitu
```

其实原型对象就是通过 Object 构造函数生成的，结合之前所说，实例的`__proto__`指向构造函数的 prototype，所以我们更新一下关系图：
![关系图](https://upload-images.jianshu.io/upload_images/1338363-b164e558691a51c4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 原型链

那 Object.prototype 的原型呢？

```javascript
console.log(Object.prototype.__proto__ === null); // true
```

> null 表示“没有对象”，即该处不应该有值

所以 Object.prototype.**proto**的值为 null 跟 Object.prototype 没有原型是一样的意思。
所以查找属性的时候，查到 Object.prototype 就停止查找了。
所以最后一张关系图可更新为：
![关系图](https://upload-images.jianshu.io/upload_images/1338363-4ce16552162a0c39.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
其中，图中由相互关联的原型组成的链状结构就是原型链，也就是绿色的线。

#### 补充

#### `__proto__`

`__prototype__`其实不存在与 Person.prototype 中的，实际上，它是来自 Object.prototype,与其说是一个属性，比如说是一个`getter/setter`，当使用`obj.__proto__`时,可以理解成返回了 Object.getPrototypeOf(obj)。

#### 真的是继承吗？

前面讲，“每一个对象都会从原型‘继承’属性”，实际上，继承是一个具有迷惑性的说法，引用《你不知道的 JavaScript》中的话，就是：

> 继承意味着复制操作，然而 JavaScript 默认是不会复制对象的属性的，相反，JavaScript 只是两个对象之间创建的一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法会更准确。

文章出自：https://github.com/mqyqingfeng/Blog/issues/2
