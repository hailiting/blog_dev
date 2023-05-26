# rust 基础

[线上运行 rust 的网站](!https://play.rust-lang.org/)

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
cargo check
// cargo build --release
cargo build


./target/release/node-template --dev --tmp
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
**两个原生的复合类型：元组(tuple)和数组(array)**

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
  - f32 单精度
  - f64 双精度
- 数组 `[Type;size]` -> size 也是数组的一部分
- 自适应类型（和平台有关系）
  `isize`有符号, `usize`无符号 `println!("max = {}", usize::MAX);`
- 元组
  将多个其他类型的值组合进一个复合类型的主要方式。元组长度固定， 一旦声明，其长度不会增大或缩小

  ```rs
  fn main(){
    // 元组类型
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

## 所有权

所有权（系统）是 Rust 最为与众不同的特征，它让 Rust 无需垃圾回收（garbage collector）即可保障内存安全。
rust 通过所有权机制来管理内存，编译器在编译就会根据所有权规则对内存的使用进行检查

- 概念与规则
- 所有权转移
- Copy & Clone
- 函数与所有权
- Reference 和 borrowing
- Slice 类型

### 栈（Stack）和堆（Heap）

栈和堆都是代码在运行时可供使用的内存，但是他们的结构不同。  
**栈以放入值的顺序存储值，并以相反的顺序取出值，这也被称作后进先出**。增加数据叫做**进栈**push onto the stack，而移动数据叫做出栈 popping off the stack。
**栈中所有数据都必须占用已知且固定的大小**。在编译时大小未知或大小可变的数据

### 所有权规则

- Rust 中的每一个值都有一个被称为所有者（owner）的变量
- 值在任一时刻有且只有一个所有者
- 当所有者（变量）离开作用域， 这个值将被丢弃

#### 变量

#### String 内存回收

- String 类型示例
- 变量交互方式一：移动
- 变量交互方式二：copy & clone
- 所有权和函数

```rs
fn main(){
  // String::from 在运行时向内存分配器请求内存（memory allocator）
  let mut s = String::from("hello");
  s.push_str(", world!");
  println!("{}", s);
} // 结尾时，自动调用 drop
```

### 变量交互方式一：移动，所有权转移（Move）

如果是简单类型比如数值，bool，赋值会发生数据拷贝，而不是转移所有权

```rs
{
  let s1 = String::from("hello");
  // 在 let s2=s1之后，Rust认为s1不再有效，rust不需要在s1离开作用域后清理
  let s2 = s1;
  println!("{}, world!", s1); // error: value borrowed here after move
}
```

Rust 永远不会自动创建数据的深拷贝，因此，任何自动的复制可以被认为对运行时性能影响最小

#### 变量与数据交互的方式一：copy & clone

赋值时可以通过数据拷贝/克隆，不去转移现有数据所有权

- Copy: 适用于基本数据类型或完全由基本类型组成的复杂类型
  - 如： u32, bool, char, tuples(元祖)
- Clone: 数据存储在堆上，在堆上克隆一份新的
  - 如：string, HashMap, Vec
  - clone 会更慢，`clone()`不可缺省

```rs
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1={}, s2={}", s1, s2);
```

#### 函数与所有权

- 和赋值类似，将值传递给函数也会转移所有权或 copy
- 返回值可以把函数内变量对应值的所有权转移至函数外

```rs
fn main(){
  // clone
  let s = String::from("hello");
  takes_ownership(s); // s 没了
  // copy
  let x = 5;
  make_copy(x); // x还有 i32是Copy

  let s1 = gives_ownership();
  let s2= String::from("hello");
  let s3 = takes_and_gives_back(s2);
  // s3 移出作用域并被丢弃，s2 也移出作用域，但已被移走，所以什么也不会发生，s1移出作用域并被丢弃
}
fn takes_ownership(some_string:String){
  println!("{}", some_string);
}
fn make_copy(some_integer: i32){
  println!("{}", some_integer);
}

fn gives_ownership() -> String {
  let some_string = String::from("hello");
  some_string
}
fn takes_and_gives_back(a_string:String)->String { // a_sting进入作用域
  a_string // 返回 a_string 并移出调用的函数
}
```

```rs
fn main(){
  let s1 = String::from("hello");
  let (s2, len) = calculate_length(s1);
  println!("The length of '{}' is {}", s2, len);
}
fn calculate_length(s:String)->(String, usize){
  let length = s.len();
  (s, length)
}
```

#### 引用`&` 与 借用， Reference 和 Borrowing

- 解引用`*`
- 引用只是引用， 不能改变其值
- 在变量名前放置`&`，获取值的引用
- Borrowing: 函数参数为引用
- 默认是不可变的(immutable), 可变引用为`&mut`
- 引用的作用域是在最后使用的地方结束，而不是大括号的末尾

```rs
fn main(){
  let s1 = String::from("hello");
  let len = calculate_length(&s1);
  println!("The length of '{}' is {}.", s1, len);
}
fn calculate_length(s: &String) -> usize {
  s.len()
}
```

可变引用

```rs
fn main(){
  let mut s = String::from("hello");
  change(&mut s);
  println!("{:?}", s); // hello, world
}
fn change(some_string: &mut String){
  some_string.push_str(", world");
}
```

同一时间只能有一个对某一特定数据进行引用

```rs
// 这些代码会失败
let mut s = String::from("hello");
let r1 = &mut s;
let r2 = &mut s;
println!("{}, {}", r1, r2);//error
```

一个引用的作用域从声明的地方开始一直持续到最后一次使用为止

```rs
let mut s = String::from("hello");
let r1 = &s;
let r2 = &s;
println!("{} and {}", r1, r2);
// r1 和 r2 不再使用
let r3 = &mut s;
print("{}", r3);
```

```rs
fn main(){
  let reference_to_nothing = dangle();
}
fn dangle()=>&String {
  let s = String::from("hello");
  // &s // error 悬垂引用
  s
}
```

### Slice 类型

与引用类似，slice 也不拥有值的所有权，用于引用集合内的部分连续数据

- 与值绑定，当退出作用域，需要清空时，slice 也同时失效
- 定义 slice: `&name[start..end]`, 不包含 end
- 类型签名: `&str`为`string slice`, `&[T]`为`Vector/array` slice

```rs
fn main(){
    let ss=String::from("hello world");
    let hello = &s[0..5]; // hello

    let arr = [1,2,3,4,5,6];
    let slice = &arr[1..3]; // [2,3]

    let s = String::from("dsadsad adfsad");
    let  (a, l) =  first_word(&s);
    s = "ddd ddd";
       println!("a: {}  l: {} s: {}", a, l, s);
}
fn first_word(s: &String)-> (&String, usize) {
    // as_bytes 将 String 转化为字节数组
    let bytes = s.as_bytes();
    // 使用 iter 方法在字节数组上建立一个迭代器
    // enumerate 元素的类举
    for(i, &item) in bytes.iter().enumerate() {
        // 空格字节码
        if item == b' '{
            return (&s, i)
        }
    }
    (&s, s.len())
}
// a: dsadsad adfsad  l: 7 s: dsadsad adfsad
```

```rs
fn main(){
    let mut s = String::from("dsadsad adfsad");
    let  (a, l) =  first_word(&s[..]);
       println!("a: {}  l: {} s: {}", a, l, s);
    s.clear();
}
fn first_word(s: &str)-> (&str, usize) {
    // as_bytes 将 String 转化为字节数组
    let bytes = s.as_bytes();
    // 使用 iter 方法在字节数组上建立一个迭代器
    for(i, &item) in bytes.iter().enumerate() {
        if item == b' '{
            return (&s, i)
        }
    }
    (&s, s.len())
}
// a: dsadsad adfsad  l: 7 s: dsadsad adfsad
```

## 结构体 struct 或 structure

struct 或 structure，是一个自定义数据类型，允许你命名和包装多个相关的值，从而形成一个有意义的组合

### 定义并实例化结构体

```rs
struct User {
  username: String,
  email: String,
  sign_in_count: u64,
  active: bool,
};
// 不可变
let user1  =User {
  email: String::from("some@example.com"),
  username: String::from("Astar"),
  active: true,
  sign_in_count: 1,
};
// 可变
let mut user2 = User {
  email: String::from("some@example.com"),
  username: String::from("Astar"),
  active: true,
  sign_in_count: 1,
};

user2.email = String::from("xxx@example.com");


let user3 = build_user("xxx","ddd");

fn build_user(email:String, username: String) -> User {
  User {
    email,
    username,
    active: true,
    sign_in_count: 1,
  }
}


let user4 = {
  email: String::from("xsd@ad.com"),
  ...user3, // 不能在所以 user3
}
```

#### 使用没有名字字段的元组结构来创建不同的类型

```rs
struct Color(i32, i32, i32);
struct Point(i32,i32,i32);
let black = Color(0,0,0);
let origin = Point(0,0,0);
```

#### 通过派生 trait 增加实用功能

```rs
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}
fn main(){
  let rect1 = Rectangle {width: 30, height: 50};
  println!("rect1 is {:?}", rect1);
  println!("rect1 is {:#?}", rect1);
}
```

Debug 格式打印数值的方法： `dbg!`

```rs
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}
fn main(){
  let scale = 2;
  let rect1 = Rectangle {width: dbg!(30*scale), height: 50};
  dbg!(&rect1);
}
```

### 方法

#### 定义方法

```rs
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}
// impl => implementation的缩写 和xx关联
impl Rectangle {
    fn area(&self)->u32 {
        self.width * self.height
    }
    fn width(&self) -> bool {
        self.width >0
    }
    fn square(size: u32)-> Rectangle {
        Rectangle {width: size, height: size}
    }
}
fn main(){
    let rect1 = Rectangle {width: 30, height: 50};
    let sq = Rectangle::square(3);
    println!("sq: {:?}", sq);
    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area(),
    )
}
```

## 枚举与模式匹配

枚举（enumerations | enums）  
枚举也是一种数据类型，可以用来表示多个变体（同一类型的多种可能性）

### 定义枚举

```rs
enum IpAddr {
  V4(String),
  V6(String),
}
let home = IpAddr::V4(String::from("127.0.0.1"));
let loopback = IpAddr::V6(String::from("::1"));
```

```rs
enum Message {
  Quit, // 没有关联任何数据
  Move {x: i32, y: i32}, // 包含一个匿名结构体
  Write(String), // 包含单独一个String
  ChangeColor(i32, i32, i32), // 包含三个 i32
}
```

#### 可以对枚举定义方法，实现 trait

```rs
enum TrafficLight {
  Red,
  Green,
  Yellow,
}
impl TrafficLight {
  fn time(&self) -> u8 {
    60
  }
}
fn main(){
  let light = TrafficLight::Red;
  println!("light time is: {}", light.time());
}
```

```rs
impl Message {
  fn call(&self){
    //
  }
}
let m = Message::Write(String::from("hello"));
m.call();
```

### match 控制流运算符 模式匹配

- 匹配必须完备
- `_`可以匹配所有的值

```rs
let value = 0u8;
match value {
  1=> println!("one"),
  3=> println!("three"),
  _=>(),
}



fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

fn main(){
    let five = Some(5);
    // 01
    let result = plus_one(five);
    match result {
        Some(i) => println!("result={}", i),
        None => println!("none"),
    }
    // 02
    // map接收的是一个函数调用
    let six = five.map(|i| i+1);
    println!("six: {:?}", six);

    let none:Option<i32>=None;
    let none_result = none.map(|i| i+1);
    println!("none_result: {:?}", none_result);


    // 03-01
    // 模式匹配
    // if let 语法糖
    // 只关心一个分支时
    // 失去了完备性的检查
    if let Some(six) = plus_one(five){
            println!("{}", six);
    };
    if let Some(none) = plus_one(None) {
        println!("{}", none);
     } else {
        println!("none");
     };
    // 03-02
    let some_u8_value = Some(4u8);
    match some_u8_value {
        Some(4)=>println!("three111"),
        _=>(),
    }
    if let Some(3) = some_u8_value {
        println!("three222");
    }
}
```

```rs
fn main(){
    enum Coin {
        Penny,
        Nickel,
        Dime,
        Quarter,
    }
    let a = Coin::Penny;
    let d = value_in_cents(a);
    println!("{}",d);
    fn value_in_cents(coin: Coin) -> u8 {
        match coin {
            Coin::Penny =>1,
            Coin::Nickel =>5,
            Coin::Dime =>10,
            Coin::Quarter =>25,
        }
    }
}
```

```rs
fn main(){
    fn plus_one(x: Option<i32>)-> Option<i32>{
      match x{
        None => None,
        Some(i)=>Some(i+1),
        _ => x,
      }
    }
    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
}
```

### if let 简单控制流

```rs
let some_u8_value = Some(0u8);
if let Some(3) = some_u8_value {
  println!("three");
}  else {
  println!("none");
}
```

## vector, 字符串，哈希

## 包，crate 和模块

- 包(Packages): Cargo 的一个功能，能够允许你构建、测试和分享 crate
- Crates: 一个模块的树形结构，它形成了库或二进制项目
- 模块(Modules)和 use: 允许你控制作用域和路径的私有性
- 路径(path): 一个命名例如结构体、函数和模块等项的方式

### 包和 crete

```sh
$ cargo new my-project
$ ls my-project
```

### 定义模块来控制作用域和私有性

```sh
# 创建一个新的名为restaurant的库
$ cargo new --lib restaurant
```

```rs
#[cfg(test)]
mod tests {
  #[test]
  fn it_works(){
    let result = 2+2;
    assert_eq!(result, 4);
  }
}
```

```rs
// 指定模块名称
mod front_of_house {
    // hosting 模块
    mod hosting {
        fn add_to_waitList(){}
        fn seat_at_table(){}
    }
    mod serving {
        fn take_order(){}
        fn server_order(){}
        fn take_payment(){}
    }
}
```

### 路径用于引用模块数中的项

- 绝对路径（absolute path）从 crate 根开始，以 crate 名或字面值 crate 开头
- 相对路径（relative path）从当前模块开始，以 self、super 或当前模块的标识符开头

```rs
// mod front_of_house {
//   mod hosting {
//     fn add_to_waitList() {}
//   }
// }
mod front_of_house {
  pub mod hosting {
    fn add_to_waitList() {}
  }
}
pub fn eat_at_restaurant(){
  // absolute path
  // Rust 默认所有项都是私有的，可以使用pub关键字暴露路径
  crate::front_of_house::hosting::add_to_waitList();
  // relative path
  front_of_house::hosting::add_to_waitList();
}
```

### 使用 super 起始的相对路径

使用 super 开头来构建从夫模块开始的相对路径。这么做类似于文件系统中以`..`开头的语法。

```rs
// src/lib.rs
fn serve_order(){}
mod back_of_house {
  fn fix_incorrect_order(){
    cook_order();
    super::serve_order();
  }
  fn cook_order(){}
}
```

### 创建共有的结构体和枚举

定义一个公有结构体`back_of_house:Breakfast`

```rs
mod back_of_house {
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }
    impl Breakfast {
        pub fn summer(toast: &str)-> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
    pub enum Appetizer {
        Soup,
        Salad,
    }
}
pub fn eat_at_restaurant(){
    let mut meal = back_of_house::Breakfast::summer("Rye");
    meal.toast = String::from("Wheat");
    println!("I'd like {} toast please", meal.toast);
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}
```

### 使用 use 关键字将名称引入作用域

```rs
mod front_of_house {
  pub mod hosting {
    pub fn add_to_waitList(){}
  }
}

