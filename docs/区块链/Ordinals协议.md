# Ordinals 协议

探索：比特币可以以去中心化的方式跟踪物品，而不仅仅是一种货币单位。

## Bitcoin Ordinals

Bitcoin Ordinals 是一个基于比特币的分布式账本协议，旨在提供高性能和高扩展性。

- 它是区块链架构中的一种新型方式，使用可组合性的交易来减少冗余和增加特定应用程序的运行效率。
  Bitcoin Ordinals 使用一种开源协议，为每 satoshis(sat)分配唯一身份。

- satoshis(聪)是比特币的最小单位。以 Satoshi Nakamoto(中本聪)命名。
- 使用 Ord 协议，该协议将数据添加到这些 sat，并允许软件用户基于一个序数(ordinal numbers)系统来跟踪他们。
  - 影响因素: sat 通过挖矿进入流通的时间，以及 sat 所在的特定区块的高度
  - 用户可以像普通比特币单位一样交易和转移这些唯一标识 sat
  - 数字产品本身完全存储在链上，而不是互联网上的其他地方
  - 如果不进行 SegWit 和 Taproot 升级(两种软分叉升级，有助于增加比特币区块容量)，这一功能就不可能在比特币网络上实现

## 稀有度

- common: 不是第一个区块 sat 的所有区块: `2.1*10^15`
- uncommone: 每个区块的第一个 sat - 6,929,999
- rare: 每次难度调整的第一个 sat - 3,437
- epic: 史诗，每次减半的第一个 sat - 32
- legendary: 传奇, 每 cycle 的第一个 sat - 5
- mythic: 神话，创世区块的第一个 sat - 1

## 问题：

### 如果购买

- 自己 mint
- OTC, discord 里

### 需要下载全节点吗

- 购买不需要
- mint，出售给别人时需要

## 相关链接

- 如何 mint: https://docs.ordinals.com/guides/inscriptions.html
- 应用市场: https://ordinalswallet.com/
- 数据: https://dune.com/dataalways/ordinals
- Ordinals 列表: https://twitter.com/i/lists/1623332753654833153?s=20
- https://astralbabes.ai/

## 铸造 nft

https://ordinalsbot.com/
https://gamma.io/ordinals

## 查看 Ord 生态

https://ordinalhub.com/
