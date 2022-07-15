# 用 Geth 搭建以太坊私链

Geth 以太坊客户端

## 安装 Geth

安装 Geth 有很多方式，这里主要就 Linux 环境给出两种：系统包管理（apt-get）安装和源码安装。更推荐大家源码安装，在整个过程，可以看到 Geth 各组件的构建步骤

### 安装前需要的环境

#### git

```shell
$ # sudo add-apt-repository ppa:git-core/ppa
$ sudo apt-get update
$ sudo apt-get install git
$ git --version
$ git config --global user.name "hailiting"
$ git config --global user.email "hailiting@yeah.net"
$ git config --list #  查看配置
$ ssh-keygen -trsa -C "hailiting@yeah.net" # 生成 .ssh


$ git log    # 查看当前git节点的log
$ git tag   # 获取当前git的tag
$ git checkout v1.10.2   # 切换到选定版本
```

#### make

```shell
$ sudo apt-get install make
```

#### vim

```shell
$ sudo apt-get install make
```

#### go

```sh
$ wget -c https://dl.google.com/go/go1.14.2.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
$ cat ~/.profile  # 查看用户环境变量地址
$ vim /home/hailiting/.profile

# .profile
export PATH=$PATH:/usr/local/go/bin
# :wq
$ source ~/.profile
```

### 方法一

```shell
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository -y ppa:ethereum/ethereum
$ sudo apt-get update
$ sudo apt-get install ethereum
```

### 方法二

#### 1. 克隆 github 仓库

```shell
$ git clone https://github.com/ethereum/go-ethereum.git
```

#### 2.

```shell
$ cd go-ethereum
$ make geth
# linux err 2 系统会出错
$ vim env.sh
# est + :set ff  查看文件格式
# 文件格式是doc   :fileformat=dos
# dos 在Linux下执行是有问题的
# 修复
esc + :set ff=unix
:wq
$ make geth

$ ./build/bin/geth version # 查看当前版本
```

**通过`geth version`查看是否安装成功**

## 启动节点同步

`--datadir ./data` 数据的存储目录指定到 data 文件夹  
安装好 Geth，现在可以尝试运行一下它，执行下面命令，geth 就会同步区块，并存储在当前目录下。这里的`--syncmode fast`参数表示我们会以"快速"模式同步区块。在这种模式下，我们只会下载每个区块头和区块体，但不会执行验证所有交易，直到所有区块同步完毕再去获取一个系统的当前状态。这样就节省了很多交易验证的时间。

```shell
$ geth --datadir . --syncmode full | fast | light
```

通常，在同步以太坊区块链时，客户端会一开始就下载并验证每个块和每个交易，也就是说从创世区块开始。毫无疑问，如果不加`--syncmode fast`参数，同步将花费很长时间并具有很高的资源要求（更多的 RAM，如果你没有快速存储，则需要更长时间）  
如果我们想同步测试网络的区块，可以用下面命令

```shell
$ geth --testnet --datadir .--syncmode fast
```

`--testnet`这个参数会告诉 geth 启动并连接到最新的测试网络，也就是`Ropsten`。测试网络的区块和交易数量明显少于主网，所以会更快一些，但即使用快速模式同步测试网络，也需要几个小时时间。

## 搭建自己的私有链

因为公共网络区块数量太多，同步耗时太长，我们为了方便快速了解`Geth`，可以试着用它来搭建一个只属于自己的私链。  
首先，我们需要创建网络的`创世`(genesis)状态，这写在一个小小的 JSON 文件里（例如我们将其命名为`genesis.json`）

可以去官网查看最新配置，要不然会有坑
`https://www.json.cn` 检测格式是否有问题

```shell
# 项目存放目录结构
ls # []
  Desktop
mkdir eth-1801
cd eth-1801
mkdir private
cd private # 私链目录
touch genesis.json # 存储创世配置
gedit genesis.json # 生成创世块
```