// 使用use将模块引入作用域
use crate::front_of_house::hosting;
// 相对路径
use front_of_house::hosting;

pub fn eat_at_restaurant(){
  hosting::add_to_waitList()
  hosting::add_to_waitList()
  hosting::add_to_waitList()
}
```

```rs
// 引入结构体、枚举和其他项时的习惯用法
use std::collections::HashMap;
fn main(){
  let mut map = HashMap::new();
  map.insert(1, 2);
}

// 两个Result
// 方法一
use std::fmt;
use std::io;
fn function1()->fmt::Result {}
fn function2()->io::Result<()>{}
// 方法二  as 关键字提供新的名称
use std::fmt::Result;
use std::io::Result as IoResult;
fn function1()->Result {}
fn function1()->IoResult<()> {}
```

### 使用 pub use 重导出名称

```rs
mod front_of_house {
  pub mod hosting {
    pub fn add_to_waitList(){}
  }
}
// 如果不用 pub use， 那外部代码不能调用 hosting::add_to_waitList()
pub use create::front_of_house::hosting;
pub fn eat_at_restautrant(){
  hosting::add_to_waitList();
  hosting::add_to_waitList();
  hosting::add_to_waitList();
}
```

### 使用外部包

`Cargo.toml`-> 引用`rand`，来生成随机数

```toml
[dependencies]
rand="0.5.5" // 告诉Cargo从`crates.io`下载rand和其他依赖，并使其可以在项目代码中使用
```

```rs
use rand::Rng;
fn main(){
  let secret_number = rand::thread_rng().gen_range(1, 101);
}
```

### 嵌套路径，来避免大量的 use 行

```rs
// 嵌套前
use std::cmp::Ordering;
use std::io;
use std::io::Write;
// 嵌套后
use std::{cmp::Ordering, io::{self, Write}};
```

### glob 运算符引入所有公有定义

```rs
use std::collections::*;
```

### 分割不同文件

`src/lib.rs`

```rs
mod front_of_house;
pub use crate::front_of_house::hosting;
pub fn eat_at_restaurant(){
  hosting::add_to_waitList();
  hosting::add_to_waitList();
  hosting::add_to_waitList();
}
```

`src/front_of_house.rs`

```rs
pub mod hosting;

