# Solana 创建 Token 指南

## 1. 环境准备和配置

```bash
# 检查 Solana CLI 版本
solana --version
solana-cli 1.18.17 
solana transfer <接收地址> 1 --allow-unfunded-recipient

# 生成一个以 "bos:1" 开头的 Solana 钱包地址
solana-keygen grind --starts-with bos:1
xxx

# 设置默认密钥对
solana config set --keypair

# 设置网络为开发网（devnet）
solana config set --url devnet

# 查看当前配置
solana config get

# 生成另一个以 "mnt:1" 开头的钱包地址
solana-keygen grind --starts-with mnt:1
```

## 2. 创建 Token

```bash
# Token-2022 程序 ID（新一代 Token 标准）
export const TOKEN_2022_PROGRAM_ID = new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');

# 创建新的 Token（使用 Token-2022 标准）
spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb --enable-metadata mntgmdzkAEgTxA7Kq3H6h3BbAQKYDmrAhhXKHVC5SS9.json

# 输出信息：
Address:  mntgmdzkAEgTxA7Kq3H6h3BbAQKYDmrAhhXKHVC5SS9  # Token 地址
Decimals:  9  # Token 小数位数

# 交易签名
Signature: oRqSCceL1P5cDxLbYSNDVqGqv1Rs54rJDn1aZrSk4XnSNw7ztiXkBwLzxQCEwEbqGmPuAQRJdqpnMeRjeFnZZCz
```

## 3. 配置 Token 元数据

### 3.1 创建元数据文件 (metadata.json)
```json
{
    "name": "Example Token",        // Token 名称
    "symbol": "EXMPL",             // Token 符号
    "description": "Example token for Solana Foundation Bootcamp",  // Token 描述
    "image": ""                    // Token 图片 URL（可选）
}
```

### 3.2 初始化 Token 元数据
```bash
# 初始化 Token 元数据
spl-token initialize-metadata mntgmdzkAEgTxA7Kq3H6h3BbAQKYDmrAhhXKHVC5SS9 'Example' 'EXMPL' https://hailiting.github.io/my-static/token1.json
```

## 4. 创建 Token 账户和铸造 Token

```bash
# 创建 Token 账户（用于存储 Token）
spl-token create-account mntgmdzkAEgTxA7Kq3H6h3BbAQKYDmrAhhXKHVC5SS9

# 铸造 1000 个 Token
spl-token mint mntgmdzkAEgTxA7Kq3H6h3BbAQKYDmrAhhXKHVC5SS9 1000


spl-token transfer mntgmdzkAEgTxA7Kq3H6h3BbAQKYDmrAhhXKHVC5SS9 1000 6iNoDCSgcnfuEkwmE6vXhn1UfG3U15eAwnUu1pWib4p5
```

## 补充说明

1. **网络选择**：
   - Devnet：用于开发和测试
   - Mainnet：生产环境
   - Testnet：测试网络

2. **Token 标准**：
   - Token-2022 是 Solana 的新一代 Token 标准
   - 相比旧的 SPL Token 标准，提供了更多功能：
     - 可升级的元数据
     - 转账费用
     - 利息
     - 永久授权
     - 默认账户状态

3. **安全注意事项**：
   - 请妥善保管密钥对文件
   - 不要将私钥分享给他人
   - 建议在测试网络充分测试后再部署到主网

4. **常用命令**：
   - `spl-token balance <TOKEN_ADDRESS>` - 查看 Token 余额
   - `spl-token transfer <TOKEN_ADDRESS> <AMOUNT> <RECIPIENT>` - 转账
   - `spl-token supply <TOKEN_ADDRESS>` - 查看 Token 供应量