```json
// 1. chainId 独立的区块链网络ID，在连接到其他节点时可以用到，不同的id是连接不了的
// 主网的chainId 是 1
// 测试的chainId 是 3

// 2. homesteadBlock 版本号
// 值为0 表示当前正在使用homestead版本

// gasLimit 整个区块最多有多少gas
// 3. alloc 预制账号及btc数量
// 地址  balance   表示在创世纪的时候  这些地址有这些balance   balance单位是wei
// 4. Coinbase: 挖矿账号 【默认账号列表中的第一个账号】，·setCoinbase· 可以设置
// 5. difficulty  难度测试
// 6. extraData 附加信息
// 7. gasLimit: gas上限
// 8. 随机数，用于挖矿
// 9. nonce: 随机数，用于挖矿
// 10. mixHash: 上一个区块生成的一部分hash 与non结合用于配合挖矿
// 11. parentHash: 前区块hash
// 12. timeStamp: 创世区块时间戳
{
  "config": {
    "chainId": 523,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "ethash": {}
  },
  "nonce": "0x0",
  "timestamp": "0x5ddf8f3e",
  "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x47b760",
  "difficulty": "0x00002",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "alloc": {
    "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430": {
      "balance": "30000000000000000000"
    }
  },
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

要创建一条以它作为创世块的区块链，我们可以使用下面命令：

```shell
# 生成创世区块
$ geth --datadir ./myChain/ init genesis.json
# myChain
# geth  keystore
# <!-- geth 存储区块链数据等 -->
# <!-- keystore 存储私钥文件 -->
# cd keystore
# 私钥文件
# cd gath/chaindata/
```

在当前目录下运行 geth，就会启动这条私链，注意要将 networked 设置为与创世块配置里 chinaId 一直。
**下面是必须的，绑定 networkid，要不然不能保证 networkid 和 chainid 是一样的**

```shell
geth --datadir ./myChain/ console
```

```shell
$ geth --datadir ./myChain/ --networkid 523
```

```shell
$ geth --datadir ./myChain/ --rpc --networkid 523 --nodiscover console 2>eth_output.log --allow-insecure-unlock
```

查看是否正常启动，如果正常启动，说明已经成功启动一条自己的私链了

## 启动控制台及控制台操作

### 启动控制台

```shell
$ geth --datadir ./myChain/ --networkid 15     # 启动区块
$ geth --datadir ./myChain/ --networkid 15 console     # 启动区块并进入控制台
# 启动区块并进入控制台并将打印信息打印到 output.log文件里
$ geth --datadir ./myChain/ --networkid 15 console 2>output.log
# 启动区块  开启rpc
$ geth --datadir ./myChain/ --networkid 15 --rpc console 2>output.log
# 2 输出
# 2> 输出重定向
$ tail -f output.log # 动态跟踪output.log文件的变化

# 30303  p2p节点
$ geth --datadir . --rpc --networkid 523 --nodiscover console 2>eth_output.log --allow-insecure-unlock
# --rpcapi="db,eth,net,web3,personal,web3" 容许他们对geth进行修改
$ geth --datadir ./myChain/ --rpc  --rpcapi="db,eth,net,web3,personal,web3" --networkid 523 --nodiscover console 2>eth_output.log --allow-insecure-unlock


# 在后台启动，不要在前台挂起
$ nohup geth --datadir ./myChain/ --networkid 523 --rpc 2>output.log --allow-insecure-unlock &
# 查看进程
$ ps -ef
# 重新进入工具行
$ geth attach http://localhost:8545
# Fatal: Failed to start the JavaScript console: api modules:
# ====解决方法====
# 关闭91服务器防火墙
$ sudo killall geth
```

#### 参数列表

| 参数                   | 作用                                                         |
| ---------------------- | ------------------------------------------------------------ |
| console                | 启动命令行，可以在 geth 中执行命令                           |
| 2>eth_output.log       | 日志重定向                                                   |
| -datadir ./dir         | 区块链数据库存放位置，其中 ./dir 表示当前目录下的 dir 文件夹 |
| -nodiscover            | 禁止发现节点                                                 |
| -rpc                   | 启用 rpc 服务，可以进行智能合约部署和调试，                  |
| -rpcapi                | 表示可以通过 rpc 调用对象                                    |
| -rpcaddr               | rpc 监听地址，默认为 127.0.0.1,只能本地访问                  |
| -rpcport               | 指定 HTTP-RPC 监听端口，默认端口号 8545                      |
| -rpccorsdomain         |                                                              |
| -allow-insecure-unlock | 允许 http 的方式 unlock                                      |
| -maxpeer               | 允许最大连接数，默认 25 个                                   |
| -networkid             | 当前区块链中的网络 ID                                        |
| -port                  | 启动事件服务的端口                                           |
| -mine                  | 开户挖矿，默认 CPU 挖矿                                      |
| -minerthreads          | 挖矿的 cpu 线程数，默认是 4                                  |
| -etherbase             | 矿工的账号（默认第一个账号）                                 |
| -nodiscover            | 关闭自动链接                                                 |

```shell
geth
  --datadir "./db"
  --rpc
  --rpcaddr=0.0.0.0
  --rpcport 8545
  --rpccorsdomain "*"
  --rpcapi "eth,net,web3,personal,admin,shh,txpool,debug,miner"
  --nodiscover
  --maxpeers 30
  --networkid 1981
  --port 30303
  --mine
  --minerthreads 1
  --etherbase "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430"
  console 2>>tail.log
```

## Geth 控制台命令

Geth Console 是一个交互式的 JavaScript 执行环境，里面内置了一些用来操作以太坊的 JavaScript 对象，我们可以直接调用这些对象来获取区块链上的相关信息，这些对象主要包括：

- eth: 主要包含对区块链进行访问和交互相关的方法
- net: 主要包含查看 p2p 网络状态的方法
- admin: 主要包含与管理节点相关的方法
- miner: 主要包含挖矿相关的一些方法
- personal: 包含账户管理的方法
- txpool: 包含查看交易内存池的方法
- web3: 包含以上所有对象，还包含一些通用方法

### 常用命令有：

- `personal.newAccount()`: 创建账户;
- `personal.unlockAccount()`: 解锁账户;
- `eth.accounts`: 列出系统的账户;
- `eth.getBalance()`: 查看账户余额，返回值的单位是 Wei;
- `eth.blockNumber`: 列出当前区块高度;
- `eth.getTransaction()`: 获取交易信息;
- `eth.getBlock()`: 获取区块信息;
- `miner.start()`: 开始挖矿;
- `miner.stop()`: 停止挖矿;
- `web3.fromWei()`: Wei 换算成以太币;
- `web3.toWei()`: 以太币换算为 Wei;
- `txpool.status`: 交易池中的状态;

```js
> eth.getBalance("0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430")


