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

```
/usr/local/lib/node_modules/@subql/node/dist

/Library/PostgreSQL/14/scripts/runpsql.sh

123456hai

locate pg_hba.conf

alter role zhangsan password '123456';
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

## 问题

数据库没安装

```
ERROR Unable to connect to the database SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:5432
```

选用 postgresql

- bigNumber

```
postgresql
```
