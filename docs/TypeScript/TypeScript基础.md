# TypeScript 基础

- Javascript that scales(可伸缩的 JavaScript)
- 静态类型风格的类型系统
  动态类型语言(Dynamically Typed Language)  
   不用指定数据类型 javascript python
  静态类型语言(Statically Typed Language)  
   在编译时，声明数据类型 java c c++
- 从 es6-es10 甚至 esnext 的语法支持

## 数据类型

Javascript 类型分为两种：原始数据类型和对象类型

- 函数参数是不能重新赋值类型的

### 七个原始数据类型：

`布尔值(Boolean)`、`数值(Number)`、`字符串(String)`、`null`、`undefined`、`Symbol`、`BigInt` 【变量不分大小写】

- 除 Object 以外的所有类型都是不可变的(值本身无法改变)
  例如：JavaScript 中 String 是不可变的，对字符串的操作一定返回一个新的字符串，原始字符串并没有改变，所以称这些类型为"原始值"

```javascript
/*----------boolean-----------*/
let isDone: boolean = false;
// new Boolean() 返回的是一个'Boolean'对象
let createByNewBoolean: Boolean = new Boolean(1);
// 返回 boolean 类型
let createByBoolean: boolean = Boolean(1);
/*----------number-----------*/
// 数值
let decLiteral: number = 6;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
/*----------string-----------*/
let myName: string = "Tom";
/*----------void-----------*/
// 没有返回值的函数为void
function alertName(): void {
  alert("My name is Rom");
}
// 声明 void 只能赋值 undefined和null
let unusable: void = undefined;
// null undefined 只能付自身的值
let u: undefined = undefined;
let n: null = null;

const aaa: (string | number)[] = ["ass", 111];
```

### 任意值

- void -> 没有类型
- never -> 永远不存在的值或类型
- unknown -> 未知类型

```javascript
let anyTing: any = "hello" || 888 || true || null || undefined;

let c: unknown;
if (typeof c === "number") {
  c.toFixed(2);
} else if (typeof c === "object" && c instanceof Array) {
  c.join("_");
}
```

### 联合类型

```javascript
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;
// string和number都有toString()方法
function getString(something: string | number): string {
  return something.toString();
}
```

### Object 类型

```ts
// 元祖
let user: [string, number] = ["adf", 12];
```

### 对象的类型 —— Interface

- 对对象的形状（shape）进行描述
- 对类（class）进行抽象
- Duck Typing（鸭子类型）
  tips: 鸭子类型：一种类型推断风格。当生成一个鸭子时，一定会有叫，走等鸭子属性，如果没有就会报错。

```javascript
// 定义函数类型
interface Func {
  (num1: number, num2: number): number;
}
const addFunc: Func = (arg1, arg2) => arg1+arg2
// 定义数组类型
interface Role {
  [id: number]: string
}
const role: Role = ["addd", "Assd"]
console.log(role.length) // error 不具备原型类的方法
const role02: Role = {
  0: "addd",
  1: "Assd"
}
interface IPerson {
  readonly id: number; // 只读刷新
  name: string;
  age: number;
  address?: string; // 可选属性
}

const mycomp: IPerson = {
  id: 1212,
  name: "122",
  age: 12,
  // color: "blue",  添加接口没有的属性会报错
}
// mycomp.id = 122;  // 会报错
mycomp.name = "122";

// function
interface IUserInfo{
    age: any;
    userName: string;
}
function getUserInfo(user: IUserInfo):string{
    return user.age+'======='+user.userName;
}
//------------可选属性-----------
interface Person{
    name: string;
    age?: number;
}
let tom:Person = {
    name:'Tom',
}
//------------任意属性-----------
interface Person{
    name: string;
    age?: number;
    // 索引签名
    [propName: string]: any;
}
let tom: Person = {
    name: 'Tom',
    gender: 'male', // 可加其他属性
}
//------------只读属性-----------
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
let tom: Person={
    id:12333,
    name: 'tom',
    gender: 'namlwe',
}
内容兼容
```

