# PHP 面向对象
软件工程的三个目标：重用性，灵活性，扩展性        
特点： 封装，继承，多态        
- 类 【 大的类，人类
- 对象   【具体的实体，new 类  产生对象     
- 面向对象的三个主要特征：
  - 对象的行为
  - 对象的状态
  - 对象的标识
## 如何抽象一个类
- 类的声明
- 成员属性
- 成员方法
### 格式
类
~~~php
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

~~~
对象
~~~php
$对象名称 = new 类名称();
$对象名称 = new 类名称([参数列表]);
~~~
对象中成员的访问
~~~php
$引用名 = new 类名(构造参数);
$引用名->成员属性=赋值; // 对象属性赋值
echo $引用名->成员属性; // 输出对象的属性
$引用名->成员方法(参数); // 调用对象的方法
~~~
特殊对象引用$this
~~~php
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
~~~
## 构造方法
~~~php
[修饰符] function __construct([参数]){
  程序体;
}
~~~
## 析构方法
下面再也没有这个类调用的时候，用析构方法
~~~php
[修饰符] function __destruct([参数]){
  程序体;
}
~~~
~~~php
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
~~~