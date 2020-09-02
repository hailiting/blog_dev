# React Hooks
React团队希望，组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管理管道即可。组件最佳写法应该是函数，而不是类。
Hooks的设计目的就是加强版的函数组件，完全不使用类，就能写出一个全功能的组件。
~~~js
// React早期支持的函数组件写法
function Welcome(props){
    return <h1>hello, {props.name}</h1>
}
// 缺陷：必须是纯函数，不能包含状态，也不支持生命周期方法，因此无法取代类
~~~
## Hooks
React Hooks的意思是：组件尽量写成函数，如果需要外部功能和副作用，就用钩子把外部代码“钩”进来。                       
React可以使用自定义钩子，也可以用默认提供的钩子。                      
所有的钩子都是为函数引入外部功能，所以React约定，钩子一律使用``use``为前缀，便于识别。钩子就命名为 `useXXXX`                      
### 常用的钩子
* `useState()`
* `useContext()`
* `useReducer()`
* `useEffect()`
* `useRef()`

## useState() 状态钩子
~~~js
function useState<S>(initialState: S | (()=>S)):[S, Dispatch<SetStateAction<S>>];
~~~
``useState()``这个函数接受状态的初始值，该函数返回一个数组，数组的第一个成员是一个变量，下面的例子是count，指向状态的当前值，第二个成员是一个函数，用来更新状态，约定``set``前缀加上状态的变量名。
~~~js
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
当`initialState`是函数时，就会变成延迟初始化（初始化的时候，会被执行一次）
~~~js
const [count, setCount] = useState(0);
const [count, setCount] = useState(()=>{
    console.log("这里会被初始化的时候执行");
    // class 里的constructor操作可以移植到这
    return 0;
})
// 当第一次执行完后，就和另一句代码效果相同。
~~~
~~~js
import React, {useState} from "react";
export default function Button(){
    const [buttonText, setButtonText] = useState("clickme, please");
    function handleClick(){
        return setButtonText("thanks,been clicked!");
    }
    return <button onClick={handleClick}>{buttonText}</button>;
}


// index.js
import React from "react";
import ReactDOM from "react-dom";
import Button from "./button.js";
function App(){
    return (
        <div><Buttom /></div>
    )
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElemment);
~~~
### `useContext()` 共享状态钩子
#### 1，使用ReactContextAPI，在组件外部建立Context;
~~~js
const AppContext = React.createContext({});
// AppContext.Provider 提供一个Context对象，这个对象可以被子组件共享
<AppContext.Provider value={{
    username: "superawesome"
}}>
    <div className="app">
        <Navbar />
        <Messages />
    </div>
</AppContext.Provider>

// Navbar
const Navbar = ()=>{
    const {username} = useContext(AppContext);
    return (
        <div className="navbar">
            <p>AwesomeSite</p>
            <p>{username}</p>
        </div>
    )
}
// Messages
const Messages = ()=>{
    const {username} = useContext(AppContext);
    return (
        <p> {username}</p>
    )
}
~~~
### `useReducer()` action钩子
~~~js
const [state, dispatch] = useReducer(reducer,initialState);
~~~
``useReducer()``接受Reducer函数和状态初始值作为参数，返回一个数组，数组的一个成员是状态的当前值，第二个成员是发送action的dispatch函数。
~~~js
// reducer
const myReducer = (state, action){
    switch(action.type){
        case("countUp"):
            return {
                ...state,
                count: state.count+1
            }
        default: 
            return state;
    }
}
// compounter
function App(){
    const [state, dispatch] = useReducer(myReducer, {count: 0});
    return (
        <div className="App">
            <button onClick={()=>dispatch({type: "countUp"})}>
            +1
            </button>
            <p>Count: {state.count}</p>
        </div>
    )
}
~~~

