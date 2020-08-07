import Koa from "koa";
import router from "koa-simple-router";
import render from "koa-swig";
import co from "co";
import serve from "koa-static";
// import babel_co from "babal-core/register";
import babal_po from "babel-polyfill";

import initController from "./controller/initController";
import CONFIG from "./config/config";

const app = new Koa();
initController.init(app, router);

app.context.render = co.wrap(render({
  root: CONFIG.get("viewDir"),
  autoescape: true,
  cache: "memory",
  ext: "html"
}))
app.use(serve(CONFIG.get("staticDir")));
app.listen(CONFIG.get("port"));

export default app;
