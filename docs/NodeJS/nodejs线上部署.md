# nodejs 线上部署

目前常见的 nodejs 项目部署工具有两个：forever、pm2 这两种

- 1. forever 管理多个站点，每个站点访问量不大，不需要监控
- 2. pm2 网站访问量比较大，需要完整的监控界面

## nginx-conf

- `nginx.conf`

```conf
; nginx.conf
; 代理与反向代理
upstream firsttest {
  server 192.169.0.21:3343;
  server 192.169.0.21:3000;
}
server {
  listen 8080;
  locaion / {
    proxy_pass http://firsttest
  }
}
```

## pm2

### 主要特点

- 内建负载均衡（使用 Node cluster 集群模块）
- 后台运行
- 0 秒停机重载（维护的时候不需要停机）
- 具有 Ubuntu 和 CentOS 的启动脚本
- 停止不稳定的进程（避免无限循环）
- 控制台检测
- 提供 HTTP API
- 远程控制和实时的接口 API(Nodejs 模块，允许和 PM2 进程管理器交互)

### 安装

```shell
> npm install -g pm2
```

### 常用的`pm2`命令

- 1. `pm2 start app.js` 启动 node 项目，进入 Node 项目目录，在目录下使用`pm2 sart app.js`或`pm2 start bin/www`
- 2. `pm2 stop app.js` 停止`pm2`服务
- 3. `pm2 list` 列出由 pm2 管理的所有进程信息，还会显示一个进程会被启动多少次，因为没有处理的异常
- 4. `pm2 monit`监视每个 node 进程的 CPU 的内存的使用情况
- 5. `pm2 logs`显示所有进程日志
- 6. `pm2 stop all`停止所有进程
- 7. `pm2 restart all`重启所有进程
- 8. `pm2 reload all` 0 秒停机重载进程(用于 networked)进程
- 9. `pm2 stop 0` 停止指定的进程
- 10. `pm2 restart 0`重启指定的进程
- 11. `pm2 startup`产生 init 脚本 保持进程活着
- 12. `pm2 web`运行健壮的 computer API endpoint(http://localhost:9615)
- 13. `pm2 delete 0` 杀死指定进程
- 14. `pm2 delete all` 杀死全部进程

### 运行时

- 1. `pm2 start app.js -i max` 根据有效 CPU 数目启动最大进程数目
- 2. `pm2 start app.js -i 3`启动 3 个进程
- 3. `pm2 start app.js -x` 用 fork 模式启动 app.js 而不是使用 cluster
- 4. `pm2 start app.js -x -- -a 23`用 fork 模式启动 app.js 并且传递参数(`-a 23`)
- 5. `pm2 start app.js --name serverone` 启动一个进程并把它命名为 serverone
- 6. `pm2 stop serverone` 停止 serverone 进程
- 7. `pm2 start app.json` 启动进程，在 app.json 里设置选项
- 8. `pm2 start app.js -i max -- -a 23`在-之后给 app.js 传递参数
- 9. `pm2 start app.js -i max -e err.log -o out.log` 启动并生成一个配置文件

### 配置 pm2 启动文件

在项目根目录添加`processes.json`

```json
{
  "apps": [
    {
      "name": "app",
      "cwd": "/home/fullbook",
      "script": "bin/www",
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "error_file": "/var/log/node-app/node-app.stderr.log",
      "out_file": "log/node-app.stdout.log",
      "pid_file": "pids/node-geo-api.pid",
      "instances": 6,
      "min_uptime": "200s",
      "max_restarts": 10,
      "max_memory_restart": "1M",
      "cron_restart": "1 0 * * *",
      "watch": false,
      "merge_logs": true,
      "exec_interpreter": "node",
      "exec_mode": "fork",
      "autorestart": false,
      "vizion": false
    }
  ]
}
```

- `apps` 是一个数组，每一个数组成员都是对应一个 pm2 中运行的应用
- name:应用程序名称
- cwd:应用程序所在的目录
- script:应用程序的脚本路径
- log_date_format:
- error_file:自定义应用程序的错误日志文件
- out_file:自定义应用程序日志文件
- pid_file:自定义应用程序的 pid 文件
- instances:
- min_uptime:最小运行时间，这里设置的是 60s 即如果应用程序在 60s 内退出，pm2 会认为程序异常退出，此时触发重启 max_restarts 设置数量
- max_restarts:设置应用程序异常退出重启的次数，默认 15 次（从 0 开始计数）
- cron_restart:定时启动，解决重启能解决的问题
- watch:是否启用监控模式，默认是 false。如果设置成 true，当应用程序变动时，pm2 会自动重载。这里也可以设置你要监控的文件。
- merge_logs:
- exec_interpreter:应用程序的脚本类型，这里使用的 shell，默认是 nodejs
- exec_mode:应用程序启动模式，这里设置的是 cluster_mode（集群），默认是 fork
- autorestart:启用/禁用应用程序崩溃或退出时自动重启
- vizion:启用/禁用 vizion 特性(版本控制)

**可以通过`pm2 start processes.json`来启动**

```json
"scripts": {
  "start": "node ./bin/www",
  "pm2": "pm2 start processes.json"
}
```
