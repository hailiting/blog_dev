# Ubuntu 下 EOS 环境的搭建和钱包的使用

```bash
# 下载EOS源码
git clone https://github.com/EOSIO/eos --recursive
# 执行自动编译eos的脚步
cd eos
./eosio_build.sh
  1
# 验证
cd eos/build
make test

# 创建一个默认钱包
cd /home/eos/build/programs/cleos/
./cleos wallet create
# 创建指定名称的钱包
./cleos wallet create -n myWallet
# 查看所有钱包
./cleos wallet list
# 查看创建的钱包目录
cd ~/eosio-wallet/
```
