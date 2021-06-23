var express = require("express");

var app = express();
// 第三方模块的加载
var mysql = require("mysql");
// 配置资源
app.use(express.static("public"));
// 配置模板
var swig = require("swig");
app.set("view engine", "html");
app.engine("html", swig.renderFile);

// 设置mysql
var connection = mysql.createConnection({
  host: "localhost",
  port: "3308",
  user: "root",
  password: "",
  database: "yi",
});
connection.connect();
// 路由配置
app.get("/", function(req, res, next) {
  res.render("index", { title: "mmmm" });
});
app.get("/receive", function(req, res, next) {
  var _json = {
    username: req.query.username,
    password: req.query.password,
  };
  var query = connection.query("INSERT INTO userinfo SET?", _json, function(
    error,
    result
  ) {
    if (error) {
      res.json({
        success: "no",
        msg: "插入数据失败",
      });
    } else {
      res.json({
        success: "ok",
        msg: "插入成功",
      });
    }
  });
});
// 容错机制
app.get("*", function(req, res, next) {
  res.status(404);
  res.end("404");
});
app.use(function(err, req, res, next) {
  res.status(500);
  res.end(`${err} 500 error`);
});

app.listen(9999, function() {
  console.log("server is running in 9999");
});
