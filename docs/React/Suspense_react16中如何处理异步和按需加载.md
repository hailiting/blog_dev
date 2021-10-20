# Suspense react16 中如何处理异步和按需加载

在 16.6 版本前，react 应用需要使用`code splitting`的时候，会选择`react-loadable`来处理检查代码段是否已加载。在 16.6 后，`React.Suspense`是一个新的添加到核心 React 库中的功能，他的功能和`react-loadable`基本一直。

Suspense 的好处是不一定只能处理组件的按需加载，也能处理其他异步事件

## 处理异步

### 自己实现的流程

首先创建一个 Promise, 模拟一个异步请求

```js
function fetchApi() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("data resolved");
    }, 3000);
  });
  return promise;
}
```

实现处理 `promise` 异步的逻辑

```js
import React, { Suspense, Component } from "react";
// 创建一个Fetcher
var cached = {};
// 接收一个为 promise 的参数
const createFetcher = (promiseTesk) => {
  // 将ref复制为cached
  let ref = cached;
  return () => {
    // 返回一个promise
    const task = promiseTask();
    task.then((res) => {
      ref = res;
    });
    // 注意此处的console
    console.log("进入ref === cached的判断");
    // 如果ref没有发生改变，仍旧和cached相等
    if (ref === cached) {
      // 抛出 task
      throw task;
    }
    console.log("🍎", ref);
    // 正常返回ref，此时已经是promise的结果了
    return ref;
  };
};
```

我们将异步事件传入刚刚定义的 createFetcher

```js
const requestData = createFetcher(fetchApi);
```

创建一个函数组件，用于显示处理好的异步结果

```js
function SuspenseComp() {
  const data = requestData();
  return <p className="name">{data}</p>;
}
```

使用 fallback 参数传入未加载完成的时候的样式

```js
class Test extends Component {
  render(){
    return (
      <Suspense fallback={<div>loading</div>}>
        <SuspenseComp>
      </Suspense>
    )
  }
}
```

#### 原理解析：

`ref===cached`的判断，`throw task`抛出错误，让`Suspense`接收，如果抛出错误，就每隔 3000 会继续来一次，可以理解为轮询

### 处理组件

React 提供了一个 lazy 的方法

```js
import React, { Suspense, Component, lazy } from "react";
const LazyComp = lazy(() => import("./lazy"));
class Test extends Component {
  render() {
    return (
      <Suspense fallback={<div>loading</div>}>
        <SuspenseComp>
        <LazyComp />
      </Suspense>
    );
  }
}
class Lazy extends Component {
  render() {
    return <div>my name lazy</div>;
  }
}
```

尽管` <SuspenseComp>``<LazyComp /> `加载速度不同，但它依旧是等待`Suspense`中的所有组件都加载完成后才显示出来

## 异步处理 Hooks 版本

Hooks 处理异步只需`react-hooks-fetch`

```js
import { useFetch } from "react-hooks-fetch";
function SuspenseComp() {
  const { error, data } = useFetch("a.php");
  if (error) return <span>出错了</span>;
  if (!data) return null;
  return <span> result: {data.title}</span>;
}
```
