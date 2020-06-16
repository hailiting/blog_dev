# pm2
pm2进程管理工具
## 常用命令
~~~
1 全局安装pm2
npm install -g pm2
2 进入项目根目录
  2.1 启动进程/应用 pm2 start bin/www 或 pm2 start app.js
  2.2 重命名进程/应用 pm2 start app.js --name wb123
  2.3 添加进程/应用 pm2 start bin/www --watch
  2.4 结束进程/应用 pm2 stop www
  2.5 结束所有进程/应用 pm2 stop all
  2.6 删除进程/应用 pm2 delete www
  2.7 删除所有进程/应用 pm2 delete all 
  2.8 列出所有进程/应用 pm2 list
  2.9 查看某个进程/应用的具体情况 pm2 describe www
  2.10 查看进程/应用的资源消耗情况 pm2 monit
  2.11 查看pm2的日志 pm2 logs
  2.12 若要查看某个进程/应用的日志 pm2 logs www
  2.13 重启进程/应用 pm2 restart www
  2.14 重新启动所有进程/应用 pm2 restart all
~~~
## pm2.json
npm 包 
--save【上线需要的依赖包】 dependencies
--save-dev 【上线不需要的依赖包】  devDependenciess
``npm install --production`` 只下载上线需要的依赖包
~~~
pm2 start pm2.json
pm2 stop all

{
  "name": "Mobilemap node service",
  "script": "app.js",
  "log_date_format":"YYYY-MM-DD HH:mm Z",
  "error_file": "/data/logs/mobilemap-node-seriver-stderr-error.log",
  "out_file": "/data/logs/mobilemap-node-seriver-stdout-access.log",
  "watch": true,
  "instances": "max", // 让node代码占满cpu
  "exec_mode": "cluster",  //以主线程的形式运行
}
~~~

## shelljs
~~~
npm i shelljs --save-dev
node deploy.js  // 运行
// deploy.js  shell命令都可以执行
var shell = require("shelljs");
shell.exec("npm install --production");
shell.exec("pm2 start pm2.json");
~~~
