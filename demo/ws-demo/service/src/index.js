const { WebSocketServer } = require("ws");
const wsServer = new WebSocketServer({ port: 3000 });
// wsServer.on("connection", (ws) => {
//   console.info("connected");
//   ws.on("message", (msg) => {
//     console.info("收到了信息", msg);
//     setTimeout(() => {
//       ws.send("服务端已经收到了信息：" + msg.toString());
//     }, 2000);
//   });
// });
const list = new Set();
wsServer.on("connection", (curWs) => {
  console.info("connected");
  // 实际使用中，应该有清理缓存的，不能一直add
  list.add(curWs);
  curWs.on("message", (msg) => {
    console.info("received message", msg.toString());
    list.forEach((ws) => {
      if (ws === curWs) return;
      ws.send(msg.toString());
    });
  });
});
