# 项目解读
## 启动项目
~~~
# mongod
sudo mongod
# redis
redis-server
~~~


## node 模块
### http
~~~
// app.js
var http = require("http");
http.createServer(function(req, res){
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("<h1>Node.js</h1>");
  res.end("<p>hello world</p>")
}).listen(3000);
console.log("http server is listening at port 3000");
~~~
#### http url get
~~~
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
~~~
### ``process.cwd()``和``__dirname``区别
cwd 是指当前node命令执行时所在文件夹目录;
__dirname是指被执行js文件所在的文件夹目录;
## npm 包
### debug
debug库是一款专门控制日志输出的库，根据DEBUG环境变量，控制日志是否输出。
【可以选择性的输出哪些模块日志】
~~~
// app.js
/** node app.js 啥日志也不会输出
  * DEBUG=worker:* node app.js  会输出worker:*下的所有日志
  * DEBUG=http node app.js  会输出变量为http的所有日志
  */
var debug = require("debug")("http"), http = require("http"), name = "My App";
debug("booting %o", name);
http.createServer(function (req, res) {
  debug(req.method + "" + req.url);
  res.end("hello\n");
}).listen(3000, function () {
  debug("listening");
})
require("./worker");
// worker.js
var a=require("debug")("worker:a"), b=require("debug")("worker:b");
function work(){
  a("doing lots of uninteresting work");
  setTimeout(work, Math.random()*1000);
}
work();
function workb(){
  b("doing some work");
  setTimeout(workb, Math.random()*2000);
}
workb();
~~~
### socket.io 
socket.io不是websocket，它是将Websocket和轮询（Polling机制）以及其它实时通信方法封装成一个通用的接口，并且在服务端实现这些实时机制的相应代码。也就是说Socket.io包含websocket,websocket仅仅是socket.io的一个子集，因此websocket客户端连不上socket.io服务器，socket.io客户端也连不上websock服务器。
~~~
const server = require("http").createServer();
const io = require("socket.io")(server,{path:"/socket"});
io.on("connection", client=>{
   console.log(client.id, '=======================')
   client.on("channel", data=>{
     console.log(data);
     io.emit("broadcast", data);
   })
   client.on("disconnect", ()=>{
     console.log("close");
   })
})
server.listen(3000);
// html
<script src="https://cdn.bootcss.com/socket.io/2.2.0/socket.io.slim.js"></script>
<body>
  <input type="text" id="input">
  <button id="btn"> send</button>
  <div id="content-wrap"></div>