// pub mod hosting {
//   pub fn add_to_waitList(){}
// }
```

`src/front_of_house/hosting.rs`

```rs
pub mod hosting {
  pub fn add_to_waitList(){}
}
```

## 常见集合

- vector-> 允许我们一个挨着一个地存储一系列数量可变的值
- 字符串（string） Unicode 编码 4 个字节
- 哈希 map (hash map) -> 允许我们将值与一个特定的键（key）相关联

### vector

#### 新建

```rs
// 新建一个空的vector来存储 i32 类型的值
let v:Vec<i32> = Vec::new();
```

`vec!`宏 -> 根据我们提供的值来创建一个新的 Vec

```rs
// 拥有值1，2，3 的 Vec<i32>
let v = vec![1,2,3];
```

#### 更新

```rs
let mut v=Vec::new();
v.push(5);
v.push(6);
v.push(7);
v.push(8);
```

#### 读 vector 的元素

```rs
let v = vec![1,2,3,4,5];
let third: &i32 = &v[2];
println!("The third element is {}", third);

match v.get(2){
  some(third)=>println!("The third element is {}", third),
  None => println!("There is no third element."),
}


// 超出数组长度限制
let does_not_exist = &v[100]; // Rust会造成panic， 程序会崩溃
let does_not_exist = v.get(100); // 不会panic, 而是返回 None
```

#### 在拥有 vector 中项的引用同时向其增加一个元素，编译会出错

原因是 vector 的工作方式：在 vector 的结尾增加新元素时，在没有足够空间将所有元素依次相邻存放的情况下，可能会要求新内存并将老元素拷贝到新的空间中，这时，第一个元素的引用就指向了被释放的内存。可以借用规则组织程序陷入这种情况。

```rs
let mut v = vec![1,2,3,4,5];
let first = &v[0]; // immutable borrow occurs here
v.push(6);
println!("The first element is: {}", first);
v.pop(); // 移除并返回vector的最后一个元素
```

#### 遍历

```rs
let v = vex![100,32,57];
for i in &v {
  println!("{}", i);
}
// 遍历vector中元素的可变引用
let mut v= vec![100, 32, 57];
for i in &mut v{
  *i += 50;
}
```

#### enum + vec!

```rs
enum SpreadsheetCell {
  Int(i32),
  Float(f64),
  Text(String),
}
let row = vec![
  SpreadsheetCell::Int(3),
  SpreadsheetCell::Text(String::from("blue")),
  SpreadsheetCell::Float(10.12),
]
```

### String

Rust 的核心语言中字符串类型： str，字符串 slice

```rs
let mut s = String::new();
```

#### 用`to_string`方法从字符串字面值创建 String

```rs
// 字符串字面值
let data = "initial contents";
// 创建 String
let s = data.to_string();
let s = "initial contents".to_string();
let s = String::from("initial contents");
```

#### 更新字符串

push_str

```rs
let mut s = String::from("foo");
s.push_str("bar"); // push_str 方法采用字符串slice
```

push-> 被定义为获取一个单独的字符作为参数，并附加到 String 中

```rs
let mut s = String::from("lo");
s.push("l")
```

使用+运算符或 format!宏拼接字符串

```rs
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1+ &s2; // 这里s1被移除，不能继续使用
// fn add(self, s: &str)=>String{}

