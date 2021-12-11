# rust 基础

## 准备工作

### rust 介绍

- 专注于安全
- 2015 年发布第一版

### 环境搭建

- MacOS & Linux: curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
- source $HOME/.cargo/env
- rustc --version 检查是否安装好

### cargo 介绍+helloworld

```js
// 构建一个Hello工程
cargo new Hello
// 跑
cargo run
cargo build
cargo check
```

```rs
fn main(){
  println!("Hello world");
}
```

## rust 基础

Rust 代码中的函数和变量名使用`snake case`蛇形命名法。在 snake case 中，所有字母都是小写并使用下划线分割单词。

### 通用编程概念

- 变量
  - 可变性
  - 常量
  - 隐藏
- 数据类型
- 函数
- 注释
- 控制流

```rs
const MAX_POINT: u32 = 1000000;
fn main() {
    // 1. 定义变量，默认不可变  let
    // 2. 加 mut 使变量可变
    let a = 1;
    println!("a={}", a);

    let mut b: u32 = 1;
    println!("b={}", b);
    b = 3;
    println!("b={}", b);
    // 3. rust 变量的隐藏性
    let b: f32 = 1.1;
    println!("b={}", b);
    // 3. 常量
    println!("MAX_POINT={}", MAX_POINT);
}
```

#### 数据类型

数据类型有两个子集： 标量（scalar）和 复合（compound）。  
Rust 是静态类型语言，也就是说在编译时就必须知道所有变量的类型。  
当多种类型均有可能时，使用 parse 将 String 转换为数字时，必须增加类型注释
**四种基本标量类型：整形(u- | i-)、浮点型(f32|64)、布尔类型(bool)和字符类型(char 32 位)**
**两个原生的复合类型：元祖(tuple)和数组(array)**

```rs
// err
let guess = "42".parse().expect("Not a number!");
// ok
let guess: u32 = "42".parse().expect("Not a number!");
```

- bool
- char
- 数字类型
  `i8, i16, i32, i64, u8, u16, u32, u64, f32, f64`
- 数组 `[Type;size]` -> size 也是数组的一部分
- 自适应类型（和平台有关系）
  `isize`有符号, `usize`无符号 `println!("max = {}", usize::MAX);`
- 元祖
  将多个其他类型的值组合进一个复合类型的主要方式。元祖长度固定， 一旦声明，其长度不会增大或缩小

  ```rs
  fn main(){
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    let (x, y, z) = tup;
    println!("this value of y is: {}", y);
    let h = tup.0;
    let l = tup.1;
    let m = tup.2;
  }
  ```

  数组里的每一个元素类型必须相同

```rs
fn main() {
    let arr: [u32; 5]=[0,1,2,3,4];
    show(arr);
}
fn show(arr:[u32; 5]){
    for i in &arr{
        println!("{}", i);
    }
}
```

```rs
use std::io;
fn main() {
  let a: [i32; 5] = [1, 2, 3, 4, 5];
  println!("please enter an array index.");
  let mut index = String::new();
  io::stdin()
      .read_line(&mut index)
      .expect("Failed to raad line");
  let index: usize = index
      .trim()
      .parse()
      .expect("Index entered was not a number");
  let element = a[index];
  println!(
      "The value of the element at index {} is: {}",
      index, element
  );
}
```

#### 函数

```rs
fn main(){
  println!("Hello, world!");
  another_function();
}
fn another_function(){
  println!("Another function.");
}
```

要返回值的例子

```rs
// 函数参数必须定义类型
fn five(x:i32) -> i32 {
  // return x+5;
  x + 5
}
fn main() {
  let x = five(4);
  println!("x: {}",x);  // 9

  let xx = 5;
  //  {} 没有 ; 是一个表达式
  let yy = {
    let xx = 3;
    xx + 1
  };
  println!("xx: {}", xx); // 5
  println!("yy: {}", yy); // 4
}
```

#### 控制流

**if else if else 表达式**
Rust 并不会尝试自动地将非布尔值转换为布尔值

```rs
fn main(){
  let number = 3;
  if number<5 {
    println!("<5");
  }  else if number>8 {
    println!(">8");
  } else {
    println!("222");
  }
  // 以为 if 是一个表达式，所以在let语句的右侧使用它
  let condition = true;
  let number = if condition {
    5
  } else {
    6
  };
  println!("this value of number is: {}", number);
}
```

**使用循环重复执行**
Rust 有三种循环： loop、while 和 for

#### loop

- 循环中的 continue

```rs
fn main(){
  let mut count:i32 = 0;
  'counting_up: loop {
    println!("count = {}", count);
    let mut remaining:i32 = 10;
    loop {
      println!("remaining={}", remaining);
      if remaining == 9 {
        break;
      }
      if count == 2 {
        break 'counting_up;
      }
      remaining -= 1;
    }
    count += 1;
  }
  println!("End count = {}", count);
}
```

- 从循环返回

```rs
fn main(){
  let mut counter = 0;
  let result = loop {
    counter += 1;
    if counter == 10 {
      break counter * 2;
    }
  };
  println!("the result is {}", result);
}
```

#### while 条件循环

```rs
fn main(){
  let mut number = 3;
  while number != 0 {
    println!("{}", number);
    number -= 1;
  }
  println!("LIFTOFF");
}
```

#### for 循环

```rs
fn main(){
  let a = [1,2,3,4,5];
  // for element in a.iter(){
  for element in &a {
    println!("the value is: {}", element);
  }
  // for number in (1..4).rev() {
  //   println!("{}!", number);
  // }
  println!("LIFTOFF");
}
```

### 所有权

所有权（系统）是 Rust 最为与众不同的特征，它让 Rust 无需垃圾回收（garbage collector）即可保障内存安全。
rust 通过所有权机制来管理内存，编译器在编译就会根据所有权规则对内存的使用进行检查

#### 栈（Stack）和堆（Heap）

栈和堆都是代码在运行时可供使用的内存，但是他们的结构不同。  
**栈以放入值的顺序存储值，并以相反的顺序取出值，这也被称作后进先出**。增加数据叫做**进栈**push onto the stack，而移动数据叫做出栈 popping off the stack。
**栈中所有数据都必须占用已知且固定的大小**。在编译时大小未知或大小可变的数据

#### 所有权规则

#### 变量作

#### String 内存回收

- String 类型示例
- 变量交互方式一：移动
- 变量交互方式二：clone
- 所有权和函数

#### 移动

#### clone

#### 栈上数据拷贝

#### 函数和作用域

### 结构体

### 枚举与模式匹配

### vector, 字符串，哈希

### 所有权

### 结构体

### 枚举与模式匹配

### vector, 字符串，哈希

### 包，crate 和模块

### 测试

## rust 进阶

### 错误处理

### 泛型

### trait

### 生命周期

### 迭代器已闭包

### 智能指针

### 线程

### 面向对象

### 高级特征

## 实战
