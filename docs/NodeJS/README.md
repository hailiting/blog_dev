## 淘宝镜像

-g 全局
--registry 仓库

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 包管理工具 nvm

```
// 下载出错的话
// 0curl: (7) Failed to connect to raw.githubusercontent.com port 443: Connection refused
// 用这个 git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash // 需要科学上网
```

- I/O 是昂贵的，分布式 I/O 是更安贵的
- NodeJS 适用于 IO 密集型不适用 CPU 密集型

## 课堂笔记

### glup

#### 流清洗

清洗后只保留线上需要的文件
`rollup-plugin-replace`

```javascript
gulp.task("configclean", function () {
  gulp.src("./src/nodeuii/**/*.js").pipe(
    rollup({
      output: {
        format: "cjs", //commonjs
      },
      input: "./src/nodeuii/config/index.js",
      plugins: [
        replace({
          "process.env.NODE_ENV": JSON.stringify("production"),
        }),
      ],
    })
  );
});
```

### gulp-sequence

让 gulp 平行的去执行

```javascript
const gulpSequence = require("gulp-sequence");

let _task = ["builddev"];
if (process.env.NODE_ENV === "production") {
  _task = gulpSequence("buildprod", "configclean");
}
gulp.task("default", _task);
```

### gulp js 审查

```javascript
// gulpfile.js
const eslink = require("gulp-eslint");
gulp.task("link", function () {
  gulp
    .src("./src/nodeuil/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
if (precss.env.NODE_ENV === "link") {
  _task = gulpSequence("eslink");
}
```

`.eslintrc.js` `.eslintignore`

```bash
npm install gulp-eslint --save-dev
```

```javascript
// .eslintrc.js
module.exports = {
  rules: {},
  extends: "eslint:recommended",
  globals: {},
  env: {
    "browser": true,
    "node": true,
    "es6": true
  },
  parserOptions: {
    // 屏蔽 import
    ecmaVersion: 6,
    sourceType: "module"
  }
}
// .eslintignore
tests/**/*.js
dist/**/*.js
node_modules/**
```

```
cp -r yd-web yd-web-back
```

### awilix

```javascript
//   容器【路由】   service   model   每一次请求都是new一个类
service自动的注入contoller
  contoller 面向切面  插入build里
没有IOC容器  就不知道怎么把service给一个类

import Koa from "koa";
import { asClass, createContainer, Lifetime } from "awilix";
import {loadControllers, scopePerRequest } from "awilix-koa";

const app = new Koa();
const container = createContainer().register({
  userService: asClass(/*...*/),
  todoService: asClass(/*...*/)
})
app.use(scopePerRequest(container))
app.use(loadControllers("routes/*.js", {cwd: __dirname}))
app.listen(3000);


// ..........app.js
// 创建IOC容器
const container = createContainer();
// 容器加载service
container.loadModules(
  [[
    __dirname+"/service/*.js",
    {
      register: asClass
    }
  ]],{
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
})
// 添加中间件，将其传递给Awilix容器。将在上下文上附加一个作用域容器。 每次请求都是new一次类
app.use(scopePerRequest(container));
// 加在容错后，注册所有的路由  自动注入controllers
app.use(loadControllers(__dirname+"/routes/*.js", {cwd: __dirname}))


// .........router/users-api.js
// router 也是controller    这是把router和controller合并到一个
// controller action 的概念
import bodyParser from "koa-bodyparser";
import {route, GET, POST, before} from "awilix-koa";
import {authenticate} from "./your-auth-middleware";
@route("/users")
export default class UserAPI {
  constructor({userService}){
    // 想用那个service   就引哪一个
    this.userService = userService;
  }
  @route("/:id")
  @GET()
  @before([authenticate()])
  async findUser(ctx){
    ctx.body = await this.userService.find(ctx.params.id)
  }
  @POST()
  @before([bodyParser()])
  async createUser(ctx){
    ctx.body = await this.userService.create(ctx.request.body)
  }
}
// services/todo-service.js
export default class TodoService{
  constructor(todoStore){
    this.todoStore = todoStore;
  }
  async find(params){
    return this.todoStore.find(params);
  }
  async create(params){

  }
}
```

#### 装饰器

`babel-plugin-transform-decorators-legacy`

```javascript
babel({
  babelrc: false, // 关闭外侧 .babelrc
  ignore: ["./src/nodeuii/config/*.js"],
  plugins: ["transform-es2015-modules-commonjs", "transform-decorators-legacy"],
});
```

- LTS 长期支持版本
- BETA 测试版本
