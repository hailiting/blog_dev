# React Hooks之useState, useEffect
## useState
~~~
function useState<S>(initialState: S | (()=>S)):[S, Dispatch<SetStateAction<S>>];
~~~
其中state是他的值，setState是用来设置值的函数，initialState是初始值
~~~
import {useState} from 'react';
function Example(){
    // 初始值是0，count是值，setCount是设置count的值
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>You Click (count) times</p>
            <button onClick={()=>setCount(count+1)}>
                Click me
            </button>
        </div>
    )
}
~~~
当initialState是函数时，就会变成延迟初始化（初始化的时候，会被执行一次）
~~~
const [count, setCount] = useState(0);
const [count, setCount] = useState(()=>{
    console.log("这里会被初始化的时候执行");
    // class 里的constructor操作可以移植到这
    return 0;
})
// 当第一次执行完后，就和另一句代码效果相同。
~~~
## useEffect
~~~
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
~~~
~~~
useEffect(()=>{
    console.log("在dep改变时触发，若无dep则每次更新组件都会触发");
    return ()=>{
        console.log("在组件unmount时触发");
    };
})
~~~
deps必须是一个数组，但如果是空数组时：
~~~
useEffect(()=>{
    console.log('效果等同于 componentDidMount');
}, [])
~~~
即使有deps，在初始化时也会被触发一次


