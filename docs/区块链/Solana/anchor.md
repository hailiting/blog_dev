# Anchor 开发指南

## 环境准备

### 基础环境检查

```bash
# 检查 Node.js 版本
node -v
npm -v

# 检查 Rust 环境
rustc --version
cargo --version

# 检查 Solana 环境
solana --version
solana-test-validator

# 检查 Anchor 环境
avm --version


cargo uninstall avm && cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

cargo install --git https://github.com/coral-xyz/anchor avm --tag v0.30.1 --locked --force

```

### Anchor 安装与配置

```bash
# 安装 Anchor 版本管理器 (avm)
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

# 安装特定版本的 Anchor
avm install 0.29.0
avm use 0.29.0

# 验证安装
avm --version
anchor --version
```

## Raydium 流动性池开发

### 项目初始化

```bash
# 创建新项目
anchor init raydium-pool
cd raydium-pool
```

### 关键依赖

在 `Cargo.toml` 中添加必要的依赖：

```toml
[dependencies]
anchor-lang = "0.29.0"
anchor-spl = "0.29.0"
solana-program = "1.16.0"
```

### 主要功能模块

1. **流动性池账户结构**

```rust
#[account]
pub struct LiquidityPool {
    pub authority: Pubkey,
    pub token_a_mint: Pubkey,
    pub token_b_mint: Pubkey,
    pub token_a_vault: Pubkey,
    pub token_b_vault: Pubkey,
    pub lp_mint: Pubkey,
    pub fee_account: Pubkey,
    pub nonce: u8,
}
```

2. **核心指令**

```rust
#[program]
pub mod raydium_pool {
    use super::*;

    // 初始化流动性池
    pub fn initialize_pool(
        ctx: Context<InitializePool>,
        nonce: u8,
    ) -> Result<()> {
        // 实现逻辑
    }

    // 添加流动性
    pub fn add_liquidity(
        ctx: Context<AddLiquidity>,
        amount_a: u64,
        amount_b: u64,
    ) -> Result<()> {
        // 实现逻辑
    }

    // 移除流动性
    pub fn remove_liquidity(
        ctx: Context<RemoveLiquidity>,
        lp_amount: u64,
    ) -> Result<()> {
        // 实现逻辑
    }

    // 交换代币
    pub fn swap(
        ctx: Context<Swap>,
        amount_in: u64,
        min_amount_out: u64,
    ) -> Result<()> {
        // 实现逻辑
    }
}
```

### 开发调试

```bash
# 清理测试账本
rm -rf test-ledger

# 启动本地验证节点
solana-test-validator

# 部署合约
anchor deploy

# 运行测试（跳过构建）
anchor test --skip-build
```

## 开发建议

1. **安全性考虑**

   - 始终验证账户权限
   - 检查数值溢出
   - 实现紧急暂停功能
   - 添加访问控制机制

2. **性能优化**

   - 使用 PDA (Program Derived Addresses)
   - 优化存储结构
   - 减少跨程序调用

3. **测试策略**

   - 编写单元测试
   - 进行集成测试
   - 模拟极端情况
   - 测试错误处理

4. **部署检查清单**
   - 代码审计
   - 测试覆盖
   - 权限验证
   - 参数配置
   - 文档完善

## 常见问题解决

1. **构建错误**

   - 检查依赖版本兼容性
   - 验证 Rust 工具链
   - 清理构建缓存

2. **部署问题**

   - 确认账户余额
   - 检查程序大小限制
   - 验证权限设置

3. **测试失败**
   - 检查测试环境配置
   - 验证测试账户状态
   - 检查日志输出
