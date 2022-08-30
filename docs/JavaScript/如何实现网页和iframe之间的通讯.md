# 如何实现网页和 iframe 之间的通讯

- postMessage

```html
<!-- index.html -->
<button id="btn1">发送消息</button>
<iframe id="iframe1" src="./child.html"></iframe>
<script>
  const btn1 = document.getElementById("btn1");
  btn1.addEventListener("click", () => {
    console.info("index clicked");
    window.iframe1.contentWindow.postMessage("hello", "*");
  });
  window.addEventListener("message", (event) => {
    console.info("origin", event.origin);
    console.info("index received", event.data);
  });
</script>
<!-- child.html -->
<button id="btn1">发送消息</button>
<script>
  const btn1 = document.getElementById("btn1");
  btn1.addEventListener("click", () => {
    console.info("child clicked");
    window.parent.postMessage("hello from child", "*");
  });

  window.addEventListener("message", (event) => {
    console.info("origin", event.origin);
    console.info("child received", event.data);
  });
</script>
```

- MessageChannel

```js
const { port1, port2 } = new MessageChannel();
port1.onmessage = function (event) {
  console.log("收到来自port2的信息：", event.data);
};
port2.onmessage = function (event) {
  console.log("收到来自port1的信息：", event.data);
  port2.postMessage("pong");
};
port1.postMessage("ping");

// port1.addEventListener("message", function (event) {
//   console.log("收到来自port2的消息：", event.data);
// });
// port1.start()
// port2.addEventListener("message", function (event) {
//   console.log("收到来自port2的消息：", event.data);
//   port2.postMessage("pong");
// });
// port2.start()
// port1.postMessage("ping")
```
