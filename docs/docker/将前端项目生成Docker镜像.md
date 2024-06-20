# 将前端项目生成 Docker 镜像

## 创建 Dockerfile

在前端项目根目录创建名为 Dockerfile 的文件。

```dockerfile
# 使用官方 Node.js 镜像作为基础镜像
FROM node:alpine AS builder

# 设置工作目录
WORKDIR /app
COPY package*.json ./
# 安装项目依赖
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

# 曙光端口
EXPOSE 80
# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
```

## 构建 Docker 镜像

打开终端，导航到包含 Dockerfile 的项目根目录，然后运行以下命令来构建镜像

```bash
docker build -t your-image-name:tag .
```

## 运行 Docker 容器

```bash
docker run -p host-port:80 your-image-name:tag
```

- host-port 主机上公开的端口
- your-image-name:tag 刚才构建的镜像名称和标签

## 使用 github action 构建镜像并上传到 github registry

登录 GitHub Container Registry
