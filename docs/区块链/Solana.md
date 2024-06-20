# Solana

- Executes programs in parallel

  - 每个交易都是无状态的并可以并行执行

  120

- https://solscan.io/?cluster=devnet
- 水： https://erp.ichub.com/faucet/solana
- 钱包: Phantom Solana Devnet 开发者网络
- 写代码的网站：https://beta.solpg.io/

## 编程模型

- Accounts
- Programs
- Instructions & Transactions
- Custom Program Data

- 一切都是账户
  - 都是 256 个字节组成的地址
  - 有 SOL 资产
  - 可以存储数据
  - 存储需要租金

```
// 原始形式查看 Accounts
// 1 Lamport = 10E-9 SOL    1 Lamport = 0.000000001 SOL

{
  key: number,
  lamports: number,
  data: Uint8Array, // 无符号整数或u8数组形式存储的原始字节
  is_executable: boolean, // 表示你正在与之交互的特定账户是否为程序
  owner: PublicKey
}
```

- Solana 可执行程序
  - 程序是可以在区块链上部署的代码片段，由 Rust、C/C++、Python 等语言编译而成
  - 存储该特定账号上的数据是 EBF 自解码， 这是 Berkeley 数据，包括滤器自解码，程序通常用 rust 编写，无论是原生的还是 Solana Rust 框架
  - 无状态执行：程序是无状态的，只能读取和写入其他账户的数据
  - 权限控制：只有账户的所有者才能对其内容进行修改，包括程序本身

```
// Instructions 指令
{
  program_id: number,
  keys: Array<{
    key: PublicKey,
    is_mutable: boolean,
    is_signer: boolean,
  }>,
  data: Uint8Array // Action + args
}
```

```
// Transactions 交易
{
  message: {
    instructions: Array<Instruction>,
    recent_blockhash: number,  // For de-duplication 用于消除重复数据
    fee_payer: PublicKey,  // Pays "gas" fee
    ...
  },
  signers: Array<Uint8Array>
}
```

- Client 发送一个交易到 RPC
- RPC 把交易信息给验证者 Validator
- 验证者给 Solana 虚拟机 Program 去执行
- Program 将 Counter+1

## 合约开发环境

- rust
- solana

  - https://solanacookbook.com/zh/getting-started/installation.html#macos-linux
    - `sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"` LATEST_RELEASE: `stable`, `beta`, `edge`, 从稳定性角度看，Stable > Beta > Edge/Canary
  - `solana --version`
  - 切换环境
    - `solana config set --url https://api.devnet.solana.com`
  - 导入账号
    - 新账号 `solana-keygen new`
    - 已有助记词 `solana-keygen recover `
  - `solana config get`
    - Config File
    - RPC URL
    - WebSocket
    - Keypair
    - Commitment
  - `solana address`
  - `solana balance`

- SPL
  - `cargo install spl-token-cli`
  - 查看是否安装成功 `sql-token -V`

Demo => https://github.com/hailiting/web3_demo
