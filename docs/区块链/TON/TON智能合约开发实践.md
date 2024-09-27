# TON 智能合约开发实践

Souldev
LANDAO
Certik
Ton Apps
toncco

TVM

## 基础

- TON 是状态转换的分类账本
- TON 区块链无法立即获取另一个合约的状态，唯一可能的选择是通过消息来实现，因此 TON 是异步的
- TON 中的网络可以保证任何信息都能送达，但无法保证需要多长时间
- 每份合约都有自己的小区块链
- 验证者的共识保证了信息最终能够送达，不会被重播，资金不会被重复消费

### 账户和合约

- 合约->特殊账户

## 编程语言

- Tact
  - 优点：类似面向对象编程，语法和高级语言类似，编写较为简单
  - 缺点：由社区贡献，目前版本未足够稳定，目前不支持一些 TVM 的高级特性，编译出的 FunC 代码需要的 Gas 比直接使用 FunC 编写的代码要高
- Func
  - 优点：官方支持，有大量已上线的应用模板可参考
  - 缺点：上手难度高且不易懂，类似 C 语言编程
- Fift
  - 接近汇编语言，开发者一般无需使用此语言编写合约

## 异常处理和错误码

### 错误码

- 13, -14, 37: gas 费用不足
- 7: 变量类型错误
- 8: 写入 Cell 数据溢出
- 9: 尝试读取超出 Cell 长度的数据
- 4, 5: 整数溢出或除 0

自定义错误码

```Fift
;;maker sure message from owner
throw_unless(405, equal_slices(owner_address, sender_address));
```

## fee

使用 Sandbox 的 printTransactionFees(安装：`npm install @ton/sandbox`)

- 单个合约最大 Gas fee 为 1TON
  - 1. For 循环次数
  - 2. 控制 Dictionary 或 Tuple 数量
  - 3. 控制发送消息的数量

## 合约竞争问题的识别

- TRC404 ERC404 Token 与 nft 绑定
- 合约竞争问题的识别：列出交易的所有流程步骤，以及每个步骤的状态更改，建立一个二维表格，通过观察每个步骤的状态交集，分析并发状态下是否可能存在竞争条件问题

##

### 2.1

- TON 中的 Cell 是什么
- 在 TON 区块链中使用这种基于 Cell 的设计理由是什么
- 如何在系统中存储诸如列表、字典或集合之类的东西

### 2.2

- 合约可以接收哪些类型的信息
- 什么是交易
- 交易有哪些阶段

### 2.3

- TON 区块链上有哪些验证方式

钱包

- 存储余额
- 存储序列号
- 存储公钥

### 2.4 了解交易成本

- TON 区块链上有多少种费用
  - gas, rent(租金), Message fees(信息费用)
- 设计良好的智能合约有哪些优秀的模式

### 2.5 可扩展性

- 无限水平可扩展性的真正含义是什么，如何在应用程序中利用这一优势
  - 将区块链本身当成数组
- 要充分利用可扩展的 TON 区块链，应遵循哪些原则

### 3.1

- TON 智能合约开发周期包括哪些阶段
  - Local setup
    - FunC -> Fift -> Bytecode
  - TLB Scheme
  - Local tests
    - Typescript
  - Testnet and after-deploy onchain tests
  - Mainnet production deployment
- TON 区块链智能合约编程语言的名称是什么

### 3.2 设置编译工作流