let s = format!("{}-{}-{}", s2,s3);
// format! 原理和 println! 原理一样
```

索引字符串：Rust 不能索引，因为索引预期总是需要常数时间`O(1)`。但对于 String 不可能保证这样的性能，因为 Rust 必须从开头到索引位置遍历来确定有多少有效的字符。

```rs
let s1 = String::from("hello");
let h=s1[0]; // error  Rust的字符串不支持索引
```

#### 字符串 slice

```rs
let hello = "Здравствуйте";
let s = &hello[0..4];
// 字母的字节长度是2，所以是 Зд   &hello[0..1] 会报错
```

#### 遍历字符串的方法

chars 返回 Unicode 标量值

```rs
for c in "नमस्ते".chars() {
  println!("{}", c);
}
// न
// म
// स
// ्
// त
// े
```

bytes 方法返回每一个原始字节

```rs
for c in "नमस्ते".bytes() {
  println!("{}", c);
}
// 224
// 164
// 165
// 135
```

### 哈希 map 存储键值对

#### 新建一个哈希 map

```rs
use std::collections::HashMap; // 因为不常用，所以没有被 prelude 自动引用
let mut scores = HashMap::new(); // 用new新建一个HashMap
scores.insert(String::from("Blue"), 10); // 使用insert增加元素
scores.insert(String::from("Yellow"), 50);
```

用队伍列表和分数列表创建 Hash map

```rs
use std::collections::HashMap;
let teams = vec![String::from("Blue"), String::from("Yellow")];
let initial_scores = vec![10, 50];
// zip 创建一个元组 vector
// <_, _> 是必要的，因为Rust能够根据vector 中数据的类型推断出 HashMap所
let scores: HashMap<_,_> = teams.iter().zip(initial_scores.iter()).collect();
```

哈希 map 和所有权

```rs
use std::collections::HashMap;
let field_name = String::from("Favorite color");
let field_value = String::from("Blue");
let mut map = HashMap::new();
map.insert(field_name, field_value);
// field_name, field_value 不在有效
```

访问哈希 map 中的值

```rs
use std::collections::HashMap;
let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team_name = String::from("Blue");
let score = scores.get(&team_name);

for(key,value) in &scores {
  println!("{}: {}", key, value);
}
```

#### 更新 HashMap

- 覆盖一个值

```rs
use std::collections::HashMap;
let mut scores = HashMap::new();
scores.insert(String::from("Blue"),10)
scores.insert(String::from("Blue"),25)
println!("{:?}", scores);
```

- 判空，空时插入值

```rs
use std::collections::HashMap;
let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.entry(String::from("Yellow")).or_insert(50);
scores.entry(String::from("Blue")).or_insert(50);
println!("{:?}", scores);
```

- 根据旧值更新一个值

```rs
// 通过HashMap存储单词和计数统计出现的次数
use std::collections::HashMap;
let text = "hello world wonderful world";
let mut map = HashMap::new();
for word in text.split_whitespace(){
  // or_insert 方法事实上会返回这个键的值的一个可变引用（&mut V）
  // 将可变引用存储在count变量中，所以为了赋值必须首先使用星号 * 解引用 count
  let count = map.entry(word).or_insert(0);
  *count += 1;
}
println!("{:?}", map);
```

#### HashMap 函数

HashMap 默认使用一种”密码学安全“（Cryptographically strong）哈希函数，它可以抵抗拒绝服务（Denial of Service, Dos） 攻击

## 测试

## 错误处理

- 可恢复错误 `Result<T, E>`
- 不可恢复错误 `panic!`

### 不可恢复错误 `panic!`

展开 unwinding，Rust 会回溯栈并清理它遇到的每一个函数数据

```rs
// 在release模式下 不展开，直接终止，程序所使用的内存需要由操作系统来清理
[profile.release]
panic="abort"
```

```rs
fn main(){
  panic!("crash and burn");
}
```

### Result 和可恢复错误

[Result 定义的方法有 `is_ok, map, map_or, unwrap`...](!https://doc.rust-lang.org/std/result/enum.Result.html)

```rs
// 使用 Result 类型来处理潜在的错误，这里的T，E都是泛型
enum Result<T,E> {
  Ok(T),
  Err(E),
}

enum Result_u8_string {
  Ok(u8),
  Err(String),
}
```

```rs
use std::fs::File;
fn main(){
  let f = File::open("Hello.txt");
  let f = match f {
    Ok(file) => file,
    // Err(error)=>{
    //   panic!("Problem opening the file: {:?}", error);
    // }
    // 匹配不同的错误
    Err(error)=>match error.kind(){
      ErrorKind::NotFound=> match File::create("hello.txt"){
        Ok(fc)=>fc,
        Err(e)=>panic!("Problem creating the file: {:?}", e),
      },
      other_error => panic!("Problem opening the file: {:?}", other_error)
    },
  };
}
```

```rs
use std::fs::File;
use std::io::ErrorKind;
fn main(){
  let f = File::open("hello.txt").unwrap_or_else(|error| {
    if error.kind() == ErrorKind::NotFound {
      File::create("hello.txt").unwrap_or_else(|error| {
        panic!("Problem creating the file: {:?}", error);
      })
    }
  });
}
```

### 失败时 panic 的简写： unwrap 和 expect

```rs
use std::fs::File;
fn main(){
  // let f = File::open("hello.txt").unwrap();
  // or
  let f = File::open("hello.txt").expect("Failed to open hello.txt");
}
```

### 传播错误

```rs
// 一个函数使用 match 将错误返回给代码调用者
use std::io;
use std::io::Read;
use std::fs::File;

