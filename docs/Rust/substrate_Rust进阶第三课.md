# substrate_Rust 进阶第三课

## 继续 Kitties 教程

- Substrate 链上升级和数据迁移
- Pallet 模块间的功能复用
- 模块功能开发，单元测试，UI
- frame 治理相关模块介绍
  - sudo
  - membership

### [Substrate 链上升级和数据迁移](https://docs.substrate.io/build/upgrade-the-runtime/)

- 为什么 substrate 能升级
  - Substrate 把 runtime 都编译成 WASM, 并保存在链上
  - Client 读取 WASM 的代码，通过 WASM Executor 来进行状态转变
  - 当新的 WASM 代码设置到链上之后，新的 runtime 逻辑就生效了
- 升级过程
  - 升级 spec 版本号
  - 编译新的 WASM, WASM_TARGET_DIRECTORY=$(pwd)
  - 通过 Sudo 或链上治理来更新 WASM

#### 数据迁移

- 什么情况数据迁移
  - 模块名字改变，变量名字改变，Key 改变，hash 算法改变，值类型改变

```rs
pub fn migrate<T: Config>()->Weight {
  let mut weight: We
}
```

### [Pallet 功能复用](https://docs.substrate.io/build/pallet-coupling/)

- 模块之间做到尽量的解除耦合
- 面向接口编程
- 模块可以很好的被复用
- pallet 应该可以任意组合

### Sudo

## 作业

- Pallet Kitties 的单元测试，尽量覆盖所有的方法和错误
- [基于 Kitties-course 前端项目](https://github.com/SubstrateCourse/advance-5)
  - 能创建一个毛孩
  - 每一个毛孩展示成一张卡片，并显示是不是属于你的
  - 可以转让毛孩给另一位用户
- [demo](https://www.awesomescreenshot.com/embed?id=2196893&shareKey=7749c0f9101a5791240bda8a391a1ce9)
