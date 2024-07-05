# Solana

## Solana 技术概览

### 性能指标

- 交易速度: Solana 网络声称能够每秒数千笔交易的处理能力
- 低费用
- 出块时间: 大约 400ms 出块

### 核心技术创新

- 历史证明(PoH, Proof of History): 通过连续执行哈希函数创造一个时间戳链，确保交易顺序，提高了交易验证效率
- 涡轮增压共识: 结合了 PoH 与 POS(权益证明)。涡轮增压共识通过并行处理交易和验证，实现极高的吞吐量，每秒可以处理数千笔
- 并行化处理: Solana 用的是交易分片技术和优化的验证流程，使得网络能够在同一时间内处理多个交易
- 集群架构: Solana 的网络由多个验证节点组成，这些节点被组织成多个集群，每个集群负责处理一部分交易负载，这种架构设计进一步增强了网络的横向扩展能力
- Sealevel: Sealevel 是 Solana 的一项创新，它允许在单个区块链状态下并行执行智能合约
- Pipeline Processing: Solana 引入了流水线处理技术，将交易验证过程分解为多个阶段，每个阶段可以并行进行，从而加速交易处理

## 核心模块

- Proof of History (PoH)
  - PoH 是 Solana 独有的共识机制，提供高度可验证的时间戳服务
  - PoH 通过连续的哈希运算来记录事件发生的顺序和时间，加速区块链的交易处理
- Turbine 广播协议
  - Turbine 是 Solana 的交易广播机制，可以高效地将交易信息广播到全网节点
  - Turbine 采用分层的网络拓扑和优化的带宽利用策略，最大化了网络吞吐量
- Sealevel 并行运行时
  - Sealevel 是 Solana 的智能合约执行引擎，可以并行处理多个交易和合约
  - 通过细粒度的交易分析和资源调度，Sealevel 大幅度提升了交易处理能力
- Pipelining 流水线
  - Pipelining 是 Solana 的交易处理流水线架构，将处理流程拆分成多个阶段
  - 各个阶段可以并行执行，进一步提升整体的交易吞吐量
- Gulf Stream 交易预热
  - Gulf Stream 可以在交易被打包之前将其广播给节点，减少交易等待时间
  - 这样可以提高整体的交易确认速度和网络吞吐量
- Archivers 历史数据存储
  - Archivers 是专门负责存储 Solana 历史数据节点，为轻量级客户端提供支持
  - Archivers 采用分布式存储方式，提高了数据的可靠性和访问性

## 一般编程模型

Solana 的编程模型借鉴了传统分布式系统的设计思想

- 基于账户模型
  - Solana 采用了基于账户的编程模型，每个账户都有自己的状态和所有权
  - 账号可以存储程序代码、用户数据或其他资产
- 智能合约
  - Solana 支持智能合约编程，开发者可以使用 Rust 或 C 语言编写合约代码
  - 合约代码被部署到账户上，可以被其他账户调用执行
- 程序和指令
  - Solana 中的 程序 相当于其他区块链中的智能合约
  - 程序包含可以被账户调用执行的指令
- 状态管理
  - Solana 采用了 状态管理 的编程模式，开发者需要显示地管理账户的状态变化
  - 状态可以存储在账户中，并通过执行指令来更新
- 并行执行
  - 得益于 Sealevel 并行执行引擎，Solana 可以并行处理多个智能合约调用
  - 合约之间的状态隔离和资源分配由 Sealevel 自动完成
- 事件和观察者
  - Solana 支持事件机制，程序可以发出事件通知，由其他观察者程序来监听和处理
  - 这种事件驱动的编程模式可以支持更复杂的应用场景

### Accounts

- 每一个数据都是一个文件 => 像 Linux 操作系统
- 账户是 256bit 位地址
- 持有 SOL
- 可以存储任意数据(以原始字节的形式)
- 实际的存储需要支付 Rent 租金
- 账户可以传递给程序，允许并行执行

```ts
{
  key: number,
  lamports: number, // 实际的总余额  1 SOL = 10^9 Lamport
  data: Uint8Array,
  is_executable: boolean, // 是否是程序，数据账号还是程序
  owner: PublicKey  // 所有者
}
```

### Programs

- Data 是 eBPF bytecode
- 可以用 Rust, C/C++, 或 Python 编写
- 无状态的，不能写入自己的账号

指令结构 Instruction

```ts
{
  program_id: number, // 为一个8字节的账户地址，用于唯一标识一个部署在Solana上的程序
  keys: Array<{
    key: PublicKey, // 账户公钥
    is_mutable: boolean, // 该账户是否可以被修改
    is_signer: boolean, // 该账户是否是签名者（即用户钱包）
  }>,
  data: Uint8Array, // 被程序执行的具体操作 Action + args
}
```