> web3.fromWei(eth.getBalance("0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430"), "ether")

> personal.newAccount()
Passphrase: 123456
// keystore 多了一个文件  cat UTC-xxxxx 账户信息
0x7363e778a415f21211db9b990d8087f3e3d00664
// 快速创建账户
> personal.newAccount("123456")

> eth.getBalance(eth.accounts[0]);

> eth.sendTransaction({from: "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430", to: eth.accounts[0], value: 1000000})
// Error: unknown account

> eth.sendTransaction({from:eth.accounts[0], to: "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430", value: 1000000})
// authentication needed: password or unloack
> personal.unlockAccount(eth.accounts[0])
// 解锁
Passphrase: xxxx
> personal.unlockAccount(eth.accounts[0], "123456", 2000000);
> eth.sendTransaction({from:eth.accounts[0], to: "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430", value: 1000})
// insufficient funds for transfer    余额不足

> personal.importRawKey  // 导入原始私钥


// 查看挖矿地址
> eth.coinbase
// 设置挖矿地址
> miner.setEtherbase(eth.accounts[1])
// 挖矿 miner
> miner.start(1) // 1表示一直挖
Succesful
> miner.stop()

> eth.blockNumber // 查看挖矿后 区块的高度
> eth.getBalance(eth.accounts[0])
// 交易之前要账户解锁
> eth.sendTransaction({
  from:  eth.accounts[0],
  to: "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430",
  value: web3.toWei(1, "ether")
})
// 1 线程数
> miner.start(1)
> miner.stop()
// 发送交易后需要挖矿打包交易才生效
// 划转后得挖一下矿
// 获取最新区块
> eth.getBlock("latest")
// 查询区块信息
> eth.getBlock("210")
// 查询交易
> eth.getTransaction(transactionHash)
{
  blockHash: null,
  blockNumber: null,
  from: "0x3cf8d009b2d6265a35a75f029f26073006e46881",
  gas: 21000,
  gasPrice: 1000000000,
  hash: "0xe961eedcc4e0254ff2733ead42fb05b000748252d33299db2a1f24327d8b05d7",
  input: "0x",
  // 由发起人EOA发出的序列号，用于防止交易消息重播  1，2，3，4   6  等待 5   5交易完   交易 6
  nonce: 0,
  r: "0xfb0fa585b15e55cdcdeb6722a12ec4769b3a5221627d92184a01b8595240a441",
  s: "0x54844af4e3773fc1d551911e5437e4159d964377ffb25b5cb61626453670fd3c",
  to: "0xf1de2d4c9da3201b82402b4c3cd06e7e128a1430",
  transactionIndex: null,  // 在块里是第几个
  type: "0x0",
  v: "0x439",
  value: 1000
}
// v,r,s 发起人EOA的ECDSA签名的三个组成部分
> eth.getBlock(3)
{
  difficulty: 131072,
  extraData: "0xd683010a02846765746886676f312e3136856c696e7578",
  gasLimit: 4713778,
  gasUsed: 0,
  hash: "0x5e53156b79920423e6a49227fdeffb56b0c2cecb41d129c35352fc282cf16c2a",
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  miner: "0x3cf8d009b2d6265a35a75f029f26073006e46881",
  mixHash: "0x30b69f17e739517c3f51cdda4df7c08aa8bcc2a2e1e3f7bee532bcddd40008a5",
  nonce: "0x49ef4c8bc9494469",
  number: 3,
  parentHash: "0x85e91262122e7aa2fa2102ee32d0817ae1232ba1f1911348237de3ae7222f10b",
  // 数据
  receiptsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  size: 534,
  // 状态
  stateRoot: "0x531bc7c3303f6d7ef259935347f5fadba7392b38b75b7ee5b4a1669b05d09cf4",
  timestamp: 1619403893,
  totalDifficulty: 393218,
  transactions: [],
  // 交易本身
  transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  uncles: []
}

// 查看当前区块总数
> eth.blockNumber()

// 查看当前节点信息
> admin.nodeInfo
// 节点名称
> admin.nodeInfo.enode
// 添加其他节点
> admin.addPeer(node_name)
// 查看当前节点
> admin.peers
```

#### eth.sendRawTransaction

发送一个已经签名的交易

```js
var Tx = require("ethereumjs-tx");
var privateKey = new Buffer(
  "e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109",
  "hex"
);

var rawTx = {
  nonce: "0x00",
  gasPrice: "0x09184e72a000",
  gasLimit: "0x2710",
  to: "0x0000000000000000000000000000000000000000",
  value: "0x00",
  data:
    "0x7f7465737432000000000000000000000000000000000000000000000000000000600057",
};

