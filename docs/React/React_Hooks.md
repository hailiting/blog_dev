# React Hooks

React 团队希望，组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管理管道即可。组件最佳写法应该是函数，而不是类。
Hooks 的设计目的就是加强版的函数组件，完全不使用类，就能写出一个全功能的组件。
学习 hooks，就当是新的，尽量不要用原来的逻辑去套。

```js
// React早期支持的函数组件写法
function Welcome(props) {
  return <h1>hello, {props.name}</h1>;
}
// 缺陷：必须是纯函数，不能包含状态，也不支持生命周期方法，因此无法取代类
```

## 使用 Hooks 注意点

- 只在最顶层使用 Hook 【拒绝在 【循环，条件，嵌套】等环境中使用 Hooks】，确保 Hook 调用顺序
- 在 React 函数中调用 Hooks【或自定义 Hook】

## 为什么用 Hooks:

### 组件很难复用状态逻辑，代码量大

    HOC（高阶组件）会返回空的节点

### 漫天 class 导致热重载和性能问题

`class`不能很好的被打包工具压缩，而且编译会生成大量冗余代码。
大量的`class`会使热重载出现不稳定情况，使用如果有一个更易于优化的 API，何乐而不为

### class 自生具有复杂度和组件嵌套过深 props 层级传递

### 代码逻辑难以理解，例如：生命周期函数

```js
// id addEvent 分别创建一个hook
componentDidMount(){
    const {id} = this.props;
    fetch(`xxx?id=${id}`);
    document.addEventListener("click", callback)
}
componentDidUpdate(){
    const {id} = this.props;
    fetch(`xxx?id=${id}`);
}
componentWillUnmount(){
    // 页面卸载的时候
    document.removeEventListener("click", callback)
}

// hook
import React, { useState, useEffect } from "react";
const MouseTracker: React.FC = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log("这里是当组件mount的时候触发 add effect:", positions.x)
    const updateMouse = (e: MouseEvent) => {
      console.log("inner")
      setPositions({
        x: e.clientX,
        y: e.clientY,
      })
    }
    document.addEventListener("click", updateMouse)
    // 清除点击事件
    return () => {
      console.log("这里是当组件unmount的时候触发 remove effect", positions.x)
      document.removeEventListener("click", updateMouse)
    }
  }, [])
  console.log("render: ", positions.x)
  return (
    <p>X: {positions.x}, Y: {positions.y}</p>
  )
}
export default MouseTracker;

// inner
// render:  381
// remove effect 0
// add effect: 381
```

## Hooks

React Hooks 的意思是：组件尽量写成函数，如果需要外部功能和副作用，就用钩子把外部代码“钩”进来。  
React 可以使用自定义钩子，也可以用默认提供的钩子。  
所有的钩子都是为函数引入外部功能，所以 React 约定，钩子一律使用`use`为前缀，便于识别。钩子就命名为 `useXXXX`

- 只能在函数组件中使用 hooks
- 函数组件业务变更无需修改成 class 组件
- 告别繁杂的 this 和难以记忆的生命周期
- 合并的生命周期 componentDidMount, componentDidUpdate, 和 ComponentWillUnmount
- 包装自己的 hooks，是基于纯命令式的 api
- 更好的完成状态之间的共享，解决原来 class 组件内部封装问题。也解决了高阶组件和函数组件嵌套过深的问题
- useReducer 集成 redux
- useEffect 接收脏操作等到 react 更新了 DOM 之后，他在依次执行我们定义的副作用函数，这里就是一个 io 且异步的操作

### 常用的钩子

- `useState()` 返回有状态值，以及更新这个状态值的函数
- `useEffect()` 接受包含命令式，可能有副作用代码的函数
- `useContext()`接受上下文对象（从`React.createContext`返回值）并返回当前上下文值
- `useReducer()` useState 的替代方案，接受类型为`(state, action)=>newState`的 reducer,并返回与 dispatch 方法配对的当前状态
- `useCallback()`返回一个回忆的`memoized`版本，该版本仅在其中一个输入发生更改时才会变更，纯函数输入输出确定性
- `useMemo()` 纯的一个记忆函数
- `useRef()` 返回一个可变的 ref 对象，其`.current`属性被初始化为传递的参数
- `useImperativeMethods` 自定义使用 ref 时公开给组件的实例值
- `useMutationEffect` 更新兄弟组件之前，它在 React 执行其 DOM 改变的同一阶段同步触发
- `useLayoutEffect` DOM 改变后同步触发，使用它来从 DOM 读取布局并同步重新渲染

## useState() 状态钩子

```js
function useState<S>(initialState: S | (()=>S)):[S, Dispatch<SetStateAction<S>>];
```

`useState()`这个函数接受状态的初始值，该函数返回一个数组，数组的第一个成员是一个变量，下面的例子是 count，指向状态的当前值，第二个成员是一个函数，用来更新状态，约定`set`前缀加上状态的变量名。

