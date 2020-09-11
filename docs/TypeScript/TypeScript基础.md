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
```

### 任意值

```javascript
let anyTing: any = "hello" || 888 || true || null || undefined;
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
```

### `function`

```ts
// 函数声明
function add01(x: number, y: number, z?: number): number {
  return z ? x + y + z : x + y;
}
console.log(add01(3, 4));

// 函数表达式
const add02 = function(x: number, y: number, z?: number): number {
  return z ? x + y + z : x + y;
};
// 此时的add02有它自己的数据类型
// const add03: string = add02; // type err
const add03: (x: number, y: number, z?: number) => number = add02;
```

### 类型推论

```js
let aaa = "asdf";
aaa = 123; // err
aaa = "asdfds"; // ok
```

## 类 class

- 类（Class）: 定义了一切事物的抽象特点
- 对象（Object）: 类的实例
- 面向对象（OOP）三大特性 : 封装， 继承， 多态

```ts
// 封装
class Animal {
  public name: string; // 默认都是public
  // private namecopy01: string; // private 子类也不能访问
  // protected namecopy02: string; // protected 子类能访问 外部不能访问
  // readonly name: string; // name就不能修改了
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
  }
  run(): string {
    return `miao~, ` + super.run();
  }
}

const maiomiao = new Cat("maiomiao");
// console.log(maiomiao.run())
```

### interface implements 抽象类的属性和方法

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

## 枚举(Enum)

取值被限定到一定范围

```javascript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days[2] === "Tue"); // true


// 会被编译为
var Days;
(function(Days){
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 3] = "Tue";
    ...
})(Days || (Days = {}))
```

用例

```javascript
enum apiList {
    'getCurrentUserInfo' = 'getCurrentUserInfo',
    'getSubscriptionSynthesize' = 'getSubscriptionSynthesize',
}
export type MyApi = {[key in apiList]:()=any};
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

## 泛型 Generics

为了是代码量最少，应用的更灵活

```ts
function echo01(arg: any): any {
  return arg;
}
const result: string = echo01(123);
// 泛型
function echo02<T>(arg: T): T {
  return arg;
}
const str: string = "str";
const wnum: number = 123;
const resultstr = echo02(str);
const resultnum = echo02(wnum);
const resultbol = echo02(true);

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
