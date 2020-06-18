# Linux常见错误集
## ``Unable to locate package``
当使用apt-get更新软件包出现这个错误的时候，先更新
``sudo apt-get update``
然后在安装需要的功能
~~~
sudo apt-get install apache2
sudo apt-get install mysql-server mysql-client
sudo apt-get install vim-gtk
~~~
## ``make: *** No rule to make target 'build', needed by 'default'.  Stop.``
我放弃了   直接用yum安装了
出现这个情况是因为linux系统没安装先决条件
1. GCC -- GNU编译器集合
GCC可以使用默认包管理器的仓库（repositories）来安装，包管理器的选择依赖于你使用的Linux发布版本不同，包管理器有不同的实现：yum是基于RedHat的发布版本，apt用于Debian和Ubunttu，yast用于SuSELinux等等。
``yum install gcc``
``apt-get install gcc``
2. PCRE 
pcre 提供编译版本的库
pcre-devel 提供开发阶段的头文件和编译项目的源代码
``yum install pcre pcre-devel``
``apt-get install libpcre3 libpcre3-dev``
3. zlib库
zliB库提供开发人员压缩算法，在Nginx的各种模块中需要使用gzip压缩。
``yum install zlib zlib-devel``
``apt-get install zlib1g zlib1g-dev``
4. OpenSSL库
在Nginx，如果服务器提供安全网页时会用到OpenSSL库
``yum install openssl openssl-devel``
``apt-get install openssl openssl-dev``
## ``nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)``
``yum install iptables-services``
``systemctl mask firewalld.service``
``systemctl enable iptables.service``
``systemctl enable ip6tables.service``
``vim /etc/sysconfig/iptables``
~~~
# sample configuration for iptables service
# you can edit this manually or use system-config-firewall
# please do not ask us to add additional ports/services to this default configuration
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -i lo -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 21 -j ACCEPT #add
-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT  #add
-A INPUT -p tcp -m state --state NEW -m tcp --dport 30000:30999 -j ACCEPT  #add
-A INPUT -j REJECT --reject-with icmp-host-prohibited
-A FORWARD -j REJECT --reject-with icmp-host-prohibited
COMMIT
~~~
``systemctl restart iptables.service``
``systemctl start firewalld``
``firewall-cmd --permanent --add-service=http`` 开启http访问 
``firewall-cmd --permanent --zone=trusted --add-port=80/tcp`` 加入80端口
### 端口被占用
``killall -9 nginx``
``nginx``
``ps aux|grep nginx`` 查看nginx启动情况