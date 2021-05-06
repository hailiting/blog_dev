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

## 应用二进制接口（ABI）

- web3.js 通过以太坊智能合约的 json 接口（Application Binary Interface, ABI）创建一个 JavaScript 对象，用来在 js 代码中描述
- 函数（functions)
  - type: 函数类型，默认“function”，也可能是“constructor”
  - constant, payable, stateMutability: 函数的状态可变性
  - inputs, outputs: 函数输入，输出参数描述列表
- 事件（events）
  - type: 类型，总是"event"
  - inputs: 输入对象列表，包括 name, type, indexed

## 批处理请求

- 批处理请求允许我们将请求排序，然后一起处理
- 注意：批量请求不会更快，实际上，在某些情况下，一次性地发出许多请求会更快，因为请求是异步处理的
- 批处理请求主要用于确保请求的顺序，并串行处理

```js
var batch = web3.createBatch();
batch.add(
  web3.eth.getBalance.request(
    "0x0000000000000000000000000000000000000000",
    "latest",
    callback
  )
);
batch.add(
  web3.eth
    .contract(abi)
    .at(address)
    .balance.request(address, callback2)
);
batch.execute();
```

## 大数处理

- JavaScript 中默认的数字精度较小，所以 web3.js 会自动添加一个依赖库 BigNumber, 专门用于大数处理

```js
var balance = new BigNumber("131242344353464564564574574567456");
// or
// var balance = web3.eth.getBalance(someAddress);
balance.plus(21).toString(10);
// "131242344353464564564574574567477"
```

- `BigNumber.toString(10)`对小数只保留 20 位浮点精度。所以推荐的做法是，我们内部总是用 wei 来表示余额（大整数），只有在需要显示给用户看的时候才转换为 ether 或其他单位

## 常用 API

### 基本信息查询

- 查看 web3 版本

```js
web3.version.api;
```

- 查看 web3 链接到的节点版本（clientVersion）

```js
// 同步
web3.version.node;
// 异步
web3.version.getNode((error, result) => {
  console.log(result);
});
web3.eth.getNodeInfo().then(console.log);
```

- 获取`network id`

```js
// 同步
web3.version.network;
// 异步
web3.version.getNetwork((err, res) => {
  console.log(res);
});
web3.eth.net.getId().then(console.log);
```

- 获取节点的以太坊协议版本

```js
// 同步
web3.version.ethereum;
// 异步
web3.version.getEthereum((err, res) => {
  console.log(res);
});
web3.eth.getProtocolVersion().then(console.log);
```

### 网络状态查询

- 是否有节点链接/监听，返回 true/false

```js
// 同步
web3.isConnect();
web3.net.listening;
// 异步
web3.net.getListening((err, res) => console.log(res));
web3.eth.net.isListening().then(console.log);
```

- 查看当前链接的 peer 节点

```js
// 同步
web3.net.peerCount;
// 异步
web3.net.getPeerCount((err, res) => console.log(res));
web3.eth.net.getPeerCount().then(console.log);
```

### Provider

```js
// 查看当前设置的`web3 provider`
web3.currentProvider;
// 查看浏览器环境设置的`web3 provider`
web3.givenProvider;
// 设置provider
web3.setProvider(provider) -
  web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
```

### web3 通用工具方法

- 以太单位转换

```js
web3.fromWei;
web3.toWei;
```

- 数据类型转换

```js
web3.toString;
web3.toDecimal;
web3.toBigNumber;
```

- 字符编码转换

```js
web3.toHex;
web3.toAscii;
web3.toUtf8;
web3.fromUtf8;
```

- 地址相关

```js
web3.isAddress;
web3.toChecksumAddress;
```

### 账户相关

- coinbase 查询

```js
// 同步
web3.eth.coinbase;
// 异步
web3.eth.getCoinbase((err, res) => console.log(res));
```

- 账户查询

```js
// 同步
web3.eth.accounts;
// 异步
web3.eth.getAccounts((err, res) => console.log(res));
web3.eth.getAccounts().then(console.log);
```

### 区块相关的

```

```
