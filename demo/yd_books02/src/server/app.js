const koa = require("koa");
const render = require("koa-swig");
const path = require("path");
const co = require("co");
const app = new koa();
const serve = require("koa-static");
app.use(serve(__dirname + "/assets"));
const config = require("./config/index");
const { loadControllers, scopePerRequest } = require("awilix-koa");
const { asClass, asValue, Lifetime, createContainer } = require("awilix");
// 容器
const container = createContainer();
// 要注入的所有类装载到container中
container.loadModules([__dirname + "/models/*.js"], {
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
// log
const log4js = require("log4js");
log4js.configure({
  appenders: { cheese: { type: "file", filename: "logs/error.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});
const errorHandler = require("./middleware/errorHandler");
const logger = log4js.getLogger("cheese");

errorHandler.error(app, logger);
app.context.render = co.wrap(
  render({
    root: path.join(__dirname, "views"),
    autoescape: true,
    // SSR渲染的瓶颈都在cache里
    // cache: "memory", // disable, set to false
    cache: false,
    ext: "html",
    locals: "zh",
    varControls: ["[[", "]]"],
    filters: {
      formatVersion: function(version) {
        return "@v" + version;
      },
    },
    tags: {},
    extensions: {
      now: function() {
        return Date.now();
      },
    },
  })
);

// 自动去装载路由
app.use(loadControllers(__dirname + "/controllers/*.js"));
app.listen(config.port);
