# MongoDB 概念解析

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

```json

```
