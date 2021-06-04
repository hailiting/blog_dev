# 简单投票 DApp 测试

## 单元测试

`npm i mocha --save-dev`

### mocha 的主要特点

- 即可以测试简单的 JavaScript 函数，又可以测试异步代码
- 可以自动运行所有测试，也可以只运行特定的测试
- 可以支持`before`, `after`, `beforeEach`和`afterEach`来编写初始化代码

### 用法

```js
// sum.js函数
module.exports = function(...rest) {
  var sum = 0;
  for (let n of rest) {
    sum += n;
  }
  return sum;
};
```

不用 mocha 的时候

```js
const assert = require("assert");
const sum = require("./sum");
assert.strictEqual(sum(), 0); // ===
assert.strictEqual(sum(1), 1);
assert.strictEqual(sum(1, 2), 3);
assert.strictEqual(sum(1, 6), 5);
```

用 node assert 模块的缺点是：没法自动运行测试，而且如果 第一个 assert 报错，后面的测试就执行不了了。  
用 mocha 改写

```js
const assert = require("assert");
const sum = require("./sum");
describe("#sum.js", () => {
  it("sum() should return 0", () => {
    assert.strictEqual(sum(), 0);
  });
  it("sum(1) should return 1", () => {
    assert.strictEqual(sum(1), 1);
  });
  it("sum(1,2) should return 3", () => {
    assert.strictEqual(sum(1, 2), 3);
  });
  it("sum(1,3) should return 4", () => {
    assert.strictEqual(sum(1, 3), 4);
  });
});
// ./node_modules/mocha/bin/mocha
```

### 编写合约测试脚本

```js
const path = require("path");
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
// 1. 配置 provider
const web3 = new Web3(ganache.provider());
// 2. 拿到abi和bytecode
const compiledFile = require("./compile");
const interface = compiledFile.abi;
const byteCode = compiledFile.evm.bytecode.object;

let accounts;
let contract;
const initialBrand = "BMW";
describe("contract", () => {
  before(() => {
    console.log("测试开始！");
  });
  after(() => {
    console.log("测试结束! bye");
  });
  // 3. 每次跑单侧(it)时需要部署全新的合约实例，起到隔离的作用
  beforeEach(async () => {
    accounts = await web3.eth.getAcoount();
    console.log("合约部署账户：", accounts[0]);
    contract = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: [initialBrand] })
      .send({ from: accounts[0], gas: "1000000" });
    console.log("合约部署成功：" + contract.options.address);
  });
  // 4. 编写测试用例
  it("部署合约", () => {
    assert.ok(contract.options.address);
  });
  it("初始值和 initialBrand 相等", async () => {
    const brand = await contract.methods.brand().call();
    assert.equal(brand, initialBrand);
  });
  it("能够改变 brand", async () => {
    const newBrand = "Benz";
    await contract.methods.setBrand(newBrand).send({ from: accounts[0] });
    const brand = await contract.methods.brand().call();
    assert.equal(brand, newBrand);
  });
});
```

**运行脚本**
`./node_modules/.bin/mocha tests`

- `contract.methods.brand().call()`调用合约上的方法，通常是取数据，立即返回，与`v0.20.1`版本中的`.call()`相同；
- `contract.methods.setBrand("xxx").send()`，对合约发起交易，通常是修改数据。返回的是交易`Hash`,相当于`v0.20.1`中的`sendTransaction()`；
- `send()`必须制定发起账户地址，而`call`可以直接调用；
- 在`v1.0.0`中，`contract`后面要加`.methods`然后才能跟合约函数名，类似的, `v1.0.0`中事件的监听也要`contract`后加`.events`;
