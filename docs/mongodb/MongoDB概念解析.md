# MongoDB 概念解析

## MongoDB 是什么

- 由 C++编写，是一个基于分布式文件存储的开源数据库系统
- 旨在为 WEB 应用提供可扩展的高性能数据存储解决方案
- 在高负载的情况下，可以添加更多的节点来保证服务器性能
- MongoDB 将数据存储为一个文档，数据结构由键值（key=>value）对组成。MongoDB 文档类似于 json 对象。字段值可以包含其他文档，数组及文档数组

## MongoDB 特性

- 层级 Database-Collection-Document
- 灵活的类 JSON 数据存储，每条文档的字段可以完全不同
- 方便的即席查询(`ad hoc queries`)、索引(`indexing`)和实时聚合(`aggregation`)
- 使用`update()`命令可以实现替换完成的文档（数据）或者一些指定的数据字段
- MongoDB 允许在服务端执行脚本

## 文档、集合、数据库

| SQL 术语/概念 | MongoDB 术语/概念 | 解释/说明                               |
| :------------ | :---------------- | :-------------------------------------- |
| database      | 右对齐            | 数据库                                  |
| table         | collection        | 数据库表/集合                           |
| row           | document          | 数据记录行/文档                         |
| column        | field             | 数据字段/域                             |
| index         | index             | 索引                                    |
| table joins   |                   | 表连接，MongoDB 不支持                  |
| primary key   | primary key       | 主键，MongoDB 自动将\_id 自动设置为主键 |

### 数据库

一个 mongodb 中可以建多个数据库。
MongoDB 的默认数据库为`db`，该数据库存储在 data 目录中。
MongoDB 的单个实例可以容纳多个独立的数据库，每一个都有自己的集合和权限，不同的数据库也放置在不同的文件中。

#### `show dbs`命令可以显示所有数据的列表

有啥数据库

```Shell
MongoDB shell version: 3.0.6
connectiong to: test
> show dbs
local 0.078GB
test 0.078GB
> db # 获取当前的数据库对象或集合
test
> use local # 运行 use 命令，可以连接到一个指定的数据库
switched to db local
> db
local
```

##### 数据库列表

- 不能是空字符串（""）
- 不能含义 ``空格、`.`、`$`、`/`、`\`和`\0`
- 应全部小写
- 最多 64 字节
- admin, local, config 都是数据库保留名称
  - admin: 从权限角度来看，这是`root`数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有数据库或关闭服务器。
  - local: 这个数据库永远不会被复制。可以用来存储限于本地单台服务器的任意集合。
  - config: 当 Mongo 用于发片设置时，config 数据库在内部使用，用于保存发片的相关信息。

### 文档（Document）

文档是一组键值对(key-value, 即 BSON)。MongoDB 的文档不需要设置相同的字段，并且相同的字段不需要相同的数据类型，这与关系型数据库有很大区别，也是 MongoDB 非常突出特点。

```json
{
  "site": "www.runoob.com",
  "name": "菜鸟教程"
}
```

`RDBMS`和`MongoDB`对应术语：
| RDBMS | MongoDB |
| :--- | :--- |
| 数据库 | 数据库 |
| 表单 | 集合 |
| 行 | 文档 |
| 列 | 字段 |
| 表联合 | 嵌入文档 |
| 主键 | 主键（MongoDB 提供了 key 位\_id） |

#### 数据库服务和客户端

| MysqlId/Oracle | mongod |
| mysql/sqlplus | mongo |

#### 注意点：

- 文档中的键/值对是有序的。
- 文档中的值不仅可以是在双引号里面的字符串，还可以是其他几种数据类型（甚至可以是整个嵌入的文档）。
- MongoDB 区分类型和大小写。
- MongoDB 的文档不能有重复的键。
- 文档的键是字符串。除了少数例外情况，键可以使用任意 UTF-8 字符。

#### 文档键命名规范：

- 键不能含义\0（空字符）。这个字符用来表示键的结尾。
- .和 \$有特别的意义，只有在特定环境下才能使用。
- 以下划线`_`开头的键是保留的（不是严格要求）

## 集合

集合就是 MongDB 文档组，类似于`RDBMS`(关系型数据库管理系统：Relational Database Management System)中的表格。
集合存在于数据库中，集合没有固定的结构，这意味着你对集合可以插入不同格式或类型的数据，但通常情况下我们插入集合数据都会有一定的关联性。

- `db.COLLECTION_NAME.insert(document)`
  这里的 document 是一个文档对象，如`document=({name: "iPhone", category:"cellphone",value: 5000})`

**db.COLLECTION_NAME.remove**

```js
> db.COLLECTION_NAME.remove(
<query>,
{
  justOne: <boolean>,
  writeConcern: <document>
})
```

- `query`: 可选，删除的文档的条件
- `justOne`: 可选，如果设为 true 或 1,则只删除一个文档
- `writeConcern`: 可选，抛出异常的级别

**db.COLLECTION_NAME.update**

```js
db.COLLECTION_NAME.update(<query>, <update>, {
  upset: <boolean>,
  multi: <boolean>,
  writeConcern: <document>
})
```

- query: update 的查询条件
- update: update 的对象和一些更新的操作符(如：$set, $inc)
- upsert: 可选，这个参数的意思是：如果不存在 update 的记录，是否插入，true 为插入，false 为不插入
- multi: 可选，MongoDB 默认为 false，只更新找到的第一条记录，如果这个参数为 true，就把按条件查出来多条记录全部更新
- writeConcern: 可选，抛出异常级别

```js
db.col.update({
  "name: "iPhone"
}, {
  $set: {
    "value": 6000
  }
}, {
  multi: true
})
```

**db.COLLECTION_NAME.save**

```js
db.COLLECTION_NAME.save(
  <document>,
  {
    writeConcern: <document>
  }
)
```

**db.COLLECTION_NAME.fine**

```js
db.COLLECTION_NAME.fine(query, project);
```

- query: 可选，使用查询操作符指定查询条件
- projection: 可选，使用投影操作指定返回的键。查询时返回文档中所有键值，只需省略该参数即可（默认省略）

```json
db.COLLECTION_NAME.find(
  {
    "name": "iPhone"
  },
  {
    "name": 1
  },
  {
    "_id": 0
  }
)
```

- MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔 开，即常规 SQL 的 AND 条件
  `db.COLLECTION_NAME.find({key1:value1, key2:value2})`
- MongoDB OR 条件语句使用了关键字 \$or
  `db.COLLECTION_NAME.find( { $or: [ {key1: value1}, {key2:value2} ] } )`
- 联合使用示例:
  `db.col.find({"value": {$gt:2000}, $or: [{"category": "cellphone"},{"name": "iPhone"}]}).pretty()`
- 排序(sort)
  - 在 MongoDB 中使用 sort() 方法对数据进行排序，可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而 -1 是用于 降序
  - `db.COLLECTION_NAME.find().sort({KEY:1})`
- 索引(index)
  - MongoDB 使用 createIndex() 方法来创建索引
  - `db. COLLECTION_NAME.createIndex( keys, options )`
  - db.col.createIndex({"title":1,"description":-1})
