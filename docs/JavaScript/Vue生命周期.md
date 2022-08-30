# Vue 生命周期

- beforeCreate
  - el 和 data 都没初始化
  - 不能访问 data, method
- created

  - data 与 method 被初始化，属性被绑定，但是虚拟 dom,$el 不可用
  - 可调用 data 与 method

- beforeMount
- mounted
  - 模板已被渲染为真实 DOM，用户可以看到真实的渲染完成页面
  - 可以读取到真实的 el(只有渲染完成后才存在)
- beforeUpdate
  - 更新前状态（view 层的数据变化前，不是 data 中的数据改变前）
- updated
  - 数据已更改完成，dom 也重新 render 完成
- beforeDestroy beforeUnmount
  - 销毁前
- destroyed unmounted
  - 销毁后（Dom 元素存在，只是不在受 vue 控制），卸载 watcher，事件监听，子组件

## 每个生命周期都做了什么

### beforeCreate

- 空白的 Vue 实例
- data method 尚未被初始化，不可使用

### created

- 和 dom 没关系的，和 js 模型有关系的
- Vue 实例初始化完成，完成响应式绑定
- data method 都已经初始化完成，可调用
- 尚未开始渲染模板

### beforeMount

- 编译模板，调用 render 生成 vdom
- 还没到页面渲染 DOM

### mounted

- 完成 DOM 渲染
- 组件创建完成

### beforeUpdate

- data 发生变化之后
- 准备更新 DOM（尚未更新 DOM）

### updated

- data 发生变化，且 DOM 更新完成
- 在 updated 中修改 data，可能会造成死循环

### beforeUnmount

- 组件进入销毁阶段（尚未销毁，可正常使用）
- 可移除、解绑一些全局事件，自定义事件

### unmounted

- 组件被销毁了
- 所有子组件也都被销毁了

### keep-alive 组件

- onActivated 缓存组件被激活
- onDeactivated 缓存组件被隐藏

```vue
<!-- home -->
<template>
  <keep-alive>
    <Child1 v-if="num === 1"></Child1>
    <Child2 v-else></Child2>
  </keep-alive>
</template>
<template>
  <p>child2</p>
</template>
<script>
export default {
  name: "Child2",
  created() {
    // 只会created一次
    console.log("child2 created");
  },
  activated() {
    console.log("child2 activated");
  },
  deactivated() {
    console.log("child2 deactivated");
  },
};
</script>
```

## Vue 什么时候操作 DOM 比较合适

- mounted 和 updated 都不能保证子组件全部挂载完成
- 用`$nextTick`的时机来操作 DOM

```js
mounted(){
  this.$nextTick(function(){
    // 仅在整个视图都被渲染后才会运行的代码
  })
}
```

## ajax 应该在哪个生命周期

- created 或 mounted
  - 并行 串行

## Vue3 Composition API 生命周期有何区别

- 用 setup 代替了 beforeCreate 和 created
- 使用 Hooks 函数的形式，如 mounted 改为`onMounted()`

```js
import { onUpdated, onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {
      console.log("mounted");
    });
    onUpdated(() => {
      console.log("updated");
    });
  },
};
```
