# happypack

webpack 是在 nodejs 上运行的，使用的是 JavaScript 语言，所以是单线程模型，当 webpack 处理体积大的文件模块时，会很耗时间，`happypack`为的就是解决这么问他。
`happypack`能够通过多进程发挥多核 CPU 能力【无法通过多线程实现，因为 JavaScript 是单线程模型】，当 webpack 打包时，它把任务分解给多个子进程去并发的执行，子进程处理完后在将结果发送到主进程。
tips: HappyPack 对`file-loader`, `url-loader`支持的不太友好，所以不建议对该 loader 使用。

## 运行机制

[!happypack01.png](./img/happypack01.png)

## 如何使用

```shell
npm i happypack -D
```

```js
// webpack.config.js
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

module.exports = {
  module: {
    rules: [
      test: /\.js$/,
      // 把对.js文件的处理交到id为happyBabel的HappyPack实例执行
      loader: "happypack/loader?id=happyBabel",
      exclude: /node_modules/
    ]
  },
  plugins: [
    new HappyPack({
      // 用id来标识 happypack 处理那些类文件
      id: "happyBabel",
      // 如何处理，用法和loader的配置一样
      loaders: [{
        loader: "babel-loader?cacheDirectory=true",
      }],
      // 共享进程池
      threadPool: happyThreaadPool,
      // 允许HappyPack输出日志
      verbose: true,
    })
  ]
}
```

## `happypack`常用参数

- `id: string`: 唯一标识符 id，用来代表当前的 HappyPack 是用来处理一类特定的文件；
- `loaders: Array`: 用法和 webpack Loader 配置中的一样；
- `threads: Number`: 代表开启几个子进程去处理这一类型，默认是 3 个，必须是整数；
- `verbose: Boolean`: 是否允许 HappyPack 输出日志，默认为 true；
- `threadPool: HappyThreadPool`: 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防资源被占用过多；
- `verboseWhenProfiling: Boolean`: 开启`webpack --profile`, 仍然希望 HappyPack 产生输出；
- `debug: Boolean`: 启用 debug 用于故障排查，默认为 false;
