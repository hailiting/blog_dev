# web3js

shell 清除屏幕 `Control + L`

## 前期准备

### 安装 solc

```bash
$ npm i solc -g
$ solcjs -V
0.8.4+commit.c7e474f2.Emscripten.clang
```

## 简介

- Web3 JavaScript app API
- web3js 是一个 JavaScript API 库，要使 DApp 在以太坊上运行，可以使用 web3js 库提供的 web3 对象
- web3js 通过 **RPC 调用与本地节点通信**，它可以用于任何暴露了 RPC 层的以太坊节点
- web3 包含 eth 对象-web3.eth(专门与以太坊区块链交互)和 shh 对象-web3.shh(用于与 Whisper 交互)
  - Whisper -> 以太坊生态系统的一部分，实时通信，是分布式消息
  - Swarm 分布式存储

## web3 模块加载

- 将 web3 模块安装在项目中

```bash
# 最新的 1.3.5
$ npm install web3@0.20.1
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
- 同步会阻塞

```js
web3.eth.getBlock(48, function(error, result) {
  if (!error) {
    console.log(result);
  } else {
    console.error(error);
  }
});
{
  difficulty: '132160', // 难度
  extraData: '0xd983010a02846765746888676f312e31362e338664617277696e', // 附加信息
  gasLimit: 4925370, // 总共的gas上限
  gasUsed: 0, // 出块的时候消耗 的 gas
  hash: '0x854f5109bbdad66deaef69e409575225e981049c0b61c22b7bf8c94823a4b513',
  logsBloom: '0x000...', // 事件过滤
  miner: '0x9cab180D378005f9ecEa4869e77Cdde2BDb06FF5',
  mixHash: '0x868ec7d705e858a2ec795318a645570093361ac1d81d230844f3750f956e8140', // 挖矿时计算相关的 parentHash
  nonce: '0x38e647f6f084e477', // 挖矿的 时候的随机数
  number: 48,
  parentHash: '0x29cccb304525e35a7bd7062a8f836e3367dac5459a0456961efd5eb13186ae72',
  receiptsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421', //
  sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
  size: 537,
  stateRoot: '0xf7bb7f07785453c10e82dda0614cfc2069fefbceb6328696fec0d944b14dd935',
  timestamp: 1619523928,
  totalDifficulty: '6329090',
  transactions: [], //  没有交易，所以是空的
  transactionsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
  uncles: []
}

```

### 用 Promise 回调

- 为了帮助 web3 集成到不同标准的所有类型，1.0.0 版本提供了很多方式处理异步函数。大多数 web3 对象允许将一个回调函数作为最后一个函数参数传入，同时会返回一个 promise 用于链式函数调用
- 以太坊作为一个区块链系统，一次请求具有不同的结束阶段，为了满足这个要求，1.0.0 版本将这类函数调用的返回值包装成一个“承诺事件”（promiEvent），这是一个 promise 和 EventEmitter 的结合体
- PromiEvent 的用法就像 promise,另外还加入了`.on`,`.once`和`.off`方法

```js
web3.eth.sendTransation({from:"0x123...", data: "0x2323..."})
// 监听返回交易 hash
.once("transactionHash", function(hash){
  ...
})
// receipt 收据，在交易打包进块的啥时候
.once("receipt", function(receipt){
  ...
})
// 有确认了
.on("confirmation", function(confNumber, receipt){
  ...
})
.on("error", function(error){
  ...
})
.then(function(receipt){
  // 在打包收据 进块的时候，就会触发
})
```

## 应用二进制接口（ABI）

- web3.js 通过以太坊智能合约的 json 接口（Application Binary Interface，json 的描述，ABI）创建一个 JavaScript 对象，用来在 js 代码中描述
- 函数 functions
  - type: 函数类型，默认“function”，也可能是“constructor”
  - constant, payable, stateMutability: 函数的状态可变性
  - inputs, outputs: 函数输入，输出参数描述列表
- 事件（events）
  - type: 类型，总是"event"
  - inputs: 输入对象列表，包括 name, type, indexed

```bash
$ vi Coin.sol
// SPDX-License-Identifier: SimPL-2.0
pragma solidity >=0.7.0 <0.9.0;
contract Coin {
  address public minter;
  mapping (address => uint) public balances;
  event Sent(address from,  address to, uint amount);
  constructor()  {minter  = msg.sender;}
  function mint(address receiver, uint amount) public {
    require(msg.sender == minter);
    balances[receiver] += amount;
  }
  function send(address receiver, uint amount) public {
    require(amount <= balances[msg.sender]);
    balances[msg.sender] -= amount;
    balances[receiver] += amount;
    emit Sent(msg.sender, receiver, amount);
  }
}

