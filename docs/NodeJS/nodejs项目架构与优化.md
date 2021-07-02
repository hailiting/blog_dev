# nodejs 项目架构与优化

- 设计模式
- 垃圾回收
- nodejs 事件处理机制
- js 解析先后顺序

分布式 IO
同步 IO 异步 IO

Excel

io 密集型

不适应 CPU 密集型

- 线程上
- 解释型和编译型

cpu -> 计算
io -> 流量

LIBUV
iocp

不占用系统的事件描述符

linux 自定义的线程池
windows LCP

setTimeout setInterval

process.nextTick()

```js
setTimeout(function() {
  console.log(1);
}, 0);
setImmediate(function() {
  console.log(2);
});
process.nextTick(() => {
  console.log(3);
});
console.log(7);
new Promise((resolve, reject) => {
  console.log(4);
  resovle(4);
}).then(function() {
  console.log(5);
});
console.log(6);

// 同步 > 异步优先的开始（promise）> nextTick -> promise > setTimeout(时间) > setImmediate
// 7  4   6   3   5   1  2
```

```js
async function test() {
  console.log("hello");
  await sleep(1000);
  console.log("world!");
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
test();
```

高阶函数

进程 线程

v8 垃圾回收
新时代垃圾回收 from 占满
老生代垃圾回收 内存不够用

引用计数

广度优先
栈区

内存泄露
闭包

本机 pm2
网络 nginx

Nginx LVS 负载均衡 - 心跳包
pm2-> varnish / stupid
-> CDN
varnish->java -> md-> 读/写 -> 冷热

throw new Error
