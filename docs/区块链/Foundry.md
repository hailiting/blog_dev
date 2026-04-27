# Foundry 智能合约开发工具链

- Foundry入门
  - 项目初始化、编译、测试、部署 全流程
- 以ERC20为例，Foundry 实际可用
  - 导入Openzepplin依赖
  - cast账号管理账号、交互
  - 代码开源

## 历史的开发框架

- Truffle: 最早的框架
- Hardhat: 插件丰富，方便前端联调，对JS开发者友好
- Foundry: Rust开发、编译快、原生Sol测试（很多作弊码）、支持fuzz等
- APEWorX(Brownie继任者): Python开发、Python编写测试

## Foundry开发套件

- forgo: 管理依赖包、编译、运行、测试、部署合约
- cast: 命令行工具、链交互
- anvil: 启动本地节点
- chisel: 运行 Solidity代码片段
- 官网：https://getfoundry.sh
- 文档：https://book.getfoundry.sh/
- 中文文档：https://learnblockchain.cn/docs/foundry/i18n/zh/

## 安装

- `curl -L https://foundry.paradigm.xyz | bash`
  - 会安装Foundryup
    - Foundryup是Foundry工具链的安装程序
    - 单独运行foundryup, 可以升级到最新版本

## forge 项目

```shell
forge init project_name
forge init --template https://github.com/foundry-rs/forge-template hello_foundry
```

- 项目结构
  - cache: forge 缓存信息，在forge build后出现
  - lib: 存放依赖库（默认安装 forge-std）
  - out: 存放编译输出文件
  - **script**: 合约脚本，可用于部署合约、广播交易
  - **src**: 合约源代码
  - **test**: 测试合约代码
  - **foundry.toml**: 项目 foundy 配置

- 编译使用`forge build`
  - 在 out 目录下生成abi、字节码及编译相关信息
  - `forge inspect`以用来查看合约编译产物和元信息
- 合约测试
  - 编写测试用例
    - 1. 测试文件默认用`t.sol`结尾，也可 `CounterTest.sol`
    - 2. 导入Test合约: 提供了基本的日志和断言功能
    - 3. 导入测试目标合约
    - 4. 继承Test合约，使用Test功能
    - 5. Setup函数(可选): 每个测试用例运行前都调用
    - 6. 前缀为test的函数将作为测试用例运行
    - 7. testFuzz 模糊测试: 测试用例的参数值，由foundry随机抽样
  - `forge test / forge test test/Counter.t.sol`
- 合约部署
  - 准备: 钱包账号 + RPC URL
  - 本地启动：anvil
    - 在 `127.0.0.1:8585` 启动服务
    - 默认配置10个账号
    - `--fork-url` 基于网络的状态启动一个本地模拟环境

```shell
anvil
anvil --fork-url <RPC_RUL>
```

- 方式一: 运行部署
  - `forge create Counter --private-key 0xxxx --rpc-url xxx --broadcast`
    - RPC_URL 默认为 `http://localhost:8545`
    - 如果只是模拟执行，去掉 `--broadcast`
- 方式二: `forge script`执行脚本文件来部署合约
  - `forge script script/Counter.s.sol --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7b f4f2ff80 --rpc-url http://localhost:8545 --broadcast`

```solidity
contract CounterScript is Script {
  Counter public counter;
  function setUp() public {}
  function run() public {
    vm.startBroadcast();
    counter = new Counter();
    vm.stopBroadcast();
  }
}
```

## Demo

- 导入 Openzepplin 依赖
- Cast 管理部署账号、链交互
- 开源合约

- 安装依赖
  - `forge install OpenZeppelin/openzeppelin-contracts`
  - `forge update openzeppelin-contracts`
  - `forge remove openzeppelin-contracts`
- Forge 依赖库重映射
  - Forge 可重新映射依赖项，使它们更容易导入
  - 映射推导: `forge remappings > remappings.txt`
- 准备部署账号
  - 不要把账号放在代码库中(`.ignore`忽略)，通常`.env`记录相关信息，私钥三种形式
    - 私钥
    - 助记词
    - keystore 文件 (加密更安全)
