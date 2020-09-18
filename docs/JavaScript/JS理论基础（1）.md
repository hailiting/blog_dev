### 创建对象的几种方式

##### JavaScript 中的所有事物都是对象：字符串、数值、数组、函数......

##### 此外，JavaScript 允许自定义对象

##### JavaScript 对象

JavaScript 提供多个内建的对象，比如 String,Date,Array 等等
对象是带有属性和方法的特殊数据类型

#### 1，工厂模式

```
function createPerson(name,age,job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function(){
    console.log(this);
    console.log(this.name);
  }
  return o;
}
var person01 = createPerson("nasha",25,"doc")
person01.sayName();
console.log(person01 instanceof creatPerson) // ERR
 //  this 指向的是 {o产生的对象 }
// nasha
```

弊端：没有解决对象的识别问题，即怎么知道一个对象的类型

#### 2，构造函数模式

```
function Person(name,age,job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function(){
    console.log(this) // Person
    console.log(this.name) //bbb|| aaa
  }
}
var person01 = new Person("aaa",20,"doc")
var person02 = new Person("bbb",30,"teacher")
console.log(person01 instanceof Person) // true
console.log(person01 instanceof Object) // true
console.log(person01.sayName())
// Person{...}
// aa
```

与工厂模式相比：
1，没有显式的创建对象
2，直接将属性和方法赋值给了 this 对象
3，没有 return 语句
要创建 person 的实例，必须使用 new 操作符，以这种方式调用构造函数实际上会经历 4 个步骤
1，创建一个新的对象
2，将构造函数的作用域赋值给新对象
3，执行构造函数里的代码
4，返回新的对象

#### 创建自定义的构造函数可以将它的实际标识为一种特定的类型。

缺点：
1，每个方法都有在每个实例上重新创新一遍；
2，person01 和 person02 都有一个 sayName()的方法，但两个方法不是同一个 Function 实例。即不同实例上同名函数是不相等的，创建两个完成相同任务的 function 是不必要的，而且还有 this 对象在，不需要执行代码前就把函数绑定在特定对象上，这样，上面的函数就可以写成

```
function Person(name,age,job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayname= sayname;
}
function sayname(){
  console.log(this);
  // do sth
}
```

把 sayname 属性设置成全局的 sayname 函数，这样，由于 sayname 包含的是一个指向函数的指针，因此 person01 与 person02 对象就共享了同一个函数。
但是，如果有很多方法，那么就定义了很多全局函数，自定义的引用类型无封装可言，为了解决上述问题，就引入了原型模式。

### 3，原型模式

每创建一个对象都有 prototype 属性（null 除外），这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。
使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。

```
function Person() {};
Person.prototype.name = "bigbang";
Person.prototype.job = "dosth";
Person.prototype.age = 25;
Person.prototype.sayname = function() {
    console.log(this.name);
}
var person01 = new Person();
```

方法 isPrototypeOf()确定实例和原型之间的关联

```
console.log(Person.prototype.isPrototypeOf(person01)); // true
```

Object.getPrototypeOf()返回的是[[prototype]]的值；

```
console.log(Object.getPrototypeOf(person01))
console.log(Object.getPrototypeOf(person01) === Person.prototype) // true
```

hasOwnProperty()方法可以检测一个属性是存在于一个实例中，还是存在原型中的。true 为属性存在于实例中。

```
console.log(person01.hasOwnProperty("name")); // false
```

更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象，并重设 constructor 属性

```
function Person(){}
Person.prototype = {
  name:"...",
  age: 24,
  job:"sadf",
  sayname: function(){
    ...
  }
};
Object.defineProperty(Person.prototype,"constructor",{
  enumerable: false,
  value: Person
})
```

#### 原型与 in 操作符

有两种方法使用 in 操作符：单独使用和 for-in 中循环使用。
使用 for-in 循环，返回的是所有能够通过对象访问的，可枚举的属性。包括实例中的属性，也包括存在于属性中的属性。

```
var person = {
  toString: function(){
    return "My Object"
  }
}
for(var prop in person){
  if(prop == "toString"){
    console.log('get it')
  }
}
```

原型对象的缺点：
1，省略了构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将获取到相同的属性值，这不是最大问题，最大问题是由其共享本性所决定的。
2，对于包含基本值的属性，可以在实例上添加同名属性隐藏原型中的属性，然后，对于包含引用数据类型的值来说，会导致问题。

### 4，组合使用构造函数模式和原型模式

##### 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。所以每个实例都会有自己的一份实例属性副本，但同时共享着对方法的引用，最大限度的节省了内存，同时支持向构造函数传递参数。

```
function Person(name,age,job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['a','b'];
}
Person.prototype = {
  constructor: Person,
  sayName: function(){
    console.log(this,this.name)
  }
}
var person01 = new Person(...)
```

### 5，动态原型模式

```
function Person(name,age,job){
  this.name = name;
  this.age = age;
  this.job = job;
  if(typeof this.sayName != "function"){
    Person.prototype.sayName = function(){
      console.log(this,this.name)
    }
  }
}
```

这段代码只会在初次调用构造函数的时候才执行。这里对原型所做的修改，能够立即在所有实例中得到反映。

### 6，Object.create()

ES5 定义了一个名为 Object.create()的方法，它创建了一个新对象，其中第一个参数是这个对象的原型，第二个参数对对象属性的进一步描述。

### 7，寄生构造函数模式

### 8，稳妥构造函数模式
