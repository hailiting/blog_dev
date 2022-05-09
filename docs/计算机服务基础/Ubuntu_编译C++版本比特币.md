# Ubuntu\_编译 C++版本比特币

## 1. 替换软件园

`https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/`

## 2. 下载需要的依赖库

```shell
# 安装编译环境
apt-get -y install build-essentiak libtool autotools-dev automake  autoconf pkg-config

# 安装必备的依赖库
apt-get -y install libssl-dev libboost-all-dev libevent-dev

# 安装钱包依赖库
apt-get -y install libdb-dev libdb++-dev

# 安装其他依赖库
apt-get -y install libminiupnpc-dev  libzmq3-dev

# QT库  GUO依赖库
apt-get install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler libqrencode-dev


# apt-get install gcc
# apt-get install g++
# apt-get install aptitude
# apt-get install zlib1g-dev
```

## 2. 下载 bitCoin 源码

```shell
# 推送的文件会很大，需要最大git的临时缓存区
git config --global http.postBuffer 2000000000

git clone --progress  https://github.com/bitcoin/bitcoin.git
cd bitcoin
```

## 3. 编译源代码

```shell
# 首先，生成编译源码所需要的库配置
./autogen.sh
# 然后，生成makefile文件： (--with-incompatible-bdb为忽略libdb版本差异)
./configure --with-incompatible-bdb --prefix=/data/install/bitcoin
# --without-gui 不编译gui
# --disable-wallet 不编译钱包
./configure --without-gui --disable-wallet
# 用make进行编译
make -j
# 安装编译好的二进制文件
make install
```
