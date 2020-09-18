# React 源码学习

- react 核心 api
- 探究 setState
- 探究 diff 算法

## CreateElement 手写

## Component 源码手写

## Render 手写

## Hooks 原理剖析

### JSX 到 javascript 转换的过程

```js
function Comp(){
    return <a></a>
} // 组件开头要大写（babel把jSX转为javascript）
<Comp id="div">
    abc
    <span>test</span>
    <span>test</span>
</Comp>
=>
React.createElement(
    Comp,
    {
        id: "div",
        key: "key"
    },
    'abc',
    React.createElement(
        "span",
        null,
        "test"
    ),
    React.createElement(
        "span",
        null,
        "test"
    ),
)
```

### ReactElement

## Fiber, Update, Schedulerx
