const router = require("koa-simple-router");
const IndexController = require("../controllers/IndexController");
const render = require("koa-swig");
const indexController = new IndexController();

module.exports = (app) => {
  app.use(
    router((_) => {
      // 伪静态
      _.get("/index.html", indexController.actionIndexHtml());
      _.get("/index", indexController.actionIndex());
    })
  );
};
