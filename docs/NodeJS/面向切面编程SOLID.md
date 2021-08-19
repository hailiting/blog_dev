# 面向切面编程 SOLID

SOLID 是面向对象设计的 5 大重要原则的首字母缩写，当我们设计类和模块时，遵守 SOLID 原则可以让软件更健壮和稳定。

## SOLID

- 单一职责原则（SRP）
- 扩展开放修改封闭原则（OCP）
- 里氏替换原则（LSP） 子类可以替换基类
- 接口隔离原则（ISP）
- 依赖倒置原则（DIP）

oop 是静态的抽象
aop 是动态抽象

#### 单一职责原则（SRP）

```js
// bad
class UserSettings {
  constructor(user) {
    this.user = user;
  }
  changeSettings(settings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }
  verifyCredentials() {
    // ...
  }
}
// good
class UserAuth {
  constructor(user) {
    this.user = user;
  }
  verifyCredentials() {
    // ...
  }
}
class UserSetting {
  constructor(user) {
    this.user = user;
    this.auth = new UserAuth(this.user);
  }
  changeSettings(settings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```

#### 扩展开放修改封闭原则（OCP）

```js
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = "ajaxAdapter";
  }
  request(url) {}
}
class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = "nodeAdapter";
  }
  request(url) {}
}
class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }
  fetch(url) {
    return this.adapter.request(url).then((response) => {
      // 传递response并return
    });
  }
}
```

#### 接口隔离原则（ISP）

接口隔离原则认为：多个特定客户端接口要好于一个宽泛用途的接口

```ts
interface IDataAccess {
  void OpenConnection();
  void CloseConnection();
}
interface ISqlDataAccess: IDataAccess{
  void ExecuteSqlCommand();
}
interface IOracleDataAccess: IDataAccess{
  void ExecuteOracleCommand();
}
class SqlDataAccess: ISqlDataAccess {

}
```

#### 依赖倒置原则（DIP）

**解耦**

- 高层模块不应该依赖于底层模块，二者应该依赖于抽象
- 抽象不应该依赖于细节，细节应该依赖于抽象

### 依赖注入 DI

### 控制反转 IOC

Inversion of Control，是面向对象编程中的一种设计原则，可以用来减低计算机代码之间爱你的耦合度。其中最常见的方式叫依赖注入（Dependency Injection，简称 DI），还有一种方式叫做依赖查找（Dependency Lookup）。通过控制反转，对象在被创建的时候，由一个调控系统内所有对象的外界实体，将其所依赖的对象的引用传递给它，也可以说，依赖被注入到对象中。

### 面向切面编程 AOP

是面向对象编程的 OOP 的延续

## inversifyjs

InversifyJS 是一个轻量的(4kb)控制反转容器(IOC)，可用于编写 TypeScript 和 JavaScript 应用。它使用类构造函数去定义和注入它的依赖，

### 应用