```js
import { useState } from "react";
function Example() {
  // 初始值是0，count是值，setCount是设置count的值
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You Click (count) times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

当`initialState`是函数时，就会变成延迟初始化（初始化的时候，会被执行一次）

```js
const [count, setCount] = useState(0);
const [count, setCount] = useState(() => {
  console.log("这里会被初始化的时候执行");
  // class 里的constructor操作可以移植到这
  return 0;
});
// 当第一次执行完后，就和另一句代码效果相同。
```

```js
import React, { useState } from "react";
export default function Button() {
  const [buttonText, setButtonText] = useState("clickme, please");
  function handleClick() {
    return setButtonText("thanks,been clicked!");
  }
  return <button onClick={handleClick}>{buttonText}</button>;
}

// index.js
import React from "react";
import ReactDOM from "react-dom";
import Button from "./button.js";
function App() {
  return (
    <div>
      <Buttom />
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElemment);
```

## `useContext()` 共享状态钩子

- 不用`props`传递参数，用`useContext`接收一个`context`对象（React.createContext 的返回值）并返回该 context 的当前值。
- context 值由上层组件中距离当前组件最近的`<MyContext.Provider>`的 value prop 决定。
- 当组件上层最近的`<MyContext.Provider>`更新时，该 Hook 会触发重渲染，并使用最新传递给`MyContext provider`的`context value`值。
- `*useContext`的参数必须是 context 对象本身。

#### 1，使用 ReactContextAPI，在组件外部建立 Context;

```js
const AppContext = React.createContext({});
// AppContext.Provider 提供一个Context对象，这个对象可以被子组件共享
<AppContext.Provider
  value={{
    username: "superawesome",
  }}
>
  <div className="app">
    <Navbar />
    <Messages />
  </div>
</AppContext.Provider>;

// Navbar
const Navbar = () => {
  const { username } = useContext(AppContext);
  return (
    <div className="navbar">
      <p>AwesomeSite</p>
      <p>{username}</p>
    </div>
  );
};
// Messages
const Messages = () => {
  const { username } = useContext(AppContext);
  return <p> {username}</p>;
};
```

```tsx
import ThemeContext from "./App";
const Dog:React.FC = ()=>{
  const theme = useContent(ThemeContext)
  const style = {
    background: theme.background,
    color: theme.color,
  }
  return (
    <p style={style}> 123</p>
  )
}
interfacr IThemes{
  [key:string]: {
    background: string,
    color: string,
  }
}
const themes:IThemes = {
  "light":{
    background: #fff,
    color: #000,
  }
}
export const ThemeContext = React.createContext(themes.light);
const App:React.FC = ()=>{

  return (
    <>
    <ThemeContext.Provider value={themes.light}>
    <Dog>
    </ThemeContext.Provider>
    </>
  )
};
```

## `useReducer()` action 钩子

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

`useReducer()`接受 Reducer 函数和状态初始值作为参数，返回一个数组，数组的一个成员是状态的当前值，第二个成员是发送 action 的 dispatch 函数。

```js
// reducer
const myReducer = (state, action){
    switch(action.type){
        case "countUp":
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
```

## useEffect() 副作用钩子

```js
function useEffect(effect: EffectCallback, deps?: DependencyList): void;
type EffectCallback = () => (void | (() => void | undefined));
```

`useEffect()`用来引入具有副作用的操作，最常见的是向服务器请求，即以前放`componentDidMount`里的代码，现在都可以放在`useEffect()`里。
`useEffect()`接受两个参数，第一个是函数，异步操作都放这里面，第二个是数组，用于给出 Effect 依赖项，只要这个数组发生变化，`useEffect()`就会执行，第二个参数可以省略，这时每次组件渲染时，都会执行`useEffect()`【注意小心无限循环】;

```js
useEffect(() => {
  console.log("在dep改变时触发，若无dep则每次更新组件都会触发");
  return () => {
    console.log("在组件unmount时触发");
  };
});
```

deps 必须是一个数组，但如果是空数组时：  
即使有 deps，在初始化时也会被触发一次

```js
useEffect(() => {
  console.log("效果等同于 componentDidMount");
  return () => {
    console.log("效果等同于 componentWillUnmount");
  };
}, []);
```

```js
const Person = ({ personId }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  // personId 发生变化时，useEffect可以执行
  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then((response) => response.json())
      .then((data) => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId]);
  if (loading === true) {
    return <p>loading</p>;
  }
  return (
    <div>
      <p>You're viewing: {person.name}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  );
};
```

## `useRef()` 跨渲染周期 保存数据

### 一般用法

```tsx
import React, { useState, useEffect, useRef } from "react";
const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);
  const [on, setOn] = useState(false);
  const domRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    console.log(like);
  }, [like]);
  useEffect(() => {
    if (domRef && domRef.current) {
      console.log(domRef.current);
      domRef.current.onclick = () => {
        console.log("charge you");
      };
    }
  });
  return (
    <>
      <button
        ref={domRef}
        onClick={() => {
          setLike(like + 1);
        }}
      >
        {like} o(￣▽￣)ｄ
      </button>
      <br />
      <button
        onClick={() => {
          setOn(!on);
        }}
      >
        {on + ""}
        <span role="img" aria-labelledby="panda1">
          🏃
        </span>
      </button>
    </>
  );
};
export default LikeButton;
```

### `useRef`横跨渲染周期存储数据，并且对它的修改不会引起组件渲染

```js
import React, { useState, useEffect, useMemo, useRef } from "react";

