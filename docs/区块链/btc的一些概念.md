# btc 的一些概念

## 前史

- `B-Money` 分布式账本技术
- `Bit-Gold` 工作量证明机制、防止双花攻击
- `RPOW Token` -> 代币经济模型-> 比特币
- `时间戳技术`

## 区块链的结构

- 区块 Block
- 交易 Transaction
- 共识机制 Consensus Mechanism
- 分布式网络 Distributed Network
- 加密算法 Cryptography

```sol
// 区块结构体
struct Block {
  uint256 blockNumber; // 区块编号
  bytes32 blockHash; // 区块hash
  bytes32 previousHash; // 前一个区块哈希
  uint256 timestamp; // 区块时间戳
  Transaction[] transactions; // 交易列表
}
// 交易结构体
struct Transaction {
  address sender;
  address recipient;
  uint256 amount; // 交易金额
  bytes data; // 其他交易数据
}
// 区块链结构体
struct Blockchain {
  mapping(bytes32 => Block) blocks; // 区块映射
  address[] validators; // 验证节点列表
  mapping(address => uint256) balances; // 账户余额映射
}
```
