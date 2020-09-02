# React源码学习


* react核心api
* 探究setState
* 探究diff算法





## CreateElement手写
## Component源码手写
## Render手写
## Hooks原理剖析





### JSX 到 javascript转换的过程
~~~js
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
~~~
### ReactElement

## Fiber, Update, Schedulerx