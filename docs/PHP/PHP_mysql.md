# PHP and mysql
## PHP 连接 mysql

- MySQLi(improved) extension
- PDO(PHP Data Objects)

### MySQLi VS PDO

- PDO 应用在 12 种不同数据库中，MySQL 只针对 MySQL 数据库
- MySQL 提供 API 接口
- 两种都可以预处理，防止 SQL 注入

### 连接/关闭 MySQL

```php
<?php
header("Content-type: application/json;charset=utf-8");
$config = parse_ini_file(realpath(dirname(__FILE__)."/config/config.ini"));
/** 面向对象 */
// 创建连接
$mysqli = new mysqli($config["host"],$config["username"], $config["password"]);
if($conn->connect_error){
  die("连接失败：".$conn->connect_error);
}
echo "连接成功";
$conn->close();
/** 面向过程 */
$conn = mysqli_connect($config["host"],$config["username"], $config["password"]);
if(!$conn){
  die("Connect faile: ".mysqli_connect_error());
}
echo "连接成功";
mysqli_close($conn);
/** PDO */
try{
  $conn = new PDO("mysql:host=$servername;", $username, $password);
  echo "连接成功";
} catch (PDOException $e){
  echo $e->getMessage();
}
$conn = null;
?>
```

```php
// config.ini
// [URLS]
// host=localhost
// [LOGINS]
// username=root
// password=''
// dbname=''
<?php
try{
  $config = parse_ini_file(realpath(dirname(__FILE__)."/config/config.ini"));
  $mysqli = new mysqli($config["host"],$config["username"], $config["password"]);
  if(mysqli_connect_errno()){
    throw new Exception("数据库连接错误！".mysqli_connect_error());
  } else {
    echo "连接成功";
  }
} catch(Exception $e) {
  echo $e->getMessage();
}
?>
```

### `No such file or directory`

- 然而我没解决(可能因为我是用 xampp)
  原因是 mac 下默认`php.ini`配置`default_socket`在`/var/mysql/mysql.socket`, 而 mysql 的 socket 文件大多在`/tmp/mysql.sock` =>在 mysql 里，用`status`命令查看`UNIX socket`的位置，将`php.ini`改为 mysql 的就好了；

#### 1， `php.ini`配置文件一般在 /private/etc/里

#### 2， vi php.ini

```
pdo_mysql.default_socket=/Applications/MAMP/tmp/mysql/mysql.sock
mysql.default_socket = /Applications/MAMP/tmp/mysql/mysql.sock
mysqli.default_socket = /Applications/MAMP/tmp/mysql/mysql.sock
```

#### 3, `esc` + ``:wq

``
## 使用mysqli 和PDO创建MySQL数据库
~~~php
  /// mysql 面向对象
$conn = new mysqli($config["host"],$config["username"], $config["password"], $config["dbname"]);
$sql = "CREATE DATABASE myDB";
if($conn->query($sql) ===true){
  echo "数据库创建成功";
} else {
  echo "Error creating database: ".$conn->error;
}
$conn->close();
/// mysql 面向过程
$config = parse_ini_file(realpath(dirname(__FILE__)."/config/config.ini"));
$conn = mysqli_connect($config["host"], $config["username"], $config["password"]);
if(!$conn){
  die("链接失败: ".mysqli_connect_error());
}
$sql = "CREATE DATABASE myD122B";
if(mysqli_query($conn, $sql)){
  echo "数据库创建成功";
} else {
  echo "Error creating database: ".mysqli_error($conn);
}
mysqli_close($conn);
// PDO
$config = parse_ini_file(realpath(dirname(__FILE__)."/config/config.ini"));
$conn = new PDO("mysql:host=".$config["host"],$config["username"], $config["password"]);
// 设置PDO错误模式为异常
$conn->setAttribute(PDO:: ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$sql = "CREATE DATABASE myDBPDO";
// 使用exec(), 因为没有结果返回
$conn->exec($sql);
echo "创建数据库成功<br/>";
$conn = null;
~~~
## 创建数据表
~~~php
$sql = "CREATE TABLE MyGuests02 (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(50),
  reg_date TIMESTAMP
)";
// 面向对象
$conn = new mysqli($config["host"],$config["username"], $config["password"],"myDB");
if($conn->query($sql)=== true){
  echo "数据表MyGuests创建成功";
} else {
  echo "创建数据表错误：".$conn->error;
}
// 面向过程
$conn = mysqli_connect($config["host"],$config["username"], $config["password"],"myDB");
if(mysqli_query($conn, $sql)){
  echo "数据表MyGuests创建成功";
} else {
  echo "创建数据表错误：".mysqli_error($conn);
}
mysqli_close($conn);
// PDO
$config = parse_ini_file(realpath(dirname(__FILE__)."/config/config.ini"));
$sql = "CREATE TABLE MyGuests022 (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  email VARCHAR(50),
  reg_date TIMESTAMP
)";
$conn = new PDO("mysql:host=".$config["host"].";dbname=myDB",$config["username"], $config["password"]);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$conn -> exec($sql);
echo "数据表插入成功";
~~~
## PHP MySQL插入数据
~~~mysql
INSERT INTO table_name (column1, column2, column3...) VALUES (value1, value2, value3....)
~~~

