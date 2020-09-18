# Mac 搭建虚拟 CentOS 服务器环境

## 安装 CentOS

### 1 VirtualBox 和 CentOS 下载地址

[VirtualBox](https://www.virtualbox.org/wiki/Downloads)
[CentOS](https://www.centos.org/download/)

##### CentOS 三种镜像文件的区别：

- DVDISO: 标准安装版，一般这个就可以
- EverythingISO: 对完整版安装盘的软件进行补偿，集成所有软件。（包含 CentOS7 的一套完整的软件包，可以用来安装系统或填充本地镜像）
- MinimalISO: 迷你版，小巧、安装快速、自带的软件少（适合学习）

### 2 VirtualBox 比较好安装，一路继续就可

#### 2.1 若要修改虚拟硬盘

菜单栏【控制】->【设置】
找到【储存】->【控制器 IDE】 新增
可以把现有的不用的删了。

### 3 centos

tips: 在配置资源的时候，最好多给一点「10G」左右，要不然会出现`FATAL: iscsiroot requested but kernel/initrd does not suport iscs`错误。

### 4 centos 连网

4.1 VirtualBox 当前虚拟机下 【设置】【网络】【连接方式：桥接网卡】
4.2 查看本机的 ip【我是 mac ifconfig】【window ipconfig/all】
4.3 修改虚拟机的网络配置 `vi /etc/sysconfig/network-scripts/ifcfg-enp0s3`

```
ONBOOT=yes
DNS1="192.168.12.11"
```

4.4 `nmcli c reload` 【重启网卡的方法】
4.5 `ping baidu.com`

### 5 客户端和服务器互 ping

5.1 永久关闭 centos 防火墙
`systemctl disable firewalld service`
5.2 查看服务器 ip 地址
`ip address show`
enpxxx inet 192.168.2.171/24

### 6 客户端 `ssh root@ip`

### 7 查看 centos 当前版本

```
cat /etc/redhat-release
->
CentOS Linux release 8.2.2004(Core)
```

## CentOS 环境配置

### yum

```
#添加几个源，不然会报错
#php高版本的yum源地址，有两部分，其中一部分是epel-release，另外一部分来自webtatic。如果跳过epel-release的话，安装webtatic的时候
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
rpm -Uvh http://rpms.remirepo.net/enterprise/remi-release-8.rpm
#更新源
dnf -y install dnf-utils
// 这时候 yum已经有了
```

#### 安装 mysql 数据库

```
yum install mariadb-server mariadb
```

#### mariadb 数据库的相关命令是：

```
systemctl start mariadb  #启动MariaDB
mysql -u root -p【默认p是空】
```

##### 一些基础设置

1，初始化密码
1.1
_ 以 root 身份在终端登录（必须）
_ 输入 mysqladmin -u root -p password ex
_ 回车后出现 EnterPassword
_ 输入就是密码，如果没有，就直接回车
1.2

```
mysql> set password for "root"@"localhost"=password("123456");
```

2，远程连接设置
把所有数据库的所有表的所有权限赋值给位于所有 IP 地址的 root 用户

```
mysql> grant all privileges on *.* to root@'%'identified by '123456';
```

如果是新用户，而不是 root，则要先新建用户

```
mysql> create user 'username'@'%' identified by 'password';
```

此时就可以进行远程连接了

BOOTPROTO=dhcp

#### nodejs

```
// yum -y 不用问是否安装  直接yes
yum -y install nodejs
```

#### nginx

```
yum install nginx
nginx
# killall -9 nginx 杀掉端口号
# 如果客户端不能访问服务器的Ip，多半是服务器的防火墙没关 systemctl stop firewalld
/usr/share/nginx/html 资源加载地址
/etc/nginx/nginx.conf 配置地址
```

## 常用命令

### 登录远程服务器 Linux

- windows 【官网下】
  - putty
  - Xshell
  - Cmder[cmder.net] 【Download Full】「ssh root@192.189.9.12【ip 或网址-网址不需要 http】」
    ‘#’ 权限大 ‘\$’权限不大
- ssh 命令

### 行编辑器

vi/vim

```
i
esc
:wq
q! 【不保存，强制退出】
vi + /ass enter【光标会落在ass上】
exit 退出服务器
```

### 服务管理命令 systemctl

防火墙 firewalld

```
systemctl stop mariadb  #停止MariaDB
systemctl restart mariadb  #重启MariaDB
systemctl enable mariadb  #设置开机启动
systemctl disable mariadb #禁止自动启动
```

### 网络管理命令 ifconfig、ip 命令、router

1. 查看服务器 ip 地址
   `ip address show`

### 命令行下载命令 curl、wget【yum 包管理】

### 帮助文档

```
man systemctl | 你想了解的命令
键盘Q 为退出   空格为下一页
```

### Ctrl+s 挂起 【 不想挂起 Ctrl+P 】

### Linux 免密登录 【自动化测试需要】

#### 配置免密登录步骤

[参考](https://blog.csdn.net/axing2015/article/details/83754785)

##### mac 打开|关闭远程远程登录

```
# 开
sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist
# 关
sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist
# 查看状态 【如果没开则什么也没打印】
sudo launchctl list | grep ssh
```

##### Linux 上启动 ssh 服务

```
# 查看状态
systemctl status sshd
# 打开
systemctl start sshd
# 关闭
systemctl stop sshd
```

##### serverA 免密登录 serverB 流程

1. 在 serverA 上生成一对密钥

- ssh-keygen ssh-keygen -t rsa -C "你自己的名称" -f "你自己的名称\_rsa"【可直接 ssh-keygen】

2. 将公钥拷贝到 serverB, 并重命名为 authorized_keys

- scp ~/.ssh/xx_rsa.pub user@ip[name]:~/.ssh/ 【serverA】
- cat ~/.ssh/xx_rsa.pub >> ~/.ssh/authorized_keys 【serverB】
- chmod 700 ~/.ssh/ 【all】
- chmod 600 ~/.ssh/authorized_keys 【all】

3. serverA 向 serverB 发送一个连接请求，信息包括用户名、ip

- ssh root@ip[name]

4. serverB 接收到请求，会从 authorized_keys 中查找是否有相同的用户名、IP，如果有 ServerB 会随机生成一个字符串，然后使用公钥进行加密，在发送给 ServerA
5. serverA 接收到 serverB 发来的信息后，会使用私钥进行解密，然后将解密后的字符串发送给 serverB
6. serverB 接收到 serverA 发来的信息后，会给先前生成的字符串进行对比，如果一致，就可以免密登录了。

tip: 本地电脑可以做多个免密配置

serverA: 192.168.2.151 mac

serverB: 192.168.2.171 centos

1. 生成密钥对

- ssh-keygen -t rsa -C "你自己的名称" -f "你自己的名称\_rsa"

2. 上传配置公钥

- 上传公钥到服务器对应账号的 home 路劲下的.ssh/中
  - ssh-copy-id -i "公钥文件名" 用户名@服务器 ip 或域名
  - 配置公钥文件访问权限为 600

3. 配置本地私钥

- 把第一步生成的私钥复制到你的 home 目录下的.ssh/路径下
- 配置你的私钥文件访问权限为 600
- chmod 600 你的私钥文件名

4. 免密登录功能的本地配置文件

- 编辑自己 home 目录的.ssh/路径下的 config 文件
- 配置 config 文件的访问权限为 644

scp 【两个电脑之间复制】
scp ./name root@xxxx:/home/zhangsan
scp -r ./目录明 root@xxxx:/home/zhangsan
