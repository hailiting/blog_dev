# awilix

- awilix 依赖注入 DI(Dependency Injection)【神之浩劫的近战刺客】
- DI 的作用是减少程序模块之间的耦合程度，提高代码的可可维护性
- DI 容器的功能是将系统中的模块整合起来，从而让开发者不在需要太关注这些 DI 的实现细节问题。
- awilix 的实现是基于 ES6Proxies

## 用例 01

```js
// configureContainer.js
import { createContainer, asClass, asFunction } from "awilix";
import makeTodosService from "./todosService";
import TodosRepository from "./todosRepository";
export default function configureContainer(){
  // 注册一个容器
  const container = createContainer();
  container.register({
    todosService: asFunction(makeTodosService).scoped(); // scoped() 每一个作用域都是一个实例
    todosRepository: asClass(TodosRepository).singliton();
  })
  return container;
}
// app.js
import Koa from "koa";
import KoaRouter from "koa-router";
import {asValue} from "awilix";
import {scopePerRequest, makeInvoker} from "awilix-koa";
import configureContainer from "./configureContainer";
const app = new Koa();
const router = new KoaRouter();
const container = configureContainer();

app.use(scopePerRequest(container))
app.use((ctx, next)=>{
  ctx.state.container.register(Value)({
    currentUser: ctx.state.user
  })
  return next();
})

const todosAPI = ({ todosService } => {
    return {
        getTodos: async (ctx) => {
            const todos = await todosService.getTodos(ctx.request.query)
            ctx.body = todos
            ctx.status = 200
        },
        createTodos: async (ctx) => {
            const todo = await todosService.createTodo(ctx.request.body)
            ctx.body = todo
            ctx.status = 201
        },
        updateTodo: async (ctx) => {
            const updated = await todosService.updateTodo(
                ctx.params.id,
                ctx.request.body
            )
            ctx.body = updated,
            ctx.status = 200
        },
        deleteTodo: async (ctx) => {
            await todosService.deleteTodo(
                ctx.params.id,
                ctx.request.body
            )
        }
    }
})

const api = makeInvoker(todosAPI);

router.get('/todos', api('getTodos'))
router.post('/todos', api('createTodos'))
router.patch('/todos/:id', api('updateTodo'))
router.patch('/todos/:id', api('deleteTodo'))
app.use(router.routes())
app.listen(1337)
```

## 用例 02

引用项目地址[https://github.com/Wlwulan/wulan/tree/943f2d48d9cd44dbfae5f1e97c0c4e9489d60209/six/yd-books-back]

```js
import Koa from "koa";
import serve from "koa-static";
import config from "./config";
import render from "koa-swig";
import co from "co";
import log4js from "log4js";
import errorHandle from "./middlewares/errorHandler";
import { Lifetime, createContainer } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";

const app = new Koa();

const container = createContainer(); // 创建一个容器，管理所有服务的路由

// 把所有的service注册容器
// 每一个controller把需要的service注册进去
container.loadModules([__dirname + "/services/*.js"], {
  formatName: "camelCase",
  registerOptions: {
    lifetime: Lifetime.SCOPED, // Lifetime.
  },
});
/**
 * 配置特定的全局生存周期
 * container.loadModules([
 *  ["services/*.js", Lifetime.SCOPED],
 *  "repositories/*.js",
 *  "db/db.js"
 * ], {
 *  resolverOptions: {
 *    lifetime: Lifetime.SINGLETON
 *  }
 * })
 */
app.use(scopePerRequest(container));

// 前端模板
app.context.render = co.wrap(
  render({
    root: config.viewDir,
    autoescape: true,
    // cache: "memory", // 模板缓存
    varControls: ["[[", "]]"],
    ext: "html",
    writeBody: false,
  })
);
log4js.configure({
  appenders: {
    cheese: {
      type: "dateFile",
      filename: __dirname + "/logs/log.log",
      pattern: "-yyyy-MM-dd",
      backups: 10,
    },
  },
  categories: {
    default: {
      appenders: ["cheese"],
      level: "error",
    },
  },
});
const logger = log4js.getLogger("cheese");
errorHandle.error(app, logger);
// 自动注册路由
app.use(loadControllers(__dirname + "/controllers/*.js"), {
  cwd: __dirname,
});
// 配置静态资源
app.use(serve(config.staticDir));
app.listen(config.port, () => {
  console.log("服务已启动");
});


// 在路由中使用
// /controllers/
import {router, GET} from "awilix-koa";
// cheerio jquery的核心功能的简洁实现，主要是为了用在服务器需要对DOM进行操作的地方
const cheerio = require("cheerio");

@route("/books");
class BooksController{
  constructor({bookService}){
    this.bookService= bookService;
  }
  @route("/index")
  @GET()
  async actionIndex(ctx, next){
    const result = await this.bookService.getData();
    // console.log(result)
    const html = await ctx.render("books/pages/index", {
      data: result.data
    });
    if(ctx.request.header["x-pjax"]){
      const $ = cheerio.load(html);
      ctx.body = $("#js-hooks-data").html();
    } else {
      ctx.body = html
    }
  }
  @route("/create")
  @GET()
  actionCreate(){
    return async(ctx, next){
      const html = await ctx.render("books/pages/add");
      if(ctx.request.header["x-pjax"]){
        const $ = cheerio.load(html);
        let _result = "";
        $(".pjaxcontent").each(function(){
          _result += $(this).html();
        });
        $(".lazyload-css").each(function(){
          _result +=$(this).html();
        });
        $(".lazyload-js").each(function(){
          _result = `<script>${$(this).attr("src")}</script>`;
        });
        ctx.body = _result;
      } else {
        ctx.body = html
      }
    }
  }
  @route("/savedata")
  @GET()
  actionSaveData(){
    return async (ctx, next)=>{
      // web api 提供的一个方法，用于定义一些实用方法来处理URL的查询字符串
      const params = new URLSearchParams();
      params.append("Books[title]", "书名");
      params.append("Books[author]", "作者");
      params.append("Books[publisher]", "出版社");
      const result = await this.bookService.saveData({
        params
      });
      ctx.body = result;
    }
  }
}
module.exports = BookController;


// services/BookService
/** jsdoc文档生成的写法 */
const SafeRequest = require("../utils/SafeRequest");
class Book{
  constructor(app){}
  /**
    * 获取后台的全部图书数据方法
    * @param {*} options 配置项
    * @example
    * retrun new Promise
    * getData(options)
    */
  getData(options){
    const safeRequest = new SafeRequest("books/index");
    return safeRequest.fetch({});
  }
  /**
    * 创建图书索引
    * @param {*} options 配置项
    * @example
    * retrun new Promise
    * saveData(options)
    */
  saveData(options){
    const safeRequest = new SafeRequest("books/create");
    return safeRequest.fetch({
      method: "POST",
      params: options.params
    });
  }
}
module.exports = Book;
```
