# Vue computed 和 watch 区别

- computed: 用于计算产生新的数据，有缓存
  - 如果函数所依赖的属性没有变化，从缓存中读取
  - 必须有 return 返回
  - 使用方法和 data 中的数据一样，但有一个执行方法
- watch 用于监听现有数据
  - watch 的函数名必须和 data 中的数据名一致
  - watch 中的函数有两个参数，新和旧
  - watch 中的函数是不需要调用的
  - 只会监听数据的值是否发生改变，而不会去监听数据的地址是否发生改变，要深度监听需要配合`deep:true`属性使用
  - `immediate: true`页面首次加载时做一次监听
- computed 不支持异步，watch 可以
- computed 为什么不支持异步
  - computed 属性的结果是会被缓存，并且依赖响应式数据的变化才会发生改变
  - return 属于同步执行，是没办法拿到异步请求结果的

```vue
<template>
  <p>watch and computed</p>
  <p>姓名：<input v-modal="name" />城市：<input v-modal="city" /></p>
  <p>个人信息：{{ userInfo }}</p>
</template>
<script>
export default {
  data() {
    return {
      name: "xxx",
      city: "ggg",
    };
  },
  watch: {
    name(newValue, oldValue) {
      console.log("watch name", newValue, oldValue);
    },
  },
  computed: {
    userInfo() {
      return this.name + this.city;
    },
  },
};
</script>
```
