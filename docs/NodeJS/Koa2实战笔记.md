# Koa2 实战笔记

## 快速启动

### 环境准备

- 安装 MySQL5.6 以上版本
- 创建数据库 koa_demo

```js
create database koa_demo;
```

- 配置项目 config.js

```js
const config = {
  // 启动端口
  port: 3001,
  // 数据库配置
  database: {
    DATABASE: "koa_demo",
    USERNAME: "root",
    PASSWORD: "123456hai",
    PORT: "3306",
    HOST: "localhost",
  },
};
module.exports = config;
```

### 启动脚本

```js
npm i
// 数据建库初始化
npm run init_sql
// 编译react.js源码
npm run start_static
// 启动服务
npm run start_server
```

## 框架设计

### 实现概要

- koa2 搭建服务
- MySQL 作为数据库
  - mysql5.7 版本
  - 存储普通数据
  - 存储 session 登录状态数据
- 渲染
  - 服务端渲染：ejs 作为服务端渲染的模板引擎
  - 前端渲染：用 webpack 环境编译 react.js 动态渲染页面，使用 ant-design 框架

### 文件目录设计

```js
|-init // 数据库初始化目录
|   |- index.js // 初始化入口文件
|   |- sql/ // sql脚本文件目录
|   |- util/ // 工具操作目录
|-package.json
|-config.js
|-server // 后端代码目录
|   |- app.js // 后端服务入口文件
|   |- codes/ // 提示语代码目录
|   |- controllers/ // 操作层目录
|   |- models/ // 数据模型 model层目录
|   |- routers/ // 路由目录
|   |- services/ // 业务层目录
|   |- utils/ // 工具类目录
|   |- views/ // 模板目录
|-static // 前端静态代码目录
|   |- build/ // webpack编译配置目录
|   |- output/ // 编译后前端代码目录 & 静态资源前端访问目录
|   |- src/ // 前端源代码目录
```

```js
// app.js
const path = require("path");
const Koa = require("koa");
const convert = require("koa-convert");
const views = require("koa-views");
const koaStatic = require("koa-static");
const bodyParser = require("koa-bodyparser");
const koaLogger = require("koa-logger");
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");

const config = require("./../config");
const routers = require("./routers/index");
const app = new Koa();

// session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
};

// 配置session中间件
app.use(
  session({
    key: "USER_SID",
    store: new MysqlStore(sessionMysqlConfig),
  })
);

// 配置控制台日志中间件
app.use(convert(koaLogger()));

// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(convert(koaStatic(path.join(__dirname, "./../static"))));

// 配置服务端模板渲染引擎中间件
app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs",
  })
);

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

// 监听启动端口
app.listen(config.port);
console.log(`the server is start at port ${config.port}`);
```

## 分层设计

### 后端代码目录

```js
|- server
     |- controllers // 操作层，执行服务端模板渲染，json接口返回数据，页面跳转
            |- admin.js
            |- index.js
            |- user-info.js
            |- work.js
     |- models // 数据模型层，执行数据操作
          |- user-info.js
     |- routers // 路由层 控制路由
          |- admin.js
          |- api.js
          |- error.js
          |- home.js
          |- index.js
          |- work.js
     |- services // 业务层，实现数据层model到操作层controller的耦合封装
          |- user-info.js
     |- views // 服务端模板代码
          |- admin.js
          |- error.js
          |- index.js
          |- work.js
```

## 数据库设计

### 初始化数据库脚本

```js
// user-info.sql
CREATE TABLE  IF NOT EXISITS `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT, # 用户ID
  `email` varchar(255) DEFAULT NULL,  # 邮箱地址
  `password` varchar(255) DEFAULT NULL, # 密码
  `name` varchar(255) DEFAULT NULL, # 用户名
  `nick` varchar(255) DEFAULT NULL,  # 用户昵称
  `detail_info` longtext DEFAULT NULL, # 详细信息
  `create_time` varchar(20) DEFAULT NULL, # 创建时间
  `modified_time` varchar(20) DEFAULT NULL, # 修改时间
  `level` int(11) DEFAULT NULL, # 权限级别
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 插入默认信息
INSERT INTO `user_info` set name="admin001", email="admin001@example.com", password="123456";
```

## 路由设计

### 使用`koa-router`中间件

```js
|- server // 后端代码目录
     |- routers
          |- admin.js  // /admin/* 子路由
          |- api.js  // /api/* 子路由
          |- error.js  // /error/* 子路由
          |- home.js  // 主页子路由
          |- index.js  // 子路由汇总文件
          |- work.js  // /work/子路由
```

```js
// server/routers/api.js
// .../api/user/getUserInfo.json
const router = require("koa-router")();
const userInfoController = require("./../controllers/user-info");
const routers = router
  .get("/user/getUserInfo.json", userInfoController.getLoginUserInfo)
  .post("/user/signIn.json", userInfoController.signIn)
  .post("/user/signUp.json", userInfoController.signUp);
module.exports = routers;
```

```js
// server/routers/index.js
const router = require("koa-router")();

const home = require("./home");
const api = require("./api");
const admin = require("./admin");
const work = require("./work");
const error = require("./error");

router.use("/", home.routes(), home.allowedMethods());
router.use("/api", api.routes(), api.allowedMethods());
router.use("/admin", admin.routes(), admin.allowedMethods());
router.use("/work", work.routes(), work.allowedMethods());
router.use("/error", error.routes(), error.allowedMethods());
module.exports = router;
```

`app.js`加载路由中间件

```js
// server/app.js
const routers = require("./routers/index");

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());
```

## webpack 环境搭建

## 使用 reactjs

## 登录注册功能实现

## session 登录状态判断处理

### 使用 session 中间件

```js
// app.js
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");

const config = require("./../config");

const app = new Koa();

const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWOED,
  database: config.database.DATABASE,
  host: config.database.HOST,
};
app.use(
  session({
    key: "USER_SID",
    store: new MysqlStore(sessionMysqlConfig),
  })
);
```

### 登录成功后，设置 session 到 MySQL 和设置 sessionID 到 cookie

```js
let session = ctx.session;
session.isLogin = true;
session.userName = userResult.name;
session.userId = userResult.id;
```

### 需要判断登录状态页面进行 session 判断

```js
async indexPage(cts){
  if(cts.session && ctx.session.isLogin && ctx.session.userName){
    const title= "work页面";
    await ctx.render("work", {
      title,
    });
  } else {
    ctx.rediect("/403")
  }
}
```
