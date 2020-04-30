# js获取当前端口号
~~~
const getIp = () => {
  var interfaces = require("os").networkInterfaces();
  var hostname = require("os").hostname()
  if (!interfaces) {
    return hostname;
  }
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
};
console.log(getIp())
~~~