### function

- 语法不一样
- 上下文绑定不一样，箭头函数不会创建自己的 this，只会继承 this
- function 适合用作对象的方法定义，因为 function 有 this 值，而箭头函数没有

```js
// function 声明
function add() {}
// 箭头函数
const add = () => {};
```

```ts
// 函数声明
function add01(x: number, y: number, z?: number): number {
  return z ? x + y + z : x + y;
}
console.log(add01(3, 4));

// 函数表达式
const add02 = function (x: number, y: number, z?: number): number {
  return z ? x + y + z : x + y;
};
// 此时的add02有它自己的数据类型
// const add03: string = add02; // type err
const add03: (x: number, y: number, z?: number) => number = add02;
```

重载，只能用 function 定义，不能用箭头函数

```ts
function attr(name: string): string;
function attr(age: number): number;
function attr(nameorage: string | number): string | number {
  if (nameorage && typeof nameorage === "string") {
    console.log("姓名" + nameorage);
  } else {
    console.log("年龄" + nameorage);
  }
  return nameorage;
}
attr(111);
attr("sdass");
```

### Symbol 类型

- Symbol 不能被`for_in`遍历到，也不会被`Object.keys()`,`Object.getOwnPropertyNames()`,`Json.stringify()`获取到
- 可以用 `Object.getOwnPropertySymbols`方法获取到对象的所有 symbol 类型的属性名
- `Reflect.ownKeys` 获取所有属性名

```ts
const t1 = Symbol("name");
const t2 = Symbol("name");
t1 !== t2;

const obj = {
  [t1]: "xxxs",
  age: 12,
};
console.log(Object.getOwnPropertySymbol(obj)); // [Symbol(name)]
console.log(Reflect.ownKeys(obj)); // ["age", Symbol(name)]
```

### 类型推论

```js
let aaa = "asdf";
aaa = 123; // err
aaa = "asdfds"; // ok
```

### 多个参数

```ts
function aa(s: string, ...rest: string[]) {
  return s + " " + rest.join(" ");
}
```

## 类 class

- 类（Class）: 定义了一切事物的抽象特点
- 对象（Object）: 类的实例
- 面向对象（OOP）三大特性 : 封装， 继承， 多态

- 类的定义（修饰符）与继承 extends
- 构造函数的使用 new 时会自动执行
- 类类型接口、接口的继承类

```ts
// 封装
class Animal {
  public name: string; // 默认都是public
  // private namecopy01: string; // private 子类也不能访问
  // protected namecopy02: string; // protected 子类能访问 外部不能访问
  // readonly name: string; // name就不能修改了
  // static  静态的  通过类名访问
  constructor(name: string) {
    this.name = name;
  }
  // 静态属性
  static categoies: string[] = ["mannal", "bird"];
  // 静态方法
  static isAnimal(a) {
    return a instanceof Animal;
  }
  run(): string {
    return `${this.name} is running`;
  }
}
// static 静态属性，外部可直接访问
// console.log(Animal.categoies)

const snake = new Animal("snake");
// console.log(snake.run())
// console.log(Animal.isAnimal(snake))
// 继承
class Dogs extends Animal {
  bark(): string {
    return `${this.name} is barking`;
  }
}
const xiaobao = new Dogs("xiaobao");
// console.log(xiaobao.name)
// console.log(xiaobao.run())
xiaobao.name = "xiaobao02";
// console.log(xiaobao.name)
// console.log(xiaobao.bark())

// 多态
class Cat extends Animal {
  constructor(props) {
    super(props);
    console.log(111, this.run());
    console.log(222, super.run());
  }
  run(): string {
    return `miao~, ` + super.run();
  }
}

const maiomiao = new Cat("maiomiao");
// console.log(maiomiao.run())
```

#### set get

