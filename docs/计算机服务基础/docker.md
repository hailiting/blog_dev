## 安装 docker docker-compose

## [第三方库服务](!https://hub.docker.com)s

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

## 查看正在运行的 docker 命令的服务

`docker ps`
