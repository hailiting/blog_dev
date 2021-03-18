# PHP 面向对象

软件工程的三个目标：重用性，灵活性，扩展性  
特点： 封装，继承，多态

- 类 【 大的类，人类
- 对象 【具体的实体，new 类 产生对象
- 面向对象的三个主要特征：
  - 对象的行为
  - 对象的状态
  - 对象的标识

## 如何抽象一个类

- 类的声明
- 成员属性
- 成员方法

#### 格式

类

```php
[修饰符] class 类名 [extends 父类] [implements 接口1[,接口2...]] {
  [成员属性] // 成员变量
    // eg: public $name = "zhan";
    // --- 不可以是表达式，变量，方法或函数调用
    public $var1=1+2; // err
    public $var2=self::myStaticMethod(); // err
    public $var3=$myVar; // err
    public $var4= 100; // ok 普通数值（4个标量：整点、浮点、布尔、字符串
    public $var5= myContant; // ok 常量
    public $var6= self::classConstant; // ok 静态属性
    public $var7= arry(true, false);// ok 数组
  [成员方法] // 成员函数
    [修饰符] function 方法名(参数..){
      [方法体]
      [return 返回值]
    }
    public function say(){
      echo "人在说话";
    }
}

```

对象

```php
$对象名称 = new 类名称();
$对象名称 = new 类名称([参数列表]);
```

对象中成员的访问

```php
$引用名 = new 类名(构造参数);
$引用名->成员属性=赋值; // 对象属性赋值
echo $引用名->成员属性; // 输出对象的属性
$引用名->成员方法(参数); // 调用对象的方法
```

特殊对象引用\$this

```php
<?php
class Phone {
  public $width;
  public $height;
  public function play(){
    echo "正在玩手机!";
  }
  public function info(){
    $this->play();
    return "手机的宽度:{$this->width}, 手机的高度{$this->height}";
  }
}
$apple = new Phone();
$apple->width = 22;
$apple->height = 30;
$age = $apple->info();
echo $age;
?>
```

### 构造方法

```php
[修饰符] function __construct([参数]){
  程序体;
}
```

### 析构方法

下面再也没有这个类调用的时候，用析构方法

```php
[修饰符] function __destruct([参数]){
  程序体;
}
```

```php
<?php
class Person {
  // 构造方法
  public function __construct($age){
    // 当这个类new的时候自动执行
    echo "hello $age";
    echo "<br/>";

    $this->age=$age;
  }
  public function data(){
    return $this->age;
  }
  // 析构方法
  public function __destruct(){
    // 可以进行资源的释放操作，数据库关闭
    // 对象被销毁的时候执行
    echo "bye {$this->age}";
    echo "<hr/>";

  }
}
$xiaoming = new Person("xiaoming");
$xiaohong = new Person("xiaohong");
echo $xiaoming->data();
$xiaoZhang = new Person("xiaoZhang");
?>
```

### 封装性

封装就是把对象中的成员属性和成员方法加上访问修饰符，使其尽可能的隐藏对象的内部细节，以达到对成员的访问控制【不是拒绝访问】。

- 设置私有成员与私有成员的访问
- `__set()`
- `__get()`
- `__isset()`
- `__unset()`

#### 修饰符

- public 公有的，默认
- private 私有的
- protected 受保护的

```php
class persion {
  public $name;
  private $age = 27;
  protected $money =100000;
  private function getMoney(){
    return $this->money;
  }
  protected function getAge(){
    return $this->age;
  }
  public function cardinfo(){
    return $this->getMoney().$this.getAge();
  }
}
$xiaoming = new persion();
echo $xiaoming->cardinfo();
```

封装后的成员在对象的外部不能直接访问，只能在对象的内部方法中使用`$this`访问

