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
    return (<string>input).length
  } else {
    return input.toString().length;
  }
}
// 声明文件  xx.d.ts
var jQuery: (selector: string) => any;
