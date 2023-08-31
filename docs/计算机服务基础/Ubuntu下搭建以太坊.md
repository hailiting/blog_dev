# Ubuntu 下搭建以太坊私有链

**Ubuntu18.04**

```bash
# 安装git
add-apt-repository ppa:git-core/ppa
apt-get update
apt-get install git

apt-get -y install curl
# 安装node
wget https://nodejs.org/dist/v16.7.0/node-v16.7.0-linux-x64.tar.xz
tar -xvf node-v16.7.0-linux-x64.tar.xz
mv node-v16.7.0-linux-x64 /usr/local/node
# ## 创建node软链接
# cd /usr/bin/
# sudo ln -s /usr/local/node/bin/node  node
# sudo ln -s /usr/local/node/bin/npm  npm
# 直接配置Ubuntu nodejs环境变量
vi ~/.profile
  export NODE_HOME=/usr/local/node
  export NODE_PATH=$NOED_HOME/lib/node_modules
  export PATH=$PATH:$NODE_HOME/bin

sudo ln -s  /usr/local/node/lib/node_modules/n/bin/n n

# 安装gath  以太坊环境
apt-get install software-properties-common
add-apt-repository -y ppa:ethereum/ethereum
add-apt-repository -y ppa:ethereum/ethereum-dev
apt-get update
apt-get install ethereum
geth help  # 查看是否安装成功
geth version

# 安装 solc - solidity 编译环境
add-apt-repository -y ppa:ethereum/ethereum
apt-get update
apt-get -y install solc
apt-get -y install npm
# 设置淘宝源
# npm config set registry https://registry.npm.taobao.org
# npm install -g truffle # 快速的编译部署合约 新版本不允许全局了   只能 npx truffle
# npm install -g ethereumjs-testrpc  # 快速生成以太坊账号
```
