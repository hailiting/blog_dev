# Uniswap V2 合约代码解析

- 手把手教你开发去中心化交易所:
  - https://www.youtube.com/watch?v=38mVbslZpS4&list=PLV16oVzL15MRR_Fnxe7EFYc3MAykL-ccv
- 将 UniswapV2 部署到所有区块链

  - https://www.bilibili.com/video/BV1ph411e7bT?p=1

- FlashSwap
  - 闪电交易 一个区块完成
- Oracle 价格预言机
  - 区块头，区块尾，时间流逝，预测了下一次价格

## 价格原理

- 恒定乘积做市商

## 仓库

- uniswap-v2-core 核心
  - 用 waffle
  - 文件结构
    - ERC20
    - Factory 为了部署 Pair 合约
      - 创建 pair 合约
    - Pair -> 继承了 ERC20
      - 每一个交易对都是在 Pair 里锁定的
- uniswap-v2-periphery 周边
  - Migrator 迁移合约 V1 迁移到 V2
  - UniswapV2Router
    - 部署的时候 Gas fee 超了 所以分成了两个
    - UniswapV2Router02
    - UniswapV2Router01
- uniswap-interface 前端界面
- universe 目录
- uniswap-sdk 开发工具
- uniswap-lib uniswap 所用到的库合约
  - AddressStringUtil 地址对字符串
  - Babylonian 求平方根算法
  - TransferHelper 用的是底层呼叫的方法 call

## my-uniswap-v2-core

- online 路由合约，uniswap 线上部署的合约内容
- WETH

## Dapp

- 首页 -> 介绍性内容
- 文档
- 白皮书

- Uniswap: Factory Contract 工厂合约

## 其他

- Transactions => to 地址必须是当前地址
- Internal Txns => 地址或方法被夹杂在另一个合约中

## core

- 合约结构： `ERC20` ----被 Pair 继承----> `Pair` ----被 Factory 引用，部署(create2)----> `Factory`
- 创建流动性：项目方---创建流动性---> `UniswapV2Router` ----调用---> `Factory` ---布署---> `Pair`
- 交易：`用户` ---交易---> `Router` ---调用---> `Pair`

### 运行逻辑

- 1. uniswap 核心合约分为 3 个合约，工厂合约，配对合约，Erc20 合约
- 2. 核心合约部署时只需要部署工厂合约
- 3. 工厂合约布署时，只需要设定一个手续费管理员
- 4. 在工厂合约部署之后，就可以进行创建配对的操作
- 5. 要在交易所中进行交易，操作顺序是：创建交易对，添加流动性，交易
- 6. 添加配对时，需要提供两个 token 的地址，随后工厂合约会为这个交易对布署一个新的配对合约
- 7. 配对合约的布署是通过 create2 的方法
- 8. 两个 token 地址按二进制大小排序后一起进行 hash, 以这个 hash 值作为 create2 的 salt 进行部署
- 9. 所以配对合约的地址是通过两个 token 地址进行 create2 计算的
- 10. 用户可以将两个 token 存入到配对合约中，然后在配对合约中为用户生成一种兼容 ERC20 的 token
- 11. 配对合约中生成 erc20Token 可以成为流动性
- 12. 流动性的 token 可以进行 erc20 的操作，可以将流动性 token 传送给其他用户
- 13. 用户也可以取出流动性，配对合约将销毁流动性，并将两种 token 同时返还用户
- 14. 返还的数量将根据流动性数量和两种 token 的储备量重新计算，如果有手续费收益，用户也将得到收益
- 15. 用户可以通过一种 token 交换另一种 token，配对合约将扣除千分之三的手续费
- 16. 在 uniswap 核心合约基础上，还有一个路由合约用来更好的操作核心合约
- 17. 路由合约拥有 3 部分操作方法：添加流动性，移除流动性，交换
- 18. 虽然配对合约已经可以完成所有的交易操作，但路由合约将所有操作整合，配合前端更好的完成交易
- 19. 因为路由合约的代码量较多，部署时会超 gas 限制，所以路由合约被分为两个版本，功能相互补充

### gas 优化策略

- `address _token0 = token0` 标记`_token0`的作用域，避免堆栈太深的错误

### 纾困功能

- 为了防止可能更新配对合约的余额的定制令牌实现并更优雅地处理总供应量大于$2^112$的令牌，Uniswap v2 具有两个纾困功能： `sync()` 和 `skim()`
- `sync()`的存在，是为了将储备金设置为当前余额，从而可以从`令牌异步缩小一对货币对的余额`中略微恢复
- `skim()`允许用户提取货币对当前余额与货币对之间的差额