- Cast
  - Wallet 命令
  - Chain、Transaction、Block 命令
  - Account 命令
  - ENS 命令
  - Etherscan 命令
  - ABI、Conversion、Utility 命令

```shell
cast wallet -h # 查看所有命令选项
cast wallet new [DIR] <ACCOUNT_NAME> # Create a new random keypair
cast wallet new-mnemonic # mnemonic phrase
cast wallet address [PRIVATE_KEY] # private key to an address
cast wallet import -i -k <KEYTORE_DIR> <ACCOUNT_NAME>
cast wallet import --mnemonic "xxx" -k .keys ACCOUNT_NAME

cast wallet import a --interactive



history | grep "--<keys>"
```

- 使用 cast wallet 账号部署
  - 用 keystore 账号部署

```shell
# 部署
# test_test 在 ~/.foundry/keystores 里
forge create Counter --acount <ACCOUNT_NAME>
forge create Counter --account test_test --rpc-url http://localhost:9999 --broadcast

forge script script/Counter.s.sol --account <ACCOUNT_NAME> --rpc-url http://localhost:9999 --broadcast
forge create Counter --keystore .keys/wallet1 --rpc-url http://localhost:9999 --broadcast
```

- 用Solidity加载账号

```solidity
function setUp() public virtual {
  mnemonic = vm.envString("MNEMONIC");
  (deployer,) = deriveRememberKey(mnemonic, 0);
  // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
  // user = vm.addr(deployerPrivateKey);
}
```

- `broadcast/*.json`自动记录地址，但自动生成但结构较复杂，不便读取，可用作弊码手动保存

```solidity
function saveContract(string memory name, address addr) public {
  string memory chainId = vm.toString(block.chainid);
  string memory json1 = "key";
  string memory finalJson = vm.serializeAddress(json1, "address", addr);
  string memory dirPath = string.concat(string.concat("deployments/", name), "_");
  vm.writeJson(finalJson, string.concat(dirPath, string.concat(chainId, ".json")));
}
// foundry.toml 配置文件权限
fs_permissions = [
  {
    access="write",
    path="./deployments"
  }
]
```

- 配置 rpc-url
  - `.env`配置网络节点URL
  - `foundry.toml`配置节点

```shell
# .env
SEPOLIA_RPC_URL="xxx"
LOCAL_URL="http://127.0.0.1:8545"

source .env # 应用环境变量
forge script script/MyERC20_2.s.sol --rpc-url $LOCAL_URL --broadcast
```

```toml
[rpc_endpoints]
local="http://127.0.0.1:8545"

forge create Counter --account test_test --broadcast --rpc-url local
```

- 开源合约代码
  - 公开合约源代码，增加合约信任
  - 在 etherscan 浏览器申请一个 key: https://etherscan.io/myaccount
  - foundry.toml 配置

```toml
[rpc_endpoints]
sepolia = "${SEPOLIA_RPC_URL}"
mumbai = "${MUMBAI_RPC_URL}"



<!-- 部署 -->
> forge create Counter --account camp2 --rpc-url $SEPOLIA_RPC_URL --broadcast —
verify
> forge script script/Counter.s.sol --account camp2 --rpc-url sepolia --broadcast —verify
```

- 开源验证
  - 开源的服务
    - etherscan | sourcify

```shell
forge verify-contract \
0x98dFd785d9f0083797D2708791DF77f41843F594 \
src/MyERC20.sol:MyERC20 \
--constructor-args $(cast abi-encode "constructor(string,string)" "OpenSpace S6"
"OS6") \
--verifier etherscan \
# --verifier-url https://api-sepolia.etherscan.io/api \
--etherscan-api-key $ETHERSCAN_API_KEY \
--chain-id 11155111
```

- 合约交互
  - 查看 eth 余额：
    - cast balance 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  - 转账：
    - cast send toAddr --value 1ether --private-key <private-key>
  - 查看 erc20 余额 cast call
    - cast call 0x5FbDB2315678afecb367f032d93F642f64180aa3 “number()”
  - 参数编码：
    - cast abi-encode "constructor(string,string)" "OpenSpace S6" “OS6”
    - 更多： https://book.getfoundry.sh/reference/cast/

