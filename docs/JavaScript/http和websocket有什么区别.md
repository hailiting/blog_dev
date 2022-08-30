# http 和 websocket 有什么区别

## websocket

- 支持端对端通讯
- 可以由 client 发起，也可以由 server 发起
- 用于：消息通知，直播间讨论区，聊天室，协同编辑

## 区别

- WebSocket 协议名是`ws://`,可双端发起请求
- WebSocket 没有跨域限制
- 通过 send 和 onmessage 通讯（HTTP 通过 req 和 res）

```js
// ws 升级为 wss
import { createServer } from "https";
import { readFileSync } from "fs";
import { WebSocketServer } from "ws";
const server = createServer({
  cert: readFileSync("/path/to/cert.pem"),
  key: readFileSync("/path/to/key.pem"),
});
const wss = new WebSocketServer({ server });
```

```js
// 实际项目推荐 socket.io，API更简洁
io.on("connection", socket=>{
  // emit an event to the socket
  socket.emit("request", /*...*/)
// emit an event to all connected sockets
io.emit("broadcast", /*...*/)
socket.on("reply",=>{})
})
```

## WebSocket 和 HTTP 长轮询的区别

- http 长轮询：客户端发起请求，服务端阻塞，不会立即返回
  - http 长轮询，需要处理 timeout
- websocket: 客户端可发起请求，服务端也可发起请求
