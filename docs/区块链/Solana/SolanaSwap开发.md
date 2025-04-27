# SolanaSwap 开发

## 1. 项目初始化

```bash
# 使用 Anchor 框架初始化项目
anchor init swap --template=multiple
```

## 2. 开发环境配置

### 2.1 依赖安装

```bash
# 安装 Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"

# 卸载 AVM（如果需要）
cargo uninstall avm
rm -rf ~/.avm

# 安装 AVM
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest

# 验证安装
anchor --version
```

### 2.2 环境变量设置

```bash
# 设置 Solana 网络
solana config set --url devnet

# 设置钱包
solana config set --keypair ~/.config/solana/id.json
```

## 3. 常见问题解决

### 3.1 构建错误处理

- `anchor build` 报错：
  - lock file version 4 requires `-Znext-lockfile-bump`
    - 解决方案：将 lock 文件 version 改为 `version = 3`
  - 清理缓存方法：
    ```bash
    rm -rf ~/.cache/solana/*
    ```

### 3.2 Rust 工具链问题

- 全局 Rust 工具链冲突：
  - PATH 或 RUSTUP_TOOLCHAIN 优先指向 Solana 自带的 Rust 工具链
  - 旧版 Solana 工具链残留文件干扰
  - num-traits 依赖的 autocfg 与当前 Rust 版本不匹配

解决方案：

```bash
# 清理旧版 Solana 工具链
sudo rm -rf /usr/local/bin/solana*

# 更新依赖
cargo update -p proc-macro2 --precise 1.0.94
cargo update -p anchor-spl

# 构建项目
cargo build-sbf -v
ANCHOR_LOG=true anchor idl build
anchor build --no-idl
```

### 3.3 代码修正

- `let source_path = proc_macro2::Span::call_site().source_file().path();`
  - 修正为：`let source_path = proc_macro2::Span::call_site().file();`
- TokenAccount 相关错误：
  - 在 Cargo.toml 中添加：`idl-build = ["anchor-lang/idl-build", "anchor-spl/idl-build"]`

## 4. 部署流程

### 4.1 Anchor 部署

```bash
# 使用 Anchor 部署到 devnet
anchor deploy --skip-build \
  --provider.cluster devnet \
  --provider.interval 2000 \  # 请求间隔（毫秒）
  --provider.attempts 10
```

### 4.2 Solana CLI 部署

```bash
# 在 src/lib.rs 中修改 declare_id! 的值
declare_id!("$(solana-keygen pubkey target/deploy/swap1-keypair.json)");

# 步骤2：同步 Anchor 配置
anchor keys sync

# 清理旧缓存
rm -rf target/ Cargo.lock

# 重新构建程序（强制生成新密钥对）
anchor build --verifiable
solana program deploy \
  --program-id $(solana-keygen pubkey target/deploy/swap1-keypair.json) \
  --skip-fee-check \
  target/deploy/swap1.so

solana program close # 关闭旧程序的重要性
# 生成密钥
solana-keygen grind --starts-with 5Pfr:1
# 获取公钥
solana-keygen pubkey target/deploy/swap1-keypair.json

# 直接部署程序
solana program deploy --skip-fee-check target/deploy/swap1.so
solana program deploy ./target/deploy/hello_world.so --url https://api.devnet.solana.com
# 指定程序 ID 部署
solana program deploy --skip-fee-check target/deploy/swap1.so --program-id target/deploy/swap1-keypair.json
solana program deploy --skip-fee-check target/deploy/swap1.so \
  --program-id target/deploy/swap1-keypair.json \
  -u devnet


solana program close 4yUydfdNuLWFx8coau7pdUmWTbM2DDidot6mM23NMGTa
```

## 5. 测试和验证

### 5.1 本地测试

```bash
# 运行测试
anchor test

# 指定测试文件
anchor test tests/swap.ts
```

### 5.2 验证部署

```bash
# 检查程序状态
solana program show <PROGRAM_ID>

# 查看账户信息
solana account <ACCOUNT_ADDRESS>
```