</body>
<script>
window.onload = ()=>{
  let inputValue = null;
  let socket = io("http://localhost:3000");
  socket.on("broadcast", data=>{
    let content =document.createElement("p");
    content.innerHTML = data;
    document.querySelector("#content-wrap").appendChild(content);
  })
  let inputChangeHandle = (ev)=>{
    inputValue = ev.target.value;
  }
  let inputDom = document.querySelector("#input");
  inputDom.addEventListener("input", inputChangeHandle, false);
  let sendHandle = ()=>{
    socket.emit("channel", inputValue);
  }
  let btnDom = document.querySelector("#btn");
  btnDoom.addEventListener("click", sendHandle, false);

  window.onunload = ()=>{
    btnDom.removeEventLister("click", sendHandle, false);
    inputDom.removeEventLister("input", inputChangeHandle, false);
  }
}
</script>
~~~
### express
express框架简单封装了node的http模块，因此，express支持node的原生写法，express的重要意义在于：支持使用中间件+路由 来开发服务器逻辑
~~~
let app = express();
app.get("/demo", function(req, res){
  console.log("rcv msg from browser");
  res.send("this is demo uri");
  res.end();
})
app.listen(3000);
~~~
express到底是什么？
~~~
function createApplication(){
  var app = function(req, res, next){
    app.handle(req, res, next);
  }
  minxin(app, EventEmitter.prototype, false);
  mixin(app, proto, false);
  app.request = Object.create(req, {
    app: {
      configurable: true, enumerable: true, writable: true, value: app
    }
  })
  app.response = Object.create(res,{
    app: {configurable: true, enumerable: true, writable: true, value: app}
  })
  app.init();
  return app;
}
~~~
#### 获取实际客户端的ip
~~~
app.set("trust proxy", "172.16.36.149");
app.get("/", function(req, res){
  console.log("ip: ", req.ip);
})
~~~
### cookie-parser
方便操作客户端的cookie值
#### 1. 安装cookie-parser第三方cookie操作模块
~~~
npm install cookie-parser -S
~~~
#### 2. 引入
~~~
const cookieParser = require("cookie-parser");
app.use(cookieParser("123456")); // 使用cookie中间件，传入签名123456进行加密
~~~
#### 3. 设置cookie
~~~
res.cookie("key", "value", option)
~~~
- option是json，包含以下选择
~~~
{
  domain: "", // 域名
  expires: "", // 过期时间（秒）
  maxAge: "", // 最大失效时间（毫秒），设置在多久后失效
  secure: true, // 当secure为true时，cookie在HTTP中是无效的，在HTTPS中才有效
  path: "/", // 表示cookie影响到的路由，如果路径不匹配时，则不发送这个cookie
  httpOnly: true, // 默认为false，true时，客户端无法通过document.cookie读取到cookie信息，可防止xss攻击
  // 表示是否签名(加密)cookie，设为true会对这个cookie签名，这样就需要用res.signedCookies访问，前提是设置中间件app.use传参，未设置则可用res.cookie访问,
  // 被篡改的签名cookie会被服务器拒绝，并且cookie值会重置为它的原始值
  signed: true, 
}
~~~
~~~
res.cookie("cart", {items: [1,2,3]}, {maxAge: 10000*4, signed: true, httpOnly: true});
~~~
#### 4. 获取cookie
~~~
req.signedCookies;
req.signedCookies.cart;
...
~~~
#### 5. 删除cookie
~~~
res.cookie("cart", {items: [1,2,3]}, {maxAge: 0});
~~~
### body-parser
body-parser是一个HTTP请求的中间件，使用这个模块可以解析JSON、Raw、文件、URL-encoded格式的请求体。
~~~
// 常用的api
bodyParser.json()  // 解析JSON格式
bodyParser.raw() // 解析二进制格式
bodyParser.text() // 解析文本格式
bodyParser.urlencoded() // 解析文本格式
~~~
#### 不依赖三方插件的原生写法
~~~
const http = require("http");
http.createServer(function(req, res){
  if(req.method.toLowerCase() === "post"){
    let body = "";
    // 此步骤为接收数据
    req.on("data", function(chunk){
      body+=chunk
    })
    // 开始解析
    req.on("end", function(){
      if(req.headers["content-type"].indexOf("application/json")!==-1){
        JSON.parse(body);
      } else if(req.header["content-type"].indexOf("application/octet-stream")){
        // Rwa格式请求解析
      } else if(req.header["content-type"].indexOf("application/x-www-form-urlencoded")!==-1){
        // url-encoded格式请求解析
      } else {
        //其他格式解析
      }
    })
  }else {
    res.end("其他方式的提交")
  }
}).listen(3000);
~~~
#### 用body-parser的写法
~~~
var express = require("express");
var bodyParrser = require("body-parser");
var app = express();

// 解析applicationn/json
app.use(bodyParser.json());
// 解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
~~~
#### 为单个express路由添加请求体解析
~~~
var express = require("express");
var bodyParser = require("body-parser");

var app = new express();

// 创建application/json解析
var jsonParser = bodyParser.json();
// 创建application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false});