var tx = new Tx(rawTx);
tx.sign(privateKey);

var serializedTx = tx.serialize();

//console.log(serializedTx.toString('hex'));
//0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

> web3.eth.sendRawTransaction(serializedTx.toString("hex"), function(err, hash) {
  if (!err) console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
});
// 估算某笔交易所花费的gas
> eth.estimateGas({from: eth.accounts[0],to: eth.accounts[1], value: web3.toWei(100,"ether")})
21000
> eth.estimateGas({from: eth.accounts[0],to: eth.accounts[1], value: 10, data: "0x1234"})
21032
```

![eth_translate_err01][./img/eth_translate_err01.jpg]

#### invalid sender

这个错误的根本原因是没有设置 chainId 和 networkId.  
这两个值需要保证跟你的私链一致，还有 Networkid 不等于 chainId,具体看自己的配置。chainId 和 Networkid 都要保证一致，如果不设置的话，默认是签名到公网交易，到私链上会报`invalid sender`这个错误。

### web3

```js
// > web3
const web3= {
  admin: {
    datadir: "/home/hailiting/Desktop/gethtext/myChain",
    nodeInfo: {
      enode: "enode://4c3ad77621a019f6c017c55f25cd522b1071f4632cc997c60d7052b5ec3afe4cdf02f4c6b1620cbc9d4057884171f5c3f56b8b270338f37460955cd8ea5b68bd@127.0.0.1:30303",
      enr: "enr:-J24QF0GouToraSWUKN-IHArZcsVPG4xfn3le1QRNGMUT_A2dy_wLsvHmedURCEx8-G9PGhR6LEyxSGqtYp68elxjvMDg2V0aMfGhCE8YdCAgmlkgnY0gmlwhH8AAAGJc2VjcDI1NmsxoQNMOtd2IaAZ9sAXxV8lzVIrEHH0YyzJl8YNcFK17Dr-TIRzbmFwwIN0Y3CCdl-DdWRwgnZf",
      id: "7206f734dfee1d81bb6f65fb06cf7a8c3958858ee691b1a198d98189523a6887",
      ip: "127.0.0.1",
      listenAddr: "[::]:30303",
      name: "Geth/v1.10.2-stable-97d11b01/linux-amd64/go1.16",
      ports: {
        discovery: 30303,
        listener: 30303
      },
      protocols: {
        eth: {...},
        snap: {}
      }
    },
    peers: [], // 周围节点
    addPeer: function(),
    addTrustedPeer: function(),
    clearHistory: function(),
    exportChain: function(),
    getDatadir: function(callback),
    getNodeInfo: function(callback),
    getPeers: function(callback),
    importChain: function(),
    removePeer: function(),
    removeTrustedPeer: function(),
    sleep: function(),
    sleepBlocks: function(),
    startHTTP: function(),
    startRPC: function(),
    startWS: function(),
    stopHTTP: function(),
    stopRPC: function(),
    stopWS: function()
  },
  bzz: { //
    hive:  undefined,
    info: undefined,
    blockNetworkRead: function(),
    download: function(),
    get: function(),
    getHive: function(callback),
    getInfo: function(callback),
    modify: function(),
    put: function(),
    retrieve: function(),
    store: function(),
    swapEnabled: function(),
    syncEnabled: function(),
    upload: function()
  },
  currentProvider: {
    send: function(),
    sendAsync: function()
  },
  db: { // 底层数据库
    getHex: function(),
    getString: function(),
    putHex: function(),
    putString: function()
  },
  debug: {
    accountRange: function(),
    backtraceAt: function(),
    blockProfile: function(),
    chaindbCompact: function(),
    chaindbProperty: function(),
    cpuProfile: function(),
    dumpBlock: function(),
    freeOSMemory: function(),
    freezeClient: function(),
    gcStats: function(),
    getBadBlocks: function(),
    getBlockRlp: function(),
    getModifiedAccountsByHash: function(),
    getModifiedAccountsByNumber: function(),
    goTrace: function(),
    memStats: function(),
    mutexProfile: function(),
    preimage: function(),
    printBlock: function(),
    seedHash: function(),
    setBlockProfileRate: function(),
    setGCPercent: function(),
    setHead: function(),
    setMutexProfileFraction: function(),
    stacks: function(),
    standardTraceBadBlockToFile: function(),
    standardTraceBlockToFile: function(),
    startCPUProfile: function(),
    startGoTrace: function(),
    stopCPUProfile: function(),
    stopGoTrace: function(),
    storageRangeAt: function(),
    testSignCliqueBlock: function(),
    traceBadBlock: function(),
    traceBlock: function(),
    traceBlockByHash: function(),
    traceBlockByNumber: function(),
    traceBlockFromFile: function(),
    traceCall: function(),
    traceTransaction: function(),
    verbosity: function(),
    vmodule: function(),
    writeBlockProfile: function(),
    writeMemProfile: function(),
    writeMutexProfile: function()
  },
 eth: {
    accounts: [],
    blockNumber: 0,
    hashrate: undefined,
    mining: false,
    pendingTransactions: [],
    protocolVersion: undefined,
    syncing: false,
    call: function(),
    chainId: function(),
    contract: function(abi),
    createAccessList: function(),
    estimateGas: function(),
    fillTransaction: function(),
    filter: function(options, callback, filterCreationErrorCallback),
    getAccounts: function(callback),
    getBalance: function(),
    getBlock: function(),
    getBlockByHash: function(),
    getBlockByNumber: function(),
    getBlockNumber: function(callback),
    getBlockTransactionCount: function(),
    getBlockUncleCount: function(),
    getCode: function(),
    getCoinbase: function(callback),
    getCompilers: function(),
    getGasPrice: function(callback),
    getHashrate: function(callback),
    getHeaderByHash: function(),
    getHeaderByNumber: function(),
    getMining: function(callback),
    getPendingTransactions: function(callback),
    getProof: function(),
    getProtocolVersion: function(callback),
    getRawTransaction: function(),
    getRawTransactionFromBlock: function(),
    getStorageAt: function(),
    getSyncing: function(callback),
    getTransaction: function(),
    getTransactionCount: function(),
    getTransactionFromBlock: function(),
    getTransactionReceipt: function(),
    getUncle: function(),
    getWork: function(),
    iban: function(iban),
    icapNamereg: function(),
    isSyncing: function(callback),
    namereg: function(),
    resend: function(),
    sendIBANTransaction: function(),
    sendRawTransaction: function(),
    sendTransaction: function(),
    sign: function(),
    signTransaction: function(),
    submitTransaction: function(),
    submitWork: function()
  },
  ethash: {
    getHashrate: function(),
    getWork: function(),
    submitHashrate: function(),
    submitWork: function()
  },
  isIBAN: undefined,
  miner: {  // 矿工
    getHashrate: function(),
    setEtherbase: function(),
    setExtra: function(),
    setGasPrice: function(),
    setRecommitInterval: function(),
    start: function(),
    stop: function()
  },
  net: {
    listening: true,
    peerCount: 0,
    version: "15",
    getListening: function(callback),
    getPeerCount: function(callback),
    getVersion: function(callback)
  },
  personal: {
    listAccounts: [],
    listWallets: [],
    deriveAccount: function(),
    ecRecover: function(),
    getListAccounts: function(callback),
    getListWallets: function(callback),
    importRawKey: function(),
    initializeWallet: function(),
    lockAccount: function(),
    newAccount: function(),
    openWallet: function(),
    sendTransaction: function(),
    sign: function(),
    signTransaction: function(),
    unlockAccount: function(),
    unpair: function()
  },
  providers: { //
    HttpProvider: function(host, timeout, user, password),
    IpcProvider: function(path, net)
  },
  rpc: {
    modules: {
      admin: "1.0",
      debug: "1.0",
      eth: "1.0",
      ethash: "1.0",
      miner: "1.0",
      net: "1.0",
      personal: "1.0",
      rpc: "1.0",
      txpool: "1.0",
      web3: "1.0"
    },
    getModules: function(callback)
  },
  settings: {
    defaultAccount: undefined,
    defaultBlock: "latest"
  },
  shh: {
    addPrivateKey: function(),
    addSymKey: function(),
    deleteKeyPair: function(),
    deleteSymKey: function(),
    generateSymKeyFromPassword: function(),
    getPrivateKey: function(),
    getPublicKey: function(),
    getSymKey: function(),
    hasKeyPair: function(),
    hasSymKey: function(),
    info: function(),
    markTrustedPeer: function(),
    newKeyPair: function(),
    newMessageFilter: function(options, callback, filterCreationErrorCallback),
    newSymKey: function(),
    post: function(),
    setMaxMessageSize: function(),
    setMinPoW: function(),
    version: function()
  },
  txpool: {
    content: {
      pending: {},
      queued: {}
    },
    inspect: {
      pending: {},
      queued: {}
    },
    status: {
      pending: 0,
      queued: 0
    },
    getContent: function(callback),
    getInspect: function(callback),
    getStatus: function(callback)
  },
  version: {
    api: "0.20.1",
    whisper: undefined,
    getEthereum: function(callback),
    getNetwork: function(callback),
    getNode: function(callback),
    getWhisper: function(callback)
  },
  BigNumber: function a(e,n),
  createBatch: function(),
  fromAscii: function(str),
  fromDecimal: function(value),
  fromICAP: function(icap),
  fromUtf8: function(str),
  fromWei: function(number, unit),
  isAddress: function(address),
  isChecksumAddress: function(address),
  isConnected: function(),
  padLeft: function(string, chars, sign),
  padRight: function(string, chars, sign),
  reset: function(keepIsSyncing),
  setProvider: function(provider),
  sha3: function(string, options),
  toAscii: function(hex),
  toBigNumber: function(number),
  toChecksumAddress: function(address),
  toDecimal: function(value),
  toHex: function(val),
  toUtf8: function(hex),
  toWei: function(number, unit)
}
```

### geth --help

```js
$ geth --help
NAME:
   geth - the go-ethereum command line interface
   Copyright 2013-2021 The go-ethereum Authors

