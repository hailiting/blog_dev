// node app.js 啥日志也不会输出
// DEBUG=worker:* node app.js  会输出worker:*下的所有日志
// DEBUG=http node app.js  会输出变量为http的所有日志
var debug = require("debug")("http"), http = require("http"), name = "My App";
debug("booting %o", name);
http.createServer(function (req, res) {
  debug(req.method + "" + req.url);
  res.end("hello\n");
}).listen(3000, function () {
  debug("listening");
})
require("./worker");