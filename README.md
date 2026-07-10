# https://hailiting.github.io/blog_dev/

## AI 的前端提示词

你是我的好朋友也是一个在前端、后端、移动端、游戏开发、web3 合约、密码学、链等领域的专家，你能向我传授这些方面的知识，并帮我定制详细的学习路线，可以给我推荐国内好的付费课程，并给我安排学习时间表，你希望我能成为上面领域专家级别的人才。
你的教学方法受到理查德-费曼教学法的启发。你会通过清晰而引人入胜的解释，让复杂的问题变得通俗易懂，你会将信息分解成更简单的部分，使用类比，并将概念与日常经验联系起来，以加深理解
放轻松，我的智商可能不是很高你需要从最简单的细节讲起，然后我的耐心不是很多需要你简短而清晰的告诉我答案。

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

```bash
## 1. 查看版本
zsh --version
brew info zsh
## 2. 更新zsh版本
brew install zsh zsh-completions
## 3. 设置默认的bash工具是zsh
chsh -s /bin/zsh

# chsh: no changes made

dscl . -read /Users/$USER/ UserShell
exec su - $USER


## 4. 验证是否替换成功
echo $SHELL
zsh --version
```

##### 2. `oh-my-zsh`安装

```
<!-- homebrew -->
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
eval "$(/opt/homebrew/bin/brew shellenv)"
brew install wget

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

### twitter 资源强制刷新

`https://cards-dev.twitter.com/validator`

## 让图片点起来的网站

https://convert.leiapix.com/animation

高公班
风水培训班
命理班

- **第一优先级**（立刻提升「好不好找工作」）
  TypeScript 深度 + React 工程化
  构建、性能、复杂表单/表格、状态管理、错误边界、可测性。
  计算机基础补一点
  HTTP、缓存、鉴权（Cookie/Token）、并发与竞态（和钱包/交易 UI 也相关）。
  把一个项目讲到「指标级」
  首屏、错误率、转化率、客服工单下降等——任意行业都吃这套叙事。
- **第二优先级**（6 个月内，扩宽雇主面）
  B 端常见能力
  权限模型（RBAC）、审计日志、导入导出、列表筛选与批量操作、可访问性基础。
  AI 应用前端（若你愿意跟热点）
  流式输出、会话状态、文件上传与解析、服务端转发密钥、提示词与产品边界（不必先学训模型）。
  英语（若你想远程/外企）
  读写技术文档 + 面试口语，回报率常被低估。
- **第三优先级**（可选，和 Web3 叠加）
  安全与风控意识
  钓鱼、授权（approve）、签名内容可读性——Web3 差异化，也能迁移到支付/金融类 B 端。
  自动化测试
  Playwright / Vitest 等，中小团队很缺，面试区分度高。
  暂时往后放（除非你已决定转岗）
  深挖算法竞赛、底层区块链协议——对「延续前端职业生涯」性价比通常不如上面几条。

两三门课
CS CSbla 操作系统 编译器
day
自媒体

1. 用 claude code
2. 写出最小版本的 claude code，逐步完善
3. 写出 opencloud
