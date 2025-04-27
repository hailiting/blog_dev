# Solana 开发环境配置指南

## 安装 Solana CLI

### 添加 Solana 插件到 asdf

asdf plugin add solana git@github.com:suicide/asdf-solana.git

### 列出所有可用的 Solana 版本

asdf list all solana

```sh
# Solana 安装脚本说明 (~/.asdf/plugins/solana/bin/install)
set -euo pipefail

current_script_path=${BASH_SOURCE[0]}
plugin_dir=$(dirname "$(dirname "$current_script_path")")

# 导入工具函数
# shellcheck source=./lib/utils.bash
source "${plugin_dir}/lib/utils.bash"

version="$ASDF_INSTALL_VERSION"
# 设置下载链接，指向 macOS x86_64 架构的 Solana 发布版本
download_url="https://github.com/anza-xyz/agave/releases/download/v${version}/solana-release-x86_64-apple-darwin.tar.bz2"

# 下载并解压 macOS 版本
mkdir -p "$ASDF_INSTALL_PATH"
curl -L "$download_url" | tar -xj -C "$ASDF_INSTALL_PATH" --strip-components=1
```

### 手动安装特定版本的 Solana (2.2.2)

ASDF_INSTALL_TYPE=version ASDF_INSTALL_VERSION=2.2.2 ASDF_INSTALL_PATH="$HOME/.asdf/installs/solana/2.2.2" ~/.asdf/plugins/solana/bin/install

<!-- asdf install solana 2.2.2 -->

## 安装 Rust 开发环境

```sh
# 添加 Rust 插件到 asdf
asdf plugin add rust https://github.com/code-lever/asdf-rust.git
# 列出所有可用的 Rust 版本
asdf list all rust
# 安装最新版本的 Rust
asdf install rust latest
# 设置默认的 Rust 工具链为 stable
rustup default stable

# 安装 SPL Token CLI 工具
cargo install spl-token-cli

# 生成新的 Solana 密钥对（如果已存在会强制覆盖）
solana-keygen new --force   # ~/.config/solana/id.json

# 钱包文件将保存在 ~/.config/solana/id.json
solana-keygen recover -o ~/.config/solana/id.json

# 将恢复的密钥写入 temp 文件
solana-keygen recover 'prompt://?key=0/0' --outfile temp

# 设置默认密钥为 temp 文件
solana config set --keypair temp
# Config File: /Users/hailiting/.config/solana/cli/config.yml
# RPC URL: https://api.mainnet-beta.solana.com
# WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
# Keypair Path: temp
# Commitment: confirmed

solana-keygen pubkey
solana balance --url devnet

solana airdrop 2 6iNoDCSgcnfuEkwmE6vXhn1UfG3U15eAwnUu1pWib4p5 --url devnet
```

创建一个 Token

```sh
# 创建Token
spl-token create-token --url devnet

# Token address: xxx

spl-token create-account xxx --url devnet
# Creating account

spl-token balance TokenAddressxxx --url devnet
spl-token mint TokenAddressxxx 1000 --url devnet
spl-token supply TokenAddressxxx --url devnet

spl-token authorize TokenAddressxxx  mint --disable --url devnet
spl-token burn addressxx amountxx --url devnet
```

## 转账

```sh
spl-token transfer TokenAddressxxx 120 receiverAddressxxx --url devnet --allow-unfunded-recipient --fund-recipient
```