```php
<?php
class person {
  public $aa;
  private $name;
  private $age = 27;
  protected $money =100000;
  private function getMoney(){
    return $this->money;
  }
  public function getAge(){
    return $this->age;
  }
  public function cardinfo(){
    return "Name: ".$this->name."<br/> Money: ".$this->getMoney()."<br/> Age:".$this->getAge();
  }
  public function setName($value){
    return $this->name = $value;
  }
  public function __set($key, $value){
    // echo "key:  ".$key."<br/>value: ".$value."<br/>";
    /// 魔术方法的set只针对protected或private
    if($key ==="name" && $value==="laowang"){
      $this->name = "xiaohai";
    }
  }
  public function __get($key){
    if($key === "age"){
      return "<br/>girl not tell you";
    }
  }
  public function __isset($key){
    if($key === "age"){
      return false;
    }
  }
}
try {
  $xiaoming = new person();
  $xiaoming -> name = "laowang";
  // echo $xiaoming->setName("laowang");
  // echo $xiaoming->cardinfo();
  // echo $xiaoming->age=2222;
  // echo $xiaoming->age;
  echo "<hr/>";

//   var_dump(isset($xiaoming->age));
//   echo isset($xiaoming->name)?"true":"false";
//   $xiaoming->aaa=3333;
//   echo $xiaoming -> aa;
//   unset($xiaoming->aaa);
//   echo "<hr/>";
//   echo $xiaoming -> aa."unset result";
//   echo "<hr/>";
//  echo $xiaoming->getAge();
 echo "<hr/>";
 echo "ssss";
} catch (Exception $e){
  echo $e->getMessage();
}
?>
```

### 继承

- 类继承的应用
- 访问类型的控制
- 子类中重载父类的方法

#### 访问权限

|            | private | protected | public |
| ---------- | ------- | --------- | ------ |
| 同一类中   | yes     | yes       | yes    |
| 在子类中   | no      | yes       | yes    |
| 在类的外部 | no      | no        | yes    |

#### 子类中重载父类的方法

- 在子类里允许重写（覆盖）父类中的方法
- 在子类中，使用 parent 访问父类中被覆盖的属性和方法

```php
parent::contruct();
parent::fun();
```

```php
<?php
class Person{
  public $name;
  private $age;
  protected $money;
  public function __construct($name,$age,$money){
    echo 333;
    $this -> name= $name;
    $this -> age= $age;
    $this -> money= $money;
  }
  public function construct($name,$age,$money){
    echo 222;
    $this -> name= $name;
    $this -> age= $age;
    $this -> money= $money;
  }
  public function cardinfo(){
    echo "Name: ".$this->name."<br/> Money: ".$this->money."<br/> Age:".$this->age;
  }
  function __get($key){
    echo $key." is privated";
  }
}
class Woman extends Person{
  public function __construct($name,$age,$money){
    parent::construct($name,$age,$money);
  }
  public function cardinfo(){
    parent::cardinfo();
    echo "<br/>";
    echo $this->name;
    echo "<br/>";
    echo $this->money;
    echo "<br/>";
    echo $this->age;
  }
}
$s = new Person("小明", 22, 100000);
 $s -> cardinfo();
echo "<hr/>";
$sWm = new Woman("小明222", 2222, 100222000);
$sWm -> cardinfo();
echo "<hr/>";
echo $sWm->name;
echo "<hr/>";
echo $sWm->age;
echo "<hr/>";
echo $sWm->money;
?>
```

## 抽象类和接口

包含抽象方法的类叫抽象类  
抽象类和抽象方法都是用`abstract`声明，如：

```php
public abstract function fun();
```

### 抽象类的特点：

- 不能实例化，也就是不能 new 成对象
- 若想使用抽象类，就必须定义一个类去继承这个抽象类，并定义覆盖父类的抽象方法（实现抽象方法）

### 接口

接口：指定了一个实现了该接口的类必须实现一系列函数

```php
// 定义格式:
interface 接口名称{
  // 常量成员(使用const关键字定义)
  // 抽象方法(不需要使用abstract关键字)
}
// 使用格式
class 类名 implements 接口名1,接口名2{
  ...
}
```

### 接口 和 抽象类

- 当关注一个事物本质的时候，用抽象类，抽象类是对根源的抽象，表示这个类是什么，对类的整体进行抽象，对一类事物的抽象描述
- 当关注一个操作的时候，用接口，接口是对动作的抽象，表示这个对象能做什么，对类的局部行为进行抽象
  > 男人和女人是两个类，他们的抽象类是人，人可以吃东西，狗也可以吃东西，然后 可以定义一个接口`吃东西`,然后让这些类去实现他
- 所以一个类只能实现一个抽象类，但可以继承多个接口

#### 区别

