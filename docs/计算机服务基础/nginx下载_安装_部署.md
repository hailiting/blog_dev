# nginx 下载*安装*部署

#### 1, 先安装 homebrew

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### 2，Nginx

```
brew install nginx
```

#### 3，启动 Nginx

```
sudo  /usr/local/Cellar/nginx/1.15.8/bin/nginx  -c /usr/local/etc/nginx/nginx.conf
sudo nginx  -c /usr/local/etc/nginx/nginx.conf
```

#### 常见错误

##### 配置文件地址

/usr/local/etc/nginx/nginx.conf

```
//  nginx: [emerg] bind() to 0.0.0.0:80 failed (13: Permission denied)
端口号太小，改 1024 以上端口
server {
  listen:  8080
  ...
}
// nginx: [emerg] bind() to 0.0.0.0:80 failed (48: Address already in use)
sudo nginx -s stop 或 sudo nginx -s stop
```

#### 1,安装工具包 wget、vim 和 gcc

```
yum install -y wget
yum install -y vim-enhanced
yum install -y make cmake gcc gcc-c++
```

#### 2,下载 nginx 安装包

```
wget http://nginc.org/download/nginx-1.6.2.tar.gz
```

#### 3,安装依赖包

```
yum install -y pcre pcre-devel
yum install -y zlib zlib-devel
yum install -y openssl openssl-devel
```

#### 4,解压 nginx-1.6.2.tar.gz 到/usr/local/目录下

```
tar -zxvf nginx-1.6.2.tar.gz -C /usr/local/
```

#### 5,进行 configure 配置

```
./configure --prefix=/usr/local/nginx
```

#### 6,编译安装

```
make && make install
```

#### 7,启动 nginx,启动完，检查 nginx 是否正常启动

```
# 启动命令
/user/local/nginx/sbin/nginx
# 查看是否被正常启动
ps -ef | grep nginx
# 关闭nginx
/user/local/nginx/sbin/nginx -s stop
# 重新热启动nginx
/user/local/nginx/sbin/nginx -s reload
```

#### 8,配置防火墙，nginx 默认端口是 80

```
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --reload
```

#### 9,测试 nginx

```
ip addr 获取到ip地址
在网页打开ip
```

#### 10,学习 nginx 配置

```
# 开启进程数 <=CPU核数
worker_processes 1;

# 错误日志保存位置
error_log logs/error.log;
error_log logs/error.log notice; # 警告
error_log logs/error.log info; # 基本信息

# 进程号保存文件
# pid logs/nginx.pid;

# 每个进程最大连接数（最大连接=连接数*进程数）每个worker容许同时产生多少个链接，默认1024个
events{
  worker_connections 1024;
}
<!-- --------------- -->
http{
  include mine.types;
  default_type application/octet-stream;
  # log_format main '$remote_addr - $remote_user [$time_local] "$request"'
  #                 '$status $body_bytes_sent "$http_referer"'
  #                 '"$http_user_agent" "$http_x_forwarded_for"';
  #access_log logs/access.log main;
  sendfile on;
  #tcp_nopush on;
  keepalive_timeout 65;
  #gzip on;
  server {
    listen 8080;
    server_name localhost;
    #charset koi8-r;
    #access_log logs/host.access.log main;
    location /{
      root html; # html 文件夹
      index index.htmml index.htm
    }
    #error_page 404 /404.html; #控制出错
    #redirect server error pages to the static page /50x.html
    error_page 500 502 503 504 /50x.html;
    location = /50x.html{
      root html;
    }
    #proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #location ~ \.php${
    # proxy_pass http://127.0.0.1;
    #}
    #pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #location ~ \.php$ {
    #  root html;
    #  fastcgi_pass 127.0.0.1:9000;
    #  fastcgi_index index.php;
    #  fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
    #  include fastcgi_params;
    #}
    #deny access to .htaccess files, if Apache's document root
    #concurs with nginx's one
    #location ~/\.ht{
    #  deny all;
    #}
  }
  #server{
  #  listen 8000;
  #  listen somename:8080;
  #  server_name somename alias another.alias;
  #  location / {
  #}
  }
}
<!-- --------------- -->
http{
  # 开启gzip
  # gzip on;
  # 开启etag
  # etag on;
  #监听端口，默认是80端口
  listen       80;
  #监听域名
  server_name  localhost;

  #charset koi8-r;

  #nginx访问日志放在logs/host.access.log下，并且使用main格式（还可以自定义格式）
  #access_log  logs/host.access.log  main;

  #如果没有location更明确的匹配访问路径的话，访问请求都会被该location处理。
  location / {
      #root指定nginx的根目录为/usr/local/nginx/html
      root   html;
      #默认访问文件，欢迎页先去html目录下找index.html，如果找不到再去找index.htm
      index  index.html index.htm;
  }

  #error_page  404              /404.html;
  # redirect server error pages to the static page /50x.html
  #

  #错误页面及其返回地址，错误码为500、502、503、504都会返回50.html错误页面。
  error_page   500 502 503 504  /50x.html;
  #location后面是"="的话，说明是精确匹配
  location = /50x.html {
      root   html;
  }
}

```

###### nginx 可以启动多个端口，每个端口制定不同的端口号和资源
