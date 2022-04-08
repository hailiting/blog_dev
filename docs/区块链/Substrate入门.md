# Substrate 入门

搭建区块链开发框架

## 前言

### 区块链应该包含哪些组件

- 区块链节点需求
  - 加密算法
  - 数据库
  - 点对点网络
  - 共识算法
  - 交易处理
  - 链上治理
  - 状态转换函数（Runtime）

### Substrate 分层抽象

- Node: 可执行文件，chain spec 配置
- Frame: runtime
- Core: 存储，共识，签名，出块逻辑，交易池...

### The Substrate Runtime

Runtime 是区块链的链上运行逻辑集合，也就是状态转换函数
其中包括【系统逻辑，共识，超级权限，快确认，账户，时间戳，余额】

### 一键升级

### Off-chain Workers

与 runtime 分开，可以替代预言机作用，与企业合作

### substrate-node-template 小型的 substrate 框架

```sh
$ git clone git@github.com:substrate-developer-hub/substrate-node-template.git
$ git checkout monthly-2021-12

$ rustup target add --toolchain nightly wasm32-unknown-unknown
# 编译成release版
$ cargo build --release
#  --tmp --dev会自动带， --tmp 节点停止时自动清空本次运行的区块数据
# error-------- can't find crate for `std`
$ ./target/release/node-template --dev --tmp
# 以Bob身份启动多节点  要两个以上才会出块
$ ./target/release/node-template --alice --chain local --tmp
$ ./target/release/node-template --bob --chain local --tmp
# 启动后可在 polkadot.js.org/apps/#/explorer
## DEVELOPMENT
### Local Node
####         - 127.0.0.1:9944 【默认节点】
# --alice 以验证人身份去启动这个节点  `--name Alice --validator`的缩写
# --dev `--chain=dev` 以开发者模式启动这个节点
# --discover-local 启动本地节点
# --passward-interactive 用密码解锁里面的私钥
# --xx-rpc-xx 以什么方式控制rpc或websocket

# --base-path 数据的存储路径
# --bootnodes 指定初始的链接节点
# --execution 以什么方式去执行runtime  Native, Wasm Both, NativeElseWasm

# pallet-template -> Cargo.toml name="pallet-template"
$ cargo expand -p pallet-template > template-expand.rs // 写到一个新的文件里
```

- extrinsics->和其他链的 transaction 一样
- Chain state 查询链上状态

#### 目录结构

- node
- pallets runtime 的最小单元
- runtime 所有 pallets 的组装逻辑
- script

```rs
// pallets/template/src/lib
// config
// storage
// public function (用户可调用的方法)
// private function

// event
// error

// 宏
#[pallet::config]
// 存储宏
#[pallet::storage]

// 声明一个事件
#[pallet::event]
#[pallet::generate_deposit(pub(super) fn deposit_event)]
pub enum Event<T: Config> {
  SomethingStored(u32, T::AccountId),
}
```

## 联盟链

### 定制

- 1. 定制链名称，币名称，单位
- 2. 手续费
- 3. Babe 出块，随机节点，POS
- 4. 权重确定，benchmark

### 治理

- 1. 链上升级
- 2. 激励机制，如鼓励生态用户参与
- 3. 增发货币

### 数据索引

- 1. 数据索引，如区块链证书，中间件（subscan/subquery），根据交易哈希，查询所在的区块链
- 2. 区块链浏览器定制，前端/API，对内对外

### 部署运维

- 1. 节点监控：prometheus
- 2. 生成`chain-specification`: 方便发布和部署，不同平台编译后 wasm 码不同，可能无法正常出块
- 3. 运行方式：Native/wasm
- 4. 只读节点/验证节点/同步节点

### 认证授权

- 1. 节点认证：p2p pallet-node-authorization/std
- 2. 验证人账号：pallet-node-authorization/std
- 3. rbac: 细粒度：pallet-rbac rpc 接口的权限
- 4. CA 证书/SSL websocket 认证

### 其他

- 1. 区块链认证：TPS(实测 1000-)/信通院/国密算法
- 2. 使用智能合约还有 pallet(native), 内部 pallet，生态提供 API 和合约
- 3. 区块链证书：签发机构，申请人，区块高度，区块 hash，资产编号，精度，维度，上链时间
- 4. 账号，钱包
- 5. sdk. Java-sdk polkaj. 客户端选型: js/rust/go/java...
- 6. 测试：静态检测，review,单元测试，集成测试，API 测试，基准测试
- 7. 消息订阅：使用场景
- 8. 业务：NFT/溯源/存证/元宇宙

### substrate

- 基于 substrate 定制
- 智能合约，EVM，ink
- SDK/API
- 区块链浏览器 subscan
- 消息订阅等
- 对标 FISCO

## 什么是 Substrate

Substrate 提供了以下区块链核心组件

- 数据库层
- 网络传输层
- 共识引擎
- 交易队列
- Runtime 工具库

**每一层组件都是可扩展并支持自定义的**

### Runtime

Runtime 是区块链的链上运行逻辑集合。也就是状态转换函数。

#### Substrate Runtime Module Library(SRML)

frame 文件夹：  
资产(assets) 共识(democracy) 余额(balances) collective  
合约(contracts) 治理 选举 grandpa  
账户 块确认 indices 会员  
offences session 抵押 超级权限  
system 时间戳 国库 ...  
im-online -> 给验证人报告自己的心跳

#### 一键升级

```
Native Client  ->
environment
```

- client
  Substrate Core -> 共识 交易队列
  consensus 共识 aura babe pow
