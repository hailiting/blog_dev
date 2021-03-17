# PHP 基础入门

PHP 脚本在服务器上执行，将纯 HTML 结果发送会浏览器

## 服务 => XAMPP

## 文件夹`htdocs`

## 引用

```php
<?php
require_once("a.php");  // 有错   都不会执行
include_once("a.php");  // 不管有没有错  当前会执行
echo $GLOBALS["b"];
?>
```

## 基本语法

已`<?php`开始，以`?>`结束

```php
<?php
 // php代码
?>
```

```php
<!DOCTYPE html>
<html
<body>
<h1>my first php page</h1>
<?php
  echo "hello world";
  if(true){
    print("this is true");
  } else {
    print("this is false");
  }
?>
</body>
</html>
```

### 变量

变量是用于存储信息的“容器”  
**PHP 语句和 PHP 变量都是区分大小写的**
**PHP 是一门弱类型语言**（不必向 PHP 声明该变量的数据类型，PHP 会根据变量的值，自动把变量转换为正确的数据类型）

```php
<?php
$txt = "hello world";
$x=5;
$y=10.5;
$k = $x+$y;
echo $k;
?>
```

### PHP 有四个不同的变量作用域

- local 局部作用域
- global 全局作用域
- static 静态作用域
- parameter 函数参数作用域

#### 局部和全局作用域 [global]

在所有函数外部定义的变量，拥有全局作用域。除了函数外，全局变量可以被脚本中的任何部分访问，要在一个函数中访问一个全局变量，需要使用`global`关键字

- 在 PHP 函数内部声明的变量是局部变量，仅能在函数内部访问

```php
<?php
  $x=5; // 全局变量
  function myText(){
    $y=10;// 局部变量
    echo "<p>x: $x</p>"; // 这是找不到的，因为没加global
    echo "<br/>";
    echo "<p>y: $y</p>";
  }
  myText();
  echo "<p>测试函数外变量:<p>";
  echo "变量 x 为: $x";
  echo "<br>";
  echo "变量 y 为: $y";// 这是找不到的，因为y是局部变量
?>

```

- global 关键字用于函数内访问全局变量
- 在函数内调用函数外定义的全局变量，我们需要在函数中的变量前加上 global 关键字

```php
<?php
  $x=5;
  $y=10;
  function myTest(){
    global $x,$y;
    $y=$x+$y;
  }
  myTest();
  echo $y;
?>
```

- PHP 将所有全局变量储存在一个名为`$GLOBALS[index]`的数组里，`index`保存变量的名称，这个数组可以在内部访问，也可以直接更新全局变量

```php
<?php
$x = 5;
$y = 10;
  function myTest(){
    $GLOBALS["y"]=$GLOBALS["x"]+$GLOBALS["y"];
  }
  myTest();
  echo $y;
?>
```

#### static 作用域

- 当一个函数完成时，它的所有变量通常都会被删除，然而，有时候希望某个局部变量不被删除，要做到这一点，可在第一次变量声明时使用`static`关键字

```php
<?php
  function myTest(){
    static $x=0;
    echo $x;
    $x++;
    echo  PHP_EOL; // 换行符
  }
  myTest();
  myTest();
  myTest();
  myTest();
  myTest();
?>
```

#### 参数作用域

参数是在参数列表中声明的，作为函数声明的一部分

```php
<?php
  function myText($x){
    echo $x;
  }
  myTest(5);
?>
```

### EOF

PHP EOF 是一种在命令行 shell 和程序语言里定义一个字符串方法

- `EOF;`必须后接分号，否则编译通不过
- EOF 可以用任意其他字符代替，只需保证结束标识和开始标识一致
- **结束标识必须顶格独自占一行，即必须从行首开始，前后不能衔接任何空白和字符**

```PHP
<?php
echo <<<EOF
        <h1>我的第一个标题</h1>
        <p>我的第一个段落。</p>
EOF;
// 结束需要独立一行且前后不能空格
?>
<?php
$name="变量会被解析";
$a=<<<EOF
$name<br><a>html格式会被解析</a><br/>双引号和Html格式外的其他内容都不会被解析
"双引号外所有被排列好的格式都会被保留"
"但是双引号内会保留转义符的转义效果,比如table:\t和换行：\n下一行"
EOF;
echo $a;
?>
```

### 数据类型

- String【字符串】
- Integer【整形】
- Float【浮点型】
- Boolean【布尔】
- Array【数组】
- Object【对象】
- NULL【空值】
  > `var_dump()`函数返回变量的数据类型和值

```php
<?php
$x = 5985;
var_dump($x);
echo "<br>";
$x = -345; // 负数
var_dump($x);
echo "<br>";
$x = 0x8C; // 十六进制数
var_dump($x);
echo "<br>";
$x = 047; // 八进制数
var_dump($cars);
echo("<br/>");
print_r($cars);
$x=null;
var_dump($x);
?>
```

##### PHP 对象

必须使用 class 关键字声明类对象，类是可以包含属性和方法的结构  
然后在类中定义数据类型，在实例化的类中使用数据类型

