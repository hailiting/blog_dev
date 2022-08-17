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

- 和 dom 没关系的，和 js 模型有关系的可以做了
- Vue 实例初始化完成，完成响应式绑定
- data method 都已经初始化完成，可调用
- 尚未开始渲染模板

### beforeMount

- 编译模板，调用 render 生成 vdom
- 还没到页面渲染 DOM

### mounted

- 完成 DOM 渲染
- 组件创建完成
