# Koa2
## 简单启动
~~~javascript
npm i koa2 --save

const koa = require("koa2");
const app = new koa();
app.use(async ctx=>{
  ctx.body="hello world";
})
app.listen(3000)
~~~
## 不简单的启动文件
~~~javascript
const Koa=require("koa2");
const helmet = require("koa-helmet");
const route = require("koa-route");
const cors= require("koa-cors");
const moment= require("moment");
const koajwt = require("koa-jwt");
const compress = require("koa-compress");
const koaBody = require("koa-body");
const serve = require("koa-static");
const path = require("path");
const config = require("./config/index.js");
const router = require("./controller/index.js");
const app = new Koa();

app.use(cors({
  allowMethods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}))
app.use(helmet());
app.use(async (ctx,next)=>{
  if(ctx.method==="OPTIONS"){
    ctx.body = 200;
  } else {
    await next();
  }
})

app.use(serve(__dirname + "/public"));

app.use(koaBody({
  "formLimit": "10mb",
  "jsonLimit": "10mb",
  "textLimit": "10mb",
}))

app.use(function(ctx, next){
  return next().catch((err)=>{
    if(err.status === 401){
      ctx.status = 401;
      ctx.body="err"
    } else{
      throw err;
    }
  })
})
app.use(koajwt({
  secret: config.tokenSecret,
  debug: true,
  passthrough: true,
}).unless(
  {
    path:[ "/articles"] // [/^\/login/]
  }
));

