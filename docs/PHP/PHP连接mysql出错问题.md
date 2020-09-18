### `No such file or directory`

- 然而我没解决(可能因为我是用 xampp)
  原因是 mac 下默认`php.ini`配置`default_socket`在`/var/mysql/mysql.socket`, 而 mysql 的 socket 文件大多在`/tmp/mysql.sock` =>在 mysql 里，用`status`命令查看`UNIX socket`的位置，将`php.ini`改为 mysql 的就好了；

#### 1， `php.ini`配置文件一般在 /private/etc/里

#### 2， vi php.ini

```
pdo_mysql.default_socket=/Applications/MAMP/tmp/mysql/mysql.sock
mysql.default_socket = /Applications/MAMP/tmp/mysql/mysql.sock
mysqli.default_socket = /Applications/MAMP/tmp/mysql/mysql.sock
```

#### 3, `esc` + ``:wq

``
