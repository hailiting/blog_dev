# MPC 钱包架构详解

## 目录

1. [系统架构](#系统架构)
2. [技术栈](#技术栈)
3. [核心模块](#核心模块)
4. [数据流程](#数据流程)
5. [安全设计](#安全设计)
6. [扩展性](#扩展性)

---

## 系统架构

### 整体架构

```
┌────────────────────────────────────────────────────────────┐
│                         用户层                              │
├────────────────────────────────────────────────────────────┤
│  Web App  │  Mobile App  │  Desktop App  │  CLI Tool      │
└─────┬──────────────┬──────────────┬──────────────┬─────────┘
      │              │              │              │
      └──────────────┴──────────────┴──────────────┘
                     │
        ┌────────────▼───────────────┐
        │   TypeScript Client SDK    │
        │  (MPC Wallet Client)       │
        └────────────┬───────────────┘
                     │ HTTPS/TLS
        ┌────────────▼───────────────┐
        │    Go Server (MPC Node)    │
        │  • API Gateway             │
        │  • Key Service             │
        │  • Signature Service       │
        └────────────┬───────────────┘
                     │
        ┌────────────▼───────────────┐
        │  Persistence Layer         │
        │  • Database (PostgreSQL)   │
        │  • Cache (Redis)           │
        │  • HSM (Hardware Security) │
        └────────────────────────────┘
```

---

## 技术栈

### 客户端（TypeScript）

| 组件 | 技术 | 用途 |
|-----|------|------|
| 运行时 | Node.js 16+ | JavaScript 运行环境 |
| 语言 | TypeScript 5+ | 类型安全的 JavaScript |
| 加密库 | tweetnacl | Ed25519 椭圆曲线加密 |
| 加密库 | crypto-js | AES 对称加密 |
| 编码 | bs58 | Base58 编码/解码 |
| HTTP 客户端 | axios | API 请求 |
| 大整数 | bn.js | 大整数运算 |

### 服务端（Go）

| 组件 | 技术 | 用途 |
|-----|------|------|
| 语言 | Go 1.21+ | 高性能服务端语言 |
| Web 框架 | Gin | HTTP 路由和中间件 |
| 加密库 | golang.org/x/crypto | Ed25519 和哈希函数 |
| 编码 | btcsuite/btcutil | Base58 编码 |
| 数据库 | （可选）PostgreSQL | 持久化存储 |
| 缓存 | （可选）Redis | 高速缓存 |

---

## 核心模块

### 客户端模块

#### 1. **类型系统（types.ts）**

定义所有数据结构：
- `PrivateKeyFragment`: 私钥片段
- `WalletInfo`: 钱包信息
- `Transaction`: 交易数据
- `Signature`: 签名结果

#### 2. **加密工具（crypto.ts）**

提供加密原语：
- `generateSalt()`: 生成盐值
- `deriveKey()`: PBKDF2 密钥派生
- `aesEncrypt()/aesDecrypt()`: AES 加密/解密
- `base58Encode()/base58Decode()`: Base58 编码/解码
- `sha256()`: SHA-256 哈希
- `generateAddress()`: 生成钱包地址

#### 3. **密钥管理（keyManager.ts）**

管理客户端私钥：
- `generatePrivateKeyFragment()`: 生成私钥片段
- `savePlaintext()`: 明文存储
- `saveEncrypted()`: 加密存储
- `restore()`: 恢复私钥

#### 4. **MPC 客户端（mpcClient.ts）**

核心业务逻辑：
- `createWallet()`: 创建钱包
- `importWallet()`: 导入钱包
- `signTransaction()`: MPC 签名
- `verifySignature()`: 验证签名

### 服务端模块

#### 1. **配置管理（config/）**

管理服务器配置：
- 服务器端口
- 数据库连接
- 日志级别

#### 2. **类型定义（types/）**

定义 API 数据结构：
- `CreateWalletRequest/Response`
- `SignatureRequest/Response`
- `ErrorResponse`

#### 3. **加密工具（crypto/）**

提供加密功能：
- `GenerateRandomBigInt()`: 生成随机大整数
- `DerivePublicKey()`: 派生公钥
- `AddPublicKeys()`: 公钥点加法
- `GenerateAddress()`: 生成地址

#### 4. **密钥服务（service/key_service.go）**

管理服务端密钥：
- `CreateWallet()`: 创建钱包（生成 sk_node）
- `GetWalletByAddress()`: 查询钱包
- `ListWallets()`: 列出所有钱包

#### 5. **签名服务（service/signature_service.go）**

处理签名请求：
- `ProcessSignatureRequest()`: 处理签名
- `VerifyPartialSignature()`: 验证部分签名

#### 6. **API 处理器（api/）**

HTTP 接口：
- `createWalletHandler()`: 创建钱包接口
- `getWalletInfoHandler()`: 查询钱包接口
- `signatureRequestHandler()`: 签名请求接口

---

## 数据流程

### 创建钱包流程

```
客户端                                    服务端
  │                                        │
  │ 1. 生成 sk_user (随机 256 位)         │
  │    计算 Pk_user = sk_user × G         │
  │                                        │
  │  POST /api/wallet/create               │
  ├───────────────────────────────────────▶│
  │  { pkUser: "hex..." }                  │
  │                                        │ 2. 生成 sk_node (随机 256 位)
  │                                        │    计算 Pk_node = sk_node × G
  │                                        │    计算 Pk_agg = Pk_user + Pk_node
  │                                        │    生成地址 = Hash(Pk_agg)
  │                                        │    保存到数据库
  │                                        │
  │◀───────────────────────────────────────┤
  │  { address, pkNode, pkAgg }            │
  │                                        │
  │ 3. 保存 sk_user 到本地                │
  │    （明文或 AES 加密）                 │
  │                                        │
```

### MPC 签名流程

```
客户端                                    服务端
  │                                        │
  │ 1. 构造交易 tx                         │
  │    计算 h = Hash(tx)                   │
  │    生成 k_user (随机)                  │
  │    计算 R_user = k_user × G            │
  │                                        │
  │  POST /api/signature/request           │
  ├───────────────────────────────────────▶│
  │  { txHash, rUser, address }            │
  │                                        │ 2. 查询钱包获取 sk_node
  │                                        │    生成 k_node (随机)
  │                                        │    计算 R_node = k_node × G
  │                                        │    计算 R = R_user + R_node
  │                                        │    r = R.x
  │                                        │    计算 s_node = (k_node×h + r×sk_node) mod n
  │                                        │
  │◀───────────────────────────────────────┤
  │  { rNode, sNode, r }                   │
  │                                        │
  │ 3. 计算 s_user = (k_user×h + r×sk_user) mod n
  │    聚合 s = (s_user + s_node) mod n    │
  │    最终签名 = (r, s)                   │
  │                                        │
  │ 4. 广播交易到区块链                    │
  │                                        │
```

---

## 安全设计

### 1. 密钥安全

**客户端：**
- ✅ 私钥片段从不离开设备
- ✅ 支持 AES-256 加密存储
- ✅ 使用 PBKDF2 密钥派生（10000 迭代）
- ✅ 随机盐值和 IV 防止彩虹表攻击

**服务端：**
- ✅ 私钥片段存储在安全环境
- ⚠️ 当前使用内存存储（生产环境应使用 HSM）
- ✅ 私钥片段从不通过网络传输

### 2. 通信安全

- ✅ 必须使用 HTTPS/TLS
- ✅ CORS 跨域保护
- ⚠️ 需要添加身份认证（JWT, OAuth2）
- ⚠️ 需要添加请求签名验证

### 3. 随机数安全

- ✅ 使用加密安全的随机数生成器
- ✅ 每次签名生成新的 k_user 和 k_node
- ✅ 防止随机数重用攻击

### 4. 审计与监控

- ⚠️ 需要添加完整的日志审计
- ⚠️ 需要监控异常签名请求
- ⚠️ 需要限速和防 DDoS

---

## 扩展性

### 多节点 MPC（2-of-3, 3-of-5）

当前实现可以扩展为多节点方案：

```
传统 MPC:
sk_agg = sk_user + sk_node

多节点 MPC (2-of-3):
sk_agg = sk_user + sk_node1 + sk_node2
任意 2 方配合即可完成签名

实现方式：
1. 使用 Shamir 秘密共享
2. 门限签名方案 (TSS)
3. 分布式密钥生成 (DKG)
```

### 支持多种曲线

可以扩展支持：
- ✅ Ed25519（当前实现）
- 🔄 secp256k1（比特币、以太坊）
- 🔄 secp256r1（NIST P-256）
- 🔄 BLS12-381（用于聚合签名）

### 多链支持

可以支持多条区块链：
- Bitcoin
- Ethereum
- Solana
- Polkadot
- Cosmos
- ...

只需调整地址生成和交易格式。

---

## 性能优化

### 客户端优化

1. **密钥缓存**：避免重复解密
2. **批量签名**：支持多笔交易批量处理
3. **WebAssembly**：加速密码学运算

### 服务端优化

1. **连接池**：数据库连接复用
2. **缓存层**：Redis 缓存热点数据
3. **负载均衡**：多节点分布式部署
4. **异步处理**：签名请求队列化

---

## 未来路线图

### 短期目标（1-3 个月）

- [ ] 添加完整的单元测试和集成测试
- [ ] 实现 PostgreSQL 持久化存储
- [ ] 添加 JWT 身份认证
- [ ] 实现请求限流和防 DDoS
- [ ] 添加完整的日志和监控

### 中期目标（3-6 个月）

- [ ] 支持 secp256k1 曲线（以太坊兼容）
- [ ] 实现多节点 MPC（2-of-3）
- [ ] 添加零知识证明验证
- [ ] 实现 HSM 硬件安全模块集成
- [ ] 移动端 SDK（iOS/Android）

### 长期目标（6-12 个月）

- [ ] 支持多链（BTC, ETH, SOL 等）
- [ ] 实现社交恢复机制
- [ ] 去中心化的 MPC 节点网络
- [ ] WebAssembly 性能优化
- [ ] 冷钱包硬件集成

---

## 常见问题

**Q: 为什么不直接使用多签钱包？**

A: 多签需要多个独立地址和链上操作，成本高且体验差。MPC 生成单一地址，链上无法区分，体验与普通钱包一致。

**Q: 服务端宕机怎么办？**

A: 需要实现多节点冗余和灾备机制。或者提供"紧急恢复模式"，允许用户通过社交恢复重建私钥。

**Q: 如何防止服务端作恶？**

A: 实现零知识证明，客户端验证服务端确实使用正确的 sk_node 计算签名，而不是随意伪造。

**Q: 支持硬件钱包吗？**

A: 可以！客户端私钥片段可以存储在硬件钱包中，签名时由硬件钱包计算 s_user。

---

## 总结

本 MPC 钱包实现提供了：

✅ **安全性**：无完整私钥，分布式签名  
✅ **兼容性**：标准签名格式，链上无差异  
✅ **可扩展性**：支持多节点、多链、多曲线  
✅ **易用性**：与普通钱包体验一致  

适用于：
- 交易所热钱包
- 企业级资产管理
- DeFi 应用钱包
- Web3 游戏钱包

---

**技术支持**：如有疑问，请联系开发团队。