fn read_username_from_file() -> Result<String, io::Error>{
  let f = File::open("hello.txt");
  let mut f = match f{
    Ok(file)=>file,
    Err(e)=> return Err(e),
  };
  let mut s  =String::new();
  match f.read_to_string(&mut s){
    Ok(_)=>Ok(s),
    Err(e)=>Err(e),
  }
}
// ----> 简写
use std::io;
use std::io::Read;
use std::fs::File;
fn read_username_from_file()->Result<String, io::Error>{
  let mut f = File::open("hello.txt");
  let mut s = String::new();
  f.read_to_string(&mut s)?;
  Ok(s);
}
// -----> or
use std::io;
use std::io::Read;
use std::fs::File;
fn read_username_from_file()->Result<String,io::Error>{
  let mut s = String::new();
  File::open("hello.txt")?.read_to_string(&mut s)?;
  Ok(s);
}
// -----> or
// 没有展示所有这些错误处理的机会
use std::io;
use std::fs;
fn read_username_from_file()->Result<String, io::Error>{
  fs::read_to_string("hello.txt")
}
```

```rs
loop {
  let guess:i32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_)=>continue,
  };
  if guess<1 || guess>100{
    println!("The secret number will be between 1 and 100");
    continue;
  }
  match guess.cmp(&secret_number){}
}
```

自定义类型验证有效性

```rs
pub struct Guess {
  value: i32,
}
impl Guess {
  pub fn new(value:i32)->Guess {
    if value<1 || value>100{
      panic!("Guess value must be between 1 and 100, got {}.", value);
    }
    Guess {
      value
    }
  }
  pub fn value(&self) -> i32 {
    self.value
  }
}
```

## 泛型、trait、生命周期

### 泛型

```rs
// 结构体
struct Point<T>{
  x:T,
  y:T,
}
// impl<T> 指定结构体
impl<T> Point<T> {
  fn x(&self)->&T{
    &self.x
  }
}
fn main(){
  let int = Point{x:5, y:10};
  let float = Point{x:5.0, y:10.0};
  println!("{:?}", int.x());
  println!("{:?}", float.x())
}
```

```rs
// 定义了参数类型，其他类型不能共用
fn largest(list: &[i32])-> i32 {
    let mut largest = list[0];
    for &item in list.iter(){
        if item>largest {
            largest = item;
        }
    }
    largest
}


// 用于任何实现了 PartialOrd和Copy trait的泛型 trait bound
fn largest_plus<T: PartialOrd + Copy>(list:&[T])->T{
  let mut largest = list[0];
  for &item in list.iter(){
    if item>largest {
      largest = item;
    }
  }
  largest
}

fn main(){
  let number_list = vec![34, 50, 25, 100, 65];
  let largest01 = largest(&number_list);
  println!("largest01: {:?}", largest01);
  let char_list = vec!['y', 'm', 'a', 'q'];
  let largest02 = largest_plus(&number_list);
  let largest03 = largest_plus(&char_list);
  println!("char_list: {:?}", largest03);
}
```

```rs
// 结构体定义中的泛型
struct Point<T> {
  x:T,
  y:T,
}
fn main(){
  let integer = Point { x: 5, y: 10};
  let float = Point {x: 1.0, y: 4.0};
  let err = Point{x:1, y: 1.0};// 报错
}
```

```rs
// 异常处理机制
// 枚举中定义泛型
enum Option<T>{
  Some(T),
  None, // 不存在任何值的 None
}
```

[Option 定义的方法有`is_some, map, map_or, unwrap`...](!https://doc.rust-lang.org/std/option/enum.Option.html)

```rs
// 方法定义中的泛型
struct Point<T> {
  x: T,
  y: T,
}
impl<T> Point<T> {
  fn x(&self)-> &T {
    &self.x
  }
}
fn main(){
  let p = Point {x: 5, y: 10};
  println!("p.x={}", p.x());
}
```

```rs
// 方法使用了与结构体定义中不同类型的泛型
struct Point<T, U> {
  x: T,
  y: U,
}
impl<T, U> Point<T, U> {
  fn mixup<V, W>(self, other: Point<V, W>)->Point<T, W> {
    Point{
      x: self.x,
      y: other.y,
    }
  }
}
fn main(){
  let p1 = Point {x:5,y:10.4};
  let p2 = Point {x:"Hello", y:"c"};
  let p3 = p1.mixup(p2);
  println!("p3.x={}, p3.y={}", p3.x, p3.y);
}
```

**Rust 通过在编译时进行泛型代码的单态化（monomorphization）来保证效率**

### trait: 定义共享行为 接口

trait 抽象了某种功能或行为

trait 告诉 Rust 编译器某个特定类型拥有可能与其他类型共享的功能

- `Summary`trait 定义，它包含由 `summarize` 方法提供的行为

```rs
// 这里的用法和 interfaces 有点像
// pub 对外可见
pub trait Summary {
  fn summarize(&self) -> String;
}
```

#### 为类实现 trait

```rs
pub trait Summary {
    fn summarize(&self) ->String{
        String::from("(Read more...)")
    }
}
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}
impl Summary for NewsArticle {
    fn summarize(&self)-> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}
