# Vue router 三种模式

- Hash `createWebHashHistory`
  - `/#/`
  - location.hash
  - 路由变化，可前进与后退
- WebHistory `createWebHistory`
  - window.onpopstate 监听路由变化
  - history.pushState 推送路由
  - 路由变化，可前进与后退
- MemoryHistory(V4 面对 vue3，之前叫做 abstract history)
  - 路由不会变化，不会前进后退

React-router 也是完全一样的
