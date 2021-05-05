# web3js

## 前期准备

### 安装 solc

```shell
$ npm i solc -g
$ solcjs -V
0.8.4+commit.c7e474f2.Emscripten.clang
```

## 简介

- Web3 JavaScript app API
- web3js 是一个 JavaScript API 库，要使 DApp 在以太坊上运行，可以使用 web3js 库提供的 web3 对象
- web3js 通过 RPC 调用与本地节点通信，它可以用于任何暴露了 RPC 层的以太坊节点
- web3 包含 eth 对象-web3.eth(专门与以太坊区块链交互)和 shh 对象-web3.shh(用于与 Whisper 交互)

## web3 模块加载

- 将 web3 模块安装在项目中

```shell
npm install web3@0.20.1
```

- 然后创建一个 web3 实例，设置一个`provider`
- 为了保证 MetaMask 设置好`provider`不被覆盖掉，在引入 web3 之前，我们一般要做当前环境的检查（以 v0.20.1 为例）

```js
if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
```

## 异步回调（callback）

- web3js API 设计的最初始的目的，主要是为了和本地 RPC 节点共同使用，所以默认情况下发送的是同步 HTTP 请求
- 如果要发送异步请求，可以在函数的最后一个参数位置上吗，传入一个回调函数。回调函数是可选的（optional）
- 一般采用回调风格的“错误优先”，例如：

```js
web3.eth.getBlock(48, function(error, result) {
  if (!error) {
    console.log(JSON.stringify(result));
  } else {
    console.error(error);
  }
});
```

### 用 Promise 回调

- 为了帮助 web3 集成到不同标准的所有类型，1.0.0 版本提供了很多方式处理异步函数。大多数 web3 对象允许将一个回调函数作为最后一个函数参数传入，同时会返回一个 promise 用于链式函数调用
- 以太坊作为一个区块链系统，一次请求具有不同的结束阶段，为了满足这个要求，1.0.0 版本将这类函数调用的返回值包装成一个“承诺事件”（promiEvent），这是一个 promise 和 EventEmitter 的结合体
- PromiEvent 的用法就像 promise,另外还加入了`.on`,`.once`和`.off`方法

```js
web3.eth.sendTransation({from:"0x123...", data: "0x2323..."})
.once("transactionHash", function(hash){
  ...
})
.once("receipt", function(receipt){
  ...
})
.on("confirmation", function(confNumber, receipt){
  ...
})
.on("error", function(error){
  ...
})
.then(function(receipt){
  // will be fired once the receipt is mined
})
```
