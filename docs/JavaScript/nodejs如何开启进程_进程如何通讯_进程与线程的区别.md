# nodejs 如何开启进程,进程如何通讯, 进程与线程的区别

- 开启子进程可以用`child_process.fork`和`cluster.fork`
- 使用 send 和 on 传递消息

## nodejs 如何开启进程,进程如何通讯

进程 process
线程 thread

- 进程，OS 进行**资源**分配和调度的最小单位，有独立内存空间
- 线程，OS 进行**运算**调度的最小单位，共享进程内存空间
- JS 是单线程的，可以用 webworker(进程)实现多线程（像在本地浏览器内开一个微型服务器，微型服务器进行一些复杂的计算，和主线程进行通信）(`new Work("./index.js")`)
  - 单例模式

## 为什么要多进程

- 多核 cpu，更适合处理多进程
- 内存较大，多个进程才能更好的利用（单进程有内存上限的）
- 总之，”压榨“机器资源，更快，更节省

## Demo: nodejs 多进程

- fork
  - fork 模式，单实例多进程，常用于多语言混编，如 php，python 等，不支持端口复用，需要自己做应用的端口分配和负载均衡的子进程业务代码
  - 缺点：单服务器实例容易由于异常会导致服务器实例崩溃
- cluster 集群
  - cluster 模式，多实例多进程，但只支持 node，端口可复用，不需要额外配置，0 代码实现负载均衡
  - 优点：由于多实例机制，可以保证服务器的容错性，就算出现异常也不会使多个服务器实例同时崩溃
- 共同点：由于都是多进程，都需要消息机制或数据持久化来实现数据共享

```js
// process-cluster.js
const http = require("http");
const cpuCoreLength = require("os").cpus().length;
const cluster = require("cluster");
if (cluster.isMaster) {
  for (let i = 0; i < cpuCoreLength; i++) {
    cluster.fork(); // 开启子进程
  }
  cluster.on("exit", (worker) => {
    console.info("子进程退出");
    cluster.fork();
  });
} else {
  // 多个子进程会共享一个TCP连接， 提供一个网络服务
  const server = http.createServer((req, res) => {
    console.info("process pid", process.pid);
    res.writeHead(200);
    res.end("done");
  });
  server.listen(3000);
}
// process-fork.js
const http = require("http");
const fork = require("child_process").fork;
// const server = http.createServer();

const server = http.createServer((req, res) => {
  if (req.url === "/get-sum") {
    console.info("主进程 pid", process.pid);
    // 开启子进程
    const computeProcess = fork("./compute.js");
    computeProcess.send("开始计算");
    computeProcess.on("message", (data) => {
      console.info("主进程接受到的信息：", data);
      res.end("sum is" + data);
    });
    computeProcess.on("close", () => {
      console.info("子进程因报错而退出");
      computeProcess.kill();
      res.end("error");
    });
  }
  // res.end("hello");
});
server.listen(3000, () => {
  console.info("localhost: 3000");
});
console.info(process.pid);

// compute.js
/**
 * 子进程
 */
function getSum() {
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum += i;
  }
  return sum;
}
process.on("message", (data) => {
  console.info("子进程PID", process.pid);
  console.info("子进程接收到的信息：", data);
  const sum = getSum();
  // 发送信息到主进程
  process.send(sum);
});
```
