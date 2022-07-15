# truffle 详解

- web3.js
  - a) 概念: 与以太坊进行合约交互的 JavaScript API
  - b) 作用: 以太坊节点只能识别一种叫 JSON-RPC 的语言，但 JSON-RPC 写起来麻烦，容易出错，通过 web3.js 进行封装，只需要与 JavaScript 进行交互
- truffle 开发框架
  - a) 作用: 为以太坊提供开发环境，测试框架等，使得以太坊开发测试更方便
  - b) 功能:
    - 内置智能合约的编译、链接、部署等管理
    - 可脚本化，可扩展部署，迁移框架
    - 网络管理，可部署到任意的公共网络、私有网络
    - 使用 npm，ethpm 进行包管理
    - 用于直接与合约通信的交互式的控制台
    - 可在 truffle 环境中运行外部脚本
    - 提供合约抽象接口

## 新建项目

```shell
> truffle init
```

- 目录结构
  - contracts: 存放编写的合约脚本
  - migrations: 存入迁移部署脚本
  - test: 存入测试脚本
  - truffle.config.js: truffle 配置文件

## 编译

`truffle compile`

## 部署迁移

- a) 修改配置文件 `truffle.config.js`
- b) 打开`ganache/testrpc`或直接部署的私链
- c) 添加迁移脚本`migrations/xx`
  - i. 脚本以数字开头 `数字_活跃名称_migration.js`
  - ii. `truffle migrate`: 执行所有位置 migration 目录中的迁移脚本，如果没有新的迁移脚本导入，使用`truffle migrate`不会在执行操作, 如果想要再次部署，使用`truffle migrate --reset`

```sol
> yarn add @truffle/hdwallet-provider
> truffle migrate --network shibuya
```

```js
// artifacts.require  告诉truffle和哪个合约交互
// 返回一个合约抽象，require可以是合约名称，也可以是合约文件，但最后是合约名称
const Storage = artifacts.require("Storage");

// module.exports 被导出的函数会接收 deployer 作为第一个参数
module.exports = function (deployer) {
  // deployer：部署器，组织部署任务，同步执行
  // deploy 返回 promise
  deployer.deploy(Storage);
  // deployer.deploy(Storage, 2, {overview: true});
};
```

- deploy api
  - deploy(contract, ...arges, options)
  - 部署多个合约：deploy([[A, ...arges],[B, arg1], options])
- options: 可选参数
  - `{overview:true/false}`-> 判断当前合约已部署的情况下，是否还要再次部署
- deployer.link(LIBRARY, DEST)

```js
// 部署多个合约
// 把一个库连接到合约
var Mapping = artifacts.require("IterableMapping");
var User = artifacts.require("User");
module.exports = function (deployer) {
  deployer.deploy(Mapping);
  deployer.link(Mapping, User); // 链接已经发布好的库
  deployer.deploy(User);
};

// truffle migrate -f 1 --to 1 --network bscTestNet --reset
// truffle run verify User --network bscTestNet
// truffle migrate -f 1 --to 1 --network shibuya --reset
```

## 验证

```shell
> truffle run verify contractName --network shibuya
> truffle run verify User --network  fantom_testnet
```
