import "reflect-metadata";
import { InversifyKoaServer } from "inversify-koa-utils";
import { Container, buildProviderModule } from "./ioc/ioc";
import "./ioc/loader";

import * as render from "koa-swig";
import * as serve from "koa-static";
import * as log4js from "log4js";
import errorHandler from "./middleware/errorHandler";
import co from "co";
import config from "./config/index";
import { join } from "path";
// 基础容器
const container = new Container();
// load所有资源，让所有provide生效
container.load(buildProviderModule());
const server = new InversifyKoaServer(container);

log4js.configure({
  appenders: { cheese: { type: "file", filename: "logs/error.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});
const logger = log4js.getLogger("cheese");

server
  .setConfig((app) => {
    // 中间件
    app.use(serve(__dirname + "/assets"));
    app.context.render = co.wrap(
      render({
        root: join(__dirname, "views"),
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
  })
  .setErrorConfig((app) => {
    // 错误监控
    errorHandler.error(app, logger);
  });
const app = server.build();

app.listen(config.port, () => {
  console.log("inversity 启动成功");
});