USAGE:
   geth [options] [command] [command options] [arguments...]

VERSION:
   1.10.2-stable-97d11b01

COMMANDS:
   account                            Manage accounts
   attach                             Start an interactive JavaScript environment (connect to node)
   console                            Start an interactive JavaScript environment
   db                                 Low level database operations
   dump                               Dump a specific block from storage
   dumpconfig                         Show configuration values
   dumpgenesis                        Dumps genesis block JSON configuration to stdout
   export                             Export blockchain into file
   export-preimages                   Export the preimage database into an RLP stream
   import                             Import a blockchain file
   import-preimages                   Import the preimage database from an RLP stream
   init                               Bootstrap and initialize a new genesis block
   js                                 Execute the specified JavaScript files
   license                            Display license information
   makecache                          Generate ethash verification cache (for testing)
   makedag                            Generate ethash mining DAG (for testing)
   removedb                           Remove blockchain and state databases
   show-deprecated-flags              Show flags that have been deprecated
   snapshot                           A set of commands based on the snapshot
   version                            Print version numbers
   version-check                      Checks (online) whether the current version suffers from any known security vulnerabilities
   wallet                             Manage Ethereum presale wallets
   help, h                            Shows a list of commands or help for one command

ETHEREUM OPTIONS:
  --config value                      TOML configuration file
  --datadir value                     Data directory for the databases and keystore (default: "/home/hailiting/.ethereum")
  --datadir.ancient value             Data directory for ancient chain segments (default = inside chaindata)
  --datadir.minfreedisk value         Minimum free disk space in MB, once reached triggers auto shut down (default = --cache.gc converted to MB, 0 = disabled)
  --keystore value                    Directory for the keystore (default = inside the datadir)
  --usb                               Enable monitoring and management of USB hardware wallets
  --pcscdpath value                   Path to the smartcard daemon (pcscd) socket file (default: "/run/pcscd/pcscd.comm")
  --networkid value                   Explicitly set network id (integer)(For testnets: use --ropsten, --rinkeby, --goerli instead) (default: 1)
  --mainnet                           Ethereum mainnet
  --goerli                            Görli network: pre-configured proof-of-authority test network
  --rinkeby                           Rinkeby network: pre-configured proof-of-authority test network
  --yolov3                            YOLOv3 network: pre-configured proof-of-authority shortlived test network.
  --ropsten                           Ropsten network: pre-configured proof-of-work test network
  --syncmode value                    Blockchain sync mode ("fast", "full", "snap" or "light") (default: fast)
  --exitwhensynced                    Exits after block synchronisation completes
  --gcmode value                      Blockchain garbage collection mode ("full", "archive") (default: "full")
  --txlookuplimit value               Number of recent blocks to maintain transactions index for (default = about one year, 0 = entire chain) (default: 2350000)
  --ethstats value                    Reporting URL of a ethstats service (nodename:secret@host:port)
  --identity value                    Custom node name
  --lightkdf                          Reduce key-derivation RAM & CPU usage at some expense of KDF strength
  --whitelist value                   Comma separated block number-to-hash mappings to enforce (<number>=<hash>)

