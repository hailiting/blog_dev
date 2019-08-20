# TypeScript基础
## 原始数据类型
Javascript类型分为两种：原始数据类型和对象类型
### 原始数据类型：布尔值、数值、字符串、null、undefined以及Symbol
~~~
/*----------boolean-----------*/
let isDone:boolean = false;
// new Boolean() 返回的是一个'Boolean'对象
let createByNewBoolean:Boolean = new Boolean(1);
// 返回 boolean 类型
let createByBoolean:boolean = Boolean(1)
/*----------number-----------*/
// 数值
let decLiteral: number = 6;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
/*----------string-----------*/
let myName: string='Tom';
/*----------void-----------*/
// 没有返回值的函数为void
function alertName():void{
    alert('My name is Rom');
}
// 声明 void 只能赋值 undefined和null
let unusable: void=undefined;
// null undefined 只能付自身的值
let u:undefined = undefined;
let n:null = null;
~~~
### 任意值
~~~
let anyTing: any='hello' || 888|| true || null || undefined;
~~~
### 联合类型
~~~
let myFavoriteNumber:string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// string和number都有toString()方法
function getString(something: string|number):string{
    return something.toString();
}
~~~
### 对象的类型 —— 接口
~~~
interface Person{
    name: string;
    age: number;
}
let tom: Person = {
    name: 'Tom',
    age: 23,
}
IUserInfo{
    age: any;
    userName: string;
}
function getUserInfo(user: IUserInfo):string{
    return user.age+'======='+user.userName;
}
------------可选属性-----------
interface Person{
    name: string;
    age?: number;
}
let tom:Person = {
    name:'Tom',
}
------------任意属性-----------
interface Person{
    name: string;
    age?: number;
    [propName: string]: any;
}
let tom: Person = {
    name: 'Tom',
    gender: 'male', // 可加其他属性
}
------------只读属性-----------
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
~~~