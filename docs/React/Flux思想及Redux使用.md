# Flux 思想及 Redux 使用

**函数式编程的容器**

- React 本身只涉及 UI 层，如果搭建大型应用，必须搭配一个前端框架
- Flux 是一种架构思想，专门解决软件的结构问题，它跟 MVC 架构是同一类东西，但是更加简单和清晰
- View: 视图层
- Action: 视图层发出消息（比如 mouseClick）
- Dispatcher(派发器): 用来接收 Actions, 执行回调函数
- Store(数据层): 用来存放应用的状态，一旦发生变动，就提醒 Views 要更新页面

## 整个流程

- 1. 用户访问 View
- 2. View 发出用户的 Action
- 3. Dispatcher 收到 Action,要求 Store 进行相应的更新
- 4. Store 更新后，发出一个 change 事件
- 5. View 收到 change 事件后，更新页面

### 管理应用的 state

- `store.getState()` 可以获取 state
- `store.dispatch(action)` 来触发 state 更新
- `store.subscribe(listener)`来注册 state 变化监听器
- `createStore(reducer, [initialState])` 创建

* `Provider(ReactRedux)`注入 store`<Provider store={store}><App /></Provider>`
* `Actions` Javascript 普通对象，通过 constants 取到
* 对应 Actions Reducer 返回规律，更具体是返回状态 （Redux.combineReducers 返回唯一的 Reducer）
* `Store(Redux.createStore(rootReducer, Redux.applyMiddleware(thunkMiddleware)))`具体实施载体
* components 具体 React 的组件但不涉及状态
* components->App 容器 react-redux 提供 connect 的方法链接 React 组件金额 Redux 类

## React16.6+ useReducer

```js
// bad
import React, { useState, useReducer, useEffect } from "react";
const dataReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return {
        ...state,
        // url: action.url,
      };
    case "+1":
      console.log(state);
      return {
        ...state,
        url: action.url,
      };
    default:
      return state;
  }
};
export default function App() {
  const [url, setUrl] = useState("yidengfe.com");
  const [state, dispatch] = useReducer(dataReducer, {
    url,
  });
  useEffect(() => {
    dispatch({ type: "init" });
  }, []);

  return (
    <span
      onClick={() => {
        console.log(111);
        let a = "dsfasdf";
        setTimeout(function() {
          a += "dfasdff";
          dispatch({ type: "+1", url: a });
        }, 1000);
        dispatch({ type: "+1", url: a });
      }}
    >
      {state.url}
    </span>
  );
}
```

```js
import React, { useState, useReducer, useEffect, memo } from "react";
const useMyState = () => {
  const [_action, set_action] = useState("");
  const [data, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "init":
        return {
          url: "sssss",
        };
      case "+1":
        set_action(action.type);
        return {
          ...state,
          url: action.url ?? state.url,
        };
      default:
        return state;
    }
  }, []);
  useEffect(() => {
    if (_action) {
      let a = "dsfasdf";
      console.log({ _action });
      setTimeout(function() {
        a += "dfasdff";
        dispatch({ type: "+1", url: a });
      }, 1000);
    } else {
      dispatch({ type: "init" });
    }
  }, [_action]);
  console.log({ data });
  return [data, dispatch];
};
const App = memo(() => {
  const [state, dispatch] = useMyState();
  console.log(state);
  return <span onClick={() => dispatch({ type: "+1" })}>{state.url}</span>;
});
export default App;
```