```ts
// tsc index.ts --target ES5
class Hello {
  private _name: string;
  tell() {
    return this._name;
  }
  get name(): string {
    return this._name;
  }
  set name(newName: string) {
    this._name = newName;
  }
}
var h = new Hello();
h.name = "hello";
alert(h.tell());
```

### interface implements 抽象类的属性和方法

- 类与类之间用 extends
- 类与接口之间用 implements
  接口的检查不针对名称，只针对类型
- 接口继承类
  - 接口可以继承类
  - 接口会继承 private 和 protected 修饰成员，但这个接口只可被这个类或它的子类实现

```ts
// 用interface抽象属性类和方法
interface Radio {
  // 类的方法名称
  switchRadio(triggerL: boolean): void;
}
interface Battery {
  checkBatteryStatus();
}
// 接口的继承
interface RadioWithBattery extends Radio, Battery {
  name: string;
}

class Car implements Radio {
  switchRadio() {}
}

// class Cellphone implements Radio, Battery {
class Cellphone implements RadioWithBattery {
  name: "123";
  switchRadio() {}
  checkBatteryStatus() {}
}
```

接口的数组类型

```ts
interface IArr {
  [index: number]: string;
}
var myArr: IArr = ["ss", "ddd"];
alert(myArr[1]);
```

## Modules

```ts
interface StringValidator {
  isAcceptable(s: string): boolean;
}
var lettersRegexp = /^[A-Za-z]+$]/;
var numberRegexp = /^[0-9]+$]/;
class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string): boolean {
    return lettersRegexp.test(s);
  }
}
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string): boolean {
    return s.length === 5 && numberRegexp.test(s);
  }
}
// module 写法
module Time {
  export class Test {
    element: HTMLElement;
    span: HTMLElement;
    timer: any;
    constructor(e: HTMLElement) {
      this.element = e;
      this.element.innerHTML = "现在的时间是： ";
      this.span = document.createElement("span");
      this.element.appendChild(this.span);
      this.span.innerHTML = new Date().toTimeString();
    }
    start() {
      this.timer = setInterval(
        () => (this.span.innerHTML = new Date().toTimeString()),
        500
      );
    }
    stop() {
      clearInterval(this.timer);
    }
  }
}
// jsTimer.js
var div = document.createElement("div");
document.body.appendChild(div);
var obj = new Time.Test(div);
var button = document.createElement("button");
button.innerHTML = "start";
button.onclick = function () {
  obj.start();
};
document.body.appendChild(button);

var button2 = document.createElement("button");
button2.innerHTML = "stop";
button2.onclick = function () {
  obj.stop();
};
document.body.appendChild(button2);
```

## 枚举(Enum)

取值被限定到一定范围

```javascript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true  enum 的索引值是可以修改的
console.log(Days[2] === "Tue"); // true


// 会被编译为
var Days;
(function(Days){
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 3] = "Tue";
    ...
})(Days || (Days = {}))
enum Days1 {Sun =100, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days1[Sun])  // 100
console.log(Days1[Mon])  // 101
```

用例

```javascript
enum apiList {
    'getCurrentUserInfo' = 'getCurrentUserInfo',
    'getSubscriptionSynthesize' = 'getSubscriptionSynthesize',
}
export type MyApi = {[key in apiList]:()=any};
// as 类型断言
const myApi: MyApi = {} as MyApi;
Object.keys(apiList).forEach((api)=>{
    myApi[api] = async ()=>{
        return request.get(`/my/${api}`);
    };
});
export default myApi;


// 枚举 添加const就变为常量枚举 -> 会优化性能
const enum Direction {
  up = "up",
  down = "down",
  right = "right",
  left = "left",
}
const value = "up";
if (value === Direction.up) {
  console.log("go up!")
}
```

## tuple 元祖 固定类型 长度数组

```ts
const a: [string, numble, boolean] = ["ad", 123, false];
```

## 泛型 Generics

