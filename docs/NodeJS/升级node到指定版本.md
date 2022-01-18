# 升级 node 到指定版本

- 1. 清除 npm 缓存，并执行命令

```sh
npm cache clean -f
```

- 2. n 模块是专门用来管理 nodejs 的版本，安装 n 模块

```sh
npm install -g n
```

- 3. 更新升级 node 版本

```sh
n stable # 把当前系统的Node更新成最新“稳定版本”
n lts # 长期支持版
n latest # 新版本
n 10.14.2 # 指定安装版本
```

- 4. 查看升级后的 node 版本

```sh
node -v
```
