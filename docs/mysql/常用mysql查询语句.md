# MySQL 常用 SQL 语句大全

## 用户管理

### 新建用户

`CREATE USER name IDENTIFIED BY 'sssapdrow';`

### 更改密码

`SET PASSWORD FOR name=PASSWORD('fdddfd');`

### 权限管理

查看 name 用户的权限 `SHOW GRANNTS FOR name;`  
给 name 用户 db_name 数据库的所有权限 `GRANT SELECT ON db_name.* TO name;`
GRANT 的反操作，去除权限 `REVOKE SELECT ON db_name.* TO name;`

## 数据库操作

### 1，查看数据库

`SHOW DATABASES;`

### 2，创建数据库

`CREATE DATABASE`db_test`DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`

### 3，使用数据库

`USE db_name;`

### 4，删除数据库

`DROP DATABASE db_name;`

## Tables 的操作

PK: 主键
NN: 非空
AI: 自动增长
date: 年月日
varChar(40): 不定长字符
char: 定长字符
datetime: 年月日时分秒
timestamp: 从 1970 年开始

### 1，创建表

有条件的创建数据库表可以使用`CREATE TABLE IF NOT EXISTS tb_name(...`

```
CREATE TABLE table_name(
    id TINYINT   UNSIGNED   NOT NULLAUTO_INCREMENT, // id值，无符号、非空、递增唯一性，可做主键
    name VAECHAR(60) NOT NULL,
    score TINYINT UNSIGNED NOT NULL DEFSULT 0, // 设置默认列值
    PRIMARY KEY(id)
)ENGINE=InnoDB // 设置表的存储引擎，一般常用InnoDB和MyISAM，InnoDB可靠，支持商务、MyISAM高效，不支持全文检索
DEFAULT charset=utf8; // 设置默认编码，防止数据库中的乱码
```

```js
# 在忘记去设定数据库的情况下，`db_test`.`t_student` 可以自动创建或查找到所需要的数据库
CREATE TABLE `db_test`.`t_student` (
  # 名称  类型   非空   自动增长   注释
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(40) NOT NULL COMMENT '',
  `birthdate` DATE NOT NULL COMMENT '',
  `gender` CHAR(1) NOT NULL COMMENT '性别  M 男   F  女',
  `class_id` INT NOT NULL COMMENT '',
  PRIMARY KEY (`id`) COMMENT ''
);


CREATE TABLE `db_test`.`t_class` (
  -- 名称  类型   非空   自动增长   注释
  `class_id` INT NOT NULL  COMMENT '',
  `class_name` VARCHAR(16) NOT NULL COMMENT '班级的名字',
  `class_description` VARCHAR(100)  NULL COMMENT '班级的描述',
  PRIMARY KEY (`class_id`) COMMENT ''
);
```

### 2，复制表

全部复制 `CREATE TABLE tb_name2 SELECT * FROM tb_nname;`
部分复制 `CREATE TABLE tb_name2 SELECT id,name FROM tb_name;`

### 3，创建临时表

`CREATE TEMPORARY TABLE tb_name;` 和创建普通表一样

### 4，查看数据库中可用的表

`SHOW TABLES;`

### 5，查看表结构

`DESCRIBE tb_name;` 或 `SHOW COLUMNS in tb_name;`

### 6，删除表

`DROP [TEMPORARY] TABLE [IF EXISTS] tb_name[,tb_name2....]`
ep: `DROP TABLE IF EXISTS tb_name;`

### 7，表重命名

`RENAME TABLE name_old TO name_new;` 或 `ALTER TABLE name_old RENAME name_new;`

### 8, 修改表

#### 更改表结构

`ALTER TABLE tb_name ADD[CHANGE, RENAME, DROP]...要更改的内容...`
ep：

```
ALTER TABLE tb_name ADD COLUMN address varchar(80) NOT NULL;
ALTER TABLE tb_name DROP address;
ALTER TABLE tb_name CHANGE score score SMALLINT(4) NOT NULL;
```

## 数据操作

数据库内置函数

