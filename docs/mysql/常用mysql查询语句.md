# MySQL常用SQL语句大全
## 用户管理
### 新建用户
``CREATE USER name IDENTIFIED BY 'sssapdrow';``
### 更改密码
``SET PASSWORD FOR name=PASSWORD('fdddfd');``
### 权限管理
查看name用户的权限 ``SHOW GRANNTS FOR name;``      
给name用户db_name数据库的所有权限 ``GRANT SELECT ON db_name.* TO name;``
GRANT的反操作，去除权限  ``REVOKE SELECT ON db_name.* TO name;``
## 数据库操作
### 1，查看数据库
``SHOW DATABASES;``
### 2，创建数据库
``CREATE DATABASE db_name;``
### 3，使用数据库
``USE db_name;``
### 4，删除数据库
``DROP DATABASE db_name;``
## 表的操作
### 1，创建表
有条件的创建数据库表可以使用``CREATE TABLE IF NOT EXISTS tb_name(...``
~~~
CREATE TABLE table_name(
    id TINYINT   UNSIGNED   NOT NULLAUTO_INCREMENT, // id值，无符号、非空、递增唯一性，可做主键
    name VAECHAR(60) NOT NULL,
    score TINYINT UNSIGNED NOT NULL DEFSULT 0, // 设置默认列值
    PRIMARY KEY(id)
)ENGINE=InnoDB // 设置表的存储引擎，一般常用InnoDB和MyISAM，InnoDB可靠，支持商务、MyISAM高效，不支持全文检索
DEFAULT charset=utf8; // 设置默认编码，防止数据库中的乱码
~~~
### 2，复制表
全部复制 ``CREATE TABLE tb_name2 SELECT * FROM tb_nname;``
部分复制 ``CREATE TABLE tb_name2 SELECT id,name FROM tb_name;``
### 3，创建临时表
``CREATE TEMPORARY TABLE tb_name;`` 和创建普通表一样
### 4，查看数据库中可用的表
``SHOW TABLES;``
### 5，查看表结构
``DESCRIBE tb_name;`` 或 ``SHOW COLUMNS in tb_name;``
### 6，删除表
``DROP [TEMPORARY] TABLE [IF EXISTS] tb_name[,tb_name2....]``
ep: ``DROP TABLE IF EXISTS tb_name;``
### 7，表重命名
``RENAME TABLE name_old TO name_new;`` 或 ``ALTER TABLE name_old RENAME name_new;``
### 8, 修改表
#### 更改表结构
``ALTER TABLE tb_name ADD[CHANGE, RENAME, DROP]...要更改的内容...``
ep： 
~~~
ALTER TABLE tb_name ADD COLUMN address varchar(80) NOT NULL;
ALTER TABLE tb_name DROP address;
ALTER TABLE tb_name CHANGE score score SMALLINT(4) NOT NULL;
~~~
## 数据操作
### 1，插入数据
#### 插入新数据
``INSERT INTO tb_name(id,name,score)VALUES(NULL, '张三', 140),(NULL, '李四', 160),(NULL, '王二麻子', 110);`` 
主键id是自增的，所以不用写
#### 插入检索出来的数据
``INSERT INTO tb_name(name,score) SELECT name,score FROM tb_name2;``
### 2，更新数据
#### 指定更新数据
``UPDATE tablename SET columnName=NewValue [WHERE condition];``
``UPDATE tb_name SET score=189 WHERE id=2;``
### 3，删除数据
``DELETE FROM tb_name WHERE id=3;``
### 4，条件控制
* where 是在判断数据从磁盘读入内存的时候，而having是判断分组统计之前的所有条件，所有having是在对select查询的字段中进行操作
#### WHERE 语句
``SELECT * FROM tb_name WHERE id=3;``
#### HAVING 语句
``SELECT * FROM tb_name GROUP BY score HAVING count(*)>2;``
#### 相关条件控制符
 =、>、<、<>、IN(1,2,3...)、 BETWEEN a AND b、NOT、AND、 OR、 Linke() 【%为匹配任意，_ 匹配一个字符（可以是汉子）】、IS NULL空值检测
### 5，分组查询
分组查询可以按照指定的列进行分组
``SELECT COUNT(*)FROM tb_name GROUP BY score HAVINIG COUNT(*)>1;``
ORDER BY 排序
ORDER BY DESC|ASC // 按数据的降序或升序排列
### 6，全文检索 —— MATCH 和 AGAINST
#### 1, ``SELECT MATCH(note_text)AGAINST('PICASO') FROM tb_name;``
#### 2, InnoDB 引擎不支持全文检索，MyISAM可以
## MySQL的正则表达式
1，MySQL支持REGEXP的正则表达式
``SELECT * FROM tb_name WHERE name REGEXP '^[A-D]';`` 找出以A-D为开头的name
## MySQL的一些函数
### 1，字符串连接 CONCAT()
``SELECT CONCAT(name,'=>',score) FROM tb_name;``
### 2，数学函数
AVG、SUM、MAX、MIN、COUNT;
### 3，文本处理
TRIM、LOCATE、UPPER、LOWER、SUBSTRING
### 4，运算符
+ - * \
### 5，时间函数
DATE()、CURTIME()、DAY()、YEAR()、NOW()...
### 6，UNION —— 可以执行两个语句（可以去除重复行）
## 视图
### 1，创建视图
``CREATE VIEW name AS SELECT * FROM tb_name WHERE ~~ ORDER BY ~~;``
### 2，视图的作用
a、把联结写在select里，简化表之间的联结
b、重新格式化输出检索的数据（TRIM, CONCAT等函数）
c、过滤不想要的数据（select部分）
d、使用视图计算字符值，如'汇总'这样的值
## 使用储存过程
### 1，创建储存过程
~~~
// IN 传递一个值给储存过程
// OUT 从存储过程传出一个值
// INOUT 对存储过程传入 传出
// INTO 保存变量
CREATE PROCEDURE pro(IN num INT,OUT total INT)
BEGIN
SELECT SUM(score) INTO total FROM tb_name WHERE id=num;
END;
~~~
### 2，调用存储过程
~~~
CALL pro(13, @total);
SELCT @total; // 这里可以看到结果
~~~
### 3，存储过程的其他操作
~~~
SHOW PROCEDURE STATUS; // 显示当前存储过程
DROP PROCEDURE pro; // 删除指定存储过程
~~~
## 触发器
触发器指，在进行某项操作时，触发触发器内指定的操作
### 1，支持触发器的语句有DELETE、INSERT、UPDATE，其他都不支持
### 2，创建触发器
``CREATE TRIGGER trig AFTER INSERT ON ORDERS FOR EACH ROW SELECT NEW.orser_name;``
insert触发触发语句，返回一个值。
### 3，删除触发器
``DROP TRIGGER trig;``

## 一些例子
~~~
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
~~~