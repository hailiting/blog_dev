# Express基础
#### 一：express的核心特性：
1，可以设置中间件来响应HTTP请求
2，定义了路由表用于执行不同的HTTP请求动作
3，可以通过向模板传递参数来动态渲染HTML页面
~~~
var express = require('express');
var app = express();
app.get('/',function(req,res){
  res.send('hello world')
})
//  启动服务
var server= app.listen(8081,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为http://%s:%s",host,port)
})
~~~
#### 二，请求和响应的一些参数
##### supervisor  => 热启动
~~~
app.get('/', function (req, res) {
   res.send('qweqw'+req.query.username);
})
app.get('/:id',function(req,res){
	res.send('hello'+req.params.id);
  res.json({
    id: res.params.id
  })
})
~~~
##### request 和 response对象的具体介绍：
###### request 对象 （表示HTTP请求，包含请求查询字符串，参数，内容，HTTP头部等属性）
1，req.app  当callback为外部文件时，用req.app访问express实例
2，req.baseUrl: 获取路由当前安装的URL路径
3，req.body / req.cookies: 获得[请求体] / Cookies
4，req.fresh / req.stale: 判断请求是否还【新鲜】
5，req.hostname / req.ip: 获取主机名和IP地址
6，req.originalUrl: 获取原始请求URL
7，req.params: 获取路由的parameters
8，req.path: 获取请求路径
9，req.protocol: 获取协议类型
10，req.query: 获取URL的查询参数串
11，req.route: 获取当前匹配的路由
12，req.subdomains: 获取子域名
13，req.accepts(): 检查可接受的请求的文档类型
14，req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages: 返回指定字符集的可接受字符编码
15，req.get(): 获取指定HTTP的请求体
16，req.is(): 判断请求头Content-Type的MIME类型
###### response 对象 （表示HTTP响应，即在接收到请求时向客户端送的HTTP响应数据）
1，res.app: 同上
2，app.append(): 追加指定HTTP头
3，res.set()在res.append()后将重置之前的设置头
4，res.cookie(name,value[,option]): 设置Cookie
5，opition: domain / expires / httpOnly / maxAge / path / secure / signed
6，res.clearCookie(): 清除cookie
7，res.download(): 传送指定路径文件
8，res.get(): 返回指定的HTTP头
9，res.json(): 传送JSON响应
10，res.jsonp(): 传送JSONP响应
11，res.location(): 只设置响应的Location HTTP头，不设置状态码或close response
12，res.redirect(): 设置响应的Location HTTP头，并设置状态码302
13，res.render(view,[loacals],callback): 渲染一个view同时向callback传递渲染后的字符串，如果渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
14，res.send(): 传送HTTP响应
15，res,sendFeil(path[,options][,fn]): 传送指定路径文件 -会自动根据文件extension设定Content-Type
16，res.set(): 设置HTTP头，传入object可以一次设置多个头
17，res.status(): 设置HTTP状态码
18，res.type(): 设置Content-Type的MIME类型

#### 路由
~~~
var express = require('express');
var app = express();
// 主页
app.get('/',function(req,res){
  res.send('Get Hello')
  console.log('index get')
})
// post 请求
app.post('/',function(req,res){
  console.log('主页post请求');
  res.send('Hello post')
})
// /del_user 页面响应
app.get('/del_user',function(req,res){
  console.log('/del_user Get 请求');
  res.send('删除页面');
})
// post 请求
app.post('/del_user',function(req,res){
  console.log('主页post请求');
  res.send('Hellasdasdo post')
})
var server = app.listen(8081, function(){
  <!-- var host = server.address().address
  var port = server.address().port -->
  console.log(213)
})
~~~
##### 静态文件
~~~
var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/',function(req,res){
  res.send('Hello World');
})
var server = app.listen(8081,function(){
  var host = server.address().address
  var port = server.address().port
  console.log(host)
})
~~~
##### GET方法
~~~
// index.html
<html>
  <style src="styleSheels/index.css"
  <body>
    <form action="http://192.168.1.166/process_get" method = "GET">
      First name: <input type="text" name = "first_name"><br/>
      last name: <input type="text" name = "last_name"><br/>
      <input type = "submit" value="Submit">
    </form>
  </body>
</html>
// server.js
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/index.html', function (req, res) {
	res.sendFile(__dirname+'/views/'+'index.html')
})

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
~~~
##### POST方法
~~~
// index.html
<html>
  <link rel="stylesheet" href="stylesheels/index.css">
  <body>
    <form action="http://192.168.1.166:8081/process_post" method = "POST">
      First name: <input type="text" name = "first_name"><br/>
      last name: <input type="text" name = "last_name"><br/>
      <input type = "submit" value="Submit">
    </form>
  </body>
</html>



// app.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编辑解析
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
app.use(express.static('public'));

app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + '/views/' + 'index.html')
})
app.post('/process_post', urlencodedParser, function(req, res) {
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    }
    console.log(response);
    res.end(JSON.stringify(response));
})


var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
~~~

##### 文件上传
~~~
// index.html

~~~