## useEffect() 副作用钩子
~~~js
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
~~~
``useEffect()``用来引入具有副作用的操作，最常见的是向服务器请求，即以前放`componentDidMount`里的代码，现在都可以放在``useEffect()``里。
``useEffect()``接受两个参数，第一个是函数，异步操作都放这里面，第二个是数组，用于给出Effect依赖项，只要这个数组发生变化，``useEffect()``就会执行，第二个参数可以省略，这时每次组件渲染时，都会执行`useEffect()`【注意小心无限循环】;
~~~js
useEffect(()=>{
    console.log("在dep改变时触发，若无dep则每次更新组件都会触发");
    return ()=>{
        console.log("在组件unmount时触发");
    };
})
~~~
deps必须是一个数组，但如果是空数组时：
~~~js
useEffect(()=>{
    console.log('效果等同于 componentDidMount');
}, [])
~~~
即使有deps，在初始化时也会被触发一次
~~~js
const Person = ({personId})=>{
    const [loading, setLoading] = useState(true);
    const [person,setPerson] = useState({});
    useEffect(()=>{
        setLoading(true);
        fetch(`https://swapi.co/api/people/${personId}/`)
            .then(response => response.json())
            .then(data=>{
                setPerson(data);
                setLoading(false);
            });
    }, [personId])
    if(loading===true){
        return <p>loading</p>
    }
    return <div>
        <p>You're viewing: {person.name}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
    </div>
}
~~~

### 创建自己的Hooks
共享Hook
~~~js
const usePerson = (personId)=>{
    const [loading, setLoading] = useState(true);
    const [person,setPerson] = useState({});
    useEffect(()=>{
        setLoading(true);
        fetch(`https://swapi.co/api/people/${personId}/`)
            .then(response => response.json())
            .then(data=>{
                setPerson(data);
                setLoading(false);
            });
    }, [personId])
    return [loading, person];
}

const Person = ({personId})=>{
    const [loading, person] = usePerson(personId);
    if(loading===true){
        return <p>loading</p>
    }
    return <div>
        <p>You're viewing: {person.name}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
    </div>
}
~~~

## `useRef()` 跨渲染周期 保存数据
### 一般用法
~~~js
import React, {useState, useEffect, useMemo, useRef} from "react";
export default function App(props){
    const [count, setCount] = useState(0);
    const doubleCount = useMemo(()=>{
        return 2*count;
    }, [count]);
    // useRef 创建couterRef对象
    const couterRef = useRef();
    useEffect(()=>{
        document.title = `the value is ${count}`;
        console.log(couterRef.current);
    }, [count]);
    return (
        <>
        // 把couterRef赋值给button
        // couterRef.current 就可以访问到当前button DOM对象
        <button ref={couterRef} onClick={()=>{setCount(count+1)}}>Count: {count}, {doubleCount}</button>
        </>
    )
}
~~~
### ``useRef``横跨渲染周期存储数据，并且对它的修改不会引起组件渲染
~~~js
import React, {useState, useEffect, useMemo, useRef} from "react";

export default function App(props){
    const [count, setCount] = useState(0);
    const doubleCount = useMemo(()=>{
        return 3*count
    }, [count]);
    const timerID = useRef();
    useEffect(()=>{
        timerID.current = setInterval(()=>{
            setCount(count=>count+1)
        }, 1000)
    }, []);
    useEffect(()=>{
        if(count>10){
            clearInterval(timerID.current);
        }
    });
    return (
        <>
        <button onClick={()=>{setCount(count+1)}}> Count: {count}, double: {doubleCount} </button>
        </>
    )
}
~~~
### 用useRef 解决setTimeout指向state旧值，找到state指向的最新值
tips: React的state指向的内容是不可变的，每次state的更新都是指向变了，并不是释放，只有原来指向的对象没有其他引用的时候，才会被释放。
setTimeout || setInterval是闭包函数，所以取的依然是原来的state指向，而不是新指向。
~~~js
function Example(){
    const [count,setCount] = useState(0);
    let ref = useRef();
    ref.current = count;
    let timer= null;
    function handleAlertClick(){
        if(timer){
            clearInterval(timer)
        }
        timer = setInterval(()=>{
            console.log("此时的count: ",ref.current)
        }, 3000)
    }
    return (
        <>
            <button onClick={()=>{setCount(count+1)}}>clickme</button>
            <button onClick={handleAlertClick}> show count</button>
        </>
    )
}
~~~