LIGHT CLIENT OPTIONS:
  --light.serve value                 Maximum percentage of time allowed for serving LES requests (multi-threaded processing allows values over 100) (default: 0)
  --light.ingress value               Incoming bandwidth limit for serving light clients (kilobytes/sec, 0 = unlimited) (default: 0)
  --light.egress value                Outgoing bandwidth limit for serving light clients (kilobytes/sec, 0 = unlimited) (default: 0)
  --light.maxpeers value              Maximum number of light clients to serve, or light servers to attach to (default: 100)
  --ulc.servers value                 List of trusted ultra-light servers
  --ulc.fraction value                Minimum % of trusted ultra-light servers required to announce a new head (default: 75)
  --ulc.onlyannounce                  Ultra light server sends announcements only
  --light.nopruning                   Disable ancient light chain data pruning
  --light.nosyncserve                 Enables serving light clients before syncing

DEVELOPER CHAIN OPTIONS:
  --dev                               Ephemeral proof-of-authority network with a pre-funded developer account, mining enabled
  --dev.period value                  Block period to use in developer mode (0 = mine only if transaction pending) (default: 0)

ETHASH OPTIONS:
  --ethash.cachedir value             Directory to store the ethash verification caches (default = inside the datadir)
  --ethash.cachesinmem value          Number of recent ethash caches to keep in memory (16MB each) (default: 2)
  --ethash.cachesondisk value         Number of recent ethash caches to keep on disk (16MB each) (default: 3)
  --ethash.cacheslockmmap             Lock memory maps of recent ethash caches
  --ethash.dagdir value               Directory to store the ethash mining DAGs (default: "/home/hailiting/.ethash")
  --ethash.dagsinmem value            Number of recent ethash mining DAGs to keep in memory (1+GB each) (default: 1)
  --ethash.dagsondisk value           Number of recent ethash mining DAGs to keep on disk (1+GB each) (default: 2)
  --ethash.dagslockmmap               Lock memory maps for recent ethash mining DAGs

