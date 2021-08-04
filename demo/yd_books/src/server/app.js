const koa = require("koa");
const render = require("koa-swig");
const path = require("path");
const co = require("co");
const app = new koa();
const serve = require("koa-static");
app.use(serve(__dirname + "/assets"));
const config = require("./config/index");
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

require("./route/index")(app);
app.listen(config.port);
