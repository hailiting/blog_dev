# 用node起一个简单的服务
## web 
~~~
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(4000);
~~~
## ws
~~~
let express = require("express");
let app =  express();
let WebSocket = require("ws");
let wss = new WebSocket.Server({port:3000});
wss.on("connection", function(ws){
  ws.on("message", function(data){
    console.log(data);
    ws.send("我不爱你")
  })
})
~~~