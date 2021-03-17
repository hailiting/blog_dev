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
