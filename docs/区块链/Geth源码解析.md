# Geth 源码解析

v1.8

```js
- accounts 自己钱包账户相关的应用
  - hd  abi
- build
- cmd  启动geth 命令行体系
- common  公共的一些内库
- consensus  *important 共识  交易怎么确认  挖矿奖励机制 等
- console   控制台用js做交互的内容
- container/docker
- contracts   合约
- core  *important 基本的数据结构   区块账户状态等
- crypto  加密算法   hash  椭圆曲线
- dashboard   仪表盘   环境监控和测试
- eth   协议层   实现以太坊协议  怎么信息调用  通信
- ethclient    客户端的实现
- ethdb    以太坊底层数据库的包
- ethstats   收集统计信息
- event     事件
- internal    内部做的一些测试
- les
- light
- log    日志
- metrics
- miner    挖矿相关的
- mobile
- node    节点相关
- p2p    网络组件
- params    初始的配置和参数
- rlp   rlp编码方式
- rpc    rpc 协议调用方式 的实现
- signer
- swarm   * 以太坊分布式存储的方式  底层 服务
- tests
- trie   实现MPT
- vendor
- whisper  *  消息机制的服务
- .dockerignore
- .gitattributes
- .gitignore
- .gitmodules
- .mailmap
- .travis.yml
```

```go
// /go-ethereum/blob/master/trie/node.go
type  (
  fullNode struct {
    Children [17]node
    flags nodeFlag
  }
  // 扩展节点和叶子节点
  shortNode struct {
    Key []byte   //  incepath
    Val node   // hashNode   valueNode
    flags nodeFlag
  }
  hashNode []byte
  valueNode []byte
)
...
func (n *fullNode) EncodeRLP(w io.Writer) error {
  var nodes [17]node
  for i, child := range &n.Children {
    if child != nil {
      nodes[i] = child
    }  else {
      nodes[i] = nilValueNode
    }
    return rlp.Encode(w, nodes)
  }
}
...
type nodeFlag struct {
  hash hashNode
  gen uint16
  dirty bool
}
// /go-ethereum/blob/master/trie/encoding.go
// 压缩打包   两个16进制字符和在一起变为一个字符
func hexToCompact(hex []byte) []byte {
  terminator := byte(0) // byte(0) 初值为0
  if hasTerm(hex) { //
    terminator = 1
    hex = hex[:len(hex)-1]
  }
  buf := make([]byte, len(hex)/2+1)
  buf[0] = terminator << 5
  if len(hex)&1 == 1 {
    buf[0] |= 1 << 4
    buf[0] |= hex[0]
    hex = hex[1:]   //
  }
  decodeNibbles(hex, buf[1:])
  return buf
}
func compactToHex(compact []byte) []byte {
  base := keybytesToHex(compact)
  if base[0]<2 {
    base = base[:len(base) -1]
  }
  chop := 2-base[0]&1
  return base[chop:]
}
...
func decodeNibbles(nibbles []byte,bytes []byte) {
  for bi, ni :=0, 0; ni<len(nibbles); bi,ni=bi+1,ni+2 {
    bytes[bi] = nibbles[ni] << 4 | nibbles[ni+1]
  }
}
func hasTerm(s []byte) bool {
  return  len(s)>0 && s[len(s)-1] = 16
}
// /go-ethereum/blob/master/trie/trie.go
type Trie struct {
  db *Database
  root node
  cachegen, cachelimit uint16
}
func New(root common.Hash, db *Database)(*Trie, error){
  if db==nil {
    panic("trie.New called without a database")
  }
  trie := &Trie{
    db: db,
  }
  if root != (common.Hash{}) && root != emptyRoot {
    rootnode, err := trie.resolveHash(root[:], nil)
    if err!=nil {
      return nil, err
    }
    trie.root = rootnode
  }
  return  trie, nil
}
```
