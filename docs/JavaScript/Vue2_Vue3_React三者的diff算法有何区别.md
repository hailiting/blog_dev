# Vue2 Vue3 React 三者的 diff 算法有何区别

- diff 算法很早就有了
- diff 算法应用广泛，例如 github 的`Pull Request`中的代码 diff
- 如果要严格 diff 两棵树，时间复杂度`O(n^3)`，不可用

## Tree diff 的优化

- 只比较同一层级，不跨级比较
- tag 不同则删除重建（不再去比较内部的细节）
- 子节点通过 key 区分（key 的重要性）

## 不同

- React 特点
  - 仅右移
- Vue2 双端比较
  - 定义四个指针， 四个指针相互比较，直到中间，比较结束
- Vue3 最长递增子序列