$ mkdit contract
$ mv Coin.sol contract/
$ solcjs --abi Coin.sol
$ ls
Coin.sol Coin_sol_Contract.abi
$ cat Coin_sol_Contract.abi
# 事件  函数
# abi 接口
```

```js
mapping (address => uint) public balances;
// 相当于
function balances(address _addr) public view returns(uint){
  return balances(_addr)
}
```

```json
[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false, // 匿名
    "inputs": [
      {
        // 可以所有的事件参数   日志在topic下，有单独的日志
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Sent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances", // 一个映射
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable", // 状态可变型
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minter",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "send",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

`solcjs --bin Coin.sol`最后提交到以太坊的代码

```js
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log(web3.isConnected());
// 1.0+
console.log(web3.currentProvider.connected);
```

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
  web3.eth.contract(abi).at(address).balance.request(address, callback2)
);
batch.execute();
```

## 大数处理

- JavaScript 中默认的数字精度较小，所以 web3.js 会自动添加一个依赖库 BigNumber, 专门用于大数处理

```js
var BigNumber = require("bignumber.js");
var balance = new BigNumber("131242344353464564564574574567456");
console.log(balance);
// BigNumber 类型的对象
BigNumber {
  s: 1, // 表示 + -  -1 表示负数
  e: 32, // 位数
  c: [ 13124, 23443534645645, 64574574567456 ] // 从低位切起  14位
}
// or
// var balance = web3.eth.getBalance(someAddress);
balance.plus(21).toString(10);
balance.toString(10);  // 10进制
balance.toString(16);  // 16进制
// "131242344353464564564574574567477"
```

- `BigNumber.toString(10)`对小数只保留 20 位浮点精度。所以推荐的做法是，我们内部总是用 wei 来表示余额（大整数），只有在需要显示给用户看的时候才转换为 ether 或其他单位

## 常用 API

### 基本信息查询

- 查看 web3 版本

```js
web3.version.api;

web3.version;
```

- 查看 web3 链接到的节点版本（clientVersion）

```js
// 0.+版本
// 同步
> web3.version.node; // 'Geth/v1.10.2-stable/darwin-amd64/go1.16.3'
// 异步
> web3.version.getNode((err, result) => console.log(result));

//  1+ 版本
> web3.eth.getNodeInfo().then(console.log);
Promise {<pending>}
> 'Geth/v1.10.2-stable/darwin-amd64/go1.16.3'
```

- 获取`network id`

```js
// 同步
web3.version.network;
// 异步
web3.version.getNetwork((err, res) => {
  console.log(res);
});
// 1.+ 版本
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
// 1.+ 版本
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
// 1.+ 版本
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
// 已经创建好了web3对象，但不一定是需要的服务对象
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
// 浏览器环境检查现在连接到的provider
window.web3; // 在浏览器非空页面，MateMask会注入web3到浏览器window对象里
```

#### geth 启动服务的选项

```js
API AND CONSOLE OPTIONS:
--ipcdisable    // Disable the IPC-RPC server 是否启用
--ipcpath value    // Filename for IPC socket/pipe within the datadir (explicit paths escape it)
--http    // Enable the HTTP-RPC server
--http.addr value    // HTTP-RPC server listening interface(defalut: "localhost")
--http.port value    // HTTP-RPC server listening port(default: 8545)
--http.api value    // API's offered over the HTTP-RPC interface
--http.rpcprefix value    // HTTP path path prefix  on which JSON-RPC is served. Use  "/" to serve on all paths
--http.corsdomain value    // 允许跨域请求的域名列表（逗号分隔，浏览器强制）
// Comma separated list of domains from which  to accept cross origin requests (browser enforced)

--http.vhosts value    // Comma separated list of virtual hostnames from which to accept requests(server enforced). Accepts "*"  wildcard.(default: "localhost")
--ws    // Enable the WS-RPC  server  官方推荐，安全
--ws.addr value    // WS-RPC server listening  interface(default:  "localhost")
--ws.port value    // WS-RPC server listening port(default: 8546)
--ws.api value    // API's offered over the WS-RPC interface
--ws.rpcprefix value    // HTTP path prefix on which JSON-RPC  is served. Use "/" to serve on  all  paths.
--ws.origins value    // Orgins from which to accept websockets requestss
--graphql    // Enable GraphQL on the HTTP-RPC server. Note that GraphQL can only be started if an HTTP server is started as well.
--graphql.corsdomain value    // Comma separated list of domains from which  to accept cross origin requests (browser enforced)
--graphql.vhosts value    // Comma separated list of virtual hostnames from which to accept requests(server enforced). Accepts "*"  wildcard.(default: "localhost")
--rpc.gascap value    // Sets a cap on gas that can be used in eth_call/estimateGas(0=infinite) (default:  25000000)
--rpc.txfeecap value    // Sets a cap on transaction  fee (in ether)that can be sent via the  RPC APIs(0=no cap)(default:  1)
--rpc.allow-unprotected-txs    // Allow for unprotected (non EIP155 signed) transactions to be submitted via RPC
--jspath loadScript    // JavaScript root path for loadScript(defaukt: ".")
--exec value    // Execute JavaScript statement
--preload value    // Comma separated list of JavaScript files to preload into the console
```

### web3 通用工具方法

- 以太单位转换

```js
web3.fromWei;
web3.toWei;
// 0.+
web3.fromWei(2200823232323232323212121, "ether");
web3.toWei(1, "ether");
// 1.+
web3.utils.fromWei("2200823232323232323212121", "ether");
web3.utils.toWei("1", "ether");
```

- 数据类型转换

```js
// 0.+
web3.toString;
web3.toDecimal;
web3.toBigNumber;
/// 1.+
// 返回给定十六进制值的数字表示形式
web3.utils.hexToNumber("0x2a"); // 42
web3.utils.toDecimal("0x2a"); // 42

var BN = web3.utils.BN;
new BN(1234).toString(); // "1234"
new BN("1234").add(new BN("1")).toString(); // "1235"
new BN("0xea").toString(); // "234" // 这个有问题
```

- 字符编码转换

```js
web3.toHex;
web3.toAscii;
web3.toUtf8;
web3.fromUtf8;

/// 1. +
web3.utils.toHex("234"); // "0xea"
web3.utils.toHex("0x49204c6f766520796f75"); // 'I Love you'
web3.utils.hexToAscii("0x49204c6f766520796f75"); // 'I Love you'
//
web3.utils.hexToUtf8("0x49204c6f766520796f75");
web3.utils.hexToString("0x49204c6f766520796f75");
web3.utils.toUtf8("0x49204c6f766520796f75");

web3.fromUtf8(string); // ALIAS, deprecated
```

- 地址相关

```js
web3.isAddress;
web3.toChecksumAddress;
// 1.+
web3.utils.isAddress("0xc1912fee45d61c87cc5ea59dae31190fffff232d"); // true
// 将以太坊地址的大小写转换为校验和地址
web3.utils.toChecksumAddress("0XC1912FEE45D61C87CC5EA59DAE31190FFFFF232D");
// 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d // same as above
```

### 账户相关

- coinbase 查询

```js
// 异步
web3.eth.getCoinbase((err, res) => console.log(res));
// 1.+
web3.eth.getCoinbase().then(console.log);
```

- 账户查询

```js
// 同步
web3.eth.accounts;
// 异步  geth环境里也可用(es6语法不行)
web3.eth.getAccounts((err, res) => console.log(res));
web3.eth.getAccounts().then(console.log);
```

### 区块相关的

- 区块高度查询

```js
// 同步
web3.eth.blockNumber;
// 异步
web3.eth.getBlockNumber((err, res) => console.log(res));
// 1. +
web3.eth.getBlockNumber().then(console.log);

web3.eth.gasPrice.toString();
// 1. +
web3.eth.getGasPrice().then(console.log);
```

- 块中交易数量查询

```js
// 同步
web3.eth.getBlockTransactionCount(hashStringOrBlockNumber);
// 异步
web3.eth.getBlockTransactionCount(hashStringOrBlockNumber, callback);

// 1. +
web3.eth.getBlockTransactionCount(hashStringOrBlockNumber).then(console.log);
```

### 交易相关

- 余额查询

```js
web3.eth.getBalance(addressHexString[, defaultBlock][, callback]);
web3.eth.getBalance(web3.eth.accounts[0]).toString()
```

- 交易查询

```js
web3.eth.getTransaction(transactionHash[, callback]);
```

### 交易执行相关

- 交易收据查询（已进块）

```js
web3.eth.getTransactionReceipt(hashString[, callback]);
```

- 估计 gas 消耗

```js
web3.eth.estimateGas(callObject[, callback]);
```

### 发送交易

- `web3.eth.sendTransaction(transactionObject[,callback])`
- 交易对象
  - from: 发送地址
  - to: 接收地址，如果是创建合约交易，可不填
  - value: 交易金额，以 wei 为单位，可选
  - gas: 交易消耗 gas 上限，可选
  - gasPrice: 交易 gas 单价，可选
  - data: 交易携带的字符串数据，可选 // 合约交易携带的参数
  - nonce: 整数 nonce 值，可选

```js
// 1.在geth里解锁account[0]
> personal.unlockAccount(eth.accounts[0]);

// 2.web3
>
async function getBalance(){return await web3.eth.getAccounts();}var a = getBalance();
// 想要交易receipt  必须要挖矿  miner.start()
a.then( res=> {
   web3.eth.sendTransaction({
    from: res[0],
    to: res[1],
    value: 200000,
    data: "0x",
  }).once("transactionHash", function(hash){
    console.log({hash});
  }).then(res=>{
    console.log({res});
  }).catch(e=>{
    console.log({e})
  });
})
```

### 消息调用

- `web3.eth.call(callObject[, defaultBlock][,callback])`
- 参数
  - 调用对象: 与交易对象相同，只是 from 也是可选的
  - 默认区块: 默认“latest”，可以传入指定区块高度
  - 回调函数，如果没有则为同步调用

```js
var result = web3.eth.call({
  // 向谁发出来的调用
  to: "0xc4abd0339eb8d57087278718986382264244252f",
  // 32位的字节 前8  函数的选择器
  data: "0xc6888fa1000000000000000000000000000000000000000000000000000 0000000000003",
});
console.log(result);
```

### 日志过滤（事件监听）

- `web3.eth.filter(filterOptions[, callback])`

```js
// 0. +
// pending 交易状态在pending 过滤
// filterString 可以是“latest” or "pending" 指定过滤器选项
// var filter = web3.eth.filter(filterString);
// 或者可以填入一个日志过滤
var filter = web3.eth.filter("latest");
// 监听日志变化
filter.watch(function (error, result) {
  if (!error) {
    console.log(result);
  }
});
filter.stopWatch();
// 还可以用传入回调函数的方法，立即开始监听日志
web3.eth.filter(options, function (error, result) {
  if (!error) {
    console.log(result);
  }
});
// 1. +
```

## 合约相关的

### 创建合约

- web3.eth.contract

```js
/// 方法一  合约已部署
// 通过地址初始化合约实例
// var contractInstance = MyContract.at(address);

/// 方法一  合约未部署
// 部署一个新的合约
// var contractInstance = MyContract.new(
//   [constructorParam1]
//   [,constructorParam2],
//   {
//     data: "0x....",
//     from: myAccount,
//     gas: 1000000,
//   },
// );
// abiArray 源代码数据结构
var abiArray = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Sent",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "send",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
var byteCode = "0x" + "xxx"; // solcjs --bin Coin.sol
var MyContract = web3.eth.contract(abiArray);
var deployTxObject = {
  from: web3.eth.accounts[0],
  data: byteCode,
  gas: 1000000,
};
var contractInstance = coinContract.new(deployTxObject);
var contractInstance = contractInstance.new(deployTxObject);
// 有延时
// setTimeout(() => {
//   console.log(contractInstance.address);
//   // 0xca2f8c802b5a9a85e08dda50d1269e1939d97108
// }, 20000);
contractInstance.address; // 如果是undefined说明出块失败    如果是0x...说明部署成功
```

v1.+

```js
new web3.eth.Contract(jsonInterface[, address][, options])
```

- jsonInterface
  - Object: 要实例化的合约的 json 接口
- address
  - myContract.options.address = "0x123" 来指定该地址
- options
  - Object 可选，合约的配置对象，其中某些字段用作调用和交易的回调
  - from: string 交易发生方地址
  - gasPrice: string 用于交易的 gas 价格，单位 wei
  - gas： number 交易可用最大 gas 量，即`gas limit`
  - data: string 合约字节码，部署合约时需要

```js
var myContract = new web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
    from: '0x1234567890123456789012345678901234567891', // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});
```

### 调用合约函数

- 可以通过已创建的合约实例，直接调用合约函数

```js
// myMethod 合约里的函数名称
// 直接调用，自动按函数类型决定用sendTransaction还是call
contractInstance.myMethod(param1[,param2,...][,transactionObject][,defaultBlock][,callback]);
// 显示以消息调用形式call该函数  指定以消息调用的形式去调用 不需要发送交易时
contractInstance.myMethod.call(param1[,param2,...][,transactionObject][,defaultBlock][,callback]);
// 显式以发送交易形式调用该函数  状态的修改   转币
contractInstance.myMethod.sendTransaction(param1 [, param2, ...] [, transactionObject] [, callback]);



contractInstance.minter({from: web3.eth.accounts[0],  to: web3.eth.accounts[1], value:40000});// err
contractInstance.mint(web3.eth.accounts[0],3000000, {from: web3.eth.accounts[0]},(err, res)=>{if(res){console.log(res); }if(err){console.log(err)}})
contractInstance.balances(web3.eth.accounts[0], (err, res)=>console.log(res))

contractInstance.balances(web3.eth.accounts[0], (err, res)=>{if(res){console.log(res); }if(err){console.log(err)}})

contractInstance.balances("0x9cab180d378005f9ecea4869e77cdde2bdb06ff5")
```

### 监听合约事件

- 合约 event 类似于 filter,可以设置过滤选项来监听

```js
var event = myContractInstance.MyEvent(
  { valueA: 23 },
  [, additionalFill],
  function (error, result) {
    if (!error) console.log(result);
  }
);
contractInstance.Sent("pending", (err, res) => console.log(err || res));
contractInstance.send(web3.eth.accounts[0], 23000, {
  from: web3.eth.accounts[0],
});
```

## 添加账户

```js
// geth 得设置 --rpcapi="db,eth,net,web3,personal,web3
(async () => {
  let newAccount = await web3.eth.personal.newAccount("123456");
  console.log(newAccount);
  let accounts = await web3.eth.getAccounts();
  console.log(accounts);
})();
```