TRANSACTION POOL OPTIONS:
  --txpool.locals value               Comma separated accounts to treat as locals (no flush, priority inclusion)
  --txpool.nolocals                   Disables price exemptions for locally submitted transactions
  --txpool.journal value              Disk journal for local transaction to survive node restarts (default: "transactions.rlp")
  --txpool.rejournal value            Time interval to regenerate the local transaction journal (default: 1h0m0s)
  --txpool.pricelimit value           Minimum gas price limit to enforce for acceptance into the pool (default: 1)
  --txpool.pricebump value            Price bump percentage to replace an already existing transaction (default: 10)
  --txpool.accountslots value         Minimum number of executable transaction slots guaranteed per account (default: 16)
  --txpool.globalslots value          Maximum number of executable transaction slots for all accounts (default: 4096)
  --txpool.accountqueue value         Maximum number of non-executable transaction slots permitted per account (default: 64)
  --txpool.globalqueue value          Maximum number of non-executable transaction slots for all accounts (default: 1024)
  --txpool.lifetime value             Maximum amount of time non-executable transaction are queued (default: 3h0m0s)

PERFORMANCE TUNING OPTIONS:
  --cache value                       Megabytes of memory allocated to internal caching (default = 4096 mainnet full node, 128 light mode) (default: 1024)
  --cache.database value              Percentage of cache memory allowance to use for database io (default: 50)
  --cache.trie value                  Percentage of cache memory allowance to use for trie caching (default = 15% full mode, 30% archive mode) (default: 15)
  --cache.trie.journal value          Disk journal directory for trie cache to survive node restarts (default: "triecache")
  --cache.trie.rejournal value        Time interval to regenerate the trie cache journal (default: 1h0m0s)
  --cache.gc value                    Percentage of cache memory allowance to use for trie pruning (default = 25% full mode, 0% archive mode) (default: 25)
  --cache.snapshot value              Percentage of cache memory allowance to use for snapshot caching (default = 10% full mode, 20% archive mode) (default: 10)
  --cache.noprefetch                  Disable heuristic state prefetch during block import (less CPU and disk IO, more time waiting for data)
  --cache.preimages                   Enable recording the SHA3/keccak preimages of trie keys

ACCOUNT OPTIONS:
  --unlock value                      Comma separated list of accounts to unlock
  --password value                    Password file to use for non-interactive password input
  --signer value                      External signer (url or path to ipc file)
  --allow-insecure-unlock             Allow insecure account unlocking when account-related RPCs are exposed by http

API AND CONSOLE OPTIONS:
  --ipcdisable                        Disable the IPC-RPC server
  --ipcpath value                     Filename for IPC socket/pipe within the datadir (explicit paths escape it)
  --http                              Enable the HTTP-RPC server
  --http.addr value                   HTTP-RPC server listening interface (default: "localhost")
  --http.port value                   HTTP-RPC server listening port (default: 8545)
  --http.api value                    API's offered over the HTTP-RPC interface
  --http.rpcprefix value              HTTP path path prefix on which JSON-RPC is served. Use '/' to serve on all paths.
  --http.corsdomain value             Comma separated list of domains from which to accept cross origin requests (browser enforced)
  --http.vhosts value                 Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
  --ws                                Enable the WS-RPC server
  --ws.addr value                     WS-RPC server listening interface (default: "localhost")
  --ws.port value                     WS-RPC server listening port (default: 8546)
  --ws.api value                      API's offered over the WS-RPC interface
  --ws.rpcprefix value                HTTP path prefix on which JSON-RPC is served. Use '/' to serve on all paths.
  --ws.origins value                  Origins from which to accept websockets requests
  --graphql                           Enable GraphQL on the HTTP-RPC server. Note that GraphQL can only be started if an HTTP server is started as well.
  --graphql.corsdomain value          Comma separated list of domains from which to accept cross origin requests (browser enforced)
  --graphql.vhosts value              Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (default: "localhost")
  --rpc.gascap value                  Sets a cap on gas that can be used in eth_call/estimateGas (0=infinite) (default: 25000000)
  --rpc.txfeecap value                Sets a cap on transaction fee (in ether) that can be sent via the RPC APIs (0 = no cap) (default: 1)
  --rpc.allow-unprotected-txs         Allow for unprotected (non EIP155 signed) transactions to be submitted via RPC
  --jspath loadScript                 JavaScript root path for loadScript (default: ".")
  --exec value                        Execute JavaScript statement
  --preload value                     Comma separated list of JavaScript files to preload into the console

NETWORKING OPTIONS:
  --bootnodes value                   Comma separated enode URLs for P2P discovery bootstrap
  --discovery.dns value               Sets DNS discovery entry points (use "" to disable DNS)
  --port value                        Network listening port (default: 30303)
  --maxpeers value                    Maximum number of network peers (network disabled if set to 0) (default: 50)
  --maxpendpeers value                Maximum number of pending connection attempts (defaults used if set to 0) (default: 0)
  --nat value                         NAT port mapping mechanism (any|none|upnp|pmp|extip:<IP>) (default: "any")
  --nodiscover                        Disables the peer discovery mechanism (manual peer addition)
  --v5disc                            Enables the experimental RLPx V5 (Topic Discovery) mechanism
  --netrestrict value                 Restricts network communication to the given IP networks (CIDR masks)
  --nodekey value                     P2P node key file
  --nodekeyhex value                  P2P node key as hex (for testing)

