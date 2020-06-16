# NodeJS

## 如何阅读
### 第一步，在本地跑起来测试用例
* git clone https://github.com/nodejs/node.git
* cd node
* ./configure && make
* make install
* make test
### 第二步，分层
* 纯JavaScript写的核心模块【lib】
* 带NativeBinding的JavaScript核心模块 【lib】
* C++文件 【src】

#### node 代码分支
* branch name: fix/gh-{num}
* commit message: "module name: description"
* test/parallel/test-*.js

### 前后端分离及登录验证
~~~
web app 小程序 【token/cookie/session】
  view层
    | 接口
  业务层「biz business 业务逻辑层」 -> session「登录状态等」 「权限通知」
    |                            -> redis 「会话共享」
    | 接口
    |
  base层「数据库操作，文件上传等基础模块」
~~~
### cookie
1, cookie是服务端初始化的
2, 服务端和客户端都可以修改 
3,「httpOnly 浏览器不容许js操作，只能浏览器自己可以操作」

### 多层架构
表现层User Interface layer (web components)
业务逻辑层BLL (Business Logic Layer) =》干活
数据访问层工厂类 DALFactory (Data access layer factory)
数据访问接口层 IDAL (Interface Data access layer)
数据访问接口层 DLL (Data access layer) =》 给干活逻辑封装
数据访问SqlServer封装层 (SQL server data access layer) =》封装数据库接口去访问数据库
数据库集群 

~~~
- BLL 实现业务逻辑
- controllers  暴露接口
  import xxx from "../BLL/xxxBLL"
  xxxController
  _server.get("/link", xxxController)
- DAL 逻辑数据库，实现真实的用户场景 【不做数据库操作】
- DBUtility
  - MysqlDbHelper 【数据库操作工具类】
- Config 一些常量
- Models 数据库的一些映射
   module.exports = function(db,cb){
     db.define("xxx", {
       id: {
         type: "serial",
         key: true
       },
       xxx: String
     })
   }
- app.js
~~~
AOP 切面层
#### JavaWeb
* jsp 指令元素（import）jsp动作元素
* jsp内置对象 （session, request, response)
* javabean对象 可重用组件化思想
* el表达式和jstl标签``<x:if>``

#### Node.js的本质是一个JavaScript的解析器
#### Node.js是JavaScript的运行环境
#### Node.js是服务器程序
#### Node.js本身是使用v8引擎
#### Node不是web服务器

=》通过高性能的Web服务
=》IO性能强大（IO端口，网络的请求和反馈）
优势：
##### 处理大流量数据
##### 适合实时交互的应用
##### 完美支持对象数据库（moddb）
##### 异步处理大量并发连接

###### Hello World!
~~~
var http = require('http');
http.createServer(function(req,res){
  // 定义http头
  res.writeHead(200,{'Content-Type':'text/plan'});

  // 发送相应数据
  res.end('Hello World!\n');
}).listen(8000);

// 服务运行后输出的一行信息
console.log('server is ok')
~~~

#### 回调
##### 函数调用方式分为三类：同步调用，回调，异步调用
##### 回调是一种双向调用模式

#### 阻塞与非阻塞
##### 阻塞与非阻塞关注的是程序在等待调用结果（信息，返回值）时的状态
##### 阻塞是做不完不准回来
##### 非阻塞是你先做，我先看看有没有其他事情可以做，完了吗告诉我一声
~~~
// 同步调用
var fs = require('fs');
var numbers = fs.readFileSync('numbers.txt');
// 阻塞 Sync()
console.log(numbers.toString());

// 非阻塞
var fs = require('fs');
var numbers = fs.readFile('numbers.txt',function(err,data){
  // dosthing;
  console.log(err,data)
});
~~~

#### nodejs事件驱动
##### nodejs是单进程单线程的应用程序，通过回调实现异步调用
###### 非阻塞式I/O 事件驱动IO
                                            |------------>|
引入events -> EventEmitters(事件发射器) -> events(事件队列)|  Event Loop  | -> {Event Handlers(事件处理程序)}
                                            | (事件循环)   |
                                            |<------------|
~~~
// 引入Event模块，并创建eventsEmitter对象
var events = require('events');
var eventEmitter = new events.EventEmitter();
// 绑定事件处理函数
var connctHandler = function connected(){
  console.log('connected被调用了!');
}
// 完成事件绑定
eventEmitter.on('connection',connctHandler);
// 触发事件
eventEmitter.emit('connection');
console.log('程序执行完毕')
~~~

#### Node.js模块化
##### 模块是Node.js应用程序基本组成部分，文件和模块是一一对应的，一个模块就是一个Node.js文件
##### Node.js中存在4类模块（原生模块和3种文件模块）

~~~
// main.js
// node.js默认后缀为.js
var hello = require('./hello');
hello.world();

// hello.js
exports.world = function(){
  console.log('hello world');
}
~~~
###### Nodejs模块的加载方式
####### 从文件模块缓存中加载
####### 从原生模块加载
####### 从文件加载

#### Nodejs 函数
~~~
function say(word){
  console.log(word);
}
function execute(someFunction,value){
  someFunction(value);
}
execute(say,'hello')
execute(function(world){console.log('this is'+world)},'aaa')

