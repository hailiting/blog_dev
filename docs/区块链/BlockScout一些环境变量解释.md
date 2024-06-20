# BlockScout 一些环境变量解释

## ETHEREUM_JSONRPC_VARIANT RPC 客户端

RPC => Remote Procedure Call 远程过程调用
以太坊 RPC 客户端

- erigon: 高性能、资源高效的以太坊客户端。兼容 Geth 客户端，但可以更快的同步区块链数据
- geth: 由以太坊基金会开发的官方客户端，采用 GO 语言编写
- nethermind: 由 Nethermind 团队开发的以太坊客户端，采用 C#语言编写。专注于性能、资源效率和高级功能
- besu: Besu 是由 Hyperledger 开发的以太坊客户端，基于 Java 语言，面向企业级应用提供了权限管理和隐私保护等功能（企业级应用）
- filecoin: Filecoin 是一个建立在以太坊上的去中心化存储网络，Filecoin 客户端用于与 Filecoin 网络交互（去中心化存储）
- ganache: Ganache 由 Truffle 套件开发的以太坊客户端，用于开发和测试为目的，在本地运行一个个人以太坊区块链

## DATABASE_READ_ONLY_API_URL Postgres 数据库只读副本(read-only replica)的 API 端点

### 只读副本的作用

- 数据库读写分离，提高整体系统性能和可扩展性
- 提高读性能
- 提高可用性，当主数据库出现故障时，可以临时切换到只读副本以保证服务的可用性
