# Utility Type 的实现原理

Utility Type 的实现原理是基于 TypeScript 中的条件类型（Conditional Types）和映射类型（Mapped Types）
Utility Type 用于创建和操作其他类型的工具类型。
Utility Type 可以通过组合和转换现有的类型来生成新的类型，从而提供更高层次的类型抽象和重用
`Partial<T>`是常用的 UtilityType, 还有 Pick Omit Record

```ts
// Partial<T> 映射类型 [P in keyof T]，遍历T的所有属性，并将每个属性变成可选属性
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]?: T[P];
};
```
