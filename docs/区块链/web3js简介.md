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
  web3 = new Web3(new Web3.providers()).HttpProvider("http://localhost:8545");
}
```
