# Express 基础

## express 能干啥

- 1，可以设置中间件来响应 HTTP 请求
- 2，定义了路由表用于执行不同的 HTTP 请求动作
- 3，可以通过向模板传递参数来动态渲染 HTML 页面

### express 常用模块安装

中间件通过 next 来中间件传递

- body-parser nodejs 中间件，用于处理 JSON, Raw, Text 和 URL 编码数据
- cookie-parser 解析 Cookie 的工具，通过 req.cookies 可以取到传来的 cookie，并把它转成对象
- multer nodejs 中间件，用于处理`enctype="multipart/form-data"`（设置表单的 MIME 编码）的表单数据

```js
var express = require("express");
var app = express();
app.get("/", function(req, res) {
  res.send("hello world");
});
//  启动服务
var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为http://%s:%s", host, port);
});
```

## 二，请求和响应的一些参数

### supervisor => 热启动

```js
// supervisor app.js
app.get("/", function(req, res) {
  // /?username="123"
  res.send("qweqw" + req.query.username);
});
app.get("/:id", function(req, res) {
  res.send("hello" + req.params.id);
  res.json({
    id: res.params.id,
  });
});
```

### request 和 response 对象的具体介绍：

### request 对象 （表示 HTTP 请求，包含请求查询字符串，参数，内容，HTTP 头部等属性）

- 1，req.app 当 callback 为外部文件时，用 req.app 访问 express 实例
- 2，req.baseUrl: 获取路由当前安装的 URL 路径
- 3，req.body / req.cookies: 获得[请求体] / Cookies
- 4，req.fresh / req.stale: 判断请求是否还【新鲜】
- 5，req.hostname / req.ip: 获取主机名和 IP 地址
- 6，req.originalUrl: 获取原始请求 URL
- 7，req.params: 获取路由的 parameters
- 8，req.path: 获取请求路径
- 9，req.protocol: 获取协议类型
- 10，req.query: 获取 URL 的查询参数串
- 11，req.route: 获取当前匹配的路由
- 12，req.subdomains: 获取子域名
- 13，req.accepts(): 检查可接受的请求的文档类型
- 14，req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages: 返回指定字符集的可接受字符编码
- 15，req.get(): 获取指定 HTTP 的请求体
- 16，req.is(): 判断请求头 Content-Type 的 MIME 类型

#### response 对象 （表示 HTTP 响应，即在接收到请求时向客户端送的 HTTP 响应数据）

- 1，res.app: 同上
- 2，app.append(): 追加指定 HTTP 头
- 3，res.set()在 res.append()后将重置之前的设置头
- 4，res.cookie(name,value[,option]): 设置 Cookie
- 5，opition: domain / expires / httpOnly / maxAge / path / secure / signed
- 6，res.clearCookie(): 清除 cookie
- 7，res.download(): 传送指定路径文件
- 8，res.get(): 返回指定的 HTTP 头
- 9，res.json(): 传送 JSON 响应
- 10，res.jsonp(): 传送 JSONP 响应
- 11，res.location(): 只设置响应的 Location HTTP 头，不设置状态码或 close response
- 12，res.redirect(): 设置响应的 Location HTTP 头，并设置状态码 302
- 13，res.render(view,[loacals],callback): 渲染一个 view 同时向 callback 传递渲染后的字符串，如果渲染过程中有错误发生 next(err)将会被自动调用。callback 将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
- 14，res.send(): 传送 HTTP 响应
- 15，res,sendFeil(path[,options][,fn]): 传送指定路径文件 -会自动根据文件 extension 设定 Content-Type
- 16，res.set(): 设置 HTTP 头，传入 object 可以一次设置多个头
- 17，res.status(): 设置 HTTP 状态码
- 18，res.type(): 设置 Content-Type 的 MIME 类型

## 路由

RESTful

```js
var express = require("express");
var app = express();
// 主页
app.get("/", function(req, res) {
  res.send("Get Hello");
  console.log("index get");
});
// post 请求
app.post("/", function(req, res) {
  console.log("主页post请求");
  res.send("Hello post");
});
// /del_user 页面响应
app.get("/del_user", function(req, res) {
  console.log("/del_user Get 请求");
  res.send("删除页面");
});
// post 请求
app.post("/del_user", function(req, res) {
  console.log("主页post请求");
  res.send("Hellasdasdo post");
});
var server = app.listen(8081, function() {
  // var host = server.address().address
  // var port = server.address().port
  console.log(213);
});
```

