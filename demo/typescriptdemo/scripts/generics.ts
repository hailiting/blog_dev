function echo01(arg: any): any {
  return arg;
}
const result: string = echo01(123)
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
  return [tuple[1], tuple[0]]
}
// console.log(swap(["string", "q212"]))

// 约束泛型
function echoWithLength01<T>(arg: T[]): T[] { // 让函数接收包含length属性的参数
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
    return this.data.shift()
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
let arr2: Array<number> = [123, 23.45]

// 用Interface描述函数类型
interface IPlus<T> {
  (a: T, b: T): T;
}
function plus(a: number, b: number): number {
  return a + b
}
const plus1: IPlus<number> = plus;

function plusstr(a: string, b: string): string {
  return a + b
}
const plusstr1: IPlus<string> = plusstr;


