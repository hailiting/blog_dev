# MySQL Mac 系统安装设置及卸载

- [MySQL](http://dev.mysql.com/downloads/mysql/)
- [workbench](http://dev.mysql.com/downloads/workbench/)官方管理 MySQL 图形 app
  tips: MySQL 不能用简单的密码，而是 8 位以上密友复杂度

## brew 下载及安装过程

```sh
brew install mysql
mysql.server start
mysql_secure_installation

# 给mysql权限
sudo chmod -R 777 /usr/local/Cellar/mysql

sudo chmod g+w ./assets/
```

## 修改密码

- 首先关闭 MySQL
- 进入终端，获取管理员权限

```sh
cd /usr/local/mysql/bin/
sudo su
# 禁止mysql验证功能
./mysqld_safe --skip-grant-tables=1 &
# 用workbench随便创建连接，然后用 已存在的用户名(root) 创建一个连接
./mysqladmin -u root -p password 123456hai // 更改root用户密码
```

### 方法一：使用 alter 修改

修改数据库名或修改数据表字段

```js
# 修改用户口令，将用户口令修改为新密码
mysql> ALTER USER role_name IDENTIFIED BY password REPLACE pre_password;
```

### 方法二：使用 set password

```sh
mysql> SET PASSWORD FOR "root"@"localhost"=PASSWORD("123456hai");
mysql> flush privileges;
```

### 方法三：update

```sh
mysql> UPDATE mysql.user SET authentication_string =PASSWORD("Marry583");
mysql> flush privileges;
```

### 方法四：mysql_secure_installation

```sh
root# mysql_secure_installation
```

### 方法五：skip-grant-tables

```sh
cd /usr/local/mysql/bin/
sudo su
# 禁止mysql验证功能
[root]: mysql
[root]: vim /etc/my.cnf  # 使用完后去掉
skip-grant-tables=1

[root]: systemctl  restart mysql
[root]: mysql
mysql> set password = PASSWORD("11111");
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'Tom579#$%^&';
mysql> flush privileges;
```

## 修改密码规则

```js
use mysql;
show tables;
select user, host from user;
SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;
# 查看规则
SHOW VARIABLES LIKE 'validate_password%';
alter user 'root'@'%' identified with mysql_native_password by '123456hai';

#设置密码强弱等级
set global validate_password.policy=0;
#设置密码长度
set global validate_password.length=6;
#设置密码检查开关
set global validate_password.check_user_name=OFF;
#设置密码包含数字个数
set global validate_password.number_count=0;
#设置密码特殊字符个数
set global validate_password.special_char_count=0;

ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
#刷新
FLUSH PRIVILEGES;
```

```js
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456' PASSWORD EXPIRE NEVER; #修改加密规则 

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; #更新一下用户的密码 

FLUSH PRIVILEGES; #刷新权限

alter user 'root'@'localhost' identified by 'xzx123456';#重置密码，xzx123456就是变更后的密码，自己的密码自己更改下哦
```

## MySQL8.0 登录连接报错 caching_sha2_password 解决方法

### 一 mysql 设置

```js
# 进入mysql
mysql -uroot -p123456
use mysql;
show tables;
select user;
# 查看身份验证类型
SELECT Host, User, plugin from user;
#设置密码强弱等级
set global validate_password.policy=0;
#设置密码长度
set global validate_password.length=6;
# 修改身份验证类型（修改密码）
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
FLUSH PRIVILEGES;

# 验证是否生效
use mysql;
SELECT Host, User, plugin from user;
```

#### 二：修改`mysql.cnf`

## 跳过权限认证，免密进入数据库

```js
[mysqld];
default_authentication_plugin = mysql_native_password;
```

```sh
# 进入数据库指令文件
cd /usr/local/mysql/bin
# 跳过权限认证
sudo ./mysqld_safe --skip-grant-tables &
# 初始化数据库
mysql_secure_installation
# 执行mysql指令
/usr/local/mysql/bin/mysql
# 进入名为<mysql>的数据库
use mysql
# 刷新权限
flush privileges;
# 修改密码 但不适用于8.0+的版本
# set password for "root"@"localhost"=password("123456hai");
# 8.0+版本修改密码
alter user "root"@"localhost" identified by "123456hai";
exit;
```

## 卸载

```sh
brew remove mysql
brew uninstall mysql --force
brew cleanup
launchctl unload -w ~/Library/LaunchAgents/com.mysql.mysqld.plist
rm ~/Library/LaunchAgents/com.mysql.mysqld.plist
sudo rm -rf /usr/local/var/mysql
brew search mysql
```

```sh
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/mysql*
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*
vim /etc/hostconfig (and removed the line MYSQLCOM=-YES-)
rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /var/db/receipts/com.mysql.*
```

## 常见的 mysql 问题

- `Access denied for user'root'@'localhost' (using password: YES)`
  - 说明你的 root 权限不够

### `mysqld_safe A mysqld process already exists`

```sh
# 查看mysql当前进程
ps aux | grep mysqld
# kill 进程
kill -9 46912
```

### `Plugin caching_sha2_password could not be loaded:`

```js
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456' PASSWORD EXPIRE NEVER; #修改加密规则 

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; #更新一下用户的密码 

FLUSH PRIVILEGES; #刷新权限

alter user 'root'@'localhost' identified by 'xzx123456';#重置密码，xzx123456就是变更后的密码，自己的密码自己更改下哦
```
