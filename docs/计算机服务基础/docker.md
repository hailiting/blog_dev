## 安装 docker docker-compose

## [第三方库服务](!https://hub.docker.com)

### 设置 docker 镜像

```
// 文件地址：/etc/docker/daemon.json
// vi path， i 编辑， esc + !eq 保存
{
  "regisrey-mirrors": ["https://registry.docker-cn.com"]
}
```

### 下载 mongodb 镜像

```
// :4 版本
docker pull mongo:4
```

### 运行 mongo

```
// -d 在后台运行docker指令
// -p 指定端口
// docker run --name some-mongo -d mongo:tag
// 在10050端口映射容器里的27017
ep: docker run -d --name some-mongo -p 10050:27017 mongo:4
// 指定10050为永久(--parmanent)端口  防火墙方行
firewall-cmd --zone=public --add-porrt=10050/tcp --permanent
firewall-cmd --reload
```

### Robo 3T mongo 图形化的工具

## 重启 docker

`service docker restart`

## 查看本地下载了哪些镜像

`docker images`

## 查看及停止容器

```sh
# 查看运行中的容器
docker ps

# 查看所有容器  包括正在运行和已经停止运行的
docker ps -a
```

停止容器命令如下

```sh
# 通过id直接关闭容器
# docker kill a0fbf4519279
# 通过容器名称直接关闭容器
docker kill docker-nginx

# 通过id直接关闭容器 默认等待10s 超时强制关闭
# docker stop a0fbf4519279
# 等同于 docker stop -t=10 docker-nginx
docker stop docker-nginx
```

## 启动停止的容器

```sh
# 启动容器可通过容器id或容器名称
# 如果已经启动则忽略
docker start docker-nginx

# 通过容器名称重新启动容器，如果未启动则直接启动，如果已启动则关闭再启动
docker restart docker-nginx
```

## 搜索镜像

`docker search nginx`

## 获取镜像

搜索到所需要的镜像之后可使用如下命令将镜像拉取到本地，类似于 git 拉取代码

```sh
# 拉取指定版本
# docker pull nginx:xxx

# 拉取最新版本镜像 等价于 docker pull nginx:latest
docker pull nginx
```

## 创建并启动容器

镜像拉取成功后，使用下面命令启动 nginx 容器，容器内部的 80 端口已映射到本机的 8080 端口，所以启动成功后可以使用`http://localhost:8080/`访问 docker 容器内部 nginx80 端口映射的地址

```sh
# -d 后台运行
# -p 8080:80 宿主机的8080端口映射到docker内部的80端口
# --name docker-nginx 启动后的容器名称为 docker-nginx
docker run -d -p 8080:80 --name docker-nginx nginx
```
