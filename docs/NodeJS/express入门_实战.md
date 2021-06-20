# express 入门实战

## 全局安装

```js
mkdir expressDome
cd expressDome
npm init -y
npm i express --save
```

## 目录结构

- ## bin
- public
  - 图片 js 样式资源
- routes
  - 路由
- views
  - 模板引擎
- app.js
- package.json

## `app.js`

```js
var express = require("express");
var path = require("path");
var favicon = require("sarve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var routes = require("./routes/index");
var users = require("./routes/users");
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/users", users);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});
module.exports = app;
```

## `bin/www`

```js
// bin/www
var app = require("../app");
var debug = require("debug")("expressdemo:server");
var http = require("http");

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
```

## `routes`

```js
// routes/index.js
var express = require("express");
var router = express.Router();
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
module.exports = router;
```

## `views`

```js
// views/layout.jade
doctype html
html
  head
    title=title
    link(rel="stylesheet", href="/stylesheets/styles.css")
  body
    block content
// views/index.jade
extends layout
block content
  h1=title
  p Welcome to #{title}
```