```ts
// 例子
{
  program_id: 0x1234567890abcdef, // token program ID
  keys: [
    { key: 0x0123456789abcdef, is_mutable: true, is_signer: true }, // sender's account
    { key: 0xfedcba9876543210, is_mutable: true, is_signer: false } // recipient's account
  ],
  data: new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00]) // transfer 100 tokens
}
```

### Transactions

```ts
{
  message: {
    instructions: Array<Instruction>, // 要执行的一个或多个指令（上面的
    recent_blockhash: number, // 表示最近区块 hash 值
    fee_payer: PublicKey, // 表示交易手续费支付者
    ... // 交易版本号等
  },
  signers: Array<Uint8Array>, // 表示交易的签名者，每个签名者都对应一个账户的私钥，用于对交易进行数字签名，签名者的顺序必须与 message.keys中的账户顺序一致
}
```

```ts
// 例子
{
  message: {
    instructions: [
      {
        program_id: 0x1234567890abcdef,
        keys: [
          { key: 0x0123456789abcdef, is_mutable: true, is_signer: true },
          { key: 0xfedcba9876543210, is_mutable: true, is_signer: false }
        ],
        data: new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00])
      }
    ],
    recent_blockhash: 0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef,
    fee_payer: 0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
  },
  signers: [
    new Uint8Array([...]), // sender's private key
    new Uint8Array([...])  // other signers' private keys
  ]
}
```

## 配置环境

官网地址
https://docs.solanalabs.com/cli/install
https://solana.com/zh/developers/guides/getstarted/setup-local-development

```bash
# 安装Rust
curl https://sh.rustup.rs -sSf | sh
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
# 安装Solana CLI
# cargo install solana-cli
# 配置 Solana CLI
# solana config set --url https://api.devnet.solana.com 测试网
solana config set --url https://api.mainnet-beta.solana.com
```

### 使用 Solana CLI

```bash
# 创建新的密钥对
solana-keygen new
# 导出公钥
solana-keygen pubkey
# 导出私钥
solana-keygen export
# 导入密钥对
solana-keygen import
# 设置默认秘钥
solana-keygen use
# 验证密钥对
solana-keygen verify
# 生成助记词
solana-keygen recover

solana config get
solana config set -u devnet
  # Config File: /Users/admin/.config/solana/cli/config.yml
  # RPC URL: https://api.devnet.solana.com
  # WebSocket URL: wss://api.devnet.solana.com/ (computed)
  # Keypair Path: /Users/admin/.config/solana/id.json
  # Commitment: confirmed
# 领水
solana airdrop 1 6YQj1Z3mKeFMN7Xnx4azjnmDvLJuEp13XssToL6wu7an -u devnet
solana balance
# solana-keygen new -o /Users/admin/.config/solana/id.json
solana address
```

## `solana-test-validator`

Solana 区块链开发中常用工具

- 本地测试环境
- 模拟 Solana
- 快速迭代开发
- 集成测试

### 设置本地 solana 环境

```bash
# 启动solana-test-validator
# solana-test-validator --log info # 看日志
solana-test-validator
# 使其指向你的本地验证器
export SOLANA_URL=http://127.0.0.1:8899
# 配置Solana CLI ~/.config/solana/config.yml
# .config/solana/config.yml
# url: http://127.0.0.1:8899
# 清理和重置
solana-test-validator --reset
```

## `mpl-token-metadata`

- Solana 的一个程序，用于处理非同质化代币(NFTs)的元数据，在 Solana 上创建和管理 NFT

### 在`solana-test-validator`部署 `mpl-token-metadata`

solana 版本有问题 会 `Invoked an instruction with data that is too large (12884934010 > 10240)`

```bash
solana-test-validator
# 第一步：获取 metaplex 的代码仓库
git clone git@github.com:metaplex-foundation/metaplex-program-library.git
cd metaplex-program-library/token-metadata
# 第二步：构建并部署程序
cd programs/
cargo build-bpf
solana program deploy ../target/deploy/mpl_token_metadata.so
 #Program Id: GoETvyQkSZj3fSdAZqfz8GoiUYyqQc94uUBUt6GpBLPj

# 第三步：验证部署
solana program show  GoETvyQkSZj3fSdAZqfz8GoiUYyqQc94uUBUt6GpBLPj
```

## Solana 生态的 Token

Solana 有两种类型

- SOL
- SPL Tokens

### SOL

- Solana 区块链的原生加密货币，用于支付交易费用、参与网络治理和奖励验证者。

### SPL Token

- 可互换性
- 可定制性
- 低交易成本
- 高速交易
- 智能合约兼容性

### 在 Solana 中可以

- 创建新的 account
- 将这个 account 作为一个 mint
- 创建一个 token account 关联账号
- 将 Token 铸造到关联 Token account

### PDA Solana 上的特殊账户或地址类型

允许程序为特定用途签名交易
