# nginx的反向代理与负载均衡
## 正向代理与反向代理
### 正向代理
明确知道要访问的地址。用计算机A访问某个网站B,如果是国外的，需要服务器C做代理服务器，通过C访问B，这种访问方式就是正向代理。
### 反向代理
目标网站有一个服务器集群，并且集群中每个服务器的内容都一样，如果从个人电脑直接访问服务器集群中的服务器，是无法访问的，并且此时第三方服务器可以访问集群，这个时候我们就可以通过第三方服务器访问集群内容，但我们此时不知道是那一台服务器提供的内容，此时的代理方式称为方向代理。
第三方服务器需要负载均衡，负担服务器压力，保证集群中的每一个服务器压力趋于平衡，避免崩溃情况。
正向代理的服务对象是客户端，反向代理的对象是服务端。
## 什么是HTTP``Upstream``模块
Upstream模块实现在轮询和客户端Ip之间实现后端的负载均衡。
常用的指令有： ``ip_hash``、``server``、``Upstream``
### ``ip_hash``命令
权重【默认是1:1】
### ``server``指令
### ``Upstream``指令
## 部署NodeJS流程
~~~
1，下载nginx
brew search nginx / brew install nginx
2, brew info nginx 【会打印本机上nginx信息】
3, nginx -v 【版本信息】
4, 指定自己的配置``nginx  -c``
   sudo nginx  -c /usr/local/etc/nginx/nginx.conf【默认端口为8080】
    - tips: 如果安装过Jenkins的话，这里会失效
    - sudo launchctl unload /Library/LaunchDaemons/org.jenkins-ci.plist
    - systemctl start jenkins
5, sudo brew services stop nginx/nginx
6, sudo nginx -s reload、nginx -s stop
7, 查看nginx配置文件  
8, 查看当前配置文件 nginx -t -c 自己配置的文件地址
9, 拷贝配置文件至Node项目目录，重新修改
10,服务器端的nginx地址
11, ``nginx -t``是否生效 
12, 端口号被占用处理
ps aux | grep node  // 那个程序在运行 第二位为 pid  然后kill -9 pid
ps -ef | grep node // nginx
lsof -i tcp:8081  // 端口
kill -9 pid
ssh 用户名@地址
scp course-map.json root@ip地址:/路径 [scp 文件 name@ipaddress:/path]
scp -r advance/ root@101.200.185.250:/opt/node-publish/www/static/
unzip build[解压]
rm *
.sh js 执行对应的权限
mv name01 name02 # 把 name01 改为 name02
13, npm install --production 只管上线环境
14, pm2动态监测文件
  14-1 能够动态监控文件上传，0秒热启动
  14-2 负载平衡CPU
  14-3 内存使用过多或cpu调度过于频繁，重启
  14-4 restart个数
  
~~~
找到真正的``.conf``文件
~~~
nginx.conf
worker_processes 4;
events{
  # 最多的并发连接
  worker_connections 1024;
}
http{
  # upstream 负载均衡的所有server地址
  upstream firsttest{
    ip_hash; #落在确定服务器后就不更改了
    server 111.13.100.92 weight=2; # weight 权重
    server 111.13.179.253;
  }
  server{
    listen 8080;
    location / {
      proxy_pass http://firsttest; #代理访问
    }
  }
}
~~~