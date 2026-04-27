# json rpc

以太坊的客户端（节点、RPC 服务）通常都对外提供一套 JSON-RPC 方法：你可以用它来“查链上数据”（区块/交易/日志/合约状态），也可以“提交交易”（发送已签名交易）。下面这些方法名按用途分组，并给了通俗解释。

## Bundler（账户抽象/AA，常见于 EIP-4337）
Bundler 可以理解为“把用户操作包起来并发往网络的服务”。如果你在用账户抽象（`UserOperation`），就会用到这些方法。

- `eth_estimateUserOperationGas`：估算某个 `UserOperation` 执行所需的 gas（主要用来算成本和做预估）。
- `eth_getUserOperationByHash`：根据 `UserOperation` 的哈希，查它的详细信息（通常含参数、发送者、gas 等）。
- `eth_getUserOperationReceipt`：根据 `UserOperation` 哈希，拿到它的“执行结果/回执”（成功、失败、返回数据等）。
- `eth_sendUserOperation`：把一个 `UserOperation` 发给 bundler（相当于“提交用户操作”）。
- `eth_supportedEntryPoints`：bundler 支持哪些 `EntryPoint` 合约地址（不同入口点会影响你能否提交/执行）。
- `pimlico_getUserOperationGasPrice`：Pimlico 服务提供的“用户操作”费率查询（比起标准 `eth_*`，它是第三方/特定实现的扩展）。
- `pimlico_getUserOperationStatus`：Pimlico 查询 `UserOperation` 当前处理状态（比如 pending / included / executed 等）。
- `pimlico_simulateAssetChanges`：模拟执行后“资产变化会是什么样”（适合做交易前预览，避免盲目花费）。

## 基础查询与链状态（常见 `eth_* / net_* / web3_*`）

### 链/节点信息
- `eth_accounts`：列出当前 RPC 提供的账户列表（纯节点通常没有私钥，所以常见情况是列表为空；钱包/托管服务才会有）。
- `eth_chainId`：当前链的 ID（做签名校验、区分不同网络时经常用）。
- `eth_protocolVersion`：节点协议版本信息（一般用于兼容性/诊断）。
- `web3_clientVersion`：节点客户端软件版本（例如 geth 的版本号等）。
- `net_version`：网络版本（通常和 `chainId` 或网络标识有关）。
- `net_listening`：节点是否在监听（是否对外提供服务）。
- `net_peerCount`：当前连接的对等节点数量（网络健康度/连通性参考）。

### 同步状态与区块高度
- `eth_blockNumber`：当前最新区块高度。
- `eth_syncing`：节点是否在同步（同步中会返回进度信息）。

### Gas/费用相关
- `eth_gasPrice`：传统 gas 价格（偏旧式交易模型；EIP-1559 之后常搭配其他方法用）。
- `eth_maxPriorityFeePerGas`：EIP-1559 的“优先费”（tip）。
- `eth_feeHistory`：EIP-1559 的历史费用数据（用于动态估算当前合理的费用）。
- `eth_estimateGas`：估算一笔交易执行需要多少 gas（提交前做预算/避免失败）。
- `eth_blobBaseFee`：EIP-4844 的 blob 基础费用（和 blob 交易相关）。
- `eth_createAccessList`：生成访问列表（access list），用于某些类型交易的 gas 优化。

### 读链上数据（余额/代码/存储/证明）
- `eth_getBalance`：查询某地址的余额（指定区块高度也支持）。
- `eth_getCode`：查询某地址的合约字节码（判断是否合约/合约内容）。
- `eth_getStorageAt`：查询合约某个存储槽（storage slot）在某区块的值。
- `eth_getProof`：拿到账户/存储的默克尔证明（用于“无状态客户端”或验证场景）。

### 合约调用（不改变链上状态）
- `eth_call`：在本地“模拟执行”合约方法，返回结果但不会真正写入链上状态（常用于读数据/估算/验证参数）。

### 交易与区块查询
- `eth_getTransactionByHash`：根据交易哈希查询交易信息。
- `eth_getTransactionCount`：查询账户 nonce（同一地址发交易时用来决定下一个 nonce）。
- `eth_getTransactionReceipt`：查询交易回执（交易是否成功、gas 用量、日志等）。
- `eth_getTransactionByBlockHashAndIndex`：在某个区块（哈希已知）里，通过“交易序号”找到具体交易。
- `eth_getTransactionByBlockNumberAndIndex`：在某个区块（高度已知）里，通过交易序号找到具体交易。

- `eth_getBlockByHash`：根据区块哈希查区块详情（可选择是否返回完整交易对象）。
- `eth_getBlockByNumber`：根据区块高度查区块详情。
- `eth_getBlockReceipts`：获取某区块中所有交易的回执（更适合批量场景）。
- `eth_getBlockTransactionCountByHash`：某区块哈希里有多少笔交易。
- `eth_getBlockTransactionCountByNumber`：某区块高度里有多少笔交易。

（叔块/Uncle，PoW 链时代的概念，现代主网已不常见，但 RPC 仍保留）
- `eth_getUncleByBlockHashAndIndex`：通过区块哈希 + 序号拿叔块。
- `eth_getUncleByBlockNumberAndIndex`：通过区块高度 + 序号拿叔块。
- `eth_getUncleCountByBlockHash`：某区块哈希对应叔块数量。
- `eth_getUncleCountByBlockNumber`：某区块高度对应叔块数量。

### 提交交易（写链）
- `eth_sendRawTransaction`：把“已签名的原始交易”提交给节点/网络。

### 挖矿相关（偏历史/特定节点）
- `eth_mining`：节点当前是否在挖矿。
- `eth_hashrate`：当前挖矿哈希率。
- `eth_getWork` / `eth_submitWork`：旧式挖矿接口（现代 PoS 主网不常用；私链/特定老实现可能仍在）。
- `eth_simulateV1` / `eth_submitWork`：一些更“实验/特定实现”的接口（不同节点支持情况差异较大；一般用于特定调试或特定网络）。

## Filter（过滤器：轮询式拿日志/新块）
Filter 是一种“先创建过滤器，再定期拉取变化”的机制。它常见于 HTTP 轮询场景（而不是 WebSocket 推送）。

- `eth_newFilter`：创建一个日志过滤器（通常基于地址/主题等条件）。
- `eth_newBlockFilter`：创建“新块”过滤器。
- `eth_getFilterChanges`：取出过滤器自上次以来新增/变化的内容。
- `eth_getFilterLogs`：直接取过滤器当前匹配到的日志。
- `eth_uninstallFilter`：卸载/删除过滤器（不再需要就释放资源）。

## Subscription（订阅：WebSocket 推送）
Subscription 用于在 WebSocket 连接上“订阅事件”，节点会主动推送结果，比 HTTP 轮询更省。

- `eth_subscribe`：建立订阅（订阅什么类型的事件，返回订阅 ID）。
- `eth_unsubscribe`：取消订阅。

## Trace（跟踪/调试：看执行细节）
Trace 方法一般用于调试执行过程（到更细粒度的 trace），并且需要节点/客户端开启对应的调试支持（不同节点支持差别较大）。

- `trace_transaction`：跟踪一笔交易的执行过程。
- `trace_call`：跟踪一次 `eth_call` 风格的模拟调用执行过程。
- `trace_callMany`：一次跟踪多次调用（批量调试/回放）。
- `trace_block`：跟踪某个区块里所有交易的执行过程。
- `trace_filter`：按条件过滤并获取 trace 结果（偏高级用法）。

## web3_clientVersion
上面已经在“链/节点信息”里解释了它：用于查看 RPC 对应的客户端软件与版本。