- count()
- min() 最小
- max() 最大
- first()
- last()
- len() 求长度
- now() 返回 当前时间
- sum() 求和
- sqrt() 求平方根
- rand() 求随机数 - 验证码 0-1 任意一个数字
- concat() 拼接字符串函数 生成报表的时候

### 1，插入数据

#### 插入新数据

`INSERT INTO tb_name(id,name,score)VALUES(NULL, '张三', 140),(NULL, '李四', 160),(NULL, '王二麻子', 110);`
主键 id 是自增的，所以不用写

#### 插入检索出来的数据

`INSERT INTO tb_name(name,score) SELECT name,score FROM tb_name2;`

### 2，更新数据

#### 指定更新数据

`UPDATE tablename SET columnName=NewValue [WHERE condition];`
`UPDATE tb_name SET score=189 WHERE id=2;`

### 3，删除数据

`DELETE FROM tb_name WHERE id=3;`

### 4，条件控制

- where 是在判断数据从磁盘读入内存的时候，而 having 是判断分组统计之前的所有条件，所有 having 是在对 select 查询的字段中进行操作

#### WHERE 语句

`SELECT * FROM db_name.tb_name WHERE id=3;`

#### HAVING 语句

```js
# * 代表所有字段
SELECT * FROM tb_name GROUP BY score HAVING count(*)>2;
```

#### 查询数量

```js
#  db_test.t_student 表里有几个男同学
SELECT COUNT(*) FROM db_test.t_student WHERE gender="M";
```

```js
# min 求最小值
SELECT min(birthdate) FROM db_test.t_student;
SELECT max(birthdate) FROM db_test.t_student;
# birthdate 的最小值
SELECT min(birthdate),  t_student.* FROM t_student;
SELECT now();
SELECT concat(id, "  ", name) FROM t_student;
```

#### 查询区间

方法一：

```js
SELECT * FROM t_student
WHERE birthdate >= "1991-01-01"
AND birthdate <= "1993-12-31"
```

方法二：
`BETWEEN ... AND ...`在...之间
`--`mysql 注释

```js
SELECT * FROM t_student
WHERE birthdate BETWEEN "1991-01-01" AND "1993-12-31";
```

#### 模糊查询

通配符`%`
`%`代表任意字符

```js
SELECT * FROM t_student
-- where name LIKE "王%";
where name LIKE "%六%";  -- 名字中有六的
```

#### 排序查询

对单表排序

```js
SELECT * FROM t_student
-- DESC 逆序 大-小   ASC 顺序 小-大
ORDER BY birthdate DESC | ASC
```

#### 表与表查询

```js
-- 查询两个表的字段
-- 查询指定字段，节约宽带
SELECT t_student.id,t_student.name,t_class.class_id,t_class.class_name
FROM t_student,t_class
WHERE t_student.class_id=t_class.class_id;
```

##### JOIN ON

左连接

```js
SELECT t_student.id,t_student.name,t_class.class_id,t_class.class_name
FROM t_student JOIN t_class
ON t_student.class_id = t_class.class_id;
```

左连接

## 自定义函数

```js
CREATE FUNCTION `new_function` ()
RETURNS INTEGER
BEGIN
RETURN 1;
END
```

#### 相关条件控制符

=、>、<、<>、IN(1,2,3...)、 BETWEEN a AND b、NOT、AND、 OR、 Linke() 【%为匹配任意，\_ 匹配一个字符（可以是汉字）】、IS NULL 空值检测

### 5，分组查询

分组查询可以按照指定的列进行分组
`SELECT COUNT(*) FROM tb_name GROUP BY score HAVINIG COUNT(*)>1;`
ORDER BY 排序
ORDER BY DESC|ASC // 按数据的降序或升序排列

### 6，全文检索 —— MATCH 和 AGAINST

#### 1, `SELECT MATCH(note_text)AGAINST('PICASO') FROM tb_name;`

#### 2, InnoDB 引擎不支持全文检索，MyISAM 可以

## MySQL 的正则表达式

1，MySQL 支持 REGEXP 的正则表达式
`SELECT * FROM tb_name WHERE name REGEXP '^[A-D]';` 找出以 A-D 为开头的 name

## MySQL 的一些函数

### 1，字符串连接 CONCAT()

