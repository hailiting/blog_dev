# Mac 下载与安装

## 下载

`https://www.mongodb.com/try/download`

- `MongoDB Community Server` 社区版 -> 下载这个
- 解压到 `/usr/local`
- 创建数据库及日志文件
- 添加环境变量

## mongodb.conf

`/usr/local/mongodb/bin`

```conf
# 数据库路径
dbpath=/usr/local/mongodb/data
# 日志文件路径
logpath=/usr/local/mongodb/log/mongodb.log
# 表示日志文件末尾追加日志
logappend=true
# 启动端口号
port=27017
# 是否在后台运行
fork=true
# 开启远程验证
auth=true
```

## 启动 mongodb

```sh
mongod -f /usr/local/mongodb/bin/mongodb.conf
```

## 创建用户

```sh
# mongod 登录
> use admin
> db.createUser({user: "myUserAdmin", pwd:"123456", roles: [{role:"userAdminAnyDatabase", db:"admin"},"readWriteAnyDatabase"]})
```

## 报错

**ERROR: child process failed, exited with 48**

```
ps -ef | grep mongod
sudo kill -9 {processid}
```

## 远程验证

```sh
# 关闭防火墙
> systemctl stop firewalld
# 启动mongoDB
> mongod -f ./mongodb.conf
```

## 退出应用

```sh
./mongod
> use admin;
> db.shutdownServer();
> exit
```

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
