# php连接数据库的基本方法
都是PHP连接数据库的方法
## 对象化
~~~
$host = 'locahost'; // url 不要加端口，要单独指定
$db = mysqli_connect($host, $user, $passwd, $database, $port);
$db->set_charset('utf8'); // 设置查询结果编码
$result = $db->query($sql); // 得到查询结果

while($row = $tempResult -> fetch_array()){
    echo $row['post_title'];
}
$db->close(); // 关闭连接
~~~
## 过程化
~~~
$host = 'localhost:3306'; // 这个是需要加端口号的

$link = mysql_connect($host, $user, $passwd); // 建立连接
mysql_select_db($database, $link); // 选择数据库
$result = mysql_query($sql, $link);

while($row = mysql_fetch_array($tempResult)){
    echo $row['post_title'];
}

mysql_close($link); // 关闭连接
echo $str;
~~~
## PDO (PHP Data Object)
~~~
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDBPDO";
try{
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // 设置PDO错误模式，用于抛出异常
    $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO MyGuests (firstname, lastname, email) VALUES ('John', 'Doe', 'john@example.com')";
    // 使用 exec(), 没有结果返回
    $conn -> exec($sql);
    echo "新记录插入成功";
} catch (PDOException $e){
    echo $sql . "<br/>" . $e->getMessage();
}
$conn = null;
~~~


