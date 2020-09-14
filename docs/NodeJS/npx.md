# npx

npm 从 5.2 版本开始，增加了 npx 命令，Node 自带 npm 模块，所以可以直接使用 npx 命令，万一不能用，可以手动安装一下：

```
npm install -g npx
```

- npx 想要解决的主要问题，就是调用项目内部安装的模块。

## 调用项目安装模块

这是用 npm 安装并调用

```
npm install -D mocha
// package.json  scripts
node-modules/.bin/mocha --version
```

而 npx 可 `npx mocha --version`这样调用
npx 原理是：运行的时候，会到`node_modules/.bin`路劲和环境变量`$path`里检查变量是否存在。
Bash 内置命令不在`$path`里，例如 `npx ls` 可以 `npx cd` 找不到

## 避免全局安装模块

```
npx create-react-app my-react-app
```

像上面的代码，npx 会将 create-react-app 下载到一个临时目录，使用后在删除，所以再次执行上面命令，会重新下载 create-react-app。

### npx 容许指定版本

```
npx uglify-js@3.1.0 main.js -o ./dist/main.js
```

下载指定版本的 uglify-js 压缩脚本。
npx 后面的模块本地没有或没发现时，会下载同名模块。

```
npx http-server
```

本地没有 http-server 模块，会自动下载并在当前目录启动一个 web 服务。

#### --no-install 参数和 --ignore-existing 参数

--no-install 强制使用本地模块，不下载远程模块【本地没有会报错】
--ignore-existing 强制使用远程模块，不使用本地模块

```
npx --no-install http-server
npx --ignore-existing create-react-app my-react-app
```

#### 使用不同版本的 node

```
npx node@0.12.8 -v
```

原理是从 npm 下载这个版本的 node,使用后在输掉

#### -p 参数

`-p`参数用于指定 npx 所要安装的模块

```
npx -p node@0.12.8 node -v
```

先指定安装 node 版本，然后执行`node -v`，`-p`参数对于安装多个模块有用。

```
npx -p lolcat.js -p cowsay [command]
```

#### -c 参数

-c 执行多模块

```
npx -p locatjs -p cowsay -c 'cowsay hello | lolcatjs'
```

将环境变量带入所要执行的命令

```
// 查看环境变量
npm run env | grep npm_
npx -c "echo \"$npm_package_name\""  // 输出当前项目名称
```

#### 执行 GitHub 源码

tips: 远程代码必须是一个模块，必须包含 package.json 和入口脚本

```
npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32

npx github:piuccio/cowsay hello
```
