# Solana 签名

Solana 中的签名是交易处理的核心部分，用于验证交易发送者的身份和授权。本文档介绍 Solana 中常见的签名方式。

## 签名方式概览

Solana 支持多种签名方式：

1. **Keypair 签名** - 使用本地密钥对直接签名
2. **钱包签名** - 使用钱包应用（如 Phantom）签名
3. **消息签名** - 签名任意消息数据

## 1. 使用 Keypair 签名交易

### 1.1 创建 Keypair

```typescript
import { Keypair } from "@solana/web3.js";

// 方式1: 生成新的密钥对
const keypair = Keypair.generate();
console.log("公钥:", keypair.publicKey.toBase58());
console.log("私钥:", keypair.secretKey);

// 方式2: 从私钥恢复密钥对
const secretKey = new Uint8Array([...]); // 你的私钥数组
const keypair = Keypair.fromSecretKey(secretKey);

// 方式3: 从文件加载密钥对
import fs from "fs";
const keyfileBytes = JSON.parse(
  fs.readFileSync("path/to/keypair.json", { encoding: "utf-8" })
);
const keypair = Keypair.fromSecretKey(new Uint8Array(keyfileBytes));
```

### 1.2 签名交易

```typescript
import {
  Connection,
  Keypair,
  TransactionMessage,
  VersionedTransaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

// 创建连接
const connection = new Connection('https://api.devnet.solana.com');

// 获取密钥对
const payer = Keypair.fromSecretKey(/* 你的私钥 */);

// 获取最近的区块hash
const { blockhash } = await connection.getLatestBlockhash();

// 创建转账指令
const transferInstruction = SystemProgram.transfer({
  fromPubkey: payer.publicKey,
  toPubkey: new PublicKey('接收地址'),
  lamports: LAMPORTS_PER_SOL, // 1 SOL
});

// 构建交易消息
const message = new TransactionMessage({
  payerKey: payer.publicKey,
  recentBlockhash: blockhash,
  instructions: [transferInstruction],
}).compileToV0Message();

// 创建版本化交易
const transaction = new VersionedTransaction(message);

// 使用 Keypair 签名
transaction.sign([payer]);

// 发送交易
const signature = await connection.sendTransaction(transaction);
console.log('交易签名:', signature);
```

### 1.3 多个签名者

如果交易需要多个签名者：

```typescript
const payer = Keypair.fromSecretKey(/* 支付者私钥 */);
const signer1 = Keypair.fromSecretKey(/* 签名者1私钥 */);
const signer2 = Keypair.fromSecretKey(/* 签名者2私钥 */);

// 签名时传入所有签名者
transaction.sign([payer, signer1, signer2]);
```

**注意**: 签名者的顺序必须与指令中 `is_signer: true` 的账户顺序一致。

## 2. 使用钱包签名（Phantom 等）

### 2.1 检测钱包

```typescript
// 检测 Phantom 钱包
const provider = window.phantom?.solana || window.solana;

if (!provider) {
  console.log('请安装 Phantom 钱包');
  return;
}

// 检查是否已连接
if (!provider.isConnected) {
  await provider.connect();
}

console.log('钱包地址:', provider.publicKey.toBase58());
```

### 2.2 使用钱包签名交易

```typescript
import { Connection, TransactionMessage, VersionedTransaction, SystemProgram } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com');
const provider = window.solana; // 或 window.phantom?.solana

// 确保钱包已连接
if (!provider.isConnected) {
  await provider.connect();
}

// 获取最近的区块hash
const { blockhash } = await connection.getLatestBlockhash();

// 构建交易
const message = new TransactionMessage({
  payerKey: provider.publicKey,
  recentBlockhash: blockhash,
  instructions: [
    SystemProgram.transfer({
      fromPubkey: provider.publicKey,
      toPubkey: new PublicKey('接收地址'),
      lamports: 1000000, // 0.001 SOL
    }),
  ],
}).compileToV0Message();

const transaction = new VersionedTransaction(message);

// 使用钱包签名
const signedTransaction = await provider.signTransaction(transaction);

// 发送交易
const signature = await connection.sendRawTransaction(signedTransaction.serialize());

console.log('交易签名:', signature);
```

### 2.3 批量签名交易

```typescript
const transactions = [tx1, tx2, tx3];

// 批量签名
const signedTransactions = await provider.signAllTransactions(transactions);

// 发送所有交易
for (const signedTx of signedTransactions) {
  await connection.sendRawTransaction(signedTx.serialize());
}
```

### 2.4 签名并发送（一步完成）

```typescript
// 使用钱包的 signAndSendTransaction 方法
const signature = await provider.signAndSendTransaction(transaction, {
  skipPreflight: false,
  maxRetries: 3,
});

console.log('交易签名:', signature);
```

## 3. 签名消息

### 3.1 使用 Keypair 签名消息

