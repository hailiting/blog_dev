# substrate Rust 入门

数据在定义的时候，大小是可知的

- 数据类型
- 流程控制
- 异常处理
- Cargo 项目管理工具
- Node Template 代码导读

## 原生数据类型

Rust 提供了一些原生数据类型

- 有符号的整形：i8, i16, i32, i64 和 isize （指针大小），整形默认为`i32`
- 无符号整形：u8, u16, u32, u64 和 usize（指针大小）
- 浮点类型: f32, f64 （单精度和双精度），浮点型默认为`f64`
- 字符类型是 Unicode 值（4 个字节长度），像 'a', 'α',"∞"
- bool 类型 非 true 即否
- 单元类型`()`,同时值也为`()`
- 数组，例如`[1,2,3]` 类型必须相同
- 元组 Tuple，数据的序列，例如`(1, true)`
- 数据集 动态添加或减少 Vector
- Map key vale 键值对
  - HashMap
  - BTreeMap key 可以做比较，所有元素按照有序形式输出，相比 HashMap， BTreeMap 插入效率低
- Set 值的简单集合
- Struct 结构
- Enum 每一个可能的取值都是有类型的

```rs
fn main(){
  let logical: bool=true;
  let a_float: f64 = 1.0; // Regular annotation 前缀注释
  let an_integer = 5i32; // Suffix annotation 后缀注释

  let default_float = 3.0;
  let default_integer = 7;

  let mut mutable = 12; // Mutable i32
}
```

- 整数可以使用十六进制，八进制或二进制表示，他们需要分别使用前缀`0x`,`0o`,`0b`
- 下划线可以插入到数字中间以增强可读性，例如`1_000`和`1000`相同，`0.000_001`和`0.000001`相同

```rs
fn main(){
  println!("1+2={}", 1u32+2);
  println!("1-2={}", 1i32-2);

  // Bitwise operations
  // 0011 AND 0101 is 0001
  println!("0011 AND 0101 is {:04b}", 0b0011u32 & 0b0101);
  // 0011 or 0101 is 0111
  println!("0011 OR 0101 is {:04b}", 0b0011u32 | 0b0101);
  // 0011 XOR 0101 is  0110
  println!("0011 XOR 0101 is {:04b}", 0b0011u32 ^ 0b0101);
  // 1<<5 is 32
  print("1<<5 is {}", 1u32 << 5);
  // 0x80 >> 2 is 0x20
  print("0x80 >> 2 is 0x{:x}", 0x80u32>>);
  // One million is written as 1000000
  println!("One million is written as {}", 1_000_000u32);
}
```

### 元组

元组是一个不同类型值的一个集合，元组使用括号`()`构建，并且每个元组是一个有类型签名`(T1, T2, ...)`的值，T1,T2 是其成员的类型，函数可以使用元组或返回元组，因为元组可以承载任意多个值

```rs
fn reverse(pair: (i32, bool))->(bool, i32){
  let (interger, boolean) = pair;
  (boolean,interger)
}
fn main(){
  let long_tuple = (1u8, 2u16, 3u32, 4u64, -1i8, -2i16, -3i32, -4i64, 0.1f32, 0.2f64, 'a', true);
  println!("{}", long_tuple.0);
  println!("{}", long_tuple.1);

  let tuple_of_tuples = ((1u8,2u16,2u32), (4u64, -1i8), -2i16);
  // one element tuple: (5, )
  println!("one element tuple: {:?}", (5u32, ))
  // one element tuple: 5
  println!("one element tuple: {:?}", (5u32))
}
```

### 宏

```rs
struct S{
  field_a: u8,
  field_b: u8,
}

macro_rules! impl_from_s {
  ($($uint_type: ty), *)=>{
    $(
      impl From<S> for $uint_type {
        fn from(s:S)-> $uint_type {
          <$uint_type>::from(s.field_a) + <$uint_type>::from(s.field_b)
        }
      }
    )
  }
}
impl_from_s!(u8,u16,u32,u64,u128);
// 所以uint类型实现 From
impl From<S> for usize {
  fn from<s:S> -> usize {
    s.field_a+s.field_b
  }
}
```

### Array, Vector, Map, Set

