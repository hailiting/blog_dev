# Ubuntu 下安装 btcd

GitHub 地址 `https://github.com/btcsuite/btcd`

- 1. 安装 go (Go 1.16 or new)

```bash
go version
 go version go1.17.6 linux/amd64
```

- 2. 下载 go 的包管理工具

```bash
git clone https://github.com/btcsuite/btcd $GOPATH/src/github.com/btcsuite/btcd
cd $GOPATH/src/github.com/btcsuite/btcd
GO111MODULE=on go install -v . ./cmd/...

```

- 3. 更新

```bash
$ cd $GOPATH/src/github.com/btcsuite/btcd
$ git pull
$ GO111MODULE=on go install -v . ./cmd/...
```

- 5. 进入`$GOPATH/bin/`输入 `./btcd`运行 btcd

```bash
# cd $GOPATH/bin/
# ./btcd
btcd --version
```