- foundry 测试
  - Console.log 调试 `https://book.getfoundry.sh/reference/forge-std/console-log`
  - 合约测试
    - 测试报告
    - 作弊码、分叉测试
  - 合约高阶测试方法：模糊测试、不变量测试

- Console.log 最多支持 4 个参数、4 个类型：uint、string、bool、address
  - 还有一些变种函数：
  - console.logInt(int i)
  - console.logString(string memory s)
  - console.logBytes1()、 console.logBytes2(bytes2 b) …
  - 支持打印格式化内容: %s, %d
  - console.log("Changing owner from %s to %s", currentOwner, newOwner)
  - 在测试网、主网上执行时，无效，但会消耗 gas

```solidity
import "forge-std/console.sol";
contract Counter {
  uint256 public number;
  function setNumber(uint256 newNumber) public {
    number = newNumber;
    console.log("Number set to ", number);
  }
  function increment() public {
    number++;
    console.log("Number incremented to ", number);
  }
}
```

- 测试命令
  - forge test -h
    - Test filtering:
    - --match-test <REGEX> 仅运⾏与指定的正则表达式模式匹配的测试函数 [别名: mt]
    - --no-match-test <REGEX> 仅运⾏不符合指定正则表达式模式的测试函数 [别名: nmt]
    - --match-contract <REGEX> 仅运⾏与指定正则表达式模式匹配的合约中的测试 [别名: mc]
    - --no-match-contract <REGEX> 仅运⾏不符合指定正则表达式模式的合约中的测试 [别名: nmc]
    - v 越多，显⽰的测试报告越详细
      - `-vv`: 增加显⽰测试过程中的⽇志
      - `-vvv`: 增加显⽰失败测试的堆栈跟踪
      - `-vvvv`: 显⽰所有测试的堆栈跟踪，并显⽰失败测试的setup跟踪
      - `-vvvvv`: 始终显⽰堆栈跟踪和设置跟踪
- Gas 报告
  - 为合约生成函数消耗的 Gas 报告

```shell
forge test —gas-report
forge test test/Fuzz.t.sol --fuzz-runs 2000 -vv --gas-report
```

- 为Gas消耗生成一个快照文件(默认为 .gas-snapshot)：

```shell
forge snapshot
forge snapshot --snap <FILE_NAME>
```

- 代码修改后，不同的 .gas-snapshot 对比 gas 消耗：

```shell
forge snapshot --diff .gas-snap2 // 当前运行的snap 与 gas-snap2 对比
forge snapshot --check .gas-snap2 // 对比并显示不同
```

- 合约测试 作弊码
  - Foundry 在 vm 合约中提供了一组作弊码，已在 Test 合约中定义 vm 成员供使用，⽤于在测试中模拟各种场景和条件，作弊码分以下几类：
    - Environment（环境）：改变 EVM 状态的作弊码。
    - Assertions（断言）：断言作弊码。
    - Fuzzer（模糊测试器）：配置模糊测试器的作弊码。
    - External（外部）：与外部状态（文件、命令等）交互的作弊码。
    - Utilities（实用工具）：实用工具作弊码。
    - Forking（分叉）：分叉模式的作弊码。
    - Snapshots（快照）：快照作弊码。
    - RPC：与 RPC 相关的作弊码。
    - File（文件）：处理文件的作弊码。
  - 常用作弊码
    - vm.roll(uint256 blockNumber)：模拟区块号的变更。
    - vm.warp(uint256 timestamp)：改变区块时间戳。
      - `https://epochconverter.com`
    - vm.prank(address sender)：更改下一个调用的发送者（msg.sender）。
    - vm.deal(address to, uint256 amount)：重置ETH余额到指定地址。
      - deal(address token, address to, uint256 amount)：重置ERC20代币余额。
    - vm.expectEmit
      - `function expectEmit(bool checkTopic1, bool checkTopic2, bool checkTopic3, bool checkData, address emitter) external`
      - checkTopic1 indexed
    - 作弊码： https://book.getfoundry.sh/cheatcodes/

