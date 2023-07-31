# volta

volta 管理 Node.js 版本和全局软件包。

- `volta init`初始化项目
- `volta install` 安装项目所需要的全局软件包
- `volta run` 运行项目，Volta 会自动检测并使用项目所配置的 Node.js 版本
- `volta list` 查询当前环境依赖及本项目已安装的依赖
- `volta pin` 指定项目依赖
  - `volta pin node@16.20.1`
  - `volta pin yarn@4.0.0-rc.46`

## 与 nvm 相比

- Volta 允许在项目级别安装和管理全局软件包。
  - 它会将全局软件包与项目的`Node.js`版本关联，避免了不同项目之间的冲突
  - Volta 可以自动检测项目 Node.js 版本要求，并在需要时进行版本切换。确保每个项目都使用正确的 nodejs 版本，而无需手动切换版本

## 安装过程

- 卸载 nvm

```sh
# 确认nvm安装位置
echo $NVM_DIR
rm -rf /Users/your_username/.nvm
# 打开 ~/.zshrc 删除 NVM_DIR 命令
source ~/.zshrc
nvm --version # 没找到就说明卸载成功了
```

- 安装 volta

```sh
brew install volta
volta --version
```
