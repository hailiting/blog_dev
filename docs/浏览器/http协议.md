# http 协议

局域网
广域网
互联网

## 浏览器行为与 HTTP 协议

### 处理流程

- 输入网址并回车
- 解析域名
- 浏览器发送 HTTP 请求
- 服务器处理请求
- 服务器返回 HTML 响应
- 浏览器处理 HTML 页面
- 继续请求其他资源

### 什么是 HTTP 协议

- HTTP 是超文本传输协议，从 www 浏览器传输到本地浏览器的一种传输协议，网站是基于 HTTP 协议的，例如图片、css、js 等都是基于 HTTP 协议进行传输的。
- HTTP 协议是由从客户机到服务器的请求（Request）从服务器到客户端的响应（Response）进行约束和规范。

## TCP/IP 协议栈

有分七层的，也有分四层的  
物理层 网线 无线电波  
数据链路层 电信号 光信号 无线电波信号 网卡  
网络层 IP 地址怎么分配 谁有 IP 地址 宽带的猫 光缆 电话线的猫  
传输层 TCP 传输控制协议 连接状态 UDP 用户数据报协议  
应用层 为用户提供所需要的各种服务，例如 HTTP、FTP、DNS、SMTP 等

- 连接电信局的服务器上 PPT 协议（建立通信链路）

### 四层

- 1. 应用层
  - 为用户提供所需要的各种服务，例如：HTTP(超文本传输协议), FTP(文件传输协议), DNS(域名系统), SMTP(电子邮件发送和接收协议)等
- 2. 传输层
  - 为应用层实体提供端到端的通信功能，保证数据包的顺序传送及数据的完整性。该层定义了两个主要协议：传输控制协议(TCP)和用户数据报协议（UDP）;
- 3. 网络层
  - 主要解决主机的通信问题。IP 协议是网际互联层最重要的协议。
- 4. 网络接口层
  - 负责监视数据在主机和网络之间的交换

#### 七层

- 物理层
- 数据链路层
- 网络层
- 传输层
- 会话层
- 表示层
- 应用层

### IP

#### IPv4 和 IPv6

IP 是 TCP/IP 协议族中网络层的一种互联协议  
v4 代表互联协议的第 4 版
v6 代表互联协议的第 6 版  
v6 是由 IEIF（互联网工程任务组）设计的用于替代现有的 IPV4 协议的下一代协议，号称可以为地球上的每一粒沙子编上一个地址（可以为地球上每平方米分配 6\*1023 个网络地址）。由于 IPV4 地址资源的有限，满足不了互联网|物联网日益对网络地址的需求，使用 IPV6 可有效的解决这个燃眉之急。

#### 与 IPV4 相比，IPV6 具有以下优势

- 1. IPv6 具有更大的空间。
- 2. IPv6 使用更小的路由表。IPV6 的地址分配一开始就遵循聚类（Aggregation）的原则，这使路由器能在路由表中用一条记录（Entry）表示一片子网，大大减小了路由器中路由表的长度，提高了路由器转发数据包的速度。
- 3. IPv6 增加了增强的组播（Multicast）支持以及对流的控制（Flow Control），这使得网络上的多媒体应用有了长足发展的机会，为服务质量（QoS, quality of service）控制提供了良好的网络平台。
- 4. 加入了对自动配置的支持，这对 DHCP 协议的改进和扩展，使得网络（尤其是局域网）的管理更加方便和快捷
- 5. IPv6 具有更高的安全性。
- 6. 允许扩充，如果新的技术或应用需要时，IPv6 允许协议进行扩充。
- 7. 更好的头部格式，IPV6 使用新的头部格式，其选项与基本头部分开，如果有需要，可将选项插入到基本头部与上层数据之间。这就简化和加速了路由选择的过程，因为大多数选项不需要由路由选择。

## HTTP 的工作过程

就是请求和响应的过程
一个 HTTP 操作称为一个事务，其工作过程可分为四步：

- 首先，客户机和服务器建立连接，HTTP 开始工作
- 建立连接后，客户机发送一个请求给服务器，请求方式的格式为：统一资源标识符（URL），协议版本号，后边是 MIME 信息，包括请求修饰符、客户机信息和可能的内容。
- 服务商接收到请求后，给予相应的响应信息，其格式为一个状态行，包括信息的协议版本号、一个成功或错误的代码，后边是 MIME 信息包括服务器信息、实体信息和可能的内容
- 客户端接收服务器所返回的信息通过浏览器显示在用户的显示屏上，然后客户机和服务器断开连接。

### 请求方法

- get 查 请求获取 RequestURL 所标识的资源
- post 改 在 RequestURL 所标识的资源的响应消息报头
- HEAD 请求获取由 RequestURL 所标识的资源的响应消息报头
- put 增 请求服务器存储有关资源，并用 Request-URL 作为其标识
- delete 删 请求服务器删除 RequestURL 所标识的资源
- TRACE: 请求服务器反回送收到的请求信息，主要用于测试和诊断
- CONNECT 保留将来使用
- OPTIONS 请求查询服务器性能，或查询与资源相关的选项和需求

### 状态码

- 1xx: 指示信息-表示请求已接收，继续处理 异步处理 超时
- 2xx: 成功-表示请求已被接收、理解、接受
- 3xx: 重定向-要完成请求必须进行更进一步的操作
- 4xx: 客户端错误-请求有语法错误或请求无法实现
- 5xx: 服务器端错误-服务器未能实现合法的请求

带宽消耗 通信线路的拥挤

### 常用的请求报头

- Accept: 请求报头域用于指定客户端接受哪些类型信息 application/json, text/javascript, _/_; q=0.01
- Accept-Encoding: 和 Accept 类似，但它用于指定接受内容的编码 gzip, deflate, br
- Accept-Language: 和 Accept 类似，但用于指定可接受的内容编码 zh-CN,zh;q=0.9,en;q=0.8
- Authorization: 验证用户权限
- Host: 请求报头域主要用于指定被请求资源的 Internet 主机和端口号，通常从 HTTP URL 中提取
- User-Agent: 把客户端的操作系统、浏览器和其他属性告诉服务器
  浏览器缓存空间 上限 缓存协商

### 常用的响应报头

- Location: 用于重定向接受者到新的位置，Location 响应报头域通常在更换域名的时候
- Server: 用来处理请求的软件信息，与 User-Agent 请求报头域是相对应的
- WWW-Authenicate: 未授权响应信息中

### 实体报头

请求和响应都可以传送一个实体。一个实体由实体报头域和实体正文组成【可以只存在一个】。实体报头定义了关于实体中文（有无实体正文等）和请求所标识的资源的云信息。

#### 长用的实体报头

- Content-Encoding: 指示已经被应用到实体正文的附加内容的编码
- Content-Langth: 指明实体正文的长度
- Content-Type: 实体正文的媒体类型
- Last-Modified: 资源最后修改的日期和时间
- Expires: 实体报头域给出响应过期的日期和时间

## cookies 与 session

前端只能有 cookie 后端只能有 session
cookie 可以用后端生成，但不维护 cookie
session 数据库

- Cookies 是保存在客户端的小段文本，随客户端点每一个请求发送 url 下的所有 cookies 到服务器端
- Session 是保存在服务器端，通过唯一的值 sessionID 来区别每一个用户。SessionID 随每个连接请求发送到服务器，服务器估计 sessionID 来识别客户端，在通过 session 的 key 获取 session 值

## 浏览器缓存策略

### 强制缓存

强制缓存只有首次请求才会跟 服务器通信，读取缓存资源时不会发出任何请求，资源的状态码为 200，资源的 Size 为`from memory`或`fron disk`

- http1.0 强制缓存通过`Expires`实现
- http1.1 强制缓存通过`cache-control`来实现，`cache-control`有多个值
  - `private`: 客户端可缓存
  - `public`: 客户端和代理服务器均可缓存
  - `max-age=xxx`: 缓存的资源将在 xxx 秒后过期
  - `no-cache`: 需要使用协商缓存来验证
  - `no-store`: 不可缓存

### 协商缓存

**Etag/If-None-Match 策略**

- Etag: web 服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定）
- If-None-Match: 当资源过期时（使用 Cache-Control 标识的 max-age），发现资源具有 Etag 声明，再次向 web 服务器请求时带上头`If-None-Match`（Etag 的值）。web 服务器接收到请求后，发送有头`If-None-Match`则与请求资源的相应校验串进行对比，决定返回 200 或 304。

**Last-Modified/If-Modified-Since 策略**

- Last-Modified: 标示这个响应资源的最后修改时间。 web 服务器在响应请求时，告诉浏览器资源的最后修改时间
- If-Modified-Since: 当资源过期时（Cache-control 标识的 max-age），发现资源具有`Last-Modified`，再次向服务器请求，带有`If-Modified-since`的值与被请求资源相比对。若最后修改的时间较新，则响应最新资源，反之则返回 304，告诉浏览器继续使用所保存的 cache

## HTTP 链路安全

- 加密重要数据
- 对非重要数据签名
- 使用安全链接 HTTPS 协议

### https 协议分析

- https 协议的安全性由 SSL 协议实现的，当前使用的 TLS 协议 1.2 版本包含四个核心子协议：握手协议、密钥配置切换协议、应用数据协议及报警协议
- CA 数字中心签发数据 申请证书 配到 nginx 才能使用 https

#### HTTPS 协议，SSL 协议，TLS 协议，握手协议的关系

- HTTPS 是 http over ssl,可理解为基于 SSL 的 HTTP 协议
- ssl 协议是一种记录协议，而握手协议是 ssl 协议的子协议
- TLS 协议是 SSL 协议的后续版本，一般涉及到的 SSL 协议默认为 TLS 协议

### http2

- 使用二进制格式传输，更高效、更紧凑
- 对报头压缩，降低开销
- 多路复用，一个网络连接实现并行请求
- 服务器主动推送，减少请求的延迟
- 默认使用加密

### http3

- HTTP-over-QUIC 被更名为 HTTP3
- QUIC 协议
- HTTP3 和 HTTP1 与 2 没有直接关系
- HTTP3
  - 减少 TCP 三次握手及 TLS 挥手时间（请求时就加密）
  - 改进阻塞控制
  - 避免队头阻塞的多路复用
  - 连接迁移
  - 前向冗余纠错

## 反向代理

### 用途

- 加密和 SSL 加速
- 负载均衡
- 缓存静态内容
- 压缩
- 减速上传
- 安全
- 外网发布

### 用反向代理

所有请求都转到一个中心 DNS 服务器，这个服务器在根据一定策略将这些请求转发到各反向代理服务器

http3 基于 UDP

http
正向代理 proxy 缓存
局域网
广域网
互联网
反向代理

### 配置 https

```js
// nginx.conf
server {
  listen 443 ssl;
  server_name localhost;

  ssl_certificate cert.pem; // 证书
  ssl_certificate_key cert.key;  // 密钥

  ssl_session_cache  shared:SSL:1m;
  ssl_session_timeout  5m;

  ssl_ciphers  HIGH: !aNull: !MD5;
  ssl_prefer_server_ciphers on;
  location /{
    root html;
    index index.html index.htm;
  }
}
```

热备方案

```js
upstream mysvr {
  server 127.0.0.1:7878;
  server 192.168.10.121:333 backup; # 热备
}
```
