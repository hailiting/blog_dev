# Koa

Koa 是一个 web 框架，由 Express 幕后的原班人马打造，致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。通过利用 async 函数，koa 帮你丢弃回调函数，并有力地增强错误处理。koa 并没有捆绑任何中间件，而是提供了一套优雅的方法，帮助开发快速地编写服务端应用程序。

## 安装

Koa 依赖 node v7.6.0 及以上版本

```js
npm i koa
node my-koa-app.js
```

### 使用 Babel 实现 Async 方法

```js
require("babel-register");
const app = require("./app");
// transform-async-to-generator 或
// transform-async-to-module-method
// .balbelrc
{
  "plugins": ["transform-async-to-generator"]
}
```

## 应用程序

Koa 应用程序是一个包含一组中间件函数的对象，它按照类似堆栈的方式组织和执行。Koa 类似于许多中间件系统，他一个关键的设计点在于其低级中间件层中提供高级“语法糖”。这提高了互操作性，并使写中间件更加愉快。  
这包括诸如内容协商，缓存清理，代理支持和重定向等常见任务的方法，Koa 尽管提供了很多方法，但体积很小，只是因为其没有绑定中间件。

```js
var koa = require("koa");
var app = koa();
app.use(function*() {
  this.body = {
    name: "aaa",
  };
});
app.listen(3000);
```

### 级联

Koa 调用“下游”，然后控制流回“上游”。

以下代码实例，当请求开始时首先通过 x-response-time 和 logging 中间件，然后继续移交控制给 response 中间件。当一个中间件调用`next()`则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。

```js
const Koa = require("koa");
const app = new Koa();
// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Ressponse-Time", `${ms}ms`);
});
// response
app.use(async (ctx) => {
  ctx.body = "hello world";
});
app.listen(3000);
```

### 设置

应用程序设置是 app 实例上的属性，目前支持如下

- app.env 默认是`NODE_ENV`或`development`
- app.keys 签名的 cookie 密钥数组
- app.proxy 当真正的代理头字段将被信任时
- 忽略 `.subdomains`的`app.subdomainOffset`偏移量，默认为 2
- app.proxyIpHeader 代理 ip 消息头，默认为`X-Forwarded-For`
- app.maxIpsCount 从代理 ip 消息头读取的最大 ips，默认为 0（代表无限）

通过设置传递给构造函数

```js
const Koa = require("koa");
const app = new Koa({ proxy: true });
```

动态设置

```js
const Koa = require("koa");
const app = new Koa();
app.proxy = true;
```

### `app.listen(...)`

#### 无作用 Koa 应用程序被绑定到 3000 端口

```js
const Koa = require("koa");
const app = new Koa();
app.listen(3000);
```

```js
const http = require("http");
const https = require("https");
const Koa = require("koa");
const app = new Koa();
// app.listen(...)方法只是以下方法的语法糖
http.createServer(app.callback()).listen(3000);
// 这意味着，可以将同一个应用程序同时作为http和https或多个地址
https.createServer(app.callback()).listen(3001);
```

### `app.callback()`

返回适用于`http.createServer()`方法的回调函数来处理请求，也可以使用此函数将 Koa 应用程序挂载到`Connect/Express`应用程序中。

### `app.use(function)`

将给定的中间件方法添加到此应用程序。app.use()返回 this，因此可以链式表达。

```js
app
  .use(someMiddleware)
  .use(someOtherMiddleware)
  .listen(3000);
```

### `app.keys =`

设置签名的 Cookie 密钥。

```js
app.keys = ["im a newer secret", "i like turtle"];
app.keys = new KeyGrip(["im a newer secret", "i like turtle"], "sha256");
```

这些密钥可以倒换，并在使用`{signed: true}`参数签名 Cookie 时使用。

```js
ctx.cookies.set("name", "tobi", { signed: true });
```

### `app.context`

`app.context`是从其创建 ctx 的原型。  
可以通过编辑`app.context`为 ctx 添加其他属性。

```js
app.context.db = db();
app.use(async (ctx) => {
  console.log(ctx.db);
});
```

> 注意：
>
> - ctx 上的许多属性都是使用`getter`， `setter`和`Object.defineProperty()`定义的，只能通过在`app.context`上使用`Object.defineProperty()`来编辑这些这些属性。
> - 安装的应用程序目前使用其父级的 ctx 和设置，因此，安装的应用程序只是一组中间件。

### 错误处理

```js
app.on("err", (err) => {
  log.error("server error", err);
});
```

如果是`req/res`期间出现错误，并且无法响应客户端，Context 实例仍然会被传递

```js
app.on("error", (err, ctx) => {
  log.error("server error", err, ctx);
});
```

当发生错误并且仍然可以响应客户端时，也没有数据被写入 socket 中，koa 将一个 500“内部服务器错误”进行适当的响应。在任一情况下，为了记录目的，都会发出应用级错误。

## 上下文（Context）

Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。这些操作在 HTTP 服务器开发中频繁使用。他们被添加到此级别而不是更高级别的框架，这将强制中间件重新实现此通用功能。

每个请求都将创建一个 Context,并在中间件中作为接收器引用，或 ctx 标识符，如下代码所示：

```js
app.use(async (ctx) => {
  ctx; // 这是Context
  ctx.request; // 这是Koa Request
  ctx.response; // 这是Koa Response
});
```

为了方便起见，很多访问器和方法直接委托给`ctx.request`或`ctx.response`，不然的话，他们是相同的。例如`ctx.type`和`ctx.length`委托给`response`对象，`ctx.path`和`ctx.method`委托给 request.
