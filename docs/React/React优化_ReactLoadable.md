# React优化_ReactLoadable
> 一个动态导入加载组件的高阶组件，实现code-splitting(代码分割)
### 什么是代码分割
就是把项目中一个大的入口文件分割成多个小的，单独的文件进程。
ep:
~~~js
import Loadable from "react-loadable";
import Loading from "./my-loading-component";

const LoadableComponent = Loadable({
  loader: ()=>import("./my-component"),
  loading: Loading,
});
export default class App extends React.Component {
  render(){
    return <LoadableComponent />;
  }
}
~~~
## Route-based splitting(基于路由的代码分割) vs. Component-based splitting(基于组件的代码分割)
在大多数应用中，一个路由往往会包含多个组件，像Modal, tabs等UI组件，而用户并不一定是会去操作这些，所以基于组件分割，当用户操作或需要时在加载对应的组件会大大节约流量，太高访问速度。
## 前后对比
未使用
~~~js
// 
import Bar from "./components/Bar";
class foo extends React.Component {
  render(){
    return <Bar /> 
  }
}
~~~
和foo同步渲染，但在app渲染之前，可以先渲染重要的，Bar延后渲染，所以我们需要的是
~~~js
import loadable from "react-loadable";
class MyComponent extends React.Component {
  state = {
    Bar: null
  };
  componentWillMount(){
    import("./components/Bar").then(Bar=>{
      this.setState({Bar});
    })
  }
  render(){
    let {Bar} = this.state;
    if(!Bar){
      return <Loading />
    } else {
      return <Bar />
    }
  }
}
~~~
以上代码的复杂度提升了很多，还有import失败的话怎么办，服务端渲染怎么办等等
~~~js
// 用loadable改装
import Loadable from "react-loadable";
const LoadableBar = Loadable({
  loader: ()=> import("./components/Bar"),
  loading(){
    return <Loading />
  }
})
~~~
### loading组件优化
~~~js
function Loading(props){
  if(props.error){
    return <div>Error!</div>
  } else if(props.timedOut){
    return <div>Taking a long time...</div>
  } else if(props.pastDelay){
    return <div>Loading...</div>;
  } else {
    return null;
  }
}
// 用单独的loading组件
Loadable({
  loader: ()=> import("./components/Bar"),
  loading: Loading,
  delay: 300, // .3s
  timeout: 10000, // 10s
})
// 自定义渲染 Loadable里的render
Loadable({
  loader: ()=> import('./myComponent'),   // 这样在myComponent里使用 loading而来控制UI
  render(loaded, props){
    let Component = loaded.namedExport;  
    return <Component {...props} />;
  }
})
~~~
#### 加载更多资源 ``Loadable.Map``
~~~js
Loadable.Map({
  loader: {
    Bar: ()=> import('./Bar'),
    i18n: ()=>fetch('./i18n/bar.json').then(res=>res.json()),
  },
  render(loaded, props){
    let Bar = loaded.Bar.default;
    let i18n = loaded.i18n;
    return <Bar {...props} i18n = {i18n} />;
  }
})
~~~
#### 预加载
可以决定哪些组件在渲染之前进行预先加载，具体用法如下
~~~js
const LoadableBar = Loadable({
  loader: ()=> import('./Bar');
  loading: Loading,
})
class MyComponent extends React.Component {
  state = {showBar: false};
  onClick = ()=>{
    this.setState({showBar: true});
  };
  onMouseOver = ()=>{
    LoadableBar.preload(); // 预加载
  };
  render(){
    return (
      <div>
        <button
          onClick={this.onClick}
          onMouseOver={this.onMouseOver}
        >
          Show Bar
        </button>
        {this.state.showBar && <LoadableBar />}
      </div>
    )
  }
}
~~~
### 服务端渲染
~~~js
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './components/app';
const app = express();
app.get('/', (req, res)=>{
  res.send(`
    <!doctype html>
    <html lang='en'>
      <head>...</head>
      <body>
        <div id="app">${ReactDOMServer.renderToString(<App />)}</div>
        <script src="/dist/main.js">
      </body>
    </html>
  `)
})
~~~
#### ``Loadable.preloadAll``预加载所有组件
~~~js
Loadable.preloadAll().then(()=>{
  app.listen(3000, ()=>{
    conosl
  })
})
~~~
#### 声明哪个模块被加载
在``babel.config.js``中加``react-loadable/babel``
~~~js
{
  "plugins": [
    "react-loadable/babel"
  ]
}
~~~
#### 找出哪些动态模块正在被加载，将加载的模块映射到打包文件上，客户端会等待所有打包文件加载完成
1，用``Loadable.Capture``收集所有被加载的模块
~~~js
import Loadable from 'react-loadable';
app.get('/', (req, res)=>{
  let modules = [];
  let html = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName=> modules.push(moduleName)}>
      <App />
    </Loadable.Capture>
  );
  console.log(modules);
  res.send(`...${html}...`);
})
~~~
2, 将加载的模块映射到打包文件上
~~~js
import { ReactLoadablePlugin } from "react-loadable/webpack";
export default {
  plugins: [
    new ReactLoadablePlugin({
      filename: "./dist/react-loadable.json",
    })
  ]
}
~~~
3, 将模块转换为打包文件，并输入到html中
~~~js
import express from 'express';
import React from 'react';
import Loadable from "react-loadable";
import {getBundles} from "react-loadable/webpack";
import stats from "./dist/react-loadable.json";
import App from './components/app';

