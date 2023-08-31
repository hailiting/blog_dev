# SubQuery

## 第一课，快速构建

### subql 命令安装

- 1. node > 14
- 2. `npm i @subql/cli -g`
- 3. 创建项目`subql init <project_name>` ( "@polkadot/api": "^6",)
- 4. 安装依赖 `yarn`
- 5. 生成 typescript 对象和实体接口 `yarn codegen`
- 6. 编译项目 `yarn build`
- 7. Docker 拉取镜像`docker-compose pull`
- 8. Docker 运行项目`docker-compose up`
  - 运行了`docker-compose up` 分别启动了：`postgres`, `subquery-node`和`graphql-engine(或subql-query)`
- 9. `subql init --starter myProject` 以 starter 为模板创建一个新的 SubQuery 项目，并命名`myProject`
- 10. 读取本地 schema `npm i @subql/node` `subql-node -f`
- 11. postgre 数据库
- 12. `npm install @subql/query -g` 前端服务

```bash
postgre
# @subql/node 安装路径
/usr/local/lib/node_modules/@subql/node/dist

# postgre 安装路径
/Library/PostgreSQL/14/scripts/runpsql.sh

# 改变权限
alter role zhangsan password '123456';

# 跑起来
# ./serve_config.sh
export DB_PASS=123456
subql-node -f
```

### `yarn 升级`

```sh
$ yarn -v
$ curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
$ . ~/.bashrc
$ yarn -v
```

### `yarn codeg`

提取项目中`schema.graphql`文件定义的`entity`, 并生成相对应的以`typescript`编译的实体的`Model`,这个方便我们在`mapping`中引用这些定义和类型

### 工作原理

Substrate 链上数据包括：区块 Block, 事件 Events, 外部信息 Extrinsics

`@subql/node` ->包含 -> `Sandbox(vm2)`和`@polkadot/api`
-> 去处理 -> 数据库 <-`@subql/query`-> `GraphQL playground / api endpoint`

- subql-node 根据用户的提供的`project.yaml`中的 endpoint 来获取链上数据，并进行缓存。
- 数据库启动成功后，Subql-node 会根据用户的 schema 文件，让数据库生成正确的数据库表。
- Subql-node 按照用户项目定义的 mapping，来转换链上数据，并存储在数据库表中。
- subql-query 即我们的 Graphql-engine，访问数据库，让我们通过 playground 和 Api 来查询数据

### 有些主要的文件

- `project.yaml`
  - 定义项目配置，项目启动时会读取其中的各项配置信息，如调用 api 地址，注册 handler 等
- `mapping`
  - 定义原始数据和数据库实体之间的映射关系和处理代码
- `schema`
  - 定义了实体及关联关系

### 查询条件

field1 存的是区块高度

```txt
{
  query {
    starterEntities(last: 10, orderBy: FIELD1_ASC){
      nodes {
        field1
      }
    }
  }
}
```

```ts
// mappingHandlers.ts
...
export async function handleBlock(block:SubstrateBlock): Promise<void> {
  let record = new StarterEntity(block.block.header.hash.toString());
  record.field1 = block.block.header.number.toNumber();
  await record.save();
}
...
```

```ts
export class StarterEntity implements Entity {
  constructor(id: string) {
    this.id = id;
  }
  public id: string;
  public field1: number;
  ...
  static async get(id: string): Promise<StarterEntity | undefined> {
    assert(
      id !== null && id !== undefined,
      "Cannot get StarterEntity entity without an ID"
    );
    const record = await store.get("StarterEntity", id.toString());
    if(record){
      return StarterEntity.create(record);
    } else {
      return;
    }
  }
}
```

## 第二课，SubQuery 项目结构及区块处理

- 清单文件 Manifest File
  - 从文档中查看清单文件参数
  - 详解参数
  - chainTypes
- schema 文件
  - 实体，类型，索引介绍
  - 创建 schema
  - 使用 codegen 命令生成 model，详解 model 中的方法

### handleCall

```yaml
mapping:
  ...
  - handler: handleCall
    kind: substrate/CallHandler
    filter:
      specVersion: [23, 24]
  - hanlder: handleCall2
    kind: substrate/CallHandler
    filter:
      specVersion: [25, 100] # Index block with specVersion in between 25 and 100 (inclusive)  specVersion  区块链版本号
```

### schema.graphql

```js
type User @entity {
  id: ID!
  name: String! @index(unique: true)
  title: Title! # Indexes are automatically added to foreign key field
}
type Title @entity {
  id: ID!
  name: String! @index(unique:true)
}
```

```sql
-- Prepare a record for title entity
INSERT INTO titles (id, name) VALUES ("id_1", "Captain")
```

```js
// Handler in mapping function
import { User } from "../types/models/User";
import { Title } from "../types/models/Title";

const jack = await User.getByName("Jack Sparrow");
const captainTitle = await Title.getByName("Captain");
const pirateLords = await User.getByTitleld(captainTitle.id);
```

### JSON type