- 接口是抽象类的变体，接口中所有的方法都是抽象的。而抽象类是声明方法的存在而不去实现他的类
- 接口可以多继承，抽象类不行
- 接口定义方法，不能实现，而 抽象类可以实现部分方法
- 接口中基本数据类型为 statci，而抽象类不是
- 接口中不能包含静态代码块及静态方法，而抽象类可以包含静态方法和静态代码块
-

#### 对象的多态性

```php
/**
* 1. 含义抽象方法的类必须是抽象类
* 2. 抽象类不一定非得有抽象方法
* 3. 抽象类不能被实例化，并由一个子类继承，并实现抽象类的抽象方法
*/
<?php
abstract class Person {
  public abstract function eat();
  public function dodo(){
    echo "dodo";
  }
}
class Man  extends Person {
  function eat(){
    echo "000";
  }
}
$man  = new Man();
$man->dodo();
$man->eat();
?>
```

```php
<?php
// 1. 接口声明的关键字是interface
// 2. 接口可以声明常量也可以抽象方法
// 3. 接口中的方法都是抽象方法，不能用abstract去人肉的定义
// 4. 接口不能被实例化，需要一个类去实现它
// 5. 一个类不能继承多个类 一个类可以实现多个接口
interface Person {
  const NAME =  "xiaoming"; // 静态变量
  public function run();
  public function eat();
}
interface Study{
  public function study();
}
abstract class Human  implements Person,study {
  const data = 3.1415926;
  public function run(){
  }
  public function eat(){
  }
  public function study(){

  }
  public function test(){
    echo self::data;
  }
  public static function staticTest(){
    echo '<br/>'.self::data."-----22212311".'<hr/>';
  }
}
class Student extends Human {

}
$xw = new Student();
$xw->test();
$xw::staticTest();
echo $xw::NAME;
echo $xw::data;
?>
```

## 常见的关键字

- final 关键字 只能修饰类和方法，不能使用 final 这个关键字来修饰成员属性
- static 关键字
- 单例设计模式
- const 关键字
- instanceof 关键字

#### final 特征

- 使用 final 关键字标识的类不能被继承
- final 标识的方法不能被子类覆盖重写，是最终版本
- -是位了安全
- 二是没必要被继承和重写

#### static

修饰静态属性和静态方法

#### const

const 是在类中定义常量的关键字，

```php
const CONTANT = 'constant value';
echo self::CONSTANT; // 类内部访问
echo className::CONTANT; // 类的外部访问
```

#### instanceof

检测某一个是否是哪一个类

- `clss_exists`
- `get_class_methods`
- `get_class` - 返回对象的类名
- `get_object_vars` - 返回由对象属性组成的关联数组
- `string get_parent_class([ mixed $obj ])` - 返回对象或类的父类名
- `bool is_a(onject $object, string $class_name)` - 如果对象属于该类或该类是此对象的父类则返回 TRUE
- `method_exists`
- `property_exists`

## PHP\_系统自带的异常处理

```php
class Exception {
  protected $message = "Unknown exception"; // 异常信息
  protected $code = 0; // 用户自定义异常代码
  protected $file;  // 发生异常的文件名
  protected $line;
  function __construct($message=null, $code=0);
  final function getMessage(); // 返回异常信息
  final function getCode();  // 返回异常的代码
  final function getFile();  // 返回发生异常的文件名
  final function getLine(); // 返回发生异常的代码行号
  final function getTrace(); // backtrace()数组
  final function getTraceAsString(); // 已格式化成字符串的getTrace信息
  function __toString(); // 可输出的字符串
}
```

## 继承系统错误类，自定义

```php
<?php
class myException extends Exception {
  public function getAllInfo(){
    return "异常处理的文件为:{$this->getFile()},异常发生的行为为:{$this->getLine()}, 异常信息为{$this->getMessage()},异常代码为:{$this->getCode()}";
  }
 }
 try {
    if($_GET["num"] == 1){
      throw new myException("user");
    } else if($_GET["num"] == "2"){
      throw new myException("sys");
    }
    echo "success";
 } catch (myException $e){
   echo $e->getAllInfo();
 }
?>
```

## `__toString`

```php
<?php
class TestClass {
  public $foo;
  public function __construct($foo){
    $this->foo=$foo;
  }
  public function __toString(){
    return $this->foo." this is string";
  }
}
$class  = new TestClass("abc");
echo $class;  /// abc this is string
?>
```