```solidity
// 修改区块高度
function test_Roll() public {
  counter.increment();
  assertEq(counter.number(), 1);
  uint256 newBlockNumber = 100;
  vm.roll(newBlockNumber);
  console.log("after roll Block number", block.number);

  assertEq(block.number, newBlockNumber);
  assertEq(counter.number(), 1);
}
// 改变区块时间戳 forge test test/Cheatcode.t.sol --mt test_Warp -vv
function test_Warp() public {
  uint256 newTimestamp = 1693222800;
  vm.wrap(newTimestamp);
  console.log("after wrap block timestamp", block.timestamp);
  assetEq(block.timestamp, newTimestamp);
  skip(1000); // 前进时间
  console.log("after skip block timestamp", block.timestamp);
  assertEq(block.timestamp, newTimestamp + 1000);
}

// vm.expectRevert() / expectRevert(bytes4 revertData) / expectRevert(bytes calldata revertData)
function transferOwership(address newOwner) public {
  require(msg.sender == owener, "Only the owener can transfer owenership");
  owner = newOwner;
}
function test_Revert_IFNOT_Owner() public {
  vm.startPrank(alice);
  Owner o = new Owner();
  vm.stopPrank();
  vm.startPrank();
  vm.expectRevert("Only the owener can transfer owenership");
  o.transferOwenership(alice);
  vm.stopPrank();
}
// forge test test/Cheatcode.t.sol --mt test_Revert_IFNOT_Owner -vv

event OwnerTransfer(address indexed caller, address indexed newOwner);
function transferOwnership(address newOwner) public {
  require(msg.sender == owner, "Only the owner can transfer ownership");
  owner = newOwner;
  emit OwnerTransfer(msg.sender, newOwner);
}
function test_Emit() public {
  Owner o = new Owner();

  vm.expectEmit(true, true, false, false);
  emit OwnerTransfer(address(this), bob);
  o.transferOwnership(bob);
}
// forge test test/Cheatcode.t.sol --mt test_Emit -vv
```

- Fork(分叉)测试
  - 真实的模拟环境
  - 例如当需要与线上现有合约进行交互时，分叉测试特别有用。
  - 每个分叉是一个独立的 EVM，在分叉的快照之上有独立的存储
  - 两个方法: 分叉模式和分叉作弊码

```shell
forge test --fork-url <your_rpc_url> --fork-block-number 1
forge test test/Counter.t.sol --fork-url <your_rpc_url> -vv
```

```solidity
contract ForkTest is Test {
  uint256 public sepoliaForkId;
  function setUp() public {
    uint forkBlock = 8219000;
    sepoliaForkId = vm.createSelectFork(vm.rpcUrl("sepolia"), forkBlock);
  }
  function test_something() public {
    vm.selectFork(sepoliaForkId);
    assertEq(vm.activeFork(), sepoliaForkId);
    MyERC20 token = MyERC20(0x21b4D1f6d42dc6083db848D42AA4b6895371E1e7);
    assertGe(token.balanceOf(0xe74c813e3f545122e88A72FB1dF94052F93B808f), 1e18);
  }
}
```

- 模糊（Fuzz）测试
  - 通过随机输⼊数据来测试合约的健壮性
    - 随机输⼊ x 测试 .setNumber(x) 的健壮性
  - 通过随机输⼊数据来测试合约的健壮性
    - 随机输⼊ to 和 about 测试 转账的健壮性
    - assume 设置条件， bound 设置取值范围
    - https://book.getfoundry.sh/forge/fuzz-testing#configuring-fuzz-test-execution

```solidity
function testFuzz_SetNumber(uint256 x) public {
  counter.setNumber(x);
  assertEq(counter.number(), x);
}

function testFuzz_ERC20Transfer(address to, uint256 amount) public {
  vm.assume(to != address(0));
  vm.assume(to != address(this));
  amount = bound(amount, 0, 10000 * 10 ** 18);
  // vm.assume(amount <= token.balanceOf(address(this)));
  token.transfer(to, amount);
  assertEq(token.balanceOf(to), amount);
}
```

- 不变量（invariant）测试
  - 在随机的调用序列和模糊输入下，每个函数执行候，所定义的变量保持不变。
  - 如所有⽤户 ERC20 余额的总和等于总供应量， AMM 总是 `K = x*y`
  - 在函数名称前加上 invariant 来表示不变量测试
  - 使用 targetContract 和 targetSelector 来指定要测试的合约和函数
