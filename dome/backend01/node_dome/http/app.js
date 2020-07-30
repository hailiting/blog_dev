var http = require("http");
var url = require("url");
var server = http.createServer(function (req, res) {
  var reqUrl = req.url;
  if (reqUrl == "/favicon.ico") {
    return;
  }
  console.log(reqUrl);
  var urlObj = url.parse(reqUrl, true);
  console.log(urlObj);
  res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
  res.write("请求url: " + reqUrl + "<br/>")
  res.write("pathname: " + urlObj.pathname + "<br/>")
  res.write("get参数name: " + urlObj.query["name"] + "<br/>")
  res.write("get参数age: " + urlObj.query["age"] + "<br/>");
  res.write("search: " + urlObj.search + "<br/>");
  res.end();
})
server.listen(3000, () => {
  console.log("server start ok: http://localhost:3000")
})