// 同样功能，不同的实现方式
// 匿名函数
var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.write('hello world');
	res.end()
}).listen(8000);

// 回调函数
var http = require('http');
function onReq(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.write('asa');
	res.end();
}
http.createServer(onReq).listen(3000)
~~~

#### Nodejs路由
~~~
//  server.js
'use strict'
var http = require('http');
var url = require('url');
function start(route){
	function onRequest(req,res){
		// url.parse(string).query 
		// querystring=>post的参数
		// query =>get的参数
		// url.parse(string).pathname
		var pathname = url.parse(req.url).pathname;
		route(pathname,res);
	}
	http.createServer(onRequest).listen(3000);
	// console.log('server has started.');
}
exports.start = start;

//   router.js
function route(pathname, res) {
    if (pathname === "/") {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Hell World');
        res.end();
    }else if(pathname === '/index/data' ){
    	res.end('index');
    }else{
    	res.end('404');
    }
}
exports.route = route;


// index.js
var server = require('./server');
var router = require('./router');
server.start(router.route);
~~~
#### Nodejs GET/POST 请求
### GET请求=》url模块里的parse
~~~
var http = require('http');
var url = require('url');
var util = require('util');
http.createServer(function(req,res){
  res.writeHead(200,{'content-type','text/plain;charset=utf-8'});
  // url.parse(req.url,true) => url后缀+参数   url.parse(req.url,true).query =>请求参数
  res.end(util.inspect(url.parse(req.url,true)))
}).listen(3000)
~~~
###### post
######### nodejs默认不会解析请求体，需要手动来做
~~~
// 基本语法结构说明
var http = require('http');
var querystring = require('querystring');
http.createServer(function(req,res){
  // 定义一个post用于暂存请求体的信息
  var post = '';
  // 通过req的data事件来监听函数，每当接受到请求体的数据，就会累加到post里
  req.on('data',function(chunk){
    post += chunk;
  })
  // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回
  req.on('end',function(){
    post = querystring.parsr(post);
    res.end(util.inspect(post));
  })
}).listen(3000)

// ep
var http = require('http');
var querystring = require('querystring');
var postHTML =
    '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名： <input name="name"><br>' +
    '网站 URL： <input name="url"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body></html>';
http.createServer(function(req, res) {
    var body = '';
    req.on('data', function(chunk) {
        body += chunk;
    })
    req.on('end', function() {
        body = querystring.parse(body);
        res.writeHead(200, { 'Content-type': 'text/html;charset=utf8' });
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        if (body.name && body.url) {
            // 输出提交的数据
            res.write('网络名：' + body.name);
            res.write('<br>');
            res.write('网站url：' + body.url);
        } else {
            res.write(postHTML);
        }
    	res.end();
    })
}).listen(3000);
~~~
#### nodejs全局对象
##### nodejs的全局变量是global,浏览器的请求变量是window
~~~
// 输出全局变量 __filename 的值（如果在模块中，返回的是模块文件的路径，如果在当前执行的脚本里，返回的是文件所在路径的绝对路径）
console.log(__filename)

// process  用于描述nodejs进程状态的对象 ***
~~~
#### nodejs文件系统
##### 文件模块的方法都有异步和同步
~~~
var fs = require('fs');
// fs.readFile()
// 异步读取
fs.readFile('input.txt',function(err,data){
  if(err){
    return console.log(err);
  }
  console.log('异步读取：'+data.toString());
})
// 同步读取
var data = fs.readFileSync('input.txt');
console.log('同步读取：'+ data.toString());
console.log('程序执行完毕');

// fs.open(path,flags[,mode],callback)   
// path: 文件的路径   
// flags文件打开的行为
// mode 设置文件模式（权限），文件创建默认权限为0666（可读，可写
// callback 回调，带有两个参数 callback(err,fd)
// 打开文件
var fs = require('fs');
console.log('to be open file')
fs.open('input.txt','r+',function(err,fd){
  if(err){
    return console.log(err)
  }
  console.log('the file is opened')
})

// fs.stat(path,callback) // callback(err,stats)  stats 是 fs.Stats 对象
// 获取文件信息
var fs = require('fs');
fs.stat('input.txt',function(err,stats){
  if(err){
    return console.log(err);
  }
  console.log(stats)
  console.log(stats.isFile());
  console.log(stats.isDirectory());
})

// fs.writeFile(file,data[,options],callback)
~~~
#### nodejs 常用工具 => util
~~~
// util.inherits
var util = require('util');
function Base(){
  this.name = 'base';
  this.base = 1232;
  this.sayHello = function(){
    console.log('hello'+this.name);
  };
}
Base.prototype.showName = function(){
  console.log(this.name);
}
function Sub(){
  this.name = 'sub';
}
util.inherits(Sub,Base);   // Sub仅仅继承了Base原型中的函数
var objSub = new Sub();
objSub.showName();	
// objSub.sayHello(); err  找不到构造函数里的内容	
var objBase=new Base();
objBase.sayHello();
objBase.showName();

// util.inspect  =>将任意东西转换成字符串
var util = require('util');
function Person(){
  this.name = 'sadf';
  this.toString = function(){
    return this.name
  }
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj,true))

// 检测数据类型 =》返回值为true or false
util.isArray(object);
util.isRegExp(object);
util.isDate(object);
util.isError(object);
~~~