export default function App(props) {
  const [count, setCount] = useState(0);
  const doubleCount = useMemo(() => {
    return 3 * count;
  }, [count]);
  const timerID = useRef();
  useEffect(() => {
    timerID.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (count > 10) {
      clearInterval(timerID.current);
    }
  });
  return (
    <>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {" "}
        Count: {count}, double: {doubleCount}{" "}
      </button>
    </>
  );
}
```

### 用 useRef 解决 setTimeout 指向 state 旧值，找到 state 指向的最新值

tips: React 的 state 指向的内容是不可变的，每次 state 的更新都是指向变了，并不是释放，只有原来指向的对象没有其他引用的时候，才会被释放。
setTimeout || setInterval 是闭包函数，所以取的依然是原来的 state 指向，而不是新指向。

```js
function Example() {
  const [count, setCount] = useState(0);
  let ref = useRef();
  ref.current = count;
  let timer = null;
  function handleAlertClick() {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      console.log("此时的count: ", ref.current);
    }, 3000);
  }
  return (
    <>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        clickme
      </button>
      <button onClick={handleAlertClick}> show count</button>
    </>
  );
}
```

## 自定义 Hook

将组件逻辑提取到可重用的函数中

```js
// src/hooks/useMousePosition
import { useState, useEffect } from "react";
// 自定义hook一定以 use 开头
const useMousePosition = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPositions({
        x: e.clientX,
        y: e.clientY,
      });
    };
    document.addEventListener("mousemove", updateMouse);
    // 清除点击事件
    return () => {
      document.removeEventListener("mousemove", updateMouse);
    };
  }, []);
  return positions;
};
export default useMousePosition;
// 在使用的页面
import useMousePosition from "xxx/useMousePosition";
const App = () => {
  const positions = useMousePosition();
  return (
    <p>
      {positions.x} {positions.y}
    </p>
  );
};
```

```js
// hooks
const usePerson = (personId) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then((response) => response.json())
      .then((data) => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId]);
  return [loading, person];
};
// use hooks
const Person = ({ personId }) => {
  const [loading, person] = usePerson(personId);
  if (loading === true) {
    return <p>loading</p>;
  }
  return (
    <div>
      <p>You're viewing: {person.name}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  );
};
```

### HOC （Higher order component）

- 高阶组件就是一个函数，接受一个组件作为参数，返回一个新的组件

* Loading 会添加节点
* 逻辑复杂

```js
// WithLoader use
const WrappedDogShow = WithLoader(DogShow, "https://dog.ceo/api/breeds/image/random");
//WithLoader
import React from "react";
import axios from "axios";
interface ILoaderState {
  data: any;
  isLoading: boolean;
}
interface ILoaderProps {
  data: any;
}
const WithLoader = <P extends ILoaderState>(WrappedComponent: React.ComponentType<P>, url: string) => {
  return class LoaderComponent extends React.Component<Partial<ILoaderProps>, ILoaderState>{
    constructor(props: any) {
      super(props);
      this.state = {
        data: null,
        isLoading: false,
      }
    }
    componentDidMount() {
      this.setState({
        isLoading: true,
      })
      axios.get(url).then((result: any) => {
        this.setState({
          data: result.data,
          isLoading: false,
        })
      })
    }
    render() {
      const { data, isLoading } = this.state;
      return (
        <>
          {
            (isLoading || !data) ? <p>data is Loading</p> :
              <WrappedComponent {...this.props as P} data={data} />
          }
        </>
      )
    }
  }
}
export default WithLoader;
```

### Hooks

```ts
// useURLLoader
const useURLLoader = (url: string, data: any[] = []) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(url).then((result) => {
      setData(result.data);
      setLoading(false);
    });
  }, deps);
  return [data, loading];
};
// use useURLLoader
const [data, loading] = useURLLoader("https://dog.ceo/api/breeds/image/random");
```

## useCallback

```js
import React, { useState, useCallback } from "react";
export default function A() {
  const [compName, setCompName] = useState("ddd");
  const compCallback = useCallback((value) => {
    console.log("我走到了这");
    setCompName(value);
  }, []);
  return (
    <>
      <h1>{compName}</h1>
      <div onClick={() => compCallback("ddd")}>ddd</div>
      <div onClick={() => compCallback("aaa")}>aaa</div>
    </>
  );
}
```
