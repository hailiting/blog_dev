https://doc.rust-lang.org/book/

编辑器 RustRover
https://www.jetbrains.com/rust/
https://www.jetbrains.com/zh-cn/rust/

crate
-- library crate (只有 1 个)
-- binary crate (n) 二进制 crate

std 标准库

cargo create
cargo add xx@xx
cargo update [忽略 .lock 文件]

rust 强类型 固态

Stack 栈 后进先出 LIFO
Heap 堆 无序的

- 堆常见问题
  - Double Free 双重释放
  - Memory Leak 内存泄漏
