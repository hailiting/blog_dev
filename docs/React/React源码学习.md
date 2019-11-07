### JSX 到 javascript转换的过程
~~~
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