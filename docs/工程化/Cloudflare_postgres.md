# Cloudflare Postgres

```shell
git clone https://github.com/cloudflare/worker-template-postgres/
cd worker-template-postgres
# cloudflare 验证
docker run -v ~/.cloudflared:/etc/cloudflared cloudflare/cloudflared:2021.11.0 cloudflared tunnel login

# 注意 docker-compose.yml 里 cloudflared 配置
  cloudflared:
      image: cloudflare/cloudflared:2021.10.5
      environment:
        - TUNNEL_HOSTNAME=${TUNNEL_HOSTNAME}
      volumes:
        - '~/.cloudflared:/etc/cloudflared'
      command: tunnel -config /etc/cloudflared/docker_config.yml  --name test -f
      depends_on:
        - pgbouncer
```

## Argo Tunnel

[官方文档](!https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)  
[参考网站](!https://blog.csdn.net/alex_yangchuansheng/article/details/123564350)  
Cloudflare 推出的 ArgoTunnel，本意是保护 web 应用程序，连接服务器端口和 Cloudflare 节点。  
他可以将本地服务发布到公网。只不过 frp 所需的服务器 IP 在 ArgoTunnel 中变为 Cloudflare 提供的节点。相比运营商公网 IP,Argo Tunnel 省去了跟运营商扯皮的时间，相比于 frp，则省去了服务器成本

### 准备：

- Cloudflare 账号
- 接入 Cloudflare 的域名

### 安装 Argo Tunnel Client

```shell
# macOS 安装
brew install cloudflare/cloudflare/cloudflared

# Docker 运行
docker run -v ~/.cloudflared:/etc/cloudflared \
  --name cfd cloudflare/cloudflared:2021.4.0 \
  tunnel --no-autoupdate --hostname demo.wener.me --url http://localhost:8080

# Linux 安装
curl -Lo cloudflared https://github.com/cloudflare/cloudflared/releases/download/2021.4.0/cloudflared-linux-amd64
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/

# 升级版本
cloudflared update

# 手动更新
curl -Lo `which cloudflared` https://github.com/cloudflare/cloudflared/releases/download/2021.11.0/cloudflared-linux-amd64
```

### 身份验证

Argo Tunnel Client 需要使用者登录 Cloudflare 账号以进行授权

```shell
# 登录后生成证书，放在 ~/.cloudflared/cert.pem
cloudflared tunnel login
```

### 新建 Tunnel

```shell
# cloudflared tunnel create [Tunnel 名称]
# 创建生成配置 ~/.cloudflared/UUID.json
cloudflared tunnel create test
cloudflared tunnel list
cloudflared tunnel delete [uuid]
```

每个 Tunnel 都对应一个 UUID，每创建一个 Tunnel，Cloudflared 都会在`~/.cloudflared/`下生成对应 UUID 的 json 文件

### 配置 DNS 记录

访问域名的控制面板，进入 DNS 配置页，新建 CNAME 记录，名称填写任意字符，目标填写`[tunnel的UUID].cfargotunnel.com`
Argo Tunnel 的一个 UUID 只会与同一账号下的 DNS 记录绑定

### 新建配置文件

新建 YAML 配置文件

```yml
tunnel: [tunnel 的名称或UUID]
credentials-file: /root/.cloudflared/[tunnel的UUID].json

ingress:
  # test.xxx.xx
  - hostname: [CNAME 记录名称].[接入Cloudflare的域名]
    service: http://localhost:80
  - service: http_status:404
```

### 开启 Tunnel

```shell
# 如果不指定文件路径，cloudflared会默认读取`~/.cloudflared/config.yml`
cloudflared tunnel --config [配置文件路径] run [tunnel]

# 校验路由规则
cloudflared tunnel ingress validate
# 测试路由
cloudflared tunnel ingress rule https://test.xxx.xx
# 启动
cloudflared tunnel run dev

# 访问服务需要
# CNAME test.xxx.xx 到 ${TUNNEL_ID}.cfargotunnel.com
cloudflared tunnel route dns test test.coinversation.io

# 至此可以通过通道访问服务
curl -L test.xxx.xx
```

### 配置为系统服务

```shell
# cloudflared 会新建systemd文件
cloudflared service install
```

### 开启服务

```shell
systemctl start clouldflared.service
systemctl status clouldflared.service
```
