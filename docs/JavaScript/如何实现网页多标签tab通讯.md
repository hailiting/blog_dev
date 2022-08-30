# 如何实现网页多标签 tab 通讯

- detail page title 改变，list 里的 title 随之改变

## WebSocket

- 无跨域限制
- 需要服务端支持，成本高

## 通过 localstorage 通讯

- 同域 A 和 B 两个页面(跨域不共享)

```js
// A页面监听
window.addEventListener("storage", (event) => {
  console.info("key", event.key);
  console.info("value", event.newValue);
});

// B页面修改
btn1.addEventListener("click", () => {
  const newInfo = {
    id: 100,
    name: "标题" + Date.now(),
  };
  localStorage.setItem("changeInfo", JSON.stringify(newInfo));
});
```

## 通过`SharedWorker`通讯

- SharedWorker 是 WebWorker 的一种
- WebWorker 可开启子进程执行 JS，但不能操作 DOM
- SharedWorker 可单独开启一个进程，用于同域页面通讯

```js
// worker.js
const set = new Set();
onconnect = (event) => {
  const port = event.ports[0];
  set.add(port);
  port.onmessage = (e) => {
    // 广播消息
    set.forEach((p) => {
      p.postMessage(e.data);
    });
  };
  port.postMessage("worker.js done");
};

// demo1.html
const worker = new SharedWorker("./worker.js");
const btn1 = document.getElementById("btn1");
worker.port.onmessage = (e) => console.info("list", e.data);
btn1.addEventListener("click", () => {
  console.log("clicked");
  worker.port.postMessage("detail go...");
});
// demo2.html
const worker = new SharedWorker("./worker.js");
worker.port.onmessage = (e) => console.info("list", e.data);
```
