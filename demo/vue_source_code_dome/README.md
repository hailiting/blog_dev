# v-model 逻辑过程

- 首先得有`Vue`函数
  vm data->{text: "hello world"}
- observe -当前 data 值挂载到 vm 实例上-> `defineReactive(vm, key, obj[key])`
  vm text "hello world"
- Dep -> Dep.target 电话本
- compile 编译
- watcher

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
