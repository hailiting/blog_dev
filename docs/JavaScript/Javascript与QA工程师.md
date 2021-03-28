# JavascriptQA 工程师

工程师：白盒 黑盒

## 测试核心概念

- 单元测试
- 性能测试
- 安全测试
- 功能测试

## 为什么要测试

- 正确性
  测试可以验证代码的正确性，在上线前做到心里有底
- 自动化
  通过 console 打印内部消息的手工测试是一次性的事情，下次测试还得从头再来，效率不能得到保证。通过编写测试用例，一次编写，多次运行
- 解释性
  测试用例用于测试接口、模块的重要性。在测试用例中涉及使用到的 Api 的测试用例有时会比文档更清晰
- 驱动开发，指导设计
  代码被测试的前提是代码本身的可测试性，那么要保证代码的可测试性，就需要在开发中注意 Api 的设计，TDD（测试驱动开发）
- 保证重构
  产品迭代速度快，有测试用例做后盾，可以大胆的进行重构

## 单元测试

目的：单元测试能让开发者明确知道代码的结果
原则：单一职责，接口抽象，层次分离
断言库：保证最小单元是否正常运行检测方法
测试风格：测试驱动开发(Test-Driven Development, TDD)、行为驱动开发(Behavior Driven Development, BDD)【都属于敏捷开发的方法论】

TDD 关注所有功能是否被实现（每一个功能都必须有对应的测试用例），`suite配合test利用assert("tobi"==user.name)`;
BDD 关注整体行为是否符合整体预期，编写的每一行代码都有目的的提供一个全面的测试用例集。expect/should, describe 配合 it 利用自然语言处理`expect(1).toEqual(fn())`执行结果。

### 单元测试框架

```
better-assert(TDD断言库)
should.js(BDD断言库)
expect.js(BDD断言库)
chai.js(TDD BDD双模)
Jasmine.js(BDD)
Node.js本身集成require("assert");
Intern 更大而全的单元测试框架
QUnit 一个游离在JQuery左右的测试框架
Macaca 国产（阿里）
```

### 单元测试运行流程

每个测试用例组通过 describe 进行设置
`before->beforeEach->it->after->afterEach`
1，before 单个测试用例(it)开始前
2，beforeEach 每个测试用例开始前
3，it: 定义测试用例，并利用断言库进行设置 chai。如：expect(x).to.equal(true);异步 mocha。
4，以上专业术语叫 mock

### 自动化单元测试

karma 自动化 runner 集成 PhantomJS 无刷新

```
npm install karma --save-dev
npm install karma-cli --save-dev
npm install karma-chrome-launcher --save-dev
npm install karma-phantomjs-launcher --save-dev
npm install karma-mocha --save-dev
npm install karma-chai --save-dev
npm install karma-coverage --save-dev【报告和测试覆盖率检查】
[coverageReporter: {type:"html", dir:"coverage/"}]
```

```
"karma": "^1.4.1",
"chai": "^4.1.2",
"cross-env": "^5.0.1",
"karma-coverage": "^1.1.1",
"karma-mocha": "^1.3.0",
"karma-phantomjs-launcher": "^1.0.2",
"karma-phantomjs-shim": "^1.4.0",
"karma-sinon-chai": "^1.3.1",
"karma-sourcemap-loader": "^0.3.7",
"karma-spec-reporter": "0.0.31",
"karma-webpack": "^2.0.2",
"mocha": "^3.2.0",
"sinon": "^4.0.0",
"sinon-chai": "^2.8.0",
"inject-loader": "^3.0.0",
"babel-plugin-istanbul": "^4.1.1",
"phantomjs-prebuilt": "^2.1.14",
```

## 基准测试

- 面向切面编程 AOP 无侵入式
- Benchmark 基准测试方法，它并不是简单地统计执行多少次测试代码后对比时间，它对测试有着严密的抽样过程。执行多少次取决于采样到数据能否完成统计。根据统计次数计算方差。

## 压力测试

- 对网络接口做压力测试需要检查的几个常用指标有：吞吐率、响应时间、并发数，这些指标反映了服务器并发处理能力。
- PV 网站当日访问人数 UV 独立访问人数。 PV 每天在几十万过更高就需要考虑压力测试。换算公式：`QPS=PV/t`。【1000000/10*60*60=27.7 =》 100 万请求集中在 10 个小时，服务器每秒处理 27.7 个业务请求】
- 常用压力测试工具是 ab、siege、http_load
- ab -c 100 -n 100 http://localhost:8001 每秒持续发出 28 个请求。
  Request per second 表示服务器每秒请求数 即为 QPS
  Failed requests 表示此次请求失败的请求数
  理论上压测值越大，增加 ConnectionTimes 连接时间，它包括客户端向服务器端建立连接、服务器端处理请求、等待报文响应等过程。

## 安全测试

安全漏洞检查

- XSS
- SQL
- CSRF

## 功能测试

## 用户真实性检查

```
selenium-webdriver
protractor selenium-standalone
http://webdriver.io webdriver i/o
```

#### 冒烟测试 SmokeTest

自由测试的一种，找到 BUG 开发修复，然后专门针对此 BUG，优点：节省时间，防止 build 失败，缺点是覆盖率低。

#### 回归测试

修改一处对整体功能全部测试，一般配合自动化测试。

### Javascript Lint & Hint

