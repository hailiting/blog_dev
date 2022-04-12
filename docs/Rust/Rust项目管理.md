# Rust 项目管理

- package, crete, module 介绍
- 功能模块引入
- Workspace

## 为什么要做项目管理

- 组织大量代码
- 封装无需外部关系的实现细节
- 代码复用

## Rust 项目管理组件

- package: cargo 工具用来构建、编译测试的空间
- crate: 工具库`src/lib.rs`或可执行程序(`src/main.rs`)
  - rand
  - serde
  - diesel
- module: 在 crate 里组织代码，控制是否对其他模块可见

```
// Module Tree
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment
```

## 模块引入

- use
- pub use
- crate
- self
- super
- as

```sh
$ cargo new project-demo
$ cd project-demo
$ code .
$ cargo run
```

```rs
// main.rs
// mod front_of_house;
use front_of_house:hosting as host;
fn main(){
  // front_of_house::hosting::add_to_waitlist();
  // crate::front_of_house::hosting::add_to_waitlist();
  // hosting::add_to_waitlist()
  host::add_to_waitlist()
}
```

```rs
// front_of_house/mod.rs
pub mod hosting;
mod serving;
```

```rs
// front_of_house/hosting.rs
pub fn add_to_waitlist(){
  println!("add to waitlist");
}
```

## Workspace

- 管理多个 library, binary
- 共享 cargo.lock 和 输出目录
- 依赖隔离
