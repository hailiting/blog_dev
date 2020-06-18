# Mac搭建虚拟CentOS服务器环境
## 安装CentOS
### 1 VirtualBox和CentOS下载地址
VirtualBox[https://www.virtualbox.org/wiki/Downloads]
CentOS[https://www.centos.org/download/]

##### CentOS三种镜像文件的区别：
* DVDISO: 标准安装版，一般这个就可以
* EverythingISO: 对完整版安装盘的软件进行补偿，集成所有软件。（包含CentOS7的一套完整的软件包，可以用来安装系统或填充本地镜像）
* MinimalISO: 迷你版，小巧、安装快速、自带的软件少（适合学习）

### 2 VirtualBox比较好安装，一路继续就可
#### 2.1 若要修改虚拟硬盘
菜单栏【控制】->【设置】
找到【储存】->【控制器IDE】 新增
可以把现有的不用的删了。
### 3 centos
tips: 在配置资源的时候，最好多给一点「10G」左右，要不然会出现``FATAL: iscsiroot requested but kernel/initrd does not suport iscs``错误。
### 4 centos连网
 4.1 VirtualBox当前虚拟机下 【设置】【网络】【连接方式：桥接网卡】
 4.2 查看本机的ip【我是mac ifconfig】【window ipconfig/all】
 4.3 修改虚拟机的网络配置 ``vi /etc/sysconfig/network-scripts/ifcfg-enp0s3``
 ~~~
 ONBOOT=yes
 DNS1="192.168.12.11"
 ~~~
 4.4 ``nmcli c reload`` 【重启网卡的方法】
 4.5 ``ping baidu.com``
### 5 客户端和服务器互ping
 5.1 永久关闭centos防火墙
  ``systemctl disable firewalld service``
 5.2 查看服务器ip地址
  ``ip address show``
  enpxxx inet 192.168.2.171/24
### 6 客户端 ``ssh root@ip``
### 7 查看centos当前版本
~~~
cat /etc/redhat-release
->
CentOS Linux release 8.2.2004(Core)
~~~
## CentOS环境配置
### yum
~~~
#添加几个源，不然会报错
#php高版本的yum源地址，有两部分，其中一部分是epel-release，另外一部分来自webtatic。如果跳过epel-release的话，安装webtatic的时候
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
rpm -Uvh http://rpms.remirepo.net/enterprise/remi-release-8.rpm
#更新源
dnf -y install dnf-utils
// 这时候 yum已经有了
~~~
#### 安装mysql数据库
~~~
yum install mariadb-server mariadb 
~~~
#### mariadb数据库的相关命令是：
~~~
systemctl start mariadb  #启动MariaDB
mysql -u root -p【默认p是空】
~~~
##### 一些基础设置
1，初始化密码
  1.1
    * 以root身份在终端登录（必须）
    * 输入 mysqladmin -u root -p password ex
    * 回车后出现EnterPassword
    * 输入就是密码，如果没有，就直接回车
  1.2
  ~~~
  mysql> set password for "root"@"localhost"=password("123456");
  ~~~
2，远程连接设置
把所有数据库的所有表的所有权限赋值给位于所有IP地址的root用户
~~~
mysql> grant all privileges on *.* to root@'%'identified by '123456';
~~~
如果是新用户，而不是root，则要先新建用户
~~~
mysql> create user 'username'@'%' identified by 'password';
~~~
此时就可以进行远程连接了

BOOTPROTO=dhcp
#### nodejs
~~~
// yum -y 不用问是否安装  直接yes
yum -y install nodejs
~~~
#### nginx
~~~
yum install nginx
nginx
# killall -9 nginx 杀掉端口号
# 如果客户端不能访问服务器的Ip，多半是服务器的防火墙没关 systemctl stop firewalld
~~~

## 常用命令
### 登录远程服务器Linux
* windows 【官网下】
  - putty
  - Xshell
  - Cmder[cmder.net] 【Download Full】「ssh root@192.189.9.12【ip或网址-网址不需要http】」
  ‘#’ 权限大 ‘$’权限不大
* ssh 命令 
### 行编辑器
vi/vim
~~~
i
esc
:wq
q! 【不保存，强制退出】
vi + /ass enter【光标会落在ass上】
exit 退出服务器
~~~
### 服务管理命令 systemctl
防火墙 firewalld
~~~
systemctl stop mariadb  #停止MariaDB
systemctl restart mariadb  #重启MariaDB
systemctl enable mariadb  #设置开机启动
systemctl disable mariadb #禁止自动启动
~~~
### 网络管理命令 ifconfig、ip命令、router
1. 查看服务器ip地址
  ``ip address show``
### 命令行下载命令curl、wget【yum 包管理】

