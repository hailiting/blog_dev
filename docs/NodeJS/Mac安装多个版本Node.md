# Mac 安装多个版本 Node

## 打开终端，输入以下脚本，回车执行，安装 nvm

```js
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

### 如果出现 443

github 的一些域名的 DNS 解析被污染了，导致 DNS 解析过程无法通过域名取得正确的 IP 地址

- 1. 打开https://www.ipaddress.com/ 输入访问不了的域名，获取 DNS 域名 IP 地址
- 2. 下载 switchhosts https://switchhosts.vercel.app/
- 3. 根据查出的结果替换`199.232.68.133 raw.githubusercontent.com`

```bash
199.232.68.133 raw.githubusercontent.com
199.232.68.133 user-images.githubusercontent.com
199.232.68.133 avatars2.githubusercontent.com
199.232.68.133 avatars1.githubusercontent.com
```

## 配置 nvm 环境变量，终端键入`command -v nvm`回车， 如果输出`nvm`，代表已经安装成功

```js
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```

## 检查已经安装的 node 版本列表

```js
nvm list
// install uninstall  use
// nvm ls-remote
```

## 安装指定版本 node

```js
nvm install v14.17.1
```

## 切换 node 版本

```js
nvm use 12.9.1
```

## 安装稳定版 node

```js
nvm install stable
```

## 默认版本

```js
nvm alias default v13.14.0
```
