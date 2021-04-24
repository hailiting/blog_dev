# 用 Geth 搭建以太坊私链

## 安装 Geth

安装 Geth 有很多方式，这里主要就 Linux 环境给出两种：系统包管理（apt-get）安装和源码安装。更推荐大家源码安装，在整个过程，可以看到 Geth 各组件的构建步骤

### 安装前需要的环境

#### git

```shell
$ # sudo add-apt-repository ppa:git-core/ppa
$ sudo apt-get update
$ sudo apt-get install git
$ git --version
$ git config --global user.name "hailiting"
$ git config --global user.email "hailiting@yeah.net"
$ git config --list #  查看配置
$ ssh-keygen -trsa -C "hailiting@yeah.net" # 生成 .ssh


$ git log    # 查看当前git节点的log
$ git tag   # 获取当前git的tag
$ git checkout v1.10.2   # 切换到选定版本
```

#### make

```shell
$ sudo apt-get install make
```

#### vim

```shell
$ sudo apt-get install make
```

#### go

```sh
$ wget -c https://dl.google.com/go/go1.14.2.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
$ cat ~/.profile  # 查看用户环境变量地址
$ vim /home/hailiting/.profile

# .profile
export PATH=$PATH:/usr/local/go/bin
# :wq
$ source ~/.profile
```

### 方法一

```shell
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository -y ppa:ethereum/ethereum
$ sudo apt-get update
$ sudo apt-get install ethereum
```

### 方法二

#### 1. 克隆 github 仓库

```shell
$ git clone https://github.com/ethereum/go-ethereum.git
```

#### 2.

```shell
$ cd go-ethereum
$ make geth
# linux err 2 系统会出错
$ vim env.sh
# est + :set ff  查看文件格式
# 文件格式是doc   :fileformat=dos
# dos 在Linux下执行是有问题的
# 修复
esc + :set ff=unix
:wq
$ make geth

$ ./build/bin/geth version # 查看当前版本
```

**通过`geth version`查看是否安装成功**

## 启动节点同步

`--datadir ./data` 数据的存储目录指定到 data 文件夹  
安装好 Geth，现在可以尝试运行一下它，执行下面命令，geth 就会同步区块，并存储在当前目录下。这里的`--syncmode fast`参数表示我们会以"快速"模式同步区块。在这种模式下，我们只会下载每个区块头和区块体，但不会执行验证所有交易，直到所有区块同步完毕再去获取一个系统的当前状态。这样就节省了很多交易验证的时间。

```shell
$ geth --datadir . --syncmode full | fast | light
```

通常，在同步以太坊区块链时，客户端会一开始就下载并验证每个块和每个交易，也就是说从创世区块开始。毫无疑问，如果不加`--syncmode fast`参数，同步将花费很长时间并具有很高的资源要求（更多的 RAM，如果你没有快速存储，则需要更长时间）  
如果我们想同步测试网络的区块，可以用下面命令

```shell
$ geth --testnet --datadir .--syncmode fast
```

`--testnet`这个参数会告诉 geth 启动并连接到最新的测试网络，也就是`Ropsten`。测试网络的区块和交易数量明显少于主网，所以会更快一些，但即使用快速模式同步测试网络，也需要几个小时时间。

## 搭建自己的私有链

因为公共网络区块数量太多，同步耗时太长，我们为了方便快速了解`Geth`，可以试着用它来搭建一个只属于自己的私链。  
首先，我们需要创建网络的`创世`(genesis)状态，这写在一个小小的 JSON 文件里（例如我们将其命名为`genesis.json`）

```json
// chainId
// 主网的chainId 是 1
// 测试的chainId 是 3

// difficulty  难度测试
// gasLimit 整个区块最多有多少gas
// alloc
//  地址  balance   表示在创世纪的时候  这些地址有这些balance   balance单位是wei
{
  "config": {
    "chainId": 15
  },
  "difficulty": "2000",
  "gasLimit": "2100000",
  "alloc": {
    "0xf1DE2d4c9DA3201B82402b4c3cD06E7E128A1430": { "balance": "300000" }
  }
}
```

要创建一条以它作为创世块的区块链，我们可以使用下面命令：

```shell
$ geth --datadir ./myChain/ init genesis.json
```

在当前目录下运行 geth，就会启动这条私链，注意要将 networked 设置为与创世块配置里 chinaId 一直。

```shell
$ geth --datadir ./myChain/ --networkid 15
```

查看是否正常启动，如果正常启动，说明已经成功启动一条自己的私链了