const app = express();
app.get("/", (req, res)=>{
  let modules = [];
  let html = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName=> modules.push(moduleName)}>
      <App />
    </Loadable.Capture>
    let bundles = getBundles(stats, modules);
    res.send(`
      <!doctype html>
      <html lang="en">
        <head>...</head>
        <body>
          <div id="app">${html}</div>
          <script src="dist/main.js"></script>
          ${bundles.map(bundle=>{
            return `<script src="/dist/${bundle.file}"></script>`
          }).join(`\n`)}
        </body>
      </html>
    `)
  )
})
~~~
4, 由于Webpack工作方式是：主打包文件会比其他的scripts预先加载，但我们需要等待所有文件加载后才开始渲染
~~~js
// 客户端
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import App from './components/App';
window.main = ()=>{
  Loadable.preloadReady().then(()=>{
    // hydrate 因为ssr时，服务器输出的是字符串，而浏览器端需要根据这些字符串完成react的初始化工作，比如创建组件实例，这样才能响应用户操作，这个过程叫做hydrate，或re-hydrate，即给干瘪的字符串注水
    // hydrate 描述的是 ReactDOM复用ReactDOMServer服务端渲染的内容时尽可能保留结构，并补充事件绑定等Client特有的内容过程
    ReactDOM.hydrate(<App />, document.getElementById("app"));
  })
}
~~~
~~~js
// server
....
let bundles = getBundles(stats, modules);
res.send(`
  ...
  <script src="/dist/main.js"></script>
  ${bundles.map(...).join("\,")}
  <script>window.main;</scripts>
`);
~~~

## Loadable组件
~~~js
import React from "react";
import Loadable from "react-loadable";
import { ActivityIndicator } from "antd-mobile";
import { Scoped } from "kremling";
import styles from "./index.krem.scss";

const Loading = ({ isLoading, error }) => {
  return (
    <Scoped css={styles}>
      <div className="react-loadable">
        {isLoading ? (
          <ActivityIndicator text="组件加载中..." />
        ) : error ? (
          `组件加载错误：${error}`
        ) : null}
      </div>
    </Scoped>
  );
};

export default (loader) =>
  Loadable({
    loader,
    loading: Loading,
  });
  
// 使用
import Loadable from "@/components/loadable";
const myCompant = Loadable(() => import("@/pages/myCompant"));
React.render(myCompant)
~~~