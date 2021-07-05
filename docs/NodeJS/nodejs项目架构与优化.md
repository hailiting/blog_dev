# nodejs 项目架构与优化

## SPA 和 MPA

MPA(SSR) -> spa + (csr) mpa -> mpa -> spa

### SPA 单页应用 SinglePage Application

- 指只有一个主页面的应用，一开始只需要加载一次 js,css 等资源。所有资源都包含在主页面，对每个功能模块组件化。单页应用的跳转，就是组件之间的切换，只刷新局部资源。

### MPA MultiPage Application

- 指有多个独立的页面的应用，每个页面必须重复加载 js,css 等资源。多页应用跳转需要整个资源的刷新。

### 单页应用项目过大，首页加载慢的优化策略

- 使用 CDN 资源，减小服务器的宽带压力
- 路由懒加载
- 将一些静态 js,css 放到其他地方（如 OSS），减小服务器压力
- 按需加载三方资源，如 View,按需引入 View 中的组件
- 使用 nginx 开启 Gzip 减小网络传输的流量大小
- webpack 开启 gzip 压缩
- 若首屏为登录页，可做多入口，登录页单独分离为一个入口
- SSR 渲染

### SSR 渲染

- 简单理解为将组件或页面通过服务器生成 HTML 字符串，再发送到浏览器，最后将静态标记为`混合`为客户端上完全交互的应用程序。
- 更快的响应时间
- 更好的 SEO

#### 缺点

- 相对于仅需要提供静态文件的服务器，SSR 中使用的渲染程序会更占用 CPU 和内存等资源
- 一些常用的浏览器 API 可能要加环境判断在使用，如 window, document, alert 等
- 开发调试会复杂一点
- 可能一些原因导致服务端和浏览器端渲染的结果不一致

## node 异步 IO 原理及优化

### Node 对异步 IO 的实现

完美的异步 IO 应该是应用程序发起非阻塞调用，无需通过遍历或事件循环等方式轮询

![node_event_loop](./img/node_event_loop.png)

- nodejs 事件处理机制
- js 解析先后顺序

### 几个特殊的 API

- `setTimeout`和`setInterval`线程池不参与
- `process.nextTick()`实现类似`setTimeout(function(){},0)`，每次调用放入队列中，在下一轮循环中取出。
- `setImmdiate()`比`process.nextTick()`优先级低

```js
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

setTimeout(function() {
  console.log(1);
}, 0);
setImmediate(function() {
  console.log(2);
});
console.log(3);
new Promise((resolve, reject) => {
  console.log(4);
  resolve(1);
}).then(() => {
  console.log(5);
});
console.log(6);
process.nextTick(() => {
  console.log(7);
});
// 3 4 6 7 5  1 2
```

## 函数式编程在 Node 中的应用

- 高阶函数：可以将函数作为输入或返回值，形成一种后续传递风格的结果接受方式，而非单一的 返回值形式，而非单一的返回值形式。后续传递风格的程序将函数业务重点从返回值传递到回调函数中。

```js
app.use(function() {});
var emitter = new event.eventEmitter();
emitter.on(function() {});
```

- 偏函数：指定部分参数产生一个新的定制函数的形式就是偏函数。node 中异步编程非常常见，我们通过哨兵变量会造成业务混乱，`underscore` `after`变量

## 常见的 node 控制异步技术手段

- step, wind, bigpipe, Q.js
- asynic awit
- promise/defferred 是一种先执行异步调用，延迟传递的方式。Promise 是高级接口，事件是低级接口。低级接口可以构建更多复杂的场景，高级接口一旦定义，不太容易变化，不再有低级接口的灵活性。
- 一个程序可以包含多个协程，可以对比一个进程包含多个线程来比较协程和线程。多个线程相对独立，由系统控制，而协程相对独立，有自己的上下文，但其切换由自己控制，由当前协程切换到其他协程由当前协程来控制
- node 基于 v8，目前不支持协程。

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

进程 线程

本机 pm2
网络 nginx

Nginx LVS 负载均衡 - 心跳包
pm2-> varnish / stupid
-> CDN
varnish->java -> md-> 读/写 -> 冷热

throw new Error
