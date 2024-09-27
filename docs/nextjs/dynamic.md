# dynamic

只在客户端编译

```tsx
const CardModule = dynamic(() => import("@/components/ui/card"), {
  ssr: false, // 确保在服务端渲染时不加载组件
});
```

## `"use client"`

其标记为一个客户端组件，这意味着这个组件及其子组件将在客户端进行渲染
在以下情况可以仍然使用`next/dynamic`

- 需要更细的颗粒度控制加载时机
  - 比如：根据用户的操作或条件来决定是否加载某个组件
- 想要在代码中明确地展示延迟加载逻辑，以便理解和调试
