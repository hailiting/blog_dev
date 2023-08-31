# Solidity 手动编译部署智能合约

## solc

### 编译合约

```bash
> gedit Storage.sol
> echo "var storageOutput = `solc --optimize --combine-json abi,bin,interface Storage.sol`" > storage.js
> cat storage.js
```

- 字段：
  - i abi: 应用二进制接口，以太坊合约之间调用的时候一个消息格式
  - ii. bin: 合约被编译之后的二进制内容

### 部署合约

- 搭建私链并启动

```bash
# 配置文件
> gedit genesis.json
# 初始化
> geth --datadir ./db init genesis.json
# 启动节点
geth --datadir "./db" --rpc --rpcaddr=0.0.0.0 --rpcport 8545 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,admin,shh,txpool,debug,miner" --nodiscover --maxpeers 30 --networkid 1981 --port 30303 --mine --minerthreads 1 --etherbase "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430" console 2>>tail.log
# 在启动一个链接连接以太坊的geth节点
> geth --datadir ./db attach ipc:./db/geth.ipc
```

- 加载 js 文件

```bash
# 加载js
> loadScript("/home/eth/eth-1801/day11/storage.js")
# js里的实例对象，storageOutput 查看信息
> storageOutput
# 获取abi
> var storageContractAbi = storageOutput["contracts"]["Storage.sol:Storage"]["abi"]
# 解析json
> var storageContract = eth.contract(JSON.parse(storageContractAbi));
# 获取bin
> var storageBinCode ="0x"+ storageOutput["contracts"]["Storage.sol:Storage"]["bin"]
```

- 部署合约

```bash
# 创建账户
> personal.newAccount("123456")
> eth.getBalance(eth.accounts[0])
# 设置新的miner账户
> eth.setEtherbase(eth.account[0])
> eth.coinbase
# 解锁
> personal.unlockAccount(eth.accounts[0], "123456")
# 向网络中发送一个部署合约的交易
> var deployTransactionObject = {from: eth.accounts[0], data: storageBinCode, gas: 1000000}
# 创建一个合约实例, storageInstance => 一个对象
> var storageInstance = storageContract.new(deployTransactionObject)
# 合约已成功部署
# 查看交易详情
> eth.getTransactionReceipt(storageInstance.transactionHash)
> var storageAddress = eth.getTransactionReceipt(storageInstance.transactionHash).contractAddress

# 合约调用
> var storage = storageContract.at(storageAddress)
> storage.get.call()
> personal.unlockAccount(eth.accounts[0], "123456")
> storage.set.sendTransaction(40, {from: eth.accounts[0], gas: 1000000})
## 要出块交易才会完成
> storage.get.call()
```
