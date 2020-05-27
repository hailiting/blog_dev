# Navicat链接mysql失败
## ``Host "*" is not allowed to  connect to this MariaDB server``
解决方法：允许用户testuser从ip为 xxx.xxx.x.x的主机连接到mysql服务器，并使用testpassword作为密码
~~~
// 登录mysql
MariaDB [(none)]> grant all privileges on *.* to "testuser"@"xxx.xxx.x.x" identified by "testpassword" with grant option;
(若是允许所有IP: GRANT ALL PRIVILEGES ON *.* TO "testuser"@"%" IDENTIFIED BY "testpassword" WITH GRANT OPTION;)
MariaDB [(none)]> flush privileges; // 刷新权限缓存
MariaDB [(none)]> show privileges;
MariaDB [(none)]> show grants for "testuser"@"xxx.xxx.x.x"
~~~

