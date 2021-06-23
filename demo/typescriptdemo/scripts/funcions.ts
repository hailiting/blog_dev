// 函数声明
function add01(x: number, y: number, z?: number): number {
  return z ? x + y + z : x + y;
}
console.log(add01(3, 4))

// 函数表达式
const add02 = function (x: number, y: number, z?: number): number {
  return z ? x + y + z : x + y;
}
// 此时的add02有它自己的数据类型 
// const add03: string = add02; // type err
const add03: (x: number, y: number, z?: number) => number = add02;

