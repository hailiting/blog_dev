# MPC 钱包快速开始指南

## 🚀 5 分钟上手

### 第一步：启动服务器

```bash
cd server-go
go run main.go
```

你会看到：
```
🚀 MPC 钱包服务器启动在端口 8080
```

### 第二步：运行客户端示例

**新开一个终端：**

```bash
cd client-typescript
npm install
npm run dev
```

你会看到完整的创建钱包 → 签名交易的演示！

---

## 📝 完整安装步骤

### 服务端（Go）

```bash
# 1. 进入服务端目录
cd server-go

# 2. 下载依赖
go mod download

# 3. 运行服务器
go run main.go

# 或者编译后运行
go build -o mpc-server
./mpc-server
```

### 客户端（TypeScript）

```bash
# 1. 进入客户端目录
cd client-typescript

# 2. 安装依赖
npm install

# 3. 编译 TypeScript
npm run build

# 4. 运行示例
npm run dev

# 或者直接运行 TypeScript
npx ts-node src/example.ts
```

---

## 🎯 基本使用

### 1. 创建钱包

```typescript
import { MPCWalletClient } from 'mpc-wallet-client';

const client = new MPCWalletClient({
  serverUrl: 'http://localhost:8080',
});

// 创建钱包
const wallet = await client.createWallet();
console.log('地址:', wallet.address);

// 导出加密私钥
const encrypted = client.exportPrivateKey('你的密码');
console.log('备份:', encrypted);
```

### 2. 恢复钱包

```typescript
import { MPCWalletClient, MPCKeyManager } from 'mpc-wallet-client';

// 解密私钥
const skUser = MPCKeyManager.restore(encryptedKey, {
  type: 'encrypted',
  password: '你的密码',
});

// 导入钱包
const client = new MPCWalletClient({
  serverUrl: 'http://localhost:8080',
});
client.importWallet(skUser);
```

### 3. 签名交易

```typescript
const transaction = {
  from: wallet.address,
  to: '目标地址',
  amount: '0.5',
  nonce: 1,
  gas: 21000,
  gasPrice: '20',
  chainId: 1,
};

const signature = await client.signTransaction(transaction);
console.log('签名:', signature);
```

---

## 🧪 运行测试

### 客户端测试

```bash
cd client-typescript
npm test
```

### 服务端测试

```bash
cd server-go
go test ./...
```

---

## 🔧 配置选项

### 服务端环境变量

```bash
# .env 文件
SERVER_PORT=8080
DB_PATH=./data/mpc_wallet.db
LOG_LEVEL=info
```

### 客户端配置

```typescript
const client = new MPCWalletClient({
  serverUrl: 'http://localhost:8080',  // 服务器地址
  timeout: 30000,                       // 超时时间（毫秒）
  curve: 'ed25519',                     // 椭圆曲线类型
});
```

---

## 📚 更多示例

查看 `/examples` 目录获取更多示例：

- `complete-workflow.ts` - 完整工作流
- `client-typescript/src/example.ts` - 基础示例

---

## 🆘 常见问题

### Q: 服务器启动失败？

**A:** 检查端口 8080 是否被占用：

```bash
# macOS/Linux
lsof -i :8080

# Windows
netstat -ano | findstr :8080
```

### Q: 客户端连接失败？

**A:** 确保：
1. 服务器已启动
2. 防火墙未阻止连接
3. URL 配置正确

### Q: 签名失败？

**A:** 检查：
1. 钱包是否已创建
2. 私钥是否正确导入
3. 服务器是否正常运行

---

## 📞 获取帮助

- 查看完整文档：`README.md`
- 架构说明：`ARCHITECTURE.md`
- 提交 Issue：GitHub Issues

---

## ⚡ 下一步

1. ✅ 运行基础示例
2. 📖 阅读完整文档
3. 🔧 集成到你的应用
4. 🚀 部署到生产环境

开始你的 MPC 钱包之旅！🎉

