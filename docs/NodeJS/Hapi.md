# Hapi
~~~
npm install @hapi/hapi@18.4.1
~~~
## 实例
~~~
const Hapi = require("@hapi/hapi");
const routers = require("./routers")

const server = Hapi.server({
  port: 3999,
  host: 'localhost'
});

async function start() {
  await server.start();
  // 注册插件 引用静态资源需要的插件
  await server.register(require("inert"))
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
      logEvents: ["response"]
    }
  });
  for (let router of routers) {
    server.route({
      method: router.method,
      path: router.path,
      handler: router.handler
    });
  }
  console.log('Server running on %s', server.info.uri);
}
start();


process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
// router
var path = require("path")
var home = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello World!';
  }
}
var username = {
  method: 'GET',
  path: '/username/{name}',
  handler: (request, h) => {
    return `Hello ${encodeURIComponent(request.params.name)}!`;
  }
}
var indexHtml = {
  method: 'GET',
  path: '/index',
  handler: (request, h) => {
    /**
    * 需要权限
    * 1，是否是 当前跟目录 chmod 777 public
    * 2，路径是否引用错误  全路径
    */
    request.logger.info("In handler %s", request.path);
    return h.file(path.join(__dirname, "../public/index.html"));
  }
}
module.exports = [home, username, indexHtml]
~~~
