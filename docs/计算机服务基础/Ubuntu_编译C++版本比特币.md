# Ubuntu\_编译 C++版本比特币

**未成功，原因在于 git bitcoin 版本 及内存不够**
**Ubuntu version 18.04**

## 1. 替换软件园

清华大学开源软件镜像
`https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/`

```bash
# 1、备份软件源配置文件
cd /etc/apt/
cp /etc/apt/sources.list /etc/apt/sources.list.back

# 2、修改sources.list，将文件中的内容清空，替换为 https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/
# 镜像地址 https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/
vi /etc/apt/sources.list
    # 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
    deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
    # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
    deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
    # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
    deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
    # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
    deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
    # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse

    # 预发布软件源，不建议启用
    # deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
    # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
# 3、更新软件源
apt-get update
```

## 2. 下载需要的依赖库

```bash
# 安装所有需要的依赖包如下
apt-get -y install make gcc g++ libdb-dev libdb++-dev aptitude
aptitude install libboost-all-dev
apt-get -y install zlib1g-dev libssl-dev build-essential libminiupnpc-dev autoconf libevent-dev libtool

# 安装QT库如下
apt-get -y  install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler
apt-get -y  install libqrencode-dev
apt -y  install qt4*
```

<!--
```bash
# 安装编译环境
apt-get -y install gsettings-desktop-schemas
apt-get -y install build-essential libtool autotools-dev automake  autoconf pkg-config

# 安装必备的依赖库
apt-get -y install libssl-dev libboost-all-dev libevent-dev

# 安装钱包依赖库
apt-get -y install libdb-dev libdb++-dev

# 安装其他依赖库
apt-get -y install libminiupnpc-dev  libzmq3-dev

# QT库  GUO依赖库
apt-get -y install libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler libqrencode-dev

sudo add-apt-repository ppa:rock-core/qt4

apt-get -y install gcc g++  aptitude  zlib1g-dev


apt -y install libevent-dev libzmq5-dev doxygen libboost1.58-all-dev
``` -->

## 2. 下载 bitCoin 源码

```bash
# # 推送的文件会很大，需要最大git的临时缓存区
# git config --global http.postBuffer 2000000000
# 一般习惯在home下
cd /home/
git clone --progress  https://github.com/bitcoin/bitcoin.git
cd bitcoin
```

## 3. 编译源代码

```bash
# 在bitcoin目录下，创建db4目录，存放Berkeley DB 4.8
mkdir /home/bitcoin/db4

# 下载db tar 包
cd db4
wget http://download.oracle.com/berkeley-db/db-4.8.30.NC.tar.gz
tar -zxvf db-4.8.30.NC.tar.gz
rm -rf db-4.8.30.NC.tar.gz
cd /home/bitcoin/db4/db-4.8.30.NC/build_unix/
../dist/configure --enable-cxx -disable-shared --with-pic --prefix=/home/bitcoin/db4/
# 编译
make
make install

cd /home/bitcoin/

# 首先，生成编译源码所需要的库配置, 执行校验
./autogen.sh
# 编译安装比特币
# 这出现了问题，原因在于git bitcoin 版本 及内存不够
./configure LDFLAGS="-L/home/bitcoin/db4/lib/" CPPFLAGS="-I/home/bitcoin/db4/include" --with-incompatible-bdb --with-gui=qt4
# # 然后，生成makefile文件： (--with-incompatible-bdb为忽略libdb版本差异)
# ./configure --with-incompatible-bdb --prefix=/data/install/bitcoin
# # --without-gui 不编译gui
# # --disable-wallet 不编译钱包
# ./configure --without-gui --disable-wallet
# 用make进行编译
make -j
# 安装编译好的二进制文件
make install
```