```js
npm install inversify reflect-metadata --save
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es6"],
    "types": ["reflect-metadata"],
    "module": "commonjs",
    "moduleResolution": "node",
    "experomentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

```js
// app.ts
import { InversifyKoaServer } from "inversify-koa-utils";
import "reflect-metadata";
import { Container } from "./ioc";
import "./ico/loader"; // 所有文件的加载器
/// 创建一个基本容器
const container = new Container();
let server = new InversityKoaServer(container);
// 启动容器
let app = server.build();
app.listen(3000, () => {
  console.log("Inversity 实践SOLID系统启动成功");
});
```

```js
// ico/index.ts
import { Container, injectable, inject } from "inversify";
import * as Router from "koa-router";
import { interface, controller, httpGet } from "inversify-koa-utils";
export { interface, Container, Router, controller, httpGet };
```

```js
// ico/loader.ts
import "../controllers/IndexController";
```

```ts
// controllers/IndexController.ts
// interface
import { Router, controller, interface, httpGet } from "../ioc";
import TYPES from "../constant/tags";
export default class IndexController implements interfaces.Controller {
  private indexService; // 类型
  constructor(@inject(TYPES.IndexService) indexService) {
    this.indexService = indexService;
  }
  @httpGet("/")
  private async index(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    const result: string = this.indexService.getUser();
    ctx.body = await ctx.render("index");
  }
}
```

```ts
// constant
const TAGS = {
  IndexService: Symbol.for("IndexService"),
};
export default TAGS;
```

```ts
export interface IIndex {
  getUser(id: String):object{

  }
}
```

## awilix

构造注入
Nodejs 的 IOC 容器

```js
npm i awilix
npm i awilix-koa  // ---- koa
```

### 容器参数

- createContainer：创建容器，在项目启动时执行
- InjectionMode: 注入模式，awilix 注入依赖的模式
- asClass: 将注入的文件作为一个类注入，即需要实例化
- asFunction: 将注入的文件作为一个方法，无需实例化
- asValue: 将注入的文件作为常量访问
- Lifetime: 生命周期。默认单例模式(SINGLETON)
- dbModels: 容器的数据访问层，将数据库的模型的实例赋值

### 加载类文件

- loadModules(path, options): 第一个参数是文件路径的数组，第二个参数是对传入依赖的一些配置：`formatName: 'camelCase'`，类名导出的格式，默认驼峰式。这个意思就是说，不管文件名怎么写，最后导出时使用的类名都是驼峰式
- resolveOptions: 注入方法等

```js
resolveOptions: {
  injectionMode: InjectionMode.CLASSIC,
  lifetime: Lifetime.SINGLETON,
  register: asClass
}
```

```js
// index.js
const awilix = require("awilix");
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});
class UserController {
  constructor(opts) {
    this.userService = opts.userService;
  }
  getUser(ctx) {
    return this.userService.getUser(ctx.params.id);
  }
}
container.register({
  userController: awilix.asClass(UserController),
});
const makeUserService = ({ db }) => {
  return {
    getUser: (id) => {
      return db.query(`select * from users where id=${id}`);
    },
  };
};
container.register({
  userService: awilix.asFunction(makeUserService),
});

function Database(connectionString, timeout) {
  this.conn = connectToYourDatabaseSomehow(connectionString, timeout);
}
Database.prototype.query = function(sql) {
  return this.conn.rawSql(sql);
};
container.register({
  db: awilix.asClass(Database).classic(),
});
contianer.register({
  connectionString: awilix.asValue(process.env.CONN_STR),
  timeout: awilix.asValue(1000),
});
router.get("/api/users/:id", container.resolve("userController").getUser);
router.get("/api/users/:id", container.cradle.userController.getUser);
```

```js
// app.js
const { loadControllers } = require("awilix-koa");
const { asClass, asValue, Lifetime, createContainer } = require("awilix");
// 容器
const container = createContainer();

// 要注入的所有类装载到container中
container.loadModules([__dirname + "/services/*.js"], {
  // 制定以下当前的注入函数是以什么形式
  // 例如  IndexService.js 为文件名
  // IndexController.js文件里的 constructor({indexService}){}   indexService 为形式
  formatName: "camelCase", // 驼峰
  resolverOptions: {
    lifetime: Lifetime.SCOPED, // 单例 生命周期
  },
});
// 每一次的请求都去创建
app.use(scopePerRequest(container));
// 自动去装载路由
app.use(loadControllers(__dirname + "/controllers/*.js"));
```

```js
// indexController.js
import { route, GET } from "awilix-koa";
@route("/")
class IndexController {
  constructor({ indexService }) {
    this.indexService = indexService;
  }
  @route("/list")
  actionIndex() {
    return async (ctx, next) => {
      const data = this.indexService.getData();
      ctx.body = await ctx.render("books/pages/index", {
        data,
      });
    };
  }
  @route("/add")
  @GET()
  actionAdd() {
    return async (ctx, next) => {
      ctx.body = await ctx.render("books/pages/add");
    };
  }
}
export default IndexController;
```

- 添加装饰器

```js
// 第一步：npm
npm i @babel/plugin-proposal-decorators --save-dev
// 第二步：.babelrc
{
  "plugins": ["@babel/plugin-proposal-decorators"]
}
```
