const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const schedule = require("node-schedule");
const extend = require("./extend");
const { log } = require("./middleware");

/**
 * 属性扩展
 */
const app = extend(express());


//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Content-Type
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,PATCH,DELETE,HEAD');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
app.set("views", "./views");
app.set("view engine", "pug");
app.set("trust proxy", 2);
app.use(log(app));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  name: "calabash-token",
  secret: app.app_config.sessionSecret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    domain: "localhost",
    secure: app.app_config.isProd,
    maxAge: 1000 * 3600
  }
}))

app.use("/robot", app.app_router.robotRouter);
app.use("/api/v1", app.app_router.userRouter);
app.use("/api/v2", app.app_router.chatRouter);
app.use("/api/v3", app.app_router.monitorRouter);

schedule.scheduleJob("0 0 18 * * *", app.helper.makeSiteMap);

module.exports = app;

