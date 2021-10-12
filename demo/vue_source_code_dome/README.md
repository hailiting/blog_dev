# v-model 逻辑过程

- 首先得有`Vue`函数
  vm data->{text: "hello world"}
- observe -当前 data 值挂载到 vm 实例上-> `defineReactive(vm, key, obj[key])`
  vm text "hello world"
- Dep -> Dep.target 电话本
- compile 编译
- watcher
- `rollup --sourcemap -w ...`

## vdom 生成流程

compiler 编译 -> optimizer 优化 -> codegen 编码 -> vdom 生成 vdom -> dom diff -> patch 打到补丁

template-ast-optimizer-codegen-vdom-diff-patch

## Vue 值得注意的小特性

### keepAlive 复用组件

- 抽象组件
- `this.cache = Object.create(null)` -> 保持对象的干净
- 自定义实现的组合
- `this.max`负责清理组件
- LRU 算法清除 prunt oldest entry

### Vue.use

- 预留 install

```js
// vue源码
import { toArray } from "../util/index";
export function initUse(Vue: GlobalAPI) {
  Vue.use = function(plugin: Function | Object) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    const args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === "function") {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === "function") {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}
```

```js
// router
Object.defineProperty(Vue.prototype, "$router", {
  get() {
    return this._routerRoot._router;
  },
});
```

### vue-ts-ioc 在 Vue 中去实现依赖注入

### `core/instance/init.js`

`this._eventsCount={}` 判断是 0 的时候不在继续深度遍历传播

### 状态机的深入应用

### 缓存机制 异步队列

## Event Loop【浏览器】

nodejs -调度-> Libuv - lcp 异步队列

宏要晚 微要前

### 宏任务 macrotask

script(整体代码)

setTimeout
setInterval
setImmediate
I/O
UI rendering
ajax
event

### 微任务 microtask

process.nextTick
Promise.then
Object.observe(废弃)
MutationObserver

### 同步执行栈

<!-- https://github.com/lcmomo/Course/blob/c618b6c0a9e01473da40b286878ad430ba49894a/Vue/code/vue-next/%E4%BA%AC%E7%A8%8B%E4%B8%80%E7%81%AFVue%E5%85%AC%E5%BC%80%E8%AF%BE%E7%AC%AC%E4%B8%89%E8%8A%82/proxyVue.html -->
