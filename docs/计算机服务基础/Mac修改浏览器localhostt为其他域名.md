# Mac 修改浏览器 localhostt 为其他域名

## XAMPP 配置虚拟域名

注意点：
1: mac 下不能用下划线等的域名(text_01.com)
2: hosts 填写的域名与 http-vhosts.conf 中的域名保持一致
3: ErrorLog 和 CustomLog 最好不要修改
需要的文件夹地址
1 `/etc/hosts`里的 hosts 文件;

```
// 我xampp 80 端口不在local下，所有设置在ip下
# 127.0.0.1 zerg.cn # used by Apach
192.168.xx.x zerg.cn
```

2 `xampp`文件夹里的 `etc/httpd.conf`;

```
# 查看有没有打开，没打开则打开
Include etc/extra/httpd-vhosts.conf
```

3 `xampp`文件夹里的 `etc/extra/httpd-vhosts.conf`;
添加域名导向(ServerName 必须要和定义的域名一致)

- \*:80 表示端口
- DocumentRoot 表示项目地址
- ServerName 使用的虚拟域名（和 host 文件保持一致）
- 重启 Apache

```
<VirtualHost *:80>
   # ServerAdmin webmaster@dummy-host.example.com
   DocumentRoot "htdocs"
   ServerName localhost
   ServerAlias www.dummy-host.example.com
   ErrorLog "logs/dummy-host.example.com-error_log"
   CustomLog "logs/dummy-host.example.com-access_log" common
</VirtualHost>

<VirtualHost *:80>
    # ServerAdmin webmaster@dummy-host2.example.com
    DocumentRoot "htdocs/mook/Zerg/public"
    ServerName zerg.cn
    ErrorLog "logs/dummy-host2.example.com-error_log"
    CustomLog "logs/dummy-host2.example.com-access_log" common
</VirtualHost>
```

## 方法

1，sudo vim /etc/hosts 进入 vim 模式
2，按 I 进入编辑模式
3，打开 host 文件后，注释掉 127.0.0.1 localhost 这一行

```
# 127.0.0.1 localhost
```

4，写新的映射 127.0.0.1 dev.abc.net

```
127.0.0.1 dev.abc.net
```

5，esc 退出模式
6，`:wq` 保存退出（`:q!`放弃修改并退出）
