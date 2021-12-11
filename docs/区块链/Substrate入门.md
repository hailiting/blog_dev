# Substrate 入门

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