app.use(router.auth); // auth权限控制
app.use(router.post("/main"), router.main);
app.use(router.post("/doLogin"), router.doLogin);
// app.use(compress()); // 对资源文件进行压缩
app.listen(3000)
~~~
#### auth 权限控制
~~~javascript
const auth  = async (ctx,next)=>{
  // 这可以放在config
  const lengthPath = ["/doLogin", "/insertUser", "/articles", "/main"];
  /**
   * ctx.request.path 
   * ctx.url
   * ctx.state.user
   * ctx.response.status
   */ 
  for(let i=0;i<lengthPath.length;i++){
    if(ctx.request.path === lengthPath[i]){
      await next();
      return;
    }
  }
  if(!ctx.state.user){
    ctx.response.status = 401;
    ctx.response.body = "请先登录";
  } else {
    await next();
  }
}
~~~
## 常用的依赖包安装
`koa-bodyparser`, `koa-router`, `koa-views + ejs`, `koa-static`, `koa-session`, `koa-jwt`, `koa-helmet`, `koa-compress`, `koa-logger`, `koa-convert`, `koa-compose`, `koa-http-request`, `koa-conditional-get`, `koa-csrf`, `koa-ejs`, `koa-etag`, `koa-favicon`, `koa-generic-session`, `koa-onerror`, `koa-redis`, `koa-resource-router`, `koa-rewrite`, `koa-rt`, `koa-safe-jsonp`, `koa-static-cache`
### 解析请求体 
* `koa-bodyparser` form-data类型不太方便
* 其他插件`body-parser`， `koa-body`
~~~javascript
const Koa = require("koa2");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());
const htmlText = (body) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>dome</title>
      </head>
      <body>
        ${body}
      </body>
      </html>
      `
}
app.use(async ctx => {
  if (ctx.url === "/" && ctx.method === "GET") {
    let html = htmlText("<h1>body parser dome</h1>");
    ctx.body = html;
  } else if (ctx.url === "/" && ctx.method === "POST") {
    let postData = ctx.request.body;
    console.log(postData)
    ctx.body = postData;
  } else {
    ctx.body = htmlText("<h1>404</h1>");
  }
})
app.listen(3000)
~~~
`tips`: koa-body会与koa-bodyParser冲突。
##### detectJSON
~~~javascript
app.use(bodyParser({
  detectJSON: function(ctx){
    return /\.json$/i.test(ctx.path);
  }
}))
~~~
##### extendTypes
~~~javascript
app.use(bodyParser({
  extendTypes: {
    json: ["application/x-javascript"] // application/json  multipart/form-data
  }
}))
~~~
##### onerror
~~~javascript
app.use(bodyParser({
  onerror: function(err,ctx){
    ctx.throw("body parse error", 422);
  }
}))
~~~
##### disableeBodyParser
~~~javascript
app.use(async (ctx, next)=>{
  if(ctx.path === "/disable") ctx.disableBodyParser = true;
  await next();
})
app.use(bodyParser());
~~~
#### 可以给项目加中间件

~~~JavaScript
// 添加params属性，方便获取get或post请求参数
app.use(async (ctx, next)=>{
  ctx.params = {
    ...ctx.request.body,
    ...ctx.query,
  }
  await next();
})
~~~
### 路由
* `koa-router`
~~~javascript
const Koa = require("koa2");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
app.use(bodyParser())
const router = new Router();
// post delete put get
router.get("/", async (ctx)=>{
  ctx.body="首页"，
})
// 启动路由
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000)
~~~
#### get请求获取参数
Get传值通过`request`接收，但接收方法有两个: query和querystring
- query：返回的是格式化好的参数对象
- querystring: 返回的是请求字符串
~~~
// /newlink?aid=123&&name=zhangsan
console.log(ctx.request.url);
console.log(ctx.request.query);   //{ aid: '123', name: 'zhangsan' }  对象
console.log(ctx.request.querystring);   //aid=123&name=zhangsan
~~~
### 设置路由可以跨域
`koa-cors`
### 模板 
`koa-views` 
`ejs`
### 静态资源处理
`koa-static`
### session 验证
`koa-session`
session是一种记录客户状态的机制，和Cookie不同的是，Cookie是在客户端浏览器，而session是保存在服务器的。
#### Session工作流程
当浏览器访问服务器并发送第一次请求时，服务端会创建一个session对象。
生成类似key，valu的键值对，然后将key(cookie)返回到浏览器(客户端)，浏览器下次在访问时，携带key(cookie)，找到对应session(value)。客户端信息保存在session中。
#### session使用
~~~javascript
npm i koa-session --save
~~~
文档
~~~
app.keys = ["some secret hurr"];
const CONFIG ={
  key: "koa:sess", // cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 (default is 1 days)
  overwrite: true, // 是否可以overwrite
  httpOnly: true, // cookie是否只有服务器端可以访问(default true)
  signed: true, // 签名默认true
  rolling: false, // 在每次请求时强行设置cookie，这将重置cookie过期时间
  renew: false,
}
app.use(session(CONFIG, app));
~~~
使用
~~~
设置值 ctx.session.username="周三"
获取值 ctx.session.username
~~~
##### cookie 和 session
1. cookie数据存放在客户的浏览器上，session数据放在服务器上
2. cookie会被窃取，所以应该使用session
3. session会在一定时间内保存在服务器，访问增多会占用服务器的性能，考虑服务器性能方面的压力，应适当使用cookie
4. 单个cookie保存的数据不能超过4k, 最多不超过20个cookie
### token验证
* `koa-jwt`
#### `koa-jwt`主要知识点
  1. 主要提供路由权限控制功能，对需要限制的资源请求进行检查。
  2. token默认被携带在Headers中的名为`Authorization`键值对中。
  3. 可以提供Cookie来提供令牌。
  4. 通过添加`passthrough`选项来保证始终传递到下一个中间件
  `app.use(jwt({secret: "shared-secret",passthrough:true}))`
  5. 使用`ctx.key`来表示解码数据，然后就可以通过`ctx.state.jwtdata`代替`ctx.state.user`获得解码数据.
  6. `secret`的值可以使用函数代替，以此来产生动态的加密密钥
  7. `koa-jwt`依赖于`jsonwebtoken`和`koa-unless`两个库
#### 可选择参数
~~~javascript
declare function jwt(options: jwt.Options): jwt.Middleware;
declare namespace jwt {
  export interface Options {
    secret: string | Buffer;
    key?:string;
    tokenKey?: string;
    getToken?(opts: jwt.Options): string;
    isRevoked?(ctx: Koa.Context, decodedToken: object, token: string):Promise<boolean>;
    passthrough?: boolean;
    cookie?: string;
    debug?: boolean;
    audience?: string;
    issuer?: string;
    algorithms?: string[];
  }
  export interface Middlware extends Koa.Middleware {
    unless(params?:any): any;
  }
}
~~~
### 网络安全
* `koa-helmet`
`helmet`通过增加如：`Strict-Transport-Security`,`X-Frame-Options`,`X-Frame-Options`等HTTP头，提高`Express`应用程序的安全性。
### 压缩响应体
`koa-compress`
### 输出请求日志
1. 日志大体分为访问日志和应用日志。
  访问日志记录客户端对项目的访问，主要是http请求，这些属于运营数据，也可以帮助改进和提升网站的性能和用户体验。
  应用日志是项目中需要特殊标记和记录位置打印日志，包括出现异常的地方，方便开发查询项目的运行和定位bug。
2. 日志记录什么东西：接口前后，重要方法，容易出处的地方，业务需求的埋点。
  注意：手机号，银行卡，身份证等敏感信息不能打到日志里，用唯一标识找出错误信息。
#### 常用插件
* `log4js`
* `koa-logger`
#### log4js
##### 日志级别【从高到底】
在应用中按照级别记录日志，日后可以按照指定级别输出高于指定级别的日志。
`off`, `mark`, `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `all`
##### 应用
1. 依赖安装
~~~shell
npm i log4js --save
npm i ip --save
~~~
2. 文件结构
~~~javascript
// ./middleware/index.js
// ./middleware/mi-log/logger.js
// ./middleware/mi-log/access.js
// ./middleware/mi-log/index.js
~~~
#### koa-logger
~~~javascript
npm i koa-logger --save
const logger = require("koa-logger");
const Koa = require("koa");
const app = new Koa();
app.use(logger())
~~~
### 数据库
`mongoose`
### 缓存
`ioredis`
### 文档
`jsdoc`
### jslink 检查

## 常用的文件结构
~~~
├── node_modules
├── package-lock.json
├── package.json
└── src
    ├── app.js  主入口
    ├── config   全局用的参数，如：数据库地址，用户名，地址，端口号等等
    │   └── index.js
    ├── controller   具体业务编写
    │   └── controllerUser.js
    ├── middleware   中间层，每个接口都经过这里
    │   ├── auth.js
    │   ├── index.js
    │   └── log.js
    ├── models    数据库模型或URI接口转接
    │   ├── logs.js
    │   └── user.js
    ├── plugin   插件
    │   ├── mongodb.js
    │   └── redis.js
    ├── public    公共资源
    ├── route     路由分发
    │   ├── routeIndex.js
    │   └── routeUser.js
    ├── test   测试
    |   └── index.spec.js
    ├── util   方法库
    └── view   模板
        ├── index.ejs
        └── layout.ejs
~~~