```php
<?php
class Car{
  var $color;
  function __construct($color="green"){
    $this->color = $color;
  }
  function what_color(){
    return $this->color;
  }
}
?>
```

### 数组

```php
<?php
$car = array("Volvo","BMW","Toyota");
$a= "I like";
for($k=0;$k<count($car);$k++){
  $a.=$car[$k].", ";
}
echo $a;
?>
```

#### 关联数组

```php
<?php
$age = array("Peter"=>35,"Ben"=>"37", "Joe"=>"43");
/**
* $age["Peter"] = 35;
* $age["Ben"] = 37;
* $age["Joe"] = 43;
*/
foreach($age as $x=>$x_value){
  echo "Key=".$x.", Value=".$x_value;
  echo "<br>";
}
?>
```

#### 多维数组

一个数组中的值可以是另一个数组，另一个数组里的值也可以是一个数组，依照这种方式，可以创建二维或三维数组

```php
// 二维
$cars = array(
  array("Volvo", 100, 96),
  array("BMW", 60, 59),
  array("Toyota", 110, 100),
);
echo json_encode($cars);
// 自动分配ID键的多维数组
$sites = array(
  "runoob"=>array(
    "菜鸟教程",
    "http..."
  ),
  "google"=>array(
    "Google",
    "www.google.com"
  ),
  "taobao"=>array(
    "taobao",
    "www.taobao.com"
  )
);
print("<pre>"); // 格式化输出数组
print_r($sites);
print("</pre>");
```

#### 数组排序

- asort() - 根据关联数组的值，对数组进行升序排列
- ksort() - 根据关联数组的键，对数组进行升序排列
- arsort() - 根据关联数组的值，对数组进行降序排列
- krsort() - 根据关联数组的键，对数组进行降序排列

```php
$a=array("key1"=>"val1","key6"=>"val6","key3"=>"val1","key5"=>"val6","key4"=>"val8");
arsort($a);
print("<pre>");
var_dump($a);
print("</pre>");
```

### session

session 变量用于存储关于会话用户会话的信息，或者更改用户会话（session）的设置，session 变量存储单一用户信息，并对于应用程序中所有页面都是可用的。  
session 的工作机制是：为每个访客创建一个唯一的 ID（UID），并基于这个 UID 来存储变量，UID 存储在 cookie 中，或者通过 URL 进行传导。

##### 开始 PHP session

`session_start()`函数必须位于`<html>`标签之前

- 会在系统临时文件夹创建 session 文件，格式是`变量名|类型:长度:值`

```php
<?php session_start();?>
<html>
<body>
</body>
</html>
```

##### 存储 session 变量

```php
<?php
// 存储session数据
if(isset($_SESSION["views"])){
  $_SESSION["views"]=$_SESSION["views"]+1;
} else{
  $_SESSION["views"] = 1;
}
// 检索session数据
echo "浏览器：".$_SESSION["views"];
?>
```

##### 销毁 session

```php
<?php
session_start();
if(isset($_SESSION["views"])){
  unset($_SESSION["views"]);
}
?>
```

- 也可以通过`session_destroy()`函数彻底销毁 session

```php
<?php
// session_destroy()将重置session，将造成失去所有已存储的session数据
session_destroy();
?>
```

#### PHP 会话（session）实现用户登陆功能

- 验证程序

```php
<?php
// 表单提交后
$posts = $_POST;
// 清除一些空白符号
foreach($posts as $key=>$value){
  $posts[$key] = trim($value);
}
$password = md5($posts["password"]);
$username = $posts["username"];
$query = "SELECT `username` FROM `user` WHERE `password` = '$password' AND 'username'='$username'";
// 取得查询结果
$userInfo = $DB->getRow($query);
if(!empty($userInfo)){
  session_start();
  $_SESSION["admin"]=true;
} else {
  die("用户名或密码错误");
}
?>
```

- 需要用户验证的页面，判断是否登录

```php
<?php
/// 防止全局变量造成安全隐患
$admin=false;
// 启动会话，这步必不可少
session_start();
// 判断是否登录
if(isset($_SESSION["admin"])&&$_SESSION["admin"]==true){
  echo "您已成功登录";
} else {
  // 验证失败将$_SESSION["admin"]置为false
  $_SESSION["admin"] = false;
  die("您无权访问");
}
?>
```

- 退出登录

```php
<?php
session_start();
// 销毁某个变量
unset($_SEESION["admin"]);
// 全部销毁
session_destory();
?>
```

- 设置 session 有效期

```php
// 01 设置cookie来控制
<?php
session_start();
$liseTime = 24*3600; // 一天
setcookie(session_name(), session_id(),time()+$lifeTime,"/");
?>
// 02 session_set_cookie_params()，必须在session_start()函数之前
<?php
$lifeTime = 24*3600;
session_set_cookie_params($lifeTime);
session_start();
$_SESSION["admin"] = true;
?>
```

- 设置存放目录

```php
<?php
$savePath = "./session_save_dir";
$lifeTime = 24*3600;
session_save_path($savePath);
session_set_cookie_params($lifeTime);
$_SESSION["admin"] = true;
?>
```
