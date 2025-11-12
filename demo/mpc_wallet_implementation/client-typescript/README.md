# MPC 钱包客户端 - TypeScript 实现

基于多方安全计算（MPC）的去中心化钱包客户端 SDK。

## 📦 安装

```bash
npm install mpc-wallet-client
# 或
yarn add mpc-wallet-client
```

## 🚀 快速开始

```typescript
import { MPCWalletClient } from 'mpc-wallet-client';

// 创建客户端
const client = new MPCWalletClient({
  serverUrl: 'https://mpc-server.example.com',
});

// 创建钱包
const wallet = await client.createWallet();
console.log('钱包地址:', wallet.address);

// 签名交易
const signature = await client.signTransaction({
  from: wallet.address,
  to: '0x...',
  amount: '1.0',
  nonce: 1,
  gas: 21000,
  gasPrice: '20',
  chainId: 1,
});
```

## 📖 API 文档

### MPCWalletClient

#### 构造函数

```typescript
new MPCWalletClient(config: MPCConfig)
```

**参数：**
- `config.serverUrl`: MPC 服务器 URL
- `config.timeout`: 请求超时（可选，默认 30000ms）
- `config.curve`: 椭圆曲线类型（可选，默认 'ed25519'）

#### 方法

##### createWallet()

创建新钱包。

```typescript
async createWallet(): Promise<WalletInfo>
```

**返回：**
```typescript
{
  address: string;      // 钱包地址
  publicKey: string;    // 联合公钥
  pkUser: string;       // 客户端公钥片段
  pkNode: string;       // 服务端公钥片段
}
```

##### importWallet()

导入已有钱包。

```typescript
importWallet(skUser: BN): void
```

##### signTransaction()

签名交易（MPC 联合签名）。

```typescript
async signTransaction(tx: Transaction): Promise<Signature>
```

**参数：**
```typescript
{
  from: string;
  to: string;
  amount: string;
  nonce: number;
  gas: number;
  gasPrice: string;
  chainId: number;
}
```

**返回：**
```typescript
{
  r: string;  // 签名 r 值（十六进制）
  s: string;  // 签名 s 值（十六进制）
}
```

##### exportPrivateKey()

导出私钥片段。

```typescript
exportPrivateKey(password?: string): string
```

如果提供密码，则返回加密的私钥；否则返回明文。

### MPCKeyManager

密钥管理工具类。

#### 方法

##### save()

保存私钥片段。

```typescript
static save(
  skUser: BN,
  options: KeyStorageOptions
): string
```

**选项：**
```typescript
{
  type: 'plaintext' | 'encrypted';
  password?: string;  // type='encrypted' 时必需
}
```

##### restore()

恢复私钥片段。

```typescript
static restore(
  encoded: string,
  options: KeyStorageOptions
): BN
```

## 💡 使用示例

### 创建加密钱包

```typescript
const client = new MPCWalletClient({
  serverUrl: 'http://localhost:8080',
});

// 创建钱包
const wallet = await client.createWallet();

// 导出加密私钥
const password = 'MySecurePassword123';
const encryptedKey = client.exportPrivateKey(password);

// 保存到本地存储
localStorage.setItem('wallet_key', encryptedKey);
localStorage.setItem('wallet_address', wallet.address);
```

### 恢复钱包并签名

```typescript
import { MPCWalletClient, MPCKeyManager } from 'mpc-wallet-client';

// 从本地存储恢复
const encryptedKey = localStorage.getItem('wallet_key')!;
const password = prompt('请输入密码:')!;

// 解密私钥
const skUser = MPCKeyManager.restore(encryptedKey, {
  type: 'encrypted',
  password,
});

// 导入钱包
const client = new MPCWalletClient({
  serverUrl: 'http://localhost:8080',
});
client.importWallet(skUser);

// 签名交易
const tx = {
  from: wallet.address,
  to: '0x1234...',
  amount: '0.5',
  nonce: 1,
  gas: 21000,
  gasPrice: '20',
  chainId: 1,
};

const signature = await client.signTransaction(tx);
console.log('签名完成:', signature);
```

### 验证签名

```typescript
const isValid = MPCWalletClient.verifySignature(
  transaction,
  signature,
  wallet.publicKey
);

if (isValid) {
  console.log('✅ 签名有效');
} else {
  console.log('❌ 签名无效');
}
```

## 🔐 安全最佳实践

1. **永远不要暴露私钥片段**
   ```typescript
   // ❌ 错误
   console.log(skUser);
   
   // ✅ 正确
   const encrypted = client.exportPrivateKey(password);
   ```

2. **使用强密码**
   ```typescript
   // ❌ 弱密码
   const password = '123456';
   
   // ✅ 强密码
   const password = 'MyV3ry$tr0ng#P@ssw0rd!2024';
   ```

3. **安全存储**
   ```typescript
   // ✅ 加密后存储
   const encrypted = client.exportPrivateKey(password);
   secureStorage.set('wallet', encrypted);
   ```

4. **验证服务器证书**
   ```typescript
   // ✅ 使用 HTTPS
   const client = new MPCWalletClient({
     serverUrl: 'https://mpc-server.example.com',
   });
   ```

## 🧪 测试

```bash
npm test
```

## 📄 许可证

MIT