```typescript
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';

const keypair = Keypair.fromSecretKey(/* 你的私钥 */);
const message = new TextEncoder().encode('Hello, Solana!');

// 使用 Ed25519 签名
const signature = nacl.sign.detached(message, keypair.secretKey);

console.log('消息签名:', Buffer.from(signature).toString('base64'));

// 验证签名
const isValid = nacl.sign.detached.verify(message, signature, keypair.publicKey.toBytes());
console.log('签名验证:', isValid);
```

### 3.2 使用钱包签名消息

```typescript
const provider = window.solana;

// 确保已连接
if (!provider.isConnected) {
  await provider.connect();
}

// 准备要签名的消息
const message = new TextEncoder().encode('Hello, Solana!');

// 使用钱包签名
const { signature } = await provider.signMessage(message);

console.log('消息签名:', signature);

// 验证签名
import nacl from 'tweetnacl';
const isValid = nacl.sign.detached.verify(message, signature, provider.publicKey.toBytes());
console.log('签名验证:', isValid);
```

## 4. 签名流程说明

### 4.1 交易签名流程

1. **构建交易消息** - 包含指令、支付者、区块 hash 等
2. **创建交易对象** - 使用 `VersionedTransaction` 或 `Transaction`
3. **签名交易** - 使用 `transaction.sign([keypair])` 或钱包的签名方法
4. **序列化交易** - `transaction.serialize()` 或 `transaction.serialize({ verifySignatures: false })`
5. **发送交易** - `connection.sendRawTransaction(serializedTransaction)`

### 4.2 签名验证

Solana 网络会自动验证签名：

- 签名必须与交易消息中的 `fee_payer` 和所有 `is_signer: true` 的账户匹配
- 签名数量必须与签名者数量一致
- 签名顺序必须与消息中账户的顺序一致

## 5. 常见问题

### 5.1 签名者顺序错误

```typescript
// ❌ 错误：签名者顺序与指令中的账户顺序不一致
transaction.sign([signer2, signer1]); // 顺序错误

// ✅ 正确：签名者顺序与指令中的账户顺序一致
transaction.sign([signer1, signer2]); // 顺序正确
```

### 5.2 区块 hash 过期

```typescript
// 每次签名前都要获取最新的区块hash
const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');

// 如果交易未及时发送，区块hash可能过期
// 需要重新获取并重建交易
```

### 5.3 部分签名交易

对于需要多个签名者的交易，可以先部分签名：

```typescript
// 第一个签名者签名
transaction.partialSign(keypair1);

// 序列化后发送给第二个签名者
const serialized = transaction.serialize({
  requireAllSignatures: false,
});

// 第二个签名者反序列化并签名
const tx = VersionedTransaction.deserialize(serialized);
tx.sign([keypair2]);

// 现在交易已完全签名，可以发送
```

## 6. 实际示例

### 完整示例：转账交易

```typescript
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

async function transferSOL() {
  // 1. 建立连接
  const connection = new Connection('https://api.devnet.solana.com');

  // 2. 加载密钥对
  const fromKeypair = Keypair.fromSecretKey(/* 你的私钥 */);
  const toPublicKey = new PublicKey('接收地址');

  // 3. 检查余额
  const balance = await connection.getBalance(fromKeypair.publicKey);
  console.log('当前余额:', balance / LAMPORTS_PER_SOL, 'SOL');

  // 4. 获取区块hash
  const { blockhash } = await connection.getLatestBlockhash();

  // 5. 创建转账指令
  const transferInstruction = SystemProgram.transfer({
    fromPubkey: fromKeypair.publicKey,
    toPubkey: toPublicKey,
    lamports: 0.1 * LAMPORTS_PER_SOL, // 0.1 SOL
  });

  // 6. 构建交易
  const message = new TransactionMessage({
    payerKey: fromKeypair.publicKey,
    recentBlockhash: blockhash,
    instructions: [transferInstruction],
  }).compileToV0Message();

  const transaction = new VersionedTransaction(message);

  // 7. 签名交易
  transaction.sign([fromKeypair]);

  // 8. 发送交易
  const signature = await connection.sendRawTransaction(transaction.serialize());

  // 9. 确认交易
  await connection.confirmTransaction(signature, 'confirmed');

  console.log('交易成功:', signature);
  console.log('查看交易:', `https://explorer.solana.com/tx/${signature}?cluster=devnet`);
}

transferSOL();
```

## 7. 注意事项

1. **私钥安全**: 永远不要将私钥提交到代码仓库或暴露给他人
2. **网络选择**: 开发时使用 devnet，生产环境使用 mainnet
3. **交易费用**: 每笔交易都需要支付少量 SOL 作为手续费
4. **区块 hash 有效期**: 区块 hash 有有效期，过期需要重新获取
5. **签名顺序**: 多签名者时，签名顺序必须与账户顺序一致

## 8. 相关资源

- [Solana Web3.js 文档](https://solana-labs.github.io/solana-web3.js/)
- [Solana Cookbook - 签名](https://solanacookbook.com/references/transactions.html#sign-a-transaction)
- [Phantom 钱包文档](https://docs.phantom.app/)
