# Ubuntu 下搭建 Beego

## Terminal

### 启用 root 用户

```sh
$ sudo passwd root
# 切换到root用户
$ su root
# 现在下载 vim
$ apt-get install vim
$ rm -rf /var/lib/dpkg/lock # 把啥锁删了
$ cd /usr/share/lightdn/lightdnm.conf.d/
# 打开配置文件
$ gedit 50-unity-greeter.conf &
# 文件中加入如下内容保存
user-session=ubuntu
greeter-session=unity-greeter
greeter-show-manual-login=true
all-guest=false

# 重启，使用root登录

# 如果报错
vi /root/.profile
# 再 mesg n 前加 tty -s &&
if ["$BASH"]: then
  if [ -f ~/.bashrc ]: then
    . ~/.bashrc
  fl
fl
tty -s && mesg n || true

# 查看ip
ip addr

# 安装SSH
sudo apt-get install openssh-server

# 关闭防火墙
ufw disable

# 修改sshconfig
vi /etc/ssh/sshd_config
...
PermitRootLogin yes
...
PasswordAuthentication yes
...

# 重启sshd
$ service sshd restart

接下来用CRT
/Users/hailiting/Library/Application\ Support/VanDyke/SecureCRT

```

ubuntu ip: 192.168.56.101

## 配置 go 的环境

- 方法一：scp 传东西
- 方法二：命令行安装

### 1. 安装 go

```shell
# 通过ssh 链接到Ubuntu
ssh yourname@your_server_ip
cd ~
wget https://golang.google.cn/dl/go1.17.6.linux-amd64.tar.gz
# 使用sha256sum验证tarball，保证hash与下载页面的匹配
sha256sum go1.17.6.linux-amd64
# 使用tar提取tarball
# xvf
  # x 告诉tar去进行解压
  # v 告诉tar我们需要一个详细输出（提取文件的列表）
  # f 告诉tar指定的文件名
tar xvf go1.17.6.linux-amd64
# 递归地将go所有者和组更改为root，并将其移动到 /usr/local
sudo chown -R root:root ./go
sudo mv go /usr/local/
```

### 2. 设置 go 路径

```shell
# 创建go工作目录
mkdir /home/go_work
mkdir /home/go_work/src
mkdir /home/go_work/bin
mkdir /home/go_work/pkg

# 设置go的根植，告诉Go在哪里查找其文件
sudo nano ~/.profile

  export GOROOT=/usr/local/go
  export GOPATH=/home/go_work
  export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
  # export GO111MODULE=on
  GOPROXY
  export GOPROXY=https://goproxy.cn
# 刷新环境
source ~/.profile
```

### 3. 测试您的安装

```shell
go version
# 为go工作区创建一个新的目录，Go将构建其文件

mkdir -p go_work/src/github.com/user/hello

nano ~/work/src/github.com/user/hello/hello.go

  package main
  import "fmt"
  function main(){
    fmt.Printf("Hello world\n")
  }
# 调用go命令编译install
go install github.com /user/hello
# which命令查看安装编译的hello二进制文件位置
which hello
```

## 安装 git

```shell
apt-get install git
```

## 安装 beego

```shell
cd /home/go_work/src/
git clone https://github.com/open-falcon/mymon.git
git clone https://github.com/MXi4oyu/golang.org.git
go get -u -v github.com/astaxie/beego
go get -u -v github.com/beego/bee


go get github.com/astaxie/beego
go get github.com/beego/bee
# 设置代理，首先更改golang的配置
# go env -w GOPROXY=https://goproxy.cn,directgo env -w GO111MODULE=on
```

## 测试 beego 是否安装成功

```shell
cd ~
# 创建一个node项目
bee new myapp
cd myapp
vi conf/app.conf
  ...
  httpaddr=当前容器ip
  # httpaddr= 192.168.56.101
# 启动bee 项目
cd myapp/
go get myapp
bee run
```
