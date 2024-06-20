#
 分布式
 高并发
 高性能
 高可用
 可扩展
 松耦合
 高内聚
 可复用
 边界
 安全
 成本
 规模

 服务
 缓存
 消息
 搜索
 调度
 任务
 数据 
 监控
 配置
 网管

 Paxos
 CAP
 BASE
 ACID
 raft
 rpc
 Reactor
 SLA
 SLB

## 常用术语
- Buffer 缓冲：api 调 io
  - 消息队列  批处理
  - 临时性的
- Cache 缓存
  - 页缓存
  - 有一定时间窗口
- Pool 复用
  - 连接池 线程池 对象池 字符串常量池
- Sharding 分治
  - 分片
- sticky 亲密(粘性)
  - 并发访问不同的item
- Balance or trade-off 权衡


- QPS: Queries Per Second
- TPS: Transactions Per Second
- RT: Response-time
- PV: Page View
- UV: Unique Visitor
- 并发数
  - qps: 10w
  - rps: xk
- 线程数