`SELECT CONCAT(name,'=>',score) FROM tb_name;`

### 2，数学函数

AVG、SUM、MAX、MIN、COUNT;

### 3，文本处理

TRIM、LOCATE、UPPER、LOWER、SUBSTRING

### 4，运算符

- - - \

### 5，时间函数

DATE()、CURTIME()、DAY()、YEAR()、NOW()...

### 6，UNION —— 可以执行两个语句（可以去除重复行）

## 视图

### 1，创建视图

`CREATE VIEW name AS SELECT * FROM tb_name WHERE ~~ ORDER BY ~~;`

### 2，视图的作用

a、把联结写在 select 里，简化表之间的联结
b、重新格式化输出检索的数据（TRIM, CONCAT 等函数）
c、过滤不想要的数据（select 部分）
d、使用视图计算字符值，如'汇总'这样的值

## 使用储存过程

### 1，创建储存过程

```
// IN 传递一个值给储存过程
// OUT 从存储过程传出一个值
// INOUT 对存储过程传入 传出
// INTO 保存变量
CREATE PROCEDURE pro(IN num INT,OUT total INT)
BEGIN
SELECT SUM(score) INTO total FROM tb_name WHERE id=num;
END;
```

### 2，调用存储过程

```
CALL pro(13, @total);
SELCT @total; // 这里可以看到结果
```

### 3，存储过程的其他操作

```
SHOW PROCEDURE STATUS; // 显示当前存储过程
DROP PROCEDURE pro; // 删除指定存储过程
```

## 触发器

触发器指，在进行某项操作时，触发触发器内指定的操作

### 1，支持触发器的语句有 DELETE、INSERT、UPDATE，其他都不支持

### 2，创建触发器

`CREATE TRIGGER trig AFTER INSERT ON ORDERS FOR EACH ROW SELECT NEW.orser_name;`
insert 触发触发语句，返回一个值。

### 3，删除触发器

`DROP TRIGGER trig;`

## 一些例子‘=

### 1，新建表

