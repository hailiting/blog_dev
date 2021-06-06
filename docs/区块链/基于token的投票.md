# 基于 token 的投票 - 用 truffle 构建简单投票 DApp

在“简单投票 Dapp”中，我们是构建了一个模拟区块链（ganache）上实现的一个投票合约，并且成功地通过 nodejs 控制台和网页与合约进行交互。  
在本案例里，将实现以下内容：

- 安装叫 truffle 的以太坊 dapp 框架，它会被用于编译和部署我们的合约。
- 给“简单的 dapp”上做一些更新来适配 truffle
- 编译合约，并将其部署到自己的测试私链。
- 通过 truffle 控制台和网页与合约进行交互
- 对合约进行扩展，加入 token 并能够购买 token 的功能
- 对前端进行扩展，通过网页前端购买 token，并用这些 token 为候选者投票

![ep_token_01.png](./img/ep_token_01.png)

## 准备工作

### 用 Geth 启动私链

```js
> nohup geth --datadir ./myChain/ --networkid 15 --rpc --rpcapi db,eth,net,web3,personal,miner --rpcport 8545 --rpcaddr
127.0.0.1 --rpccorsdomain "*" 2>output.log &
```

- `--datadir`: 指定区块链数据的存储目录，这里我们就在`./myChain/`目录启动
- `rpc`: 启用 `HTTP-RPC` 服务器
- `rpcport 8545 --recaddr 127.0.0.1`: 这是我们将要用 web3js 库与区块链服务器（geth）进行通信的服务器主机地址和监听端口
- `rpccorsdomain value`: 允许跨域请求和域名列表（逗号分离，浏览器强制）

> 本文里的节点`node`，`geth`，区块链软件(`blockchain software`)，区块链服务器(blockchain server)，客户端(client)，实际上指的都是同一个
> **如果我们直接链接测试网络，可以用下面的命令**

```js
>nohup geth --testnet --syncmode fast --rpc --rpcapi db,eth,net,web3,personal --cache=1024 --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" 2>output.log &
```

- `testnet`: 就是告诉`geth`启动并连接到最新的 测试 网络。我们所链接的网络是 Ropsten.
- `syncmode fast`: 用 fast 模式同步区块链

启用 Rinkeby 测试网络

```js
> geth --rinkeby --syncmode "fast" --rpc --rpcapi db,eth,net,web3,personal --cache=1024 --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*"
```

- `Full Sync`: 从周围节点获取 block headers, block bodies,并且从初始化区块开始重演每一步交易以验证每一个状态。
- `Fast Sync`: 从周围节点获取 block headers, block bodies, 但不会重演交易（只拿 receipts）。这样就会拿到所有状态的快照（不验证），从此跟全节点一样参与到网络中。
- `Light Sync`: 只拿当前状态（没有历史账本数据）。如果要验证一笔交易，就必须从另外的全节点处获取历史数据。

### 工作流：

基于以太坊的去中心化应用，workflow 可能是这样的：

- Development(开发环境)：Ganache
- Staging/Testing(模拟/测试环境)：Ropsten, Rinkeby, Kovan or your own private network
- Production(生产环境)：Mainnet

## Truffle

开发前，先启动 geth

### 安装

truffle 是一个 dapp 的开发框架，它可以使得 dapp 的构建和管理非常容易。

```js
> npm install -g truffle
```

然后我们创建一个空目录，在下面创建 truffle 项目

```js
> mkdir simple_voting_by_truffle_dapp
> cd simple_voting_by_truffle_dapp
> npm install -g webpack
> truffle unbox webpack
```

- `truffle init`: 在当前目录初始化一个新的 truffle 空项目（项目文件只有 truffle-config 和 truffle.js; contracts 目录只有 Migrations.sol;migrations 目录只有 1_initial_migration.js）
- `truffle unbox`: 直接下载一个`truffle.box`，即一个预先构建好的 truffle 项目；
  - unbox 的时间会相对长一点，完成之后应该看到这样的提示
  ```js
  Unbox successsful, Sweet!
  ```

### truggle 简介

Truffle 是目前最流行的以太坊 DApp 开发框架，（按官网说法）是一个世界级的开发环境和测试框架，也是所有使用了 EVM 的区块链的资产管理通道，它基于 JavaScript，致力于让以太坊上的开发变的简单。  
Truffle 有以下功能：

- 内置的智能合约编译，链接，部署和二进制文件的管理
- 合约自动测试，方便快速开发
- 脚本化，可扩展的部署与发布框架
- 可部署到任意数量公网或私链的网络环境管理功能
- 使用 EthPM 和 NPM 提供的包管理，使用 ERC190 标准
- 与合约直接通信的直接交互控制台(写完合约就可以命令行里验证了)
- 可配的构建流程，支持紧密集成
- 在 Truffle 环境里支持执行外部脚本

### truffle 的客户端

测试可以到测试网，也可以到私链上，私链推荐使用以下两种方式

- Ganache
- truffle develop

**Ganache**
Ganache 的前身是 testRPC
**truffle develop**
truffle develop 是 truffle 内置的客户端，`> truffle develop`直接开启客户端。
需要注意的是：truffle develop 里执行 truffle 命令的时候需要省略前面的 truffle，比如`truffle compile`只要敲`compile`就好。

## 创建 Voting 项目

```js
>  ls
README.md contracts node_modules test webpack.config.js truffle.js app migrations
> ls app/
index.html  javascripts stylesheets
> ls contracts/
ConvertLib.sol MetaCoin.sol Migrations.sol
> ls migrations/
1_initial_migration.js 2_deploy_contracts.js
```

- app/ - 应用文件运行的默认目录，这里包括推荐的 JavaScript 文件和 css 样式文件目录，但你可以完全决定如何使用这些目录
- contract/ - Truffle 默认的合约文件存放目录
- migrations/ - 部署脚本文件的存放目录
- test/ - 用来测试应用和合约的测试文件目录
- truffle.js - Truffle 的配置文件

```js
rm contracts/ConvertLib.sol contracts/MetaCoin.sol
```

找到 truffle.js，将端口号从`7545`改为`8545`，因为私链及 ganache 默认端口是这个。

## Migration

### Migration 概念
