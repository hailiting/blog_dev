# SubQuery HelloWorld

## subql 命令安装

- 1. node > 14
- 2. `npm i @subql/cli -g`
- 3. 创建项目`subql init <project_name>` ( "@polkadot/api": "^6",)
- 4. 安装依赖 `yarn`
- 5. 生成实体接口 `yarn codegen`
- 6. 编译项目 `yarn build`
- 7. Docker 拉取镜像`docker-compose pull`
- 8. Docker 运行项目`docker-compose up`
  - 运行了`docker-compose up` 分别启动了：`postgres`, `subquery-node`和`graphql-engine(或subql-query)`
- 9. `subql init --starter myProject` 以 starter 为模板创建一个新的 SubQuery 项目，并命名`myProject`

## `yarn 升级`

```sh
$ yarn -v
$ curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
$ . ~/.bashrc
$ yarn -v
```

## `yarn codeg`

提取项目中`schema.graphql`文件定义的`entity`, 并生成相对应的以`typescript`编译的实体的`Model`,这个方便我们在`mapping`中引用这些定义和类型

## 工作原理

Substrate 链上数据包括：区块 Block, 事件 Events, 外部信息 Extrinsics

`@subql/node` ->包含 -> `Sandbox(vm2)`和`@polkadot/api`
-> 去处理 -> 数据库 <-`@subql/query`-> `GraphQL playground / api endpoint`

- subql-node 根据用户的提供的`project.yaml`中的 endpoint 来获取链上数据，并进行缓存。
- 数据库启动成功后，Subql-node 会根据用户的 schema 文件，让数据库生成正确的数据库表。
- Subql-node 按照用户项目定义的 mapping，来转换链上数据，并存储在数据库表中。
- subql-query 即我们的 Graphql-engine，访问数据库，让我们通过 playground 和 Api 来查询数据

## 查询条件

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
