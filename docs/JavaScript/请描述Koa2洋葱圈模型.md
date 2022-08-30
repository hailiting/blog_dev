# 请描述 Koa2 洋葱圈模型

- Koa2 一个简约、流行的 nodejs 框架
- 通过中间件组织代码
- 多个中间件以“洋葱圈模型”执行

## Nodejs 优势

- 单线程
- 基于事件驱动
- 非阻塞
- 适合高并发

```js
// --->---->--->
// <-----<----
const Koa = require("koa");
const app = new Koa();
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});
app.use(async (ctx) => {
  ctx.body = "Hello world";
});
app.listen(3000);
```