pub struct Tweet{
    pub username: String,
    pub content: String,
    pub reply:bool,
    pub retweet: bool,
}
impl Summary for Tweet {
    fn summarize(&self)->String {
        format!("{}: {}", self.username, self.content)
    }
}
// tradit作为参数
pub fn notify(item: impl Summary){
  println!("Breaking news! {}", item.summarize());
}

// trait bound
pub fn notify<T:Summary>(item:T){
  println!("Breaking news! {}", item.summarize());
}

fn main(){
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("xxxxxxx"),
        reply: false,
        retweet: false,
    };
    println!("1 new tweet: {}", tweet.summarize());
}
```

```rs
fn main(){
    let a = Tweet{
        author: String::from("sss"),
        text: String::from("eeee"),
    };
    notify(&a);
}

pub trait Summary {
    fn summarize(&self)->String;
}
struct Tweet {
    author: String,
    text: String,
}
impl Summary for Tweet {
    fn summarize(&self)->String {
        format!("{}: {}", self.author, self.text)
    }
}
pub fn notify<T:Summary>(item:&T){
    println!("{}", item.summarize());
}
```

#### 通过 where 简化 trait bound

```rs
fn some_function<T:Display+Clone, U:Clone+Debug>(t:T,u:U)->i32{}
-> 改为where
fn some_function<T,U>(t:T,u:U)->i32
  where T: Display + Clone,
        U: Clone+Debug
        {}
```

#### 返回实现了 trait 的类型

```rs
fn returns_summarizab() -> impl Summary {
  Tweet {
    username: String::from("horse_ebooks"),
    content: String::from("of course, as you probably already know, people"),
    reply: false,
    retweet: false,
  }
}
```

#### 使用 trait bound 有条件的实现方法

```rs
use std::fmt::Display;
struct Pair<T>{
  x: T,
  y: T,
}
impl<T> Pair<T>{
  fn new(x:T, y:T)->Self{
    Self {
      x,
      y,
    }
  }
}
impl<T:Display+PartialOrd> Pair<T> {
  fn cmp_display(&self) {
    if self.x >= self.y {
      println!("The largest member is x={}", self.x);
    } else {
      println!("The largest member is y={}", self.y);
    }
  }
}
```

```rs
impl<T: Display> ToString for T {}
// blanket implementation 会出现在trait文档的 Implementers 部分
let s = 3.to_string();
```

### 生命周期与引用有效性

#### 生命周期避免了悬垂引用

```rs
{
  let r;
  {
    let x = 5;
    r = &x;
  }
  println!("r: {}", r); // error  r已经没了
}
```

#### 函数中的泛型生命周期

生命周期注解语法

```rs
&i32  // 引用
&'a i32 // 带有显示生命周期的引用
&'a mut i32 // 带有显式生命周期的可变引用
```

#### 引用生命周期的缺省规则

```rs
// fn longest(x: &str, y: &str)-> &str { // error -> &str 没指定
//   if x.len() > y.len() {
//     x
//   } else {
//     y
//   }
// }

// longest 函数定义指定了签名中所有的引用必须有相同的生命周期 'a
fn longest<'a>(x: &'a str, y: &'a str)->&'a str {
    if x.len()>y.len(){
        x
    } else {
        y
    }
}
fn main(){
    let string1 = String::from("abcd");
    let string2 = "xyz";
    let result = longest(string1.as_str(), string2);
    println!("111 The longest string is {}", result);
    let result3;
    {
        let string3 = String::from("xxxx");
        let result2 = longest(string1.as_str(), string3.as_str());
        result3 =longest(string1.as_str(), string3.as_str());
        println!("222 The longest string is {}", result2);
    }
    // error: result2 已经被回收， result3 的引用生命周期必须是两个参数里最短的那个
    println!("3333 The longest string is {}", result3);
}
```

Rust 不允许创建一个悬垂引用， 这时候得返回一个所有权的数据类型而不是一个引用，result 的销毁就由调用者负责清理了

```rs
fn longest<'a>(x: &str, y: &str) -> &'a str {
  let result = String::from("really long string");
  result.as_str() // error
}
```

### 结构体定义中的生命周期注释

```rs
struct ImportantExcerpt<'a> {
  part: &'a str,
}
fn main(){
  let novel = String::from("Call me Ishmeal. Some years ago...");
  let first_sentence = novel.split(".")
    .next()
    .expect("Could not find a '.'");
  // 一个存放引用的结构体，所以其定义需要生命周期注释
  let i = ImportantExcerpt {part: first_sentence};
}
```

### 生命周期省略 Lifetime Elision

- 规则一：每一个引用参数都有自己对应的生命周期参数 `foo<'a,'b>(x: &'a i32, y: &'b i32)`
- 规则二：如果只有一个输入生命周期参数，那么它被赋予所有输出生命周期参数: `fn foo<'a>(x: &'a i32)->&'a i32`
- 规则三：多个输入生命周期，并且其中一个参数是`&self`或`&mut self`，说明是个对象方法（method）,那么所有输出生命周期参数都被赋予`self`的生命周期