- 目的：检测 Javascript 代码标准
- 原因：Javascript 代码诡异，保证团队代码规范
- 搭配自动化任务管理工具完善自动化测试 grunt-jshint、grunt-jslint

## 具体实践

短点
1，karma 集成 webpack
2，selenium-webdriver 的具体实现

### karma 单元测试

1，安装 karma 环境

```
// 无头浏览器
npm install phantomjs --save-dev
// karma发射器
npm install --save-dev karma-phantomjs-launcher
npm install karma --save-dev
npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev
// karma-chrome-launcher 打开chrome浏览器
// jasmine-core 断言库
```

2，karma init
Which testing framework do you want to use ? 使用什么断言库

- jasmine
  Do you want to use Require.js ?
- no
  Do you want to capture any browsers automatically ? 自动化运行环境【测试运行环境放哪】
- PhantomJS // 无头浏览器
  What is the location of your source and test files ? 哪些文件需要监听
  "test/\**/*Spec.js".
  Should any of the files included by the previous patterns be excluded ? 哪些文件不管

Do you want Karma to watch all the files and run the tests on change ? 是否监测测试文件的变化

- no

就会生成一个 karma.conf.js 到根目录

3，测试
xx.spec.js
karma start

4，生成报告
`npm install karma-coverage --save-dev`

```
module.exports = function(config){
  config.set({
    files:[
      "src/**/*.js",
      "test/**/*.js",
    ],
    reporters: ["progress", "coverage"],
    // 指定对应的JS文件，去执行代码覆盖率
    preprocessors: [
      "src/**/*.js": ["coverage"]
    ],
    // 生成报表
    coverageReporter: {
      type: "html",
      dir: "coverage/"
    }
  })
}
```

如果想 karma start 运行，karma-coverage 必须全局装

PM 产品 FE 前端 RD 后端

### backstop UI 走查

- 用 Puppeteer 脚本模拟用户交互
- CLI 报告
- JUnit 报告
- 与 CI 和源代码管理配合使用
  1，`npm install -g backstopjs`
  2，`backstop init`  
  根目录会有 backstop.json 和 engine_scripts 文件夹
  backstop.json

```
id: "自动生成一个文件，避免与BackstopJS资源名冲突",
// 测试项目的一系列屏幕尺寸对象（至少一个）
scenarios: [
  {
    "label": "phone",
    "width": 320,
    "height": 480
  }
],
// 分块截图
scenarios: [
  {
    label: "截图名称",
    "url": "项目地址"
  }
]
// 输出配置
paths
```

engine_scripts 里可以设置 cookies 等，可以编程。

##### ui 图放在 bitmaps_reference 里

backstop_default_BackstopJS_Homepage_0_document_0_web.png

3, `backstop test`

### 自动化 selenium-webdriver

1,

```
npm install selenium-webdriver
```

2, 下载驱动，并解压到本地
npm 页面有好多浏览器的下载包，选择适合本机的下载
3,
`npm install --save-dev puppeteer rize`

```
// 为了看到这个过程发生了什么headless: false
const Rize = require('rize');
const rize = new Rize({ headless: false })
rize
  .goto('https://github.com/')
  .type('input.header-search-input', 'node')
  .press('Enter')
  .waitForNavigation()
  .saveScreenshot('searching-node.png')
  .end()
```

### mocha 异步测试

```
mocha test.js --reporter mochawesome --reporter-options reportDir=customReportDir,reportFilename=customReportFilename
```

1，新建 mochaRunner.js 文件

```
npm i mocha --save
npm i mochawesome --save

const Mocha = require("mocha");
const mocha = new Mocha({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "./docs/mochawesome-report",
    reportFilename: "mochawesome-report"
  }
});

mocha.addFile("./service/router.spec.js");
mocha.run(function () {
  process.exit();
})
```

```
npm install supertest --save
```

```
// router.spec.js
const superagent = require("supertest");

const app = require("./app");


function request() {
  return superagent(app.listen());
}

describe("后台接口测试", function () {
  it("test接口测试", (done) => {
    request()
      .get("/test")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, response) {
        console.log(response)
        if (response.data == "ok message") {
          done("ok")
        } else {
          done("err")
        }
      })
  })
})
```

### chai 断言库

```
npm i chai --save
```

```
const axios = require("axios");
const { expect } = require("chai");

describe("后台接口测试", function () {
  it("test接口测试", function (done) {
    axios.get("http://localhost:3100/test")
      .then(function (response) {
        console.log(response.data.data)
        expect(response.status).to.equal(200);
        if (response.data.data == "ok message111") {
          done();
        } else {
          done(new Error("数据不符合预期"));
        }
      }).catch(function (error) {
        done(error);
      })
  })
})
```

#### chai 断言库常用语句

```
chai .should();
foo.should.be.a("string");
foo.should.equal("bar");
foo.should.have.lengthOf(3);
tea.should.have.property("flavors").with.lengthOf(3);
```

```
var expect = chai.expect;
expect(foo).to.be.a("string");
expect(foo).to.equal("bar");
expect(foo).to.have.lengthOf(3);
expect(tea).to.have.property("flavors").with.lengthOf(3);
```

```
var assert = chai.assert;
assert.typeOf(foo, "string");
assert.equal(foo, "bar");
assert.lengthOf(foo, 3);
assert.property(tea, "flavors");
assert.lengthOf(tea.flavors, 3)
```