```rs
fn main(){
  let arr = [1,2,3,4];
  let vector = vec!(1, 2, 3);

  let hm = std::collections::HashMap::<i32, i32>::new();
  let bm = std::collections::BTreeMap::<i32,i32>::new();

  let hs = std::collections::HashSet::<i32>::new();
  let bs = std::collections::BTreeSet::<i32>::new();
}

```

## 流程控制

### 分支

```rs
if a>0 {
} else if a<0{
} else {
}

match a{
  0 => println!("a is zero"),
  1..=i32::MAX =>println!("a is positive"),
  _=>println!("a is negative"),
}
```

### 循环

```rs
loop {
   println!("a is zero");
       break;
}
while a>0{
  a = a-1;
}
for number in 1..5 {
  println!("number is {}", number);
}
```

## 异常处理

### Option

```rs
pub enum Option<T> {
  /// No value
  #[stable(feature="rust1", since="1.0.0")]
  None,
  /// Some value `T`
  #[stable(feature="rust1", since="1.0.0")]
  Some(#[stable(feature="rust1", since="1.0.0")] T),
}
```

### Result

```rs
pub enum Result<T, E> {
  /// Contains the success value
  #[stable(feature="rust1", since="1.0.0")]
  Ok(#[stable(feature="rust1", since="1.0.0")] T),
  /// Contains the error value
  Err(#stable(feature="rust1", since="1.0.0") E),
}
// func (app *App) Get() (string, error)
```

### panic

```rs
panic = "abort"
use std::panic;
fn main(){
  let result = panic::catch_unwind(|| {
    // 调用堆栈的行为
    panic!("oh no!");
  })
}
```

## Rust 包管理工具 Cargo

### 常用命令

```shell
# lib 创建一个新的名为restaurant的库
cargo new project-name <--lib>
cargo build <--release>
cargo run
# 检查依赖包的代码版本是否正确
cargo check
# 单元测试
cargo test
```

### Cargo.toml

- workspace 清晰的管理组件库（library）和可执行程序（binary）

```toml
[package]
name="simple"
version="0.1.0"
authors=["xxx<xxx>"]
edition="2022"

[[bin]]
name="simple"
path="src/main.rs"
```

### Cargo.lock 详细依赖信息，Cargo 自动生成

## Node Template 代码导读

`./Cargo.toml`

```toml
[workspace]
members=[
  'node', // 启动网络连接，数据库等底层的代码
  'pallets/template', // runtime的执行逻辑
  'runtime', // 执行所以链上逻辑，编译为wasm代码，运行在链上  function dispatch 链上执行
]
[profile.release]
panic='unwind'
```

- `node`是可执行程序，在对应的`src/main.rs`文件内拥有可执行的 main 函数入口
- `pallets/template`和`runtime`是组件库，在`src/lib.rs`定义了可被外部使用的函数和数据结构
- `panic="unwind"` -> 它和`catch_unwind`一起使用可以捕获某个线程内 panic 抛出异常
  - 在其他编程语言中嵌入 Rust
  - 自定义线程处理逻辑
  - 测试框架，因为测试用例可以 panic，但不能中断测试的运行

### `node/build.rs`

```rs
fn main() {
  // 使用 vergen 生成环境变量，供项目中的env!宏获取
  generate_cargo_keys();
  // 当 .git/HEAD 文件改变即切换Git分支时，重新执行这一脚本
  rerun_if_git_head_changed();
}
```

### `scripts/init.sh`

初始化编译环境，包括升级 Rust 的版本，其中包括 nightly 和 stable 两个发布渠道

```sh
rustup update nightly
rustup update stable
```

添加 WebAssembly 的支持工具，定期执行本脚本，可解决常见的编译问题如某个依赖安装失败

```sh
rustup target add wasm32-unknown-unknown --toolchain nightly
```

### pallets

包含了自定义的 runtime 模块，默认只有一个 template 模块，以此模块为例

#### `cargo.toml`包含：

- package 的基本信息，如`name`, `version`, `authors`等
- package 所依赖的第三方库，以`frame-support`为例，来源是 GitHub 上该代码仓库的某个 commit id，并将`default-features`设为 false（即不使用默认的 feature 进行编译）

```toml
[dependencies.frame-support]
default-features = false
git = 'https://github.com/paritytech/substrate.git'
tag = 'monthly-2021-12'
version = '4.0.0-dev'
```