### 静态生命周期

```rs
let s: &'static str = "I have a static lifetime.";
```

### 结合泛型类型参数、trait bounds 和生命周期

```rs
use std::fmt::Display;
fn longest_with_an_announcement<'a, T>(x: &'a str, y: &'a str, ann: T)-> &'a str where T:Display {
  // 因为要提前打印，所以Display是必须的
  println!("Announcement! {}", ann);
  if x.len()>y.len() {
    x
  } else {
    y
  }
}
```

## 编写自动化测试

```rs
> cargo new adder --lib
> cd adder
> cargo test
```

```rs
// 由 cargo new 自动生成的测试模块和函数
// src/lib.rs
#[cfg(test)]
mod tests {
  #[test]  // 表明这是一个测试函数，这样测试执行者就知道将其作为测试处理
  fn it_works(){
    assert_eq!(2+2, 4);
  }
  #[test]
  fn another(){
    panic!("Make this test fail");
  }
}
```

- `measured` 针对性能测试
- `filtered out` 需要过滤的行为
- `Doc-tests addr` 是所有文档的测试结果

### 使用 `assert!` 宏来检查结果

```rs
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}
impl Rectangle {
  fn can_hold(&self, other: &Rectangle)->bool {
    self.width > other.width && self.height>other.height
  }
}
#[cfg(test)]
mod tests {
  use super::*;
  #[test]
  fn larger_can_hold_smaller(){
    let larger = Rectangle {width: 8, height: 7};
    let smaller = Rectangle {width: 5, height: 1};
    assert!(larger.can_hold(&smaller));
  }
}
```

### `assert_eq!` -> `==` 和 `assert_ne!` -> `!=`

### 自定义失败信息

```rs
#[test]
fn greeting_containes_name(){
  let result = greeting("Carol");
  assert!(
    result.contains("Carol"),
    "Greeting did not contain name, value was `{}`",
    result
  );
}
```

### 使用`should_panic`检查`panic`

```rs
pub struct Guess {
  value: i32,
}
impl Guess {
  pub fn new(value:i32)->Guess {
    if value<1 || value>100{
      panic!("Guess value must be between 1 and 100, get {}.", value);
    }
    Guess {
      value
    }
  }
}
#[cfg(test)]
mod tests {
  use super::*;
  #[test]
  #[should_panic]
  fn greater_than_100(){
    Guess::new(200);
  }
}
```

### 将`Result<T, E>`用于测试

```rs
#[cfg(test)]
mod tests {
  #[test]
  fn it_works()->Result<(), String> {
    if 2+2==4 {
      Ok(())
    } else {
      Err(String::from("two plus two does not equal four"))
    }
  }
}
```

### 控制测试如何运行

#### 并行或连续的运行测试

```sh
$ cargo test -- --test-threads=1
```

#### 显示函数输出 -> `cargo test -- --nocapture`

```rs
fn prints_and_returns_10(a:i32)->i32{
  println!("I got the value {}", a);
  10
}
#[cfg(test)]
mod tests {
  use super::*;
  #[test]
  fn this_test_will_pass(){
    let value = prints_and_returns_10(4);
    assert_eq!(10, value);
  }
  #[test]
  fn this_test_will_fail(){
    let value = prints_and_returns_10(8);
    assert_eq!(5, value);
  }
}
```

#### `cargo test xxx` 只测试指定函数 ->只要包含 xxx 都会被运行

#### 忽略某些测试

```rs
#[test]
fn it_works(){
  assert_eq!(2+2,  4);
}
#[test]
#[ignore]
fn expensive_test(){

}
```

#### 只运行被忽略的测试

`cargo test -- --ignored`

### 测试的组织结构

- 单元测试（Unit tests）: 小而集中，环境隔离，测试私有接口
- 集成测试（integration tests）: 对于私有库来说是完全外部的。像外部代码一样使用你的代码，只测公有接口而每个测试都有可能测试多个模块

#### `#[cfg(test)]` 只在执行`cargo test`时才编译和运行测试代码

#### 集成测试

- `tests`目录 -> 与`src`同级

```rs
// tests/integration_test.rs
// 因为每个tests目录中的测试文件都是完全独立的crate，所以需要在每个文件中导入库
use adder;
#[test]
fn it_adds_two(){
  assert_eq!(4, addr::add_two(2));
}
```

## 一个 I/O 项目：构建命令行程序

- 接受命令行参数
- 读取文件
- 重构以改进模块化和错误处理
- 采用测试驱动开发完善库的功能
- 处理环境变量
- 将错误信息输出到标准错误而不是标准输出

## 迭代器已闭包

## 智能指针

## 线程

## 面向对象

## 高级特征

## 实战

### `u32`转`Get<u32>`或`Get<Option<u32>>`

```rs
pub struct ConstU32<const T:u32>;
impl<const T: u32> Get<u32> for ConstU32<T> {
  fn get()-> u32{T}
}
impl<const T:u32> Get<Option<u32>> for ConstU32<T> {
  fn get() ->Option<u32>{
    Some<T>
  }
}
```