##### 静态文件

```js
var express = require("express");
var app = express();
// http://localhost:8081/css/index.css
app.use(express.static("public"));
app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/views/" + "index.html");
});
var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(host);
});
```

##### GET 方法

```js
// index.html
// <html>
//   <style src="styleSheels/index.css"
//   <body>
//     <form action="http://192.168.1.166/process_get" method = "GET">
//       First name: <input type="text" name = "first_name"><br/>
//       last name: <input type="text" name = "last_name"><br/>
//       <input type = "submit" value="Submit">
//     </form>
//   </body>
// </html>
// server.js
var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/views/" + "index.html");
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
```

##### POST 方法

```html
<!-- index.html -->
<html>
  <link rel="stylesheet" href="stylesheels/index.css" />
  <body>
    <form action="http://192.168.1.166:8081/process_post" method="POST">
      First name: <input type="text" name="first_name" /><br />
      last name: <input type="text" name="last_name" /><br />
      <input type="submit" value="Submit" />
    </form>
  </body>
</html>
```

```js
// app.js
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// 创建 application/x-www-form-urlencoded 编辑解析
var urlencodedParser = bodyParser.urlencoded({
  extended: false,
});
app.use(express.static("public"));

app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/views/" + "index.html");
});
app.post("/process_post", urlencodedParser, function(req, res) {
  var response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
```

##### 文件上传

```html
<html>
  <head>
    <title>文件上传表单</title>
  </head>
  <body>
    <h3>文件上传：</h3>
    选择一个文件上传: <br />
    <form action="/file_upload" method="post" enctype="multipart/form-data">
      <input type="file" name="image" size="50" />
      <br />
      <input type="submit" value="上传文件" />
    </form>
  </body>
</html>
```

```js
var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var multer = require("multer");

app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: __dirname + "/tmp/" }).array("image"));
app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/views/" + "index.html");
});
app.post("/file_upload", function(req, res) {
  console.log(req.files[0]);
  var des_file = __dirname + "/tmp/" + req.files[0].originalname;
  fs.readFile(req.files[0].path, function(err, data) {
    fs.writeFile(des_file, data, function(err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: "File uploaded successfully",
          filename: req.files[0].originalname,
        };
      }
      console.log(response);
      res.end(JSON.stringify(response));
    });
  });
});
var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().host;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
```

### cookie 管理

```js
var express = require("express");
var cookieParser = require("cookie-parser");
var util = require("util");

var app = express();
app.use(cookieParser());
app.get("/", function(req, res) {
  console.log("cookies: ", util.inspect(req.cookies));
});
app.listen(8081);
```

## express 中间件 `next()`

中间件（Middleware）是一个函数，可以访问请求对象（`request object(req)`），响应对象（`response object(res)`），和 web 应用处于请求-响应循环流程中的中间件，一般被命名为`next`变量

- 执行任何代码
- 修改请求和响应对象
- 终结请求-响应循环
- 调用堆栈中的下一个中间件函数

### Express 应用可使用如下几个中间件

- 应用级中间件
- 路由级中间件
- 错误处理中间件 `var router = express.router();`
- 内置中间件
- 第三方中间件

```js
var express = require("express");
var app = express();
app.get(
  "/",
  function(req, res, next) {
    req.data = 123;
    next();
  },
  (req, res) => {
    console.log(req.data);
    res.send("hi nn");
    // res.end(""); // end就结束了
  }
);
app.listen(8081);
```

#### 错误处理

```js
var express = require("express");
var cookieParser = require("cookie_parser");

var app = express();
// 获取cookie要前置
app.use(cookieParser());
// 前置处理
app.use(function(req, res, next) {
  req.cookies = function() {
    return {
      data: "1223",
    };
  };
  next();
  aaaan;
});
app.get("/", function(req, res, next) {
  res.send(req.cookies().data);
});
app.get("/index", function(req, res, next) {
  console.log(req.cookies);
  res.send("adfasdf");
});
// 放在后面兜错
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("something wrong");
});
app.listen(8081);
```
