# vdom 真的快吗

- Virtual DOM，虚拟 DOM
- 用 js 对象模拟 DOM 节点数据
- 由 React 最先推广使用

## Vue React 等框架的价值

- 组件化（承接之前技术的必要使用）
- 数据视图分离，数据驱动视图（核心）（技术方案：vdom）
- 只关注业务数据，而不用关心 DOM 变化

data 变化 -> diff 算法 (vdom) -> 更新 dom

##

- vdom 并不快，js 直接操作 DOM 才是最快的
- 但`数据驱动视图`需要合适的技术方案，不能全部 DOM 重建
- 所以 vdom 就是目前最合适的技术方案（并不是因为快，而是因为合适）
- 新框架`svelte`, `Compiler`