~~~php
/** MySQLi- 面向对象 */
$sql = "INSERT INTO MyGuests (firstname, lastname, email) VALUES ('John', 'Doe', 'xxx@email.com')";
if($conn->query($sql) === TRUE){
  echo "新数据插入成功";
} else {
  echo "Error: ".$sql."<br/>".$conn->error;
}


/** MySQLi- 面向过程 */
$config = parse_ini_file(realpath(dirname(__FILE__)."/config/config.ini"));
$conn =mysqli_connect($config["host"], $config["username"], $config["password"]);
mysqli_select_db($conn, "PHPLesson");
$sql = "INSERT INTO newsnews (`newsTitle`, `newsImg`, `newsContent`, `addTime`)
                VALUES (`哈哈哈哈是对方`,`imgLink`, `ccsdss`,2021-02-03)";
mysqli_query($conn,"set names 'utf8'");
echo  1111;
$result = mysqli_query($conn,$sql);
if($result){
  echo "ok";
} else {
  echo "error";
}
mysqli_close($conn);
/** PDO */
$config = parse_ini_file(realpath(dirname(__FILE__)."/config/config.ini"));
  $conn = new PDO("mysql:host=".$config["host"].";dbname=".$config["dbname"], $config["username"], $config["password"]);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // 从接口中获得
  $newsTitle = $_REQUEST['newsTitle'];
  $newsImg = $_REQUEST['newsImg'];
  $newsContent = $_REQUEST['newsContent'];
  $newsTime = $_REQUEST['newsTime'];

  echo $newsTitle."<br/>";
  $sql = "INSERT INTO `news`(`newsTitle`, `newsImg`, `newsContent`, `addTime`) VALUES ('$newsTitle','$newsImg', '$newsContent','$newsTime')";
  $conn -> exec($sql);
  echo("插入成功");
  $conn=null;
} catch (PDOException $e){
  echo $sql."<br/>".$e->getMessage();
}
~~~
#### 删
~~~php
$sql = "DELETE FROM news WHERE newsTitle='哈哈哈哈是对22方'";
DELETE FROM `news` WHERE `news`.`newsID`=4
~~~
#### 改
~~~php
$sql = "UPDATE news SET newsTitle='123213' WHERE newsID='1'";
~~~
#### 查
~~~php
$sql = "SELECT column_name(s) FROM table_name ORDER BY column_name(s) ASC|DESC";
~~~
~~~php
$sql = "SELECT * FROM news ORDER BY newsId DESC";
// sqli 面向过程
$conn = mysqli_connect("localhost", "root","");
mysqli_select_db($conn, "PHPLesson");
$result = mysqli_query($conn, $sql);
$arr = array();
try{
  while($row = mysqli_fetch_array($result)){
    array_push($arr, array("newsTitle"=>$row["newsTitle"], "newsContent"=>$row["newsContent"]));
  }
  echo json_encode(array(
      'code'=>200,
      'data'=> $arr
  ));
} catch(Exception $e){
  echo $e->getMessage();
}
~~~