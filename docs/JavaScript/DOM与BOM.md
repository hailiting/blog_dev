# DOM 与 BOM

- DOM 文档对象模型
- BOM 浏览器对象模型

## BOM

```js
// 1. window
// 2. location
// 3. history
// 4. navigator
// 5. screen
```

## DOM

```js
// 查找元素
// 创建元素
// 修改元素
// 添加/删除元素
// 事件处理
```

- DOM 事件流（捕获与冒泡）
- DOM 性能优化（文档片段，缓存 DOM 查询）
  - 减少 DOM 操作次数
  - 避免重复查询 DOM
  - 使用文档片段批量操作
  - 适当使用事件委托
- BOM 跨窗口通信
  - 同源 localStorage, SharedWorker
  - 跨域 postMessage
- BOM 历史记录管理
  - pushState 不会触发 popstate 事件
  - 只有浏览器前进后退才会触发 popstate
  - 需要处理页面刷新情况

```js
// 实现单页应用路由
class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", this.handleRoute.bind(this));
  }
  route(path, callback) {
    this.routes[path] = callback;
  }
  navigation(path) {
    history.pushState(null, "", path);
    this.handleRoute();
  }
  handleRoute() {
    const path = window.location.pathname;
    const cb = this.routes[path];
    if (cb) cb();
  }
}
```