#### Define

```js
type AddressDetail @jsonField {
  street: String!
  district: String!
}
type ContactCard @jsonField {
  phone: String!
  address: AddressDetail # Nested JSON
}
type User @entity {
  id: ID!
  contact: [ContactCard] # store a list of JSON objects
}
```

querying JSON fields

```js
query {
  user(
    first: 5,
    filter: {
      contactCard: {
        contains: [{phone: "0064"}]
      }
    }
  ){
    nodes {
      id
      contactCard
    }
  }
}
```

### 问题

数据库没安装

```
ERROR Unable to connect to the database SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:5432
```

选用 postgresql

- bigNumber

```
postgresql
```

## 第三课 SubQuert 映射

- 介绍 polkadot.js 调取 event/extrinsic 方法，以及类型处理
- 映射（mapping）之 区块处理 block handler
- 映射（mapping）之 事件处理 event handler
- 字典的使用
- 映射（mapping）之 外部信息处理 call handler

#### 方案一

- 检索 balances.transfer 事件

#### 方案二

- 检索所有相关联的 extrinsics:
  - balances.forceTransfer
  - Balances.transfer
  - balances.transferAll
  - balances.transferKeepAlive
  - Utility 模块下所有可能进行的以上 calls

## 具体开发

- 1. 启动 node，允许使用异步方法
     `node --experimental-repl-await`
- 2. 启动 polkadot api
  ```js
  const { ApiPromise, WsProvieder } = require("@polkadot/api");
  const provider = new WsProvider("wss://polkadot.api.onfinality.io/public-ws");
  const api = await ApiPromise.create({ provider });
  // 获取区块哈希
  const blockHash = await api.rpc.chain.getBlockHash(h); // h 为确切的区块高度
  // 获取此高度events
  const apiAt = await api.at(blockHash); // 代表这我们的api将返回此高度的数据
  const events = await apiAt.query.system.events();
  events.toHuman(); // 变成友好的可读数据
  // 查看 transfer event
  const transferEvent = events[4];
  transferEvent.event.toHuman(); // 检查的event类型和数据
  transferEvent.event.meta.toHuman();
  ```

#### Polkadot api 和 Subquery

- 1. Subquery 同样利用 polkadot api 来获取历史高度数据
- 2. 使用 polkadot api 调取 block event 和 extrisinc 缺乏整合
- 3. 需要重复锁定高度
- 4. Api 获取原始数据，subquery 过滤和提供所需数据

### 查询交易

```yaml
# project.yaml
handlers:
  - handler: handleTransfer
    kind: substrate/EventHandler
    filter:
      module: balances
      method: Transfer
```

```js
// schema.graphql
type transfer @entity {
  id: ID! # block height + event id
  from: String!
  to: String!
  amount: BigInt!
}
// yarn codegen
```

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance, AccountId } from "@polkadot/types/interfaces";

export async function handleTransfer(event: SubstrateEvent): Promis<void> {
  const record = new Transfer(
    `${event.block.block.header.number.toString()}-${event.idx}`
  );
  const {
    event: {
      data: [fromAccount, toAccount, amount],
    },
  } = event;
  record.from = (fromAccount as AccountId).toString();
  record.to = (toAccount as AccountId).toString();
  record.amount = (amount as Balance).toBigInt();
  await record.save();
}
```

```yaml
# project.yaml
---
network:
  genesisHash: ...
  endpoint: ...
  # 提高获取数据的速度
  dictionary: "https://api.subquery/network/sq/subquery/dictionary-polkadot"
```

```curl
curl 'http://localhost:3000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"# Write your query or mutation here\n{\n  query {\n    transfers(first:50){\n      nodes {\n        id,\n          from,\n        to,\n        amount\n      }\n    }\n  }\n}"}' --compressed
```

```txt
query{
  transfers(first:50,filter:{
    from:{
      equalTo: "1mndd9E8kssCxXDacCbKw3iwFQwdABiFrE8fVRKS5SeS4E4"
    }
  }){
    nodes{
      id,
      from,
      to,
      amount
    }
  }
}
```

### 检索所有相关联的 extrinsics

```ts
// mappingHandlers.ts
export async function handleTransfer(call: SubstrateExtrinsic): Promise<void> {
  const record = new Transfer(
    `${call.block.block.header.number.toString}-${call.idx}`
  );
  const [toAccount, amount] = call.extrinsic.args;
  record.from = call.extrinsic.signer.toString();
  record.to = (toAccount as Account).toString();
  record.amount = (amount as Balance).toBigInt();
  await record.save();
}
```

```yaml
# project.yaml
---
handler: handleTransfer
kind: substrate/CallHandler
filter:
  module: balance
  method: transfer
  success: true
```

## 第四课：SubQuery 关系

- 一对一关系
- 一对多关系
  - schema 中定义一对多关系
  - 在 mapping 中处理一对多关系
  - 查询一对多关系的数据
- 多对多 - 关联表
- 反向查询【账户转账并使用反向查询】