// POST /login 中获取URL编码的请求体
app.post("/login", urlencodedParser, function(req, res){
  if(!req.body) return res.sendStatus(400);
  res.send("welcome, "+req.body.username);
})
// POST /api/users 获取JSON编码的请求体
app.post("/api/users", jsonParser, function(req, res){
  if(!req.body) return res.sendStatus(400);
})
~~~
#### 指定解析方式
指定时，可以通过在解析方法中添加type参数修改指定的Content-Type解析方式。
~~~
app.use(bodyParser.json({type: "text/plain"}));
// 解析自定义的json
app.use(bodyParser.json({type: "application/*+json"}));
// 解析自定义的Buffer
app.use(bodyParser.raw({type: "application/vnd.custom-type"}));
// 将HTML请求体做为字符串处理
app.use(bodyParser.text({type: "text/html"}));
~~~
### express-session
#### session
- session是一种记录开户状态的机制，与cookie保存在客户端浏览器不同，session是保存在服务器中的。
- 当客户端访问服务器时，服务器会生成一个session对象，对象中保存的是key:value值，同时服务器会将key传回给客户端的cookie当中，当用户第二次访问服务器时，就会把cookie当中的key传回到服务器中，最后服务器会把value值返回给客户端。
- 客户端和服务端依靠这个key来访问会话信息数据。
#### 设置session
1. 安装express-session
~~~
npm i express-session --save
~~~
2. 引入express-session模块
~~~
const seesion = require("express-session");
~~~
3. 设置session
~~~
session(options);
~~~
#### session(option)的主要参数
~~~
session
  name: 保存在本地cookie的一个名字，默认connect.sid 可以不设置
  store: session存储实例
  secret: 一个String类型的字符串，作为服务器生成session cookie的签名，防止被篡改
  cookie: session cookie设置(默认： {path: "/", httpOnly: true, secure: false, maxAge: null })
  genid: 生成新session ID的函数（默认使用uid2库）
  resave: 强制保存session即使它并没有变化，默认为true。建议设置为false
  rolling: 在每次请求时强制设置cookie，这将重置cookie过期时间（默认为false）,
  saveUninitialized: 强制将未初始化的session存储，默认为true，建议设置成true，这对于登录验证，减轻服务端存储压力，权限控制是有帮助的。
  proxy: 当设置了secure cookie(通过x-forwarded-proto header)时信任反向代理，当设置为true时，x-forwarded-proto header将被使用。当设置为false时，所有headers将被忽略，当属性没被设定时，将使用express的trust proxy
  unset: 控制req.session是否取消（例如通过delete，或将它设置为null）。它可以使session保持存储状态，但忽略修改和删除的请求（默认为keep）
~~~
##### session常用方法
~~~
req.session.username = "张三";
// 获取session
req.session.username
// 重新设置cookie过期时间
req.seesion.cookie.maxAge = 1000;
// 销毁session
req.session.destory(function(err){

})
~~~
#### 简单的例子
~~~
const express = require('express')
const session = require("express-session");
const app = express()

app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: ("name", "value", {
    maxAge: 5 * 60 * 1000,
    secure: false,
    name: "seName",
    resave: false
  })
}))

