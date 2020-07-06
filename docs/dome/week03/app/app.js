import Koa from "koa";
import router from "koa-simple-router";
import render from "koa-swig";
import co from "co";
import serve from "koa-static";

import initController from "./controller/initController.js";
import config from "./config";

const app = new Koa();
initController.init(app, router);
console.log(config.get("viewsDir"))
app.context.render = co.wrap(render({
  root: config.get("viewsDir"),
  autoescape: true,
  cache: "memory",
  ext: "html",
  writeBody: false,
}))
app.use(serve(config.get("staticDir")));
app.listen(config.get("port"));
export default app;