```
CREATE TABLE db_name(
    id bigint(100) NOT NULL AUTO_INCREMENT COMMENT '自增长',
    uuid varchar(100) COLLATE utf8_estonian_ci NOT NULL COMMENT '唯一不重复',
    create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updata_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    sex int(11) DEFAULT NULL,
    name varchar(255) COLLATE utf8_estonian_ci DEFAULT NULL,
    username varchar(255) COLLATE utf8_estonian_ci DEFAULT NULL,
    password varchar(255) COLLATE utf8_estonian_ci DEFAULT NULL,
    classes varchar(255) COLLATE utf8_estonian_ci DEFAULT NULL,
    major int(255) DEFAULT NULL,
    qq int(20) DEFAULT NULL,
    introducemyself varchar(255) COLLATE utf8_estonian_ci DEFAULT NULL,
    PRIMARY KEY('id')
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_estonian_ci ROW_FORMAT=DYNAMIC;



CREATE TABLE t_coin_withdraw (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  out_trade_no varchar(50) NOT NULL COMMENT '订单号',
  txid varchar(200) NOT NULL DEFAULT '' COMMENT '链上交易id',
  member_id int(11) unsigned NOT NULL,
  coin_id int(11) unsigned NOT NULL,
  coin_type varchar(10) NOT NULL,
  member_address varchar(100) NOT NULL COMMENT '用户地址',
  to_address varchar(100) NOT NULL COMMENT '到账地址',
  amount decimal(24,8) unsigned NOT NULL COMMENT '提币数量',
  fee decimal(24,8) unsigned NOT NULL COMMENT '平台手续费',
  actual_amount decimal(24,8) unsigned NOT NULL COMMENT '实际数量',
  miner_fee decimal(24,8) unsigned NOT NULL DEFAULT '0.00000000' COMMENT '矿工费',
  status tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '交易状态（0：待审核，1：提币成功，2：提币失败，3：审核通过，4：审核拒接 5.已打包）',
  result varchar(50) NOT NULL DEFAULT '' COMMENT '交易结果',
  remark varchar(200) DEFAULT '' COMMENT '提币备注',
  tag varchar(50) DEFAULT '' COMMENT '地址标签，如 eos用到',
  agree_num int(10) unsigned NOT NULL DEFAULT '0' COMMENT '网络确认数',
  version int(10) unsigned NOT NULL DEFAULT '0',
  gmt_create bigint(20) unsigned NOT NULL,
  gmt_modified bigint(20) unsigned NOT NULL,
  dealer_name varchar(50) NOT NULL DEFAULT '' COMMENT '审核人员',
  platform_type int(11) DEFAULT NULL COMMENT '平台类型 1 会员 2 平台',
  return_status tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '如果status=4，资金要退回，退回状态 0待处理 1已处理',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='提币申请表（链上转账）';



CREATE TABLE m_member (
  id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  uid varchar(12) DEFAULT '' COMMENT '靓号',
  country_code varchar(6) DEFAULT NULL COMMENT '国家电话区号',
  name varchar(50) DEFAULT '' COMMENT '名称',
  nickname varchar(50) NOT NULL DEFAULT '' COMMENT '昵称',
  mobile varchar(16) DEFAULT NULL COMMENT '电话（格式：+86-13600910563）',
  email varchar(30) DEFAULT NULL COMMENT '邮箱',
  gender tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '性别（0：未知，1：男，2：女）',
  birthday int(10) unsigned NOT NULL DEFAULT '0',
  head_url varchar(128) NOT NULL DEFAULT '' COMMENT '头像地址',
  pwd_salt varchar(100) NOT NULL DEFAULT '' COMMENT '登录密码',
  pwd_hash varchar(100) NOT NULL DEFAULT '',
  pwd_level tinyint(4) unsigned NOT NULL COMMENT '密码安全级别（1：低，2：中，3：高）',
  pay_salt varchar(100) NOT NULL DEFAULT '' COMMENT '资金密码',
  pay_hash varchar(100) NOT NULL DEFAULT '',
  google_secret varchar(20) NOT NULL DEFAULT '' COMMENT '谷歌验证码',
  member_type tinyint(4) unsigned NOT NULL COMMENT '用户类型（1：个人，2：商户）',
  uuid varchar(100) DEFAULT NULL COMMENT '会员uuid，用于极光推送',
  auth_status tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '认证状态(0：未认证，1：认证成功，2：认证中，3：认证失败)',
  rank_id smallint(6) unsigned NOT NULL DEFAULT '0' COMMENT '会员级别',
  proxy_level tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '代理等级',
  reg_device tinyint(4) unsigned NOT NULL COMMENT '用户数据来源：1、Web；2、Android 3、 iOS ',
  reg_type tinyint(4) unsigned NOT NULL COMMENT '注册类型:1-平台注册 2-推荐注册',
  reg_sid int(11) unsigned NOT NULL DEFAULT '0' COMMENT '推荐人ID',
  reg_ip varchar(50) NOT NULL DEFAULT '' COMMENT '注册IP地址',
  reg_biz_date varchar(30) NOT NULL DEFAULT '0' COMMENT '注册业务时间',
  gmt_create bigint(20) unsigned NOT NULL COMMENT '创建时间',
  gmt_modified bigint(20) unsigned NOT NULL COMMENT '修改时间',
  is_merchant int(2) unsigned NOT NULL DEFAULT '0' COMMENT '是否是商户(0未申请,1审核中,2通过,3拒绝)',
  lang varchar(30) DEFAULT NULL COMMENT '选中的语言类型',
  is_partner int(2) unsigned NOT NULL DEFAULT '0' COMMENT '是否是合作商(0未申请,1审核中,2通过,3拒绝)',
  is_suspicion tinyint(4) DEFAULT '0' COMMENT '是否关注用户',
  suspicion_reason varchar(256) DEFAULT '' COMMENT '关注理由',
  personal_profile varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '简介',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY p_mobile (`mobile`) USING BTREE,
  UNIQUE KEY p_email (`email`) USING BTREE,
  KEY reg_sid (`reg_sid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=68285818 DEFAULT CHARSET=utf8mb4 COMMENT='会员信息表';
```

### 2，排序

`` SELECT * FROM `article` order by c_time desc `` 取最新一条数据