为了是代码量最少，应用的更灵活

```ts
// bad any 没有明显的规范，容易造成类型转换错误
function echo01(arg: any): any {
  return arg;
}
const result: string = echo01(123);
// good 泛型
function echo02<T>(arg: T): T {
  return arg;
}
const str: string = "str";
const wnum: number = 123;
const resultstr = echo02<string>(str);
const resultnum = echo02<number>(wnum);
const resultbol = echo02<bool>(true);

// <T, U> 更像一个占位符
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
// console.log(swap(["string", "q212"]))

// 约束泛型
function echoWithLength01<T>(arg: T[]): T[] {
  // 让函数接收包含length属性的参数
  // console.log(arg.length)
  return arg;
}
// console.log(echoWithLength01([123, 123, 33])); // "asdfs"  也有length，却不行

// 传入值满足约束的条件
interface IWithLength {
  length: number;
}
function echoWithLength02<T extends IWithLength>(arg: T): T {
  // console.log("echoWithLength02: " + arg.length)
  return arg;
}
// console.log(echoWithLength02("1222"));
// console.log(echoWithLength02({ length: 10 }));
// console.log(echoWithLength02(122)); // error: 没lenght

/**
 * 类
 */
// 传入的类型和推出的类型一样
class Queue<T> {
  private data = [];
  constructor() {
    this.data = this.data;
  }
  push(item: T) {
    return this.data.push(item);
  }
  pop(): T {
    return this.data.shift();
  }
}
const queuestr = new Queue<string>();
const queuenum = new Queue<number>();
// queuestr.push(1);
queuenum.push(1);
queuestr.push("1222");
console.log(queuestr.pop().length); // err string 没有 tofixed()
console.log(queuenum.pop().toFixed()); // err string 没有 tofixed()

interface IKeyPair<T, U> {
  key: T;
  value: U;
}
let kp1: IKeyPair<number, string> = { key: 123, value: "123" };
let kp2: IKeyPair<string, number> = { key: "123", value: 123 };

let arr1: number[] = [123, 213, 1];
let arr2: Array<number> = [123, 23.45];

// 用Interface描述函数类型
interface IPlus<T> {
  (a: T, b: T): T;
}
function plus(a: number, b: number): number {
  return a + b;
}
const plus1: IPlus<number> = plus;

function plusstr(a: string, b: string): string {
  return a + b;
}
const plusstr1: IPlus<string> = plusstr;
```

```ts
// 泛型类
class HelloNumber<T> {
  Ten: T;
  add: (a: T, b: T) => T;
}
var myHelloNumber = new HelloNumber<string>();
myHelloNumber.Ten = "Hello";
myHelloNumber.add = function (x, y) {
  return a + b;
};
```

### 类型别名

```ts
type PlusType = (x: number, y: number) => number;
function sum(x: number, y: number): number {
  return x + y;
}
const sum1: PlusType = sum;

// 最常用的使用场景
type NameResolver = () => string;
type NameResolverOrString = string | NameResolver;
function nameResolver(arg: NameResolverOrString): NameResolverOrString {
  if (typeof arg === "string") {
    return arg;
  } else {
    return arg();
  }
}
```

### 类型断言

```ts
// type assertion 类型断言
function getLength(input: string | number): number {
  // const str = input as String;
  // if (str.length) {
  //   return str.length;
  // } else {
  //   const number = input as number;
  //   return number.toString().length;
  // }

  // 类型断言
  if ((<string>input).length) {
    return (<string>input).length;
  } else {
    return input.toString().length;
  }
}
```

## 三方配置文件

@types

```ts
// 声明文件  xx.d.ts
var jQuery: (selector: string) => any;
```

## `tsconfig.json`配置文件

## 其他

### Partial 可选【两个泛型，可选其中一个】

### Omit 忽略【忽略固有属性】

