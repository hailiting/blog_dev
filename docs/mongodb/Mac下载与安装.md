# Mac 下载与安装

## Mac OSX

```shell
brew install mongodb
# 支持 TLS/SSL
sudo brew install mongodb --with-openssl
# 安装最新开发版本
sudo brew install mongodb --devel
```

- 查看版本

```shell
> mongod --version
db version v4.2.8
git version: 43d25964249164d76d5e04dd6cf38f6111e21f5f
allocator: system
modules: none
build environment:
    distarch: x86_64
    target_arch: x86_64
```

- 查看文档

```shell
mongod --help
```

- 新建文档

```shell
sudo mkdir -p /data/db
```

- 如果 mongod 启动出错，试试`sudo mongod`
  查看服务是否启动 `localhost:27017`

```shell
sudo mongod
# 如果没有创建全局路径 PATH，需要接入以下目录
cd /usr/local/mongodb/bin
./mongo
# 另起服务
sudo mongo
> exit; # 退出
```
