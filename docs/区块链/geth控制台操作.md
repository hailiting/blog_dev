# geth 控制台操作

## 启动控制台

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


> eth.getBalance(eth.accounts[0]);

> eth.sendTransaction({from: "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430", to: eth.accounts[0], value: 1000000})
// Error: unknown account

> eth.sendTransaction({from:eth.accounts[0], to: "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430", value: 1000000})
// authentication needed: password or unloack
> personal.unlockAccount(eth.accounts[0])
// 解锁
Passphrase: xxxx

> eth.sendTransaction({from:eth.accounts[0], to: "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430", value: 1000000})
// insufficient funds for transfer    余额不足

> personal.importRawKey  // 导入原始私钥

// 挖矿 miner
> miner.start(1) // 1表示一直挖
Succesful
> miner.stop()

> eth.blockNumber // 查看挖矿后 区块的高度
> eth.getBalance(eth.accounts[0])

> eth.sendTransaction({
  from:  eth.accounts[0],
  to: "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430",
  value: web3.toWei(1, "ether")
})
```

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
  bzz: {
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
  db: {
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
