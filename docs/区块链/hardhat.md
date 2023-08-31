# hardhat

https://hardhat.org/hardhat-runner/docs/guides/project-setup
集成开发环境

- 开发环境：编译、单元测试、console
- 本地测试网：Hardhat Network
- Plugins: ...

```sh
npx hardhat clean # 删除缓存
npx hardhat init
npx hardhat test test/ERC20Token.test.ts
# 部署代码
npx hardhat run scripts/deploy.ts --network bsc-testnet
# 查看初始函数的参数
# ----
# 验证代码
npm i @nomiclabs/hardhat-etherscan --save-dev
npx hardhat verify --network bsc-testnet  0x73B2C654e5050790B2BF9380d0C870Af25574777 xxx
# 复杂的参数
npx hardhat verify --network bsc-testnet --constructor-args arguments.ts 0x73B2C654e5050790B2BF9380d0C870Af25574777
```

```js
// arguments.ts
module.exports = [
  50,
  {
    x: 10,
    y: 10,
  },
];
```

### hardhat 使用流程

```bash
1. 安装
mkdir hhproject && cd hhproject
mkdir chain && cd chain
yarn init -y
yarn add hardhat

2. 初始化一个项目
yarn hardhat

3. 使用示例：编译-测试-部署
# 编译合约
yarn hardhat compile
# 单元测试
yarn hardhat test
yarn hardhat test test/Ballot.test.ts
# 部署合约到(in-process)测试链
yarn hardhat run ./scripts/deploy_greeter.ts

4. 使用示例：独立测试链
# 另一终端窗口，运行独立的（standalone）本地测试链
yarn hardhat node
# 部署到刚刚运行的测试链
yarn hardhat run ./scripts/deploy_greeter.ts --network localhost

```

## 在线测试

https://dashboard.tenderly.co/

## 在线编辑

https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js

```bash
# 部署合约
yarn hardhat run scripts/deploy_classtoken.ts --network localhost
```

```sol
// 版本一
contract Greeter {
  string private greeting;
  constructor(string memory _greeting) {
    greeting = _greeting;
  }
  function greet() public view returns (string memory){
    return greeting;
  }
  function setGreeting(string memory _greeting) public {
    greeting = _greeting;
  }
}
// 版本二  bytes 比 string 节省空间
contract GreeterBytes {
  bytes32 private greeting;
  constructor(bytes32 _greeting) {
    greeting = _greeting;
  }
  function greet() public returns (bytes32){
    return greeting;
  }
  function setGreeting(bytes32 _greeting) public {
    greeting = _greeting;
  }
}

<!-- 用ethers.js -->
const greet = ethers.utils.formatBytes32String("Hello, world");
// bytes32
console.log(string(abi.encodePacked(greeting)));
```
