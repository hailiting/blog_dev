### HTTP协议那些事
> 当我们输入网址后发生了什么
> HTTP协议详解
> HTTP协议安全
> 后台服务与HTTP
> 反向代理与WEB服务
#### HTTP请求模型
Client ->   请求 -> Server -> 响应 -> Client
#### 浏览器行为与HTTP协议
处理流程：
1，user 输入网址并回车
2，浏览器收到指令，先看网络通不通，先通过防火墙（猫拨号，路由器控制猫）
3，找到DNS服务器，找到服务器地址
4，在网路上（通过透明设备），通过多个路由器
5，找到对应IP地址（可能有多个服务器）
6，找到对应服务器，浏览器向服务器询问登录，服务器做验证，返回一段字符串
7，经过若干个路由
8，到达浏览器，渲染到页面上
（DNS服务器在互联网上）
猫是内网和电信服务器之间做一个链路，路由器是获取一些配置（DNS的IP地址，所以DNS域名是预先配置好的）
#### 什么是HTTP协议
1，HTTP是超文本传输协议，从www浏览器传输到本地浏览器的一种传输协议，网站是基于HTTP协议的，例如网站图片，css，js等都是基于HTTP协议进行传输的。
是特定套路的拿东西的协议
2，HTTP是一种约束和规范，从客户端请求（request）和从服务器响应（response）
#### 了解TCP/IP协议栈（栈-》数据结构里的栈相似，分层）
ISO：应用层，表示层，回话层，传输层，网络层，数据链路层，物理层
TCP/IP：应用层，传输层，网络层，网络接口层
1，应用层
为用户提供所需要的各种服务，例如：HTTP(超文本传输协议),FTP(文件传输协议),DNS(域名系统),SMTP(邮件传输协议)等
2，传输层（TCP - 保持连接的协议 三次握手， UDP - 不可靠，送不到也不知道）
为应用层实体提供端到端的通信功能，保证数据包的顺序传达及数据的完整性
3，网络层（IP 涉及到协议-主要管IP地址怎么形成，怎么得到）
主要解决主机到主机的通信问题。IP协议是国际互联网最重要的协议。
4，网络接口层（和硬件相关的）-》 网络工程师
负责监视数据在主机和网络之间的交换

HTTP和HTTPS是链路上加密（TLS&&SSL 会话层）了
HTTP默认端口是80
HTTPS默认端口是443
广泛使用的是HTTP1.1

#### HTTP的工作过程
一次HTTP操作称为一个事务(1，一步或多步组合完成起来的一件事，2，其中一个事务失败了，整个失败，3，可以 回滚），其过程可分为四步：
1，TCP 客户机与服务器建立连接（网络不通 err_connection_timed_out）
2，HTTP IP 建立连接（错误码）
3，HTTP 服务器接到请求（错误码）
4，TCP 客户端收到服务器返回的信息并显示（网络不通）

#### 请求和响应
1，HTTP请求：请求行、消息报头、请求正文
2，HTTP响应：状态行、消息报头，响应正文
General: (把response和request一部分提出来)
Request URL(请求)
Remote Address(ip地址+端口号  DNS解析后得到的地址)
Request（请求）：
Accept(浏览器能接受什么类型的资源)
Accept-Encoding(编码，数据的格式 gzip...)
Accept-Language
Cache-Control(缓存)
Connection(连接-长 || 短  IO 输入输出 效率低)
Cookie（把本地cookie发到服务器上）
host：网站的域名
Pragma(缓存相关的)
User-Agent(告诉服务器是什么浏览器)
Referer (跟踪用户访问的顺序，判断资源来自哪个网站)

Response Header:
Cach-Control(缓存)
date/expires (缓存)
server(所用的服务器)
set-Cookie  (给客户端、浏览器的时候)

#### HTTP状态码
1，1xx 提示信息  异步处理  请求已接收到，但没时间处理，需要等待
2，2xx 服务器处理了 204 服务器接收 处理了，没有内容
3，3xx 重定向，请求必须进行更进一步的操作，原来资源在这，被转移了
4，4xx 客户端错误 构建的数据有问题
5，5xx 服务器错误
#### 请求方法
1, GET
2, POST
3, HEAD(和get差不多，不返回内容)
4, PUT(向服务器加内容)
5, DELETE
6, TRACE
7, CONNECT
8, OPTIONS

#### cookie  && session
http是无状态协议（服务器和客户端在通信的时候，并不知道服务器是谁，依靠cookie和session解决）
1，Cookie是保存在客户端的小段文本，随客户端点每一个请求发送该url下的所有cookie到服务器端
2，Session则保存在服务器端，通过唯一的值sessionID来区别每一个用户。SessionID随每个连接请求发送到服务器，服务器感觉sessionID来识别客户端，在通过session的key获取session值。
cookie一般情况下是服务器生成，通过response返回到客户端来
session（会话） 一般保存在服务器端，sessionID相当于服务器给客户端发的一个身份证，
客户端第一次请求 -》 服务器 响应，发现没有身份，就返回一个身份给客户端，客户端Set-Cookie:sessionID=xxx -》客户端请求（携带了cookie(cookie里有session)）-》服务器响应
token（令牌）可以加在url，token也是一种凭据。
#### 缓存机制
![浏览器缓存机制](https://upload-images.jianshu.io/upload_images/1338363-f610030c013da0c4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### HTTP的链路安全
1，加密重要数据
2，对非重要数据签名（hash...）
3，使用安全连接HTTPS协议（链路加密）
#### HTTP2：下一代标准
1，使用二进制格式传输，更高效、更紧凑
2，对报头压缩，降低开销
3，多路复用，一个网络连接实现并行请求
4，服务器主动推送，减少请求的延迟
http与https
http: TCP + HTTP
https: TCP + TLS + HTTP
Websocket: TCP+WS
Websockets: TCP+TLS+WS
#### HTTP与反向代理
1，什么是代理，什么又是反向代理
2，为什么要使用反向代理？
3，都有哪些反向代理服务器
![代理](https://upload-images.jianshu.io/upload_images/1338363-01538982a3fbe76d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##### 反向代理的用途
1，加密和SSL加速
2，负载均衡
3，缓存静态内容
4，压缩
5，减速上传
6，安全
7，外围法布

![反向代理负载均衡](https://upload-images.jianshu.io/upload_images/1338363-807ac5ea63c66364.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
高速缓存放置一些常用资源
~~~
ping www.baidu.com
// ping 是否连网   百度dns代理地址
~~~

