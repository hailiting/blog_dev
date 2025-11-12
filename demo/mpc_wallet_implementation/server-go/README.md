# MPC 钱包服务端 - Go 实现

基于多方安全计算（MPC）的钱包服务器实现。

## 🚀 快速开始

### 安装依赖

```bash
go mod download
```

### 运行服务器

```bash
go run main.go
```

服务器将在 `http://localhost:8080` 启动。

### 配置环境变量

```bash
export SERVER_PORT=8080
export DB_PATH=./data/mpc_wallet.db
export LOG_LEVEL=info
```

## 📖 API 文档

### 健康检查

**GET** `/health`

**响应：**
```json
{
  "status": "ok",
  "service": "mpc-wallet-server"
}
```

### 创建钱包

**POST** `/api/wallet/create`

**请求体：**
```json
{
  "pkUser": "客户端公钥片段（十六进制）"
}
```

**响应：**
```json
{
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "pkNode": "服务端公钥片段（十六进制）",
  "pkAgg": "联合公钥（十六进制）"
}
```

### 获取钱包信息

**POST** `/api/wallet/info`

**请求体：**
```json
{
  "pkUser": "客户端公钥片段（十六进制）"
}
```

**响应：**
```json
{
  "address": "钱包地址",
  "pkNode": "服务端公钥片段",
  "pkAgg": "联合公钥"
}
```

### 列出所有钱包

**GET** `/api/wallet/list`

**响应：**
```json
{
  "count": 2,
  "wallets": [
    {
      "address": "1A1zP1e...",
      "pkNode": "...",
      "pkAgg": "..."
    }
  ]
}
```

### 签名请求

**POST** `/api/signature/request`

**请求体：**
```json
{
  "txHash": "交易哈希（十六进制）",
  "rUser": "客户端临时公钥点（十六进制）",
  "address": "钱包地址"
}
```

**响应：**
```json
{
  "rNode": "服务端临时公钥点（十六进制）",
  "sNode": "服务端部分签名（十六进制）",
  "r": "最终 r 值（十六进制）"
}
```

## 🔧 代码示例

### 创建密钥服务

```go
package main

import (
    "mpc-wallet-server/service"
)

func main() {
    // 创建密钥服务
    keyService := service.NewKeyService()
    
    // 创建钱包
    wallet, err := keyService.CreateWallet("pkUserHex")
    if err != nil {
        panic(err)
    }
    
    println("钱包地址:", wallet.Address)
}
```

### 处理签名请求

```go
package main

import (
    "mpc-wallet-server/service"
    "mpc-wallet-server/types"
)

func main() {
    keyService := service.NewKeyService()
    signService := service.NewSignatureService(keyService)
    
    // 处理签名
    req := &types.SignatureRequest{
        TxHash:  "交易哈希",
        RUser:   "客户端临时公钥",
        Address: "钱包地址",
    }
    
    resp, err := signService.ProcessSignatureRequest(req)
    if err != nil {
        panic(err)
    }
    
    println("签名完成:", resp.R, resp.SNode)
}
```

## 🏗️ 项目结构

```
server-go/
├── api/                    # API 处理器
│   ├── routes.go          # 路由定义
│   ├── wallet_handler.go  # 钱包接口
│   └── signature_handler.go # 签名接口
├── service/               # 业务逻辑
│   ├── key_service.go     # 密钥服务
│   └── signature_service.go # 签名服务
├── crypto/                # 加密工具
│   └── crypto.go
├── types/                 # 类型定义
│   └── types.go
├── config/                # 配置管理
│   └── config.go
├── main.go               # 服务器入口
└── go.mod
```

## 🔐 安全考虑

### 当前实现

- ✅ 私钥片段安全存储（内存）
- ✅ CORS 跨域保护
- ✅ 加密安全的随机数生成
- ✅ 私钥从不通过网络传输

### 生产环境需要

- ⚠️ 使用 HSM 硬件安全模块存储私钥
- ⚠️ 实现身份认证（JWT, OAuth2）
- ⚠️ 添加请求签名验证
- ⚠️ 实现请求限流和防 DDoS
- ⚠️ 使用 PostgreSQL 持久化存储
- ⚠️ 添加完整的日志审计
- ⚠️ 实现零知识证明验证

## 📊 性能优化

### 数据库优化

```go
// 使用连接池
db, _ := sql.Open("postgres", "...")
db.SetMaxOpenConns(25)
db.SetMaxIdleConns(5)
db.SetConnMaxLifetime(5 * time.Minute)
```

### 缓存优化

```go
// 使用 Redis 缓存热点数据
cache := redis.NewClient(&redis.Options{
    Addr: "localhost:6379",
})
```

### 并发处理

```go
// 使用 goroutine 处理并发请求
go func() {
    signService.ProcessSignatureRequest(req)
}()
```

## 🧪 测试

### 运行所有测试

```bash
go test ./...
```

### 运行特定包测试

```bash
go test ./service
go test ./crypto
```

### 运行带覆盖率的测试

```bash
go test -cover ./...
```

## 📝 日志

日志级别：
- `debug`: 详细调试信息
- `info`: 一般信息（默认）
- `warn`: 警告信息
- `error`: 错误信息

设置日志级别：
```bash
export LOG_LEVEL=debug
```

## 🚢 部署

### Docker 部署

```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o mpc-server .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/mpc-server .
EXPOSE 8080
CMD ["./mpc-server"]
```

### Kubernetes 部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mpc-wallet-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mpc-wallet
  template:
    metadata:
      labels:
        app: mpc-wallet
    spec:
      containers:
      - name: mpc-server
        image: mpc-wallet-server:latest
        ports:
        - containerPort: 8080
        env:
        - name: SERVER_PORT
          value: "8080"
```

## 📄 许可证

MIT

