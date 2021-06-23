var express = require("express");
var logger = require("morgan");
var fs = require("fs");
var FileStreamRotator = require("file-stream-rotator");
var app = new express();
// 设置日志目录
var logDirectory = __dirname + "/logs";
// 确保日志文件目录存在，没有则创建
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// 创建一个写路由
var accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + "/access-%DATE%.log",
  freequency: "daily",
  verbose: false,
})
app.use(logger("combined", { stream: accessLogStream })); // 写入日志文件
app.get("/", function (req, res) {
  res.send("hello world!");
});
app.listen(3000);