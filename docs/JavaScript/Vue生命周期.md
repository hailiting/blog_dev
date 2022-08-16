# Vue 生命周期

- beforeCreate
  - el 和 data 都没初始化
  - 不能访问 data, method
- create

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
- beforeDestroy
  - 销毁前
- destroyed
  - 销毁后（Dom 元素存在，只是不在受 vue 控制），卸载 watcher，事件监听，子组件