MINER OPTIONS:
  --mine                              Enable mining
  --miner.threads value               Number of CPU threads to use for mining (default: 0)
  --miner.notify value                Comma separated HTTP URL list to notify of new work packages
  --miner.notify.full                 Notify with pending block headers instead of work packages
  --miner.gasprice value              Minimum gas price for mining a transaction (default: 1000000000)
  --miner.gastarget value             Target gas floor for mined blocks (default: 8000000)
  --miner.gaslimit value              Target gas ceiling for mined blocks (default: 8000000)
  --miner.etherbase value             Public address for block mining rewards (default = first account) (default: "0")
  --miner.extradata value             Block extra data set by the miner (default = client version)
  --miner.recommit value              Time interval to recreate the block being mined (default: 3s)
  --miner.noverify                    Disable remote sealing verification

GAS PRICE ORACLE OPTIONS:
  --gpo.blocks value                  Number of recent blocks to check for gas prices (default: 20)
  --gpo.percentile value              Suggested gas price is the given percentile of a set of recent transaction gas prices (default: 60)
  --gpo.maxprice value                Maximum gas price will be recommended by gpo (default: 500000000000)

VIRTUAL MACHINE OPTIONS:
  --vmdebug                           Record information useful for VM and contract debugging
  --vm.evm value                      External EVM configuration (default = built-in interpreter)
  --vm.ewasm value                    External ewasm configuration (default = built-in interpreter)

LOGGING AND DEBUGGING OPTIONS:
  --fakepow                           Disables proof-of-work verification
  --nocompaction                      Disables db compaction after import
  --verbosity value                   Logging verbosity: 0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail (default: 3)
  --vmodule value                     Per-module verbosity: comma-separated list of <pattern>=<level> (e.g. eth/*=5,p2p=4)
  --log.json                          Format logs with JSON
  --log.backtrace value               Request a stack trace at a specific logging statement (e.g. "block.go:271")
  --log.debug                         Prepends log messages with call-site location (file and line number)
  --pprof                             Enable the pprof HTTP server
  --pprof.addr value                  pprof HTTP server listening interface (default: "127.0.0.1")
  --pprof.port value                  pprof HTTP server listening port (default: 6060)
  --pprof.memprofilerate value        Turn on memory profiling with the given rate (default: 524288)
  --pprof.blockprofilerate value      Turn on block profiling with the given rate (default: 0)
  --pprof.cpuprofile value            Write CPU profile to the given file
  --trace value                       Write execution trace to the given file

METRICS AND STATS OPTIONS:
  --metrics                           Enable metrics collection and reporting
  --metrics.expensive                 Enable expensive metrics collection and reporting
  --metrics.addr value                Enable stand-alone metrics HTTP server listening interface (default: "127.0.0.1")
  --metrics.port value                Metrics HTTP server listening port (default: 6060)
  --metrics.influxdb                  Enable metrics export/push to an external InfluxDB database
  --metrics.influxdb.endpoint value   InfluxDB API endpoint to report metrics to (default: "http://localhost:8086")
  --metrics.influxdb.database value   InfluxDB database name to push reported metrics to (default: "geth")
  --metrics.influxdb.username value   Username to authorize access to the database (default: "test")
  --metrics.influxdb.password value   Password to authorize access to the database (default: "test")
  --metrics.influxdb.tags value       Comma-separated InfluxDB tags (key/values) attached to all measurements (default: "host=localhost")

ALIASED (deprecated) OPTIONS:
  --nousb                             Disables monitoring for and managing USB hardware wallets (deprecated)
  --rpc                               Enable the HTTP-RPC server (deprecated and will be removed June 2021, use --http)
  --rpcaddr value                     HTTP-RPC server listening interface (deprecated and will be removed June 2021, use --http.addr) (default: "localhost")
  --rpcport value                     HTTP-RPC server listening port (deprecated and will be removed June 2021, use --http.port) (default: 8545)
  --rpccorsdomain value               Comma separated list of domains from which to accept cross origin requests (browser enforced) (deprecated and will be removed June 2021, use --http.corsdomain)
  --rpcvhosts value                   Comma separated list of virtual hostnames from which to accept requests (server enforced). Accepts '*' wildcard. (deprecated and will be removed June 2021, use --http.vhosts) (default: "localhost")
  --rpcapi value                      API's offered over the HTTP-RPC interface (deprecated and will be removed June 2021, use --http.api)

MISC OPTIONS:
  --snapshot                          Enables snapshot-database mode (default = enable)
  --bloomfilter.size value            Megabytes of memory allocated to bloom-filter for pruning (default: 2048)
  --help, -h                          show help
  --override.berlin value             Manually specify Berlin fork-block, overriding the bundled setting (default: 0)


COPYRIGHT:
   Copyright 2013-2021 The go-ethereum Authors
```
