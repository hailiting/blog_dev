# CosmosSDK

CosmosSDK 是一个开源框架，用于构建多资产的公开权益证明（POS）区块链，比如 CosmosHub，同时也支持许可权威性证明(POA)区块链。
使用 CosmosSDK 构建的区块链通常被称为特定应用区块链。
可以将 CosmosSDK 视为在 CometBFT 之上构建安全区块链应用程序类似 npm 的框架。基于 SDK 区块链是由可组合模块构建而成的，权重大部分模块都是开源的。

## 什么是应用程序特定的区块链

现有的区块链，有基于虚拟机的区块链，例如以太坊，
特定区块链是一种针对单一应用程序定制化的区块链，开发者拥有充分的自由度来定制实现该应用程序高效运行所需的所有设计决策。

- 为应用程序提供更好的主权性、安全性及性能表现

## Cosmos

区块链互联网 The Internet of Blockchains

- 即保有独立自主权，又可互操作的应用专有链
- 应用专有链的三大特性
  - 扩展性，自主性，互操作性
- 基于三大特性提供无缝的用户与开发者体验
  - 可扩展性 Scalability
  - 独立自主性 Sovereignty
  - 可互操作性

### Cosmos Network

- 一个去中心化、快速扩展的、由独立互联的区块链网络组成的超级网络，使用开发人员友好的应用组件构造，并由突破性的 IBC 跨链通信协议连接
  - 基于 BFT 共识机制
  - 通过 IBC 协议互联
- Cosmos Hub
  - Cosmos Network 中最早的一个区块链网络
  - 基于 CosmosSDK 构建的，使用拜占庭容错共识引擎构建的 POS 权益证明网络，主网代号 Gaia, 主通证 ATOM (阿童木)
- [Cosmos 社区](!https://v1.cosmos.network/community)
  - 由终端用户、应用开发者、区块链项目团队、机构等组成的去中心化的开放/开源社区，拥有高度的自主性和自主性
- [跨链基金会(ICF)](!https://interchain.io/)
  - 设立在瑞士的非盈利基金会
  - 开发和维护与 Cosmos 愿景相关的基础协议
  - 为建设区块链互联网的全球各地的机构/组织提供资金支持
  - 三大议程
    - Builders Program, Advocacy Program, Developer Academy

## 三大核心技术产品

- Tendermint
  - 提供了一种基于权益证明(POS)的拜占庭容错(BFT)共识算法的实现
    - Tendermint Core 共识引擎
    - ABCI 应用区块链接口
- Cosmos SDK
  - 支持快速以模块化方式搭建区块链软件
- IBC 跨链通信协议
  - 跨链黄金标准