```tsx
interface Todo {
  title: string;
  decription: string;
  completed: boolean;
}
type TodoPreview = Omit<Todo, "description">;
const todo: TodoPreview = {
  title: "clean description",
  completed: false,
};
```

## 接口设置默认值

```ts
type ListNode = {
  data: string | number;
  next?: ListNode;
};
function init(node: ListNode, value: number) {
  node.next!.data = value;
  console.log(node.data);
}
init(
  {
    data: 11,
  },
  "32w43"
);
init(
  {
    data: 11,
    next: 222,
  },
  "32w43"
);
```

```ts
// 泛型上加length属性
interface Yideng {
  length: number
}
function identity<T extends Yideng>(args T):T{
  console.log(args.length)
  return args;
}
identity("sss");
```

```ts
// 元数据 + 注入
import "reflect-metadata";
function inject(serviceIdentifier) {
  return function (target, targetKey, index) {
    // Reflect 是一个内置对象，它提供拦截JavaScript操作的方法，与proxy相似
    Reflect.defineMetadata(serviceIdentifier, "xxxx", target);
  };
}
class IndexController {
  public indexService;
  constructor(@inject("indexService") indexService) {
    this.indexService = indexService;
  }
}
const indexController = new IndexController("经陈毅等");
console.log("----1111---", indexController.indexService);
console.log(
  "----2222---",
  Reflect.defineMetadata("indexService", IndexController)
);
```

## namespaces

## 装饰器

```ts
// tsc --sourcemap index.ts --target ES5 --experimentalDecorators
function hello(target) {
  console.log("dddd");
}
@hello
class APP {}
```

```ts
// 装饰器执行顺序 -> 符合   f(g())
function f() {
  console.log("f(): evaluated");
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("f(): called");
  };
}
function g() {
  console.log("g(): evaluated");
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("g(): called");
  };
}
class C {
  @f()
  @g()
  method() {}
}
// f(): evaluated
// g(): evaluated
// g(): called
// f(): called
```

```ts
// 这是一个装饰器工厂
function color(value: string) {
  // 这是装饰器
  return function (target) {
    // do something with target and value
  };
}
```

```ts
// 参数修饰符
function configurable(value: boolean) {
  return function (target: any, propertyKey: string) {
    console.log("target: ", target);
    console.log("属性", value);
  };
}
function require(value: boolean) {
  return function (target: any, propertyKey: string, index: number) {
    console.log("参数", value);
  };
}
class Hello {
  @configurable(true)
  name: string;
  yideng(@require(false) age: string) {}
}
```

## Mixins

```ts
class Apple {
  isDisposed: boolean;
  dispose() {
    this.isDisposed = true;
  }
}
class Peach {
  isActive: boolean;
  activate() {
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
  }
}
class SmartObject implements Apple, Peach {
  constructor() {
    setTimeout(() => {
      console.log(
        "like peach?" + this.isActive + " ; like Apple? " + this.isDisposed
      );
    }, 500);
  }
  interact() {
    console.log("starting change");
    this.activate();
  }
  isDisposed: boolean = false;
  dispose: () => void;
  isActive: boolean = false;
  activate: () => void;
  deactivate: () => void;
}
applyMixins(SmartObject, [Apple, Peach]);
function applyMixins(derivedCtor: any, baseCtors: any[]): void {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);
```

## declare 关键字

- 声明外部依赖

```js
declare const jQuery: (selector: string) => any;
```

- 类型声明，例如 声明全局类型、声明模块的类型等

```js
declare global {
  interface MyGlobalInterface {
    //
  }
}
declare module "my-module" {
  interface MyModuleInterface {
    //
  }
}
```

## 生成声明文件

- 使用 tsc 中的 `--declaration` 或者配置 compilerOptions
- npm 工具：dts-gen 创建类型文件

```json
// npx tsc
"compilerOptions": {
  "declaration": true, // 生成 *.d.ts
  "outDir": "./dist",
}
// rootDir 根目录
```
