# Ubuntu 下搭建 Beego

## Terminal

root 用户的登录密码

```sh
$ sudo passwd reset
# 切换到root用户
$ su root
# 现在vim
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

# 再 mesg n 前加 tty -s &&
# vi /root/.profile
if ["$BASH"]: then
  if [ -f ~/.bashrc ]: then
    . ~/.bashrc
  fl
fl

tty -s && mesg n || true

$ reboot # 重启
# 安装SSH
$ sudo apt-get install openssh-server
# 关闭防火墙
$ ufw disable
$ vi /etc/ssh/sshd_config
...
PermitRootLogin yes
...
PasswordAuthentication yes
...

# 重启sshd
$ service sshd restart
```