app.use("/login", function (req, res) {
  // 设置session
  req.session.userinfo = "张三";
  res.send("登录成功!");
})
app.use("/loginOut", function (req, res) {
  // 设置session
  req.session.destroy(function (err) {
    res.send("退出登录！" + (err || ''));
  })
})
app.use("/", function (req, res) {
  if (req.session.userinfo) {
    res.send("hello " + req.session.userinfo + ", welcome");
  } else {
    res.send("未登录");
  }
})
app.listen(3000);
~~~
### node-schedule
完成定时任务需求的三方插件
1. 安装
~~~
npm install node-schedule --save
~~~
2. 用法（cron风格定时器）
~~~
const schedule = require("node-schedule");
const scheduleCronstyle = ()=>{
  // 每分钟的第30s定时执行一次
  const j = schedule.scheduleJob("30 * * * * *", ()=>{
    console.log("scheduleCronstyle: "+new Date());
  })
  setTimeout(function(){
    // 取消定时器
    j.cancel();
  }, 5000)
}
scheduleCronstyle()
~~~
#### "* * * * * *" 6个占位符
- 从左到右分别代表：秒、分、时、日、月、周几
* 表示通配符，当是*时，表示任意【秒|分|时....】都触发，
~~~
'30 * * * * *'  每分钟的第30s
'30 1 * * * *'   每小时的第一分钟的第30s
'30 1 1 * * *'  每天的1点的第一分钟的第30s
'30 1 1 1 * *'  每月的第一天的一点的第一分钟的第30s
'30 1 1 1 2016 *' 2016年一月一日一点30s
'30 1 1 * * 1' 每周的一点一分钟30s
'1-10 * * * * *'  每分钟的1-10秒都会被触发
/* dayOfWeek  month  dayOfMonth hour minute second */
{hour: 16, minute: 11, dayOfWeek: 1} 每周一的16点11分触发
~~~
### require-context
require-context 是实现自动化引入模块。就不需要require或import了
1. npm
~~~
npm i require-context --save
~~~
2. 用法
~~~
/**
* directory {String} 读取文件的路径
* useSubdirectories {Boolean} 是否遍历文件的子目录
* regExp {RegExp} 匹配文件的正则
* eg: 
* requireContext(path.join(__dirname, "../router"), false, /\.js$/);
*/
require.context(directory, useSubdirectories=false, regExp=/^\.\//);
~~~
3. dome
~~~
const requireContext = require("require-context");
const model = Symbol("model");
const path = require("path");
const filesContext = requireContext(path.join(__dirname), false, /\my.js$/);
const getFilesObject = app => {
  // filesContext.keys() 返回一个由匹配文件的文件名组成的数组
  // filesContext.resolve(filesContext.keys()[0]) 返回指定文件名的绝对地址
  return filesContext.keys().reduce((obj, filename) => {
    const model = filesContext(filename);
    const util = typeof model === "function" ? model(app) : model;
    const key = filename.split(".")[0] + "Files";
    return obj;
  }, {})
}
getFilesObject()
// getFilesObject 返回的是一个模块，和导入的效果一样
~~~
### morgan 
morgan是一个nodejs关于http请求的日志中间件
1. 安装
~~~
npm install morgan --save
~~~
2. 使用
2.1 将日志写入文件
~~~
var express = require("express");
var logger = require("morgan");
var fs = require("fs");

const app = express();
// 创建一个写入流
const accessLogStream = fs.createWriteStream(__dirname + "access.log", {
  flags: "a"
})
// 将日志写入文件
app.use(logger("combined", { stream: accessLogStream }));
app.use("/", function (req, res) {
  res.send("hello world!");
})
app.listen(3000);
~~~
2.2 一天一个日志文件
~~~
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
~~~
### pug
视图模板引擎
1. 下载
~~~
npm install pug --save
~~~
2. 使用
~~~
const express = require("express");
const app = express();
app.set("views", "./views");
app.set("view engine", "pug");
app.get("/", function (req, res) {
  res.render("index", { title: "hey", message: "Hello there!" })
})
app.listen(3000)
// views/index.pug
html
  head
    title=title
  body
    h1=message
~~~
~~~
// -template.pug
p #{name}的Pug代码！
// 
const pug = require("pug");
const compiledFunction = pug.compileFile("template.pug");
// 渲染一组数据
console.log(compiledFunction({
  name: "Lili"
})) // <p>Lili的Pug代码！</p>
~~~
### multer
node使用express+multer文件上传和下载
#### 1，下载 multer
~~~
npm i multer -save
~~~
#### 2，上传
##### 2.1，单个上传
表单要设置``enctype="multipart/form-data"``
~~~
<h1>文件上传</h1>
<from action="/" method="post" enctype="multipart/form-data">
  // multiple属性是允许多文件上传
  <input id="files" type="file" name="file" multiple />
  <input type="submit" value="上传" />
</from>
~~~
服务端代码，单文件用``single()``
~~~
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.post("/", multer({
  dest: "upload", // upload文件夹如果不存在会新建
}).single("file"), function(req, res, next){
  if(res.file.length === 0){
    res.render("error", {message: "上传文件不能为空！"});
  } else {
    let file = req.file;
    let fileInfo = {};
    fs.renameSync("./upload/"+file.filename, "./upload"+file.originalname);
    // 获取文件信息
    fileInfo.mimetype = file.mimetype;
    fileInfo.originalname = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = file.path;
    // 设置响应类型及编码
    res.set({
      "content-type": "application/json,charset=utf-8"
    });
    res.end("上传成功")
  }
})
~~~
##### 上传多个文件 不用 single 用 .array
~~~
router.post("/", multer({
  dest: "upload"
}).array("file", 10), function(req, res, next){ // 最多支持10张
  let files= req.files;
  if(files.length ===0){
    res.render("err", {message: "上传文件为空"});
    return;
  } else {
    let fileInfos = [];
    for(var i in files){
      let file = files[i];
      let fileInfo = {};

      fs.renameSync("./upload/"+file.filename, "./upload/"+file.originalname);

      // 获取文件基本信息
      fileInfo.mimetype = file.mimetype;
      fileInfo.size = file.size;
      fileInfo.path = file.path;

      fileInfos.push(fileInfo);
    }
    // 设置响应类型及编码
    res.set({
      "content-type": "application/json; charset=utf-8"
    });
    res.end("success!");
  }
})
~~~
#### 下载
~~~
// 第一种，直接下载 [如果是图片，会直接打开，不友好]
let road = "下载文件路径-可是相对路径也可是绝对路径";
res.download(road);

// 第二种，通过管道写入
let path = "下载文件路径-可是相对路径也可是绝对路径";
let road = fs.createReadStream(path); // 创建输入流入口
res.writeHead(200,{
  "Content-Type": "application/force-download",
  "Content-Disposition": "attachment; filename=name"
});
load.pipe(res); 
~~~
## JavaScript原生
### parseInt
解析一个字符串，并返回一个整数。
radix表示要解析数字的基数【2-36】。
~~~
parseInt(string, radix);
parseInt("1f2a.ad62a"); // 1
parseInt(12.62); // 12
~~~
### Object.defineProperties()
Object.defineProperties()方法直接在一个对象上定义新的属性或修改现有的属性，并返回该对象。
~~~
Object.defineProperties(obj, props)
var obj ={};
Object.defineProperties(obj, {
  "property1": {
    value: true,
    writable: true,
  },
  "property2": {
    value: true,
    writable: false,
  }
})
~~~

### Object.fromEntries()
把键值对列表转换为一个对象
~~~
const entries = new Map([
  ["foo", "bar"],
  ["baz", 42]
])
const obj = Object.fromEntries(entries);

console.log(obj) // Object {foo: "bar", "baz": 42}
~~~
### Symbol 
js的第七种数据类型，表示独一无二的值。
Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数返回值也相等。
~~~
const a = Symbol("a");
const b = Symbol("a");
a == b // false
~~~
### join()
数组组装成字符串
~~~
[12,312].join("a"); // "12a312"
~~~
### post put 方法
put指定资源路径 幂等
post无法指定资源路径
### 如何解决Set-Cookie 失效的问题?
1，domain 设置是否正确
2，是否跨域
3，前端axios请求设置
~~~
const fetch = axios.create({
  baseURL: process.env.BUILD_ENV === "development" ? "" : "",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": "zh-cn",
  },
  withCredentials: true,
});
// 服务端
res.header('Access-Control-Allow-Credentials', 'true');
res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
~~~