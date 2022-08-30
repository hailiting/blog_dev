# Vue 优化

- `v-if`彻底销毁组件
- `v-show`使用 css 隐藏组件
- 大部分情况下使用`v-if`更好
  - `v-if`会走组件的 mounted 和 unMounted
- `v-for`使用 key
- 使用 computed 缓存
- `keep-alive`缓存组件
  - 频繁切换组件，如：tabs
  - 不要乱用，缓存太多会占用内存，且不好 debug
- 异步组件
  - 针对体积比较大的组件，如编辑器、复杂表格、复杂表单等
  - 拆包，需要时异步加载，不需要时不加载
  - 减少主包的体积，首页会加载更快
  - defineAsyncComponent
- 路由懒加载
  - 项目比较大，拆分路由，保证首页先加载
- 服务端渲染 SSR
  - 使用 Nuxt.js
  - 按需优化，使用 SSR 成本较高

```vue
<!--vue3 异步组件-->
<template>
  <Child></Child>
</template>
<script>
import { defineAsyncComponent } from "vue";
export default {
  name: "AsyncComponent",
  components: {
    Child: defineAsyncComponent(() =>
      import(
        // webpackChunkName: "async-child",
        "./Child.vue"
      )
    ),
  },
};
</script>
```

```js
// 路由懒加载
const routes = {
  // ...
  {
    path: "/about",
    name: "About",
    component: ()=>import(
      // webpackChunkName: "about",
      "../views/About.vue"
    )
  }
}
const router = createRouter({
  history: createMemoryHistory(),
  routes
})
```

## Vue 使用过程中遇到过哪些坑

- 内存泄漏
  - 全局变量，全局事件，全局定时器
  - 自定义事件
- Vue2 响应式的缺陷（vue3 不再有）
  - data 新增属性用`Vue.set`
  - data 删除属性用`Vue.delete`
  - 无法直接修改数据`arr[index]=value`
- 路由切换时 scroll 到顶部
  - SPA 通病，不仅仅是 Vue
  - 如：列表页，滚动到第二屏，点击进入详情页，再返回到列表页（此时组件重新渲染）就 scroll 到顶部
  - 列表页缓存数据和 scrollTop 值
  - 当再次返回列表页时，渲染组件，执行`scrollTo(xx)`
