# https://hailiting.github.io/blog_dev/

## 怎么读源码

- 1. 可以看 commit
- 2. 国外的文章，大致了解一下当下框架的过程
- 3. path.js -> 简单的学习一遍->试着做一个简易的版本
- 4. debug 一步步
- 5. 带着下一个问题再去看，最后一步搬砖
- 6. github 的 issue【讨论的人多说明有质量】

## 好用的  工具网站

### 图片压缩

https://tinypng.com/

### https://www.snapmail.cc/#/

邮箱快速注册 

### https://icomoon.io/app/#/select

多个 svg 转单个

### http://kangax.github.io/compat-table/es2016plus/

查看 js 属性在各大浏览器支持的情况

### http://www.cx121.com/sfz/

身份证号

### https://www.materialtools.com/

手机号

### Tunnelblick vpn 挂载工具

### https://lab.miguelmota.com/ethereum-input-data-decoder/example/

区块链 解析 input 参数的工具

### png 转 svg

https://www.aconvert.com/cn/image/png-to-svg/

### mac 终端美化

#### `oh-my-zsh`

### octotree github 侧边栏文件夹

##### 1. 升级本地 zsh 版本

```
## 1. 查看版本
zsh --version
brew info zsh
## 2. 更新zsh版本
brew install zsh zsh-completions
## 3. 设置默认的bash工具是zsh
chsh -s /bin/zsh
## 4. 验证是否替换成功
echo $SHELL
zsh --version
```

##### 2. `oh-my-zsh`安装

```
sh -c "$(wget -O- https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

- 如果拉不下来，就手动安装

```
## 下载源码
git clone https://github.com/robbyrussell/oh-my-zsh
## 执行安装命令
cd oh-my-zsh/tools
sh install.sh
```

## 必要的技能

- 前端开发技能
  - HTML、CSS、JavaScript 基础
    - 学习地址：W3School, MDN Web Docs, Codecademy
  - React 或 Vue 框架
    - React 官方文档、React 官方教程、React 入门实战教程、React 学习路径等
  - TypeScript
  - Webpack
- 后端开发技能
  - Java 或 Python 基础
  - Spring 或 Django 框架
  - 数据库基础和 SQL
  - RESTful API 和微服务
- 数据科学技能
  - Python 编程基础
  - Scikit-learn 或 TensorFlow 等机器学习库
  - 数据库基础和 SQL
- 其他技能
  - 英语能力
    - 英语学习网站：Duolingo、BBC Learning English、TED、Coursera、edX 等提供免费的英语学习资源
    - 语言交流平台：HelloTalk、Tandem 等提供在线语言交流平台，可以和母语人士互相学习和交流。

### 全栈

- 前端 - Flutter - React - Vue - Webpack
- 后端 - NodeJS - Java - PHP - go - MySQL - MongoDB
- 钱包 - Web3 - Solidity
