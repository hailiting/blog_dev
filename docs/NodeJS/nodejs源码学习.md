# nodejs 源码学习

```bash
git clone https://github.com/nodejs/node.git
cd node
./configure && make
make install
make test
```

## 源文件三大类

- 纯`Javascript`写的核心模块
- 带`NativeBinding`的`JavaScript`核心模块
- `C++`文件

## `/lib` js 代码

下划线开头的不是直接暴露的接口
**`_debug_agent.js + _deblugger.js`**
命令行工具，通过一些输入，通过协议转给 v8，进行断点调试。
debug 接口，基于 TCP 协议通信，
通过用户收入
**http_client**
客户端请求 http_agent 代理
**http_incoming.js http_outgoing.js**
接收和返回
**http_server**
对 http 模块组装和暴露接口

**stream**

数据流

- duplex 即可写也可读(具体应用到 paththrough)
- passthrougth
- readable 可以读到什么信息
- writable 写
- transform 传递什么数据
- wrap

**tls buffer child_process**
创建子进程相关的接口会在这里暴露
接口暴露
**dgram**
udp 相关的接口
**dns**
**events**
事件和触发相关的代码
**module.js**
模块加载相关的接口 - require exports
**net**
tcp（不包含 tls）
**os**
获取操作系统信息相关的接口
**path**
pathname 及解析相关的函数
**process**
本身是个`stream`
**querystring**
url 参数的解析
**repl**
R(read)、E(evaluate)、P(print)、L(loop)
**v8**

## `/src` c++ 代码

```c++
int Start(int argc, char** argv){

}
```

## node patch

- 1. 问题

```bash
branch name: fix/gh-{num}
commit message: "module name: description"
test/parallel/test-*.js
```
