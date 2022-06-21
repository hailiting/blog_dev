# Solidity 手动编译部署智能合约

## solc

### 编译合约

```shell
> gedit Storage.sol
> echo "var storageOutput = `solc --optimize --combine-json abi,bin,interface Storage.sol`" > storage.js
> cat storage.js
```

- 字段：
  - i abi: 应用二进制接口，以太坊合约之间调用的时候一个消息格式
  - ii. bin: 合约被编译之后的二进制内容

### 部署合约

- 搭建私链并启动

```shell
# 配置文件
> gedit genesis.json
# 初始化
> geth --datadir ./db init genesis.json
```
