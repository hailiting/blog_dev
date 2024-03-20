# WPF 与 Unity3D 开发

- 什么是对象
  - 什么是面向对象
  - 对象和内存管理
  - 对象聚合
  - 问题
    - 类和实例的关系
    - 当一个对象初始化后，这个对象将会被创建在内存的什么位置
- 什么是面向对象
  - Object Oriented Programming 面向对象编程，简称 OOP，是一种程序的设计思想
  - 什么是面向对象
  - 对象与内存管理
  - 对象聚合
  - 问题
    - 什么是高内聚、低耦合
    - 什么是方法重载？什么是方法重写
    - 访问修饰符有什么用
- C#的对象有什么特征
  - C#面向对象的三大特征：继承，多肽，封装
  - 什么是面向对象
  - 对象与内存管理
  - 对象聚合
  - 问题
    - 如何区分 C#中类的字段 field 与属性 property
    - const 与 readyonly 有什么区别
    - 如何实现 writeonly
    - 什么是类索引

```c#
User user1 = new User() {
  age:1,
  name: "aaa"
};
User user2 = new User() {
  age:1,
  name: "aaa"
};
Console.WriteLine(user1=user2);
```

- 面向对象编程：从宏观上来认识、分解并总结某个事物的运行规则
- 每个**对象**都是某个**类**的一个**实例**

## 对象与内存管理

内存的生命周期

- 分配内存
- 使用内存（读写操作）
- 用完后释放内存

### 内存分区

- 栈区: 由编译器自动分配释放，存放`值类型`的数据，引用类型(如对象)的`引用地址（指针）`，如静态区对象的引用地址（指针），常量区对象的引用地址(指针)等。而栈区操作方式，类似于数据结构中的栈。
- 堆区（托管堆）: 用于存放`引用类型对象本身`，也就是对象数据。在 c#中，由.net 平台的垃圾回收机制(GC)管理。栈，堆都属于动态存储区，可以实现动态分配
- 静态区及常量区: 用于存放`静态类`，静态成员(静态变量，静态方法)，`常量对象`。由于存在栈内的地址都在程序运行开始最先入栈，因此静态区和常量区内的对象的生命周期会持续到程序运行结束时，届时静态区内和常量区内对象才会被释放和回收（编译器自动释放）。所以应限制使用静态类，静态成员（静态变量，静态方法），常量，否则程序负荷高
- 代码区: 存放函数体内的二进制代码

### 内存管理 - 分配 malloc 与释放 free

c#内存分区、分类型管理

- 值类型: 常见的`primitive type`, 如`int char`
- 引用类型: 继承自`System.Object`, 也就是对象，包括 String
- 指针类型: 指针(内存地址)，受 CLR(公共语言运行时)管理。指针在内存中(栈区)占一块内存区，它本身只代表一个内存地址(或 null)，它所指向的另一块内存区(堆区)才是我们真正的数据或类型

#### 栈区管理

栈是编译期间就分配好了内存空间

```c#
Int n = 1; // Int 为4个字节内存 00000000 00000000 00000001
```

#### 堆区管理

堆是程序运行期间`动态分配`的内存空间

### 操作

#### 类 class

##### 实例 instance

```c#
class program
{
  // 主方法
  static void Main(string[] arg)
  {
    // dynamic var
    Point a = new()
    {
        x = 15,
        y = 10
    };
    DrawPoint(a);
    Console.Read();
    return;
  }
  // 类的首字母必须大写
  public class Point {
    public int x;
    public int y;
  }
  // dynamic 不确定类型
  public static void DrawPoint(Point point)=>Console.WriteLine($"左边点为 x: {point.x}, y: {point.y}");
}
```

##### Cohesion 对象聚合

```c#
public class Point {
  public int x;
  public int y;
  public void DrawPoint()=> Console.WriteLine($"左边点为 x: {x}, y: {y}");
  public double GetDistances(Point p)
  {
      double dis = Math.Sqrt(Math.Pow(x - p.x, 2) + Math.Pow(y - p.y, 2));
      Console.WriteLine($"距离是: {dis}");
      return dis;
  }
}
```

##### Constructor 构造和方法重载

```C#
public class Point {
  public int x;
  public int y;
  // 方法的重载
  public Point()
  {
    this.x = 10;
    this.y = 15;
  }
  public Point(int x, int y)
  {
    this.x = x;
    this.y = y;
  }
}
```

##### 访问修饰符 Access Modifier

- public
- private
- protected (get set 懒人包)
- internal

定义字段 小写
定义属性 大写

```c#
namespace CHello;
class Program
{
    // 主方法
    static void Main(string[] arg)
    {
        // dynamic var
        Point a = new(11)
        {
            X = 999
        };
        Console.WriteLine(a.X);
        return;
    }
    // 类的首字母必须大写
    public class Point
    {
        private int _x;
        public int X
        {
            get { return this._x; }
            set
            {
                if (value < 0)
                {
                    throw new Exception("value 不能小于0");
                }
                this._x = value;
            }
        }
        public Point(int x)
        {
            this._x = x;
        }

    }
}
```

- auto-implement property 自动实现属性

```c#
public class A {
  public Z {get; set;} // 自动生成小写的z
}
```

##### 常量 const、只读 read-only、只写 write-only

https://dapplearning.org/account/githubverify?code=0d32bcf92d067ee6982e&state=Umsr6bYyE0y13RYceeCqhLRu9sYPa3ta6GYkvfPP_IM%3D
https://github.com/login/oauth/authorize?client_id=57be1f6c25ece8375356&response_type=authorization_code&state=ACSfNJxYiqW6y23Cd78-AUlX-8kNr6LJ2BmSLGBC2J0=
https://api.twitter.com/oauth/authorize?oauth_token=uIQ48QAAAAABr2q1AAABjjCnh_Q

长 宽 高 时间

```C#
public class A {
  // sigularity 只写
  private int _s;
  public int S {set {_s = value;}}
}
```

- const 在编译前能定下来 性能比 readonly 高

##### 索引(Index)和范围(Range)

```C#
string[] words = new string[]{
  "The", // 0  ^9
  "quick", // 1 ^8
  "brown", // 2 ^7
  "fox", // 3 ^6
  "jumped", // 4 ^5
  "over", // 5 ^4
  "the", // 6 ^3
  "lazy", // 7 ^2
  "dog" // 8 ^1
};
// range 氛围 [开始位置..结束位置]
Index k = ^1;
Console.WriteLine(words[1]);
Console.WriteLine(words[k]);
// 提取 可以使用的变量
Range p = 0..3;
string[] list = words[p];
foreach(var word in list)
{
  Console.WriteLine(word);
}

static void Main(string[] arg)
{
    A a = new();
    Console.WriteLine(a[0]);
    a[0] = "aaa999";
    Console.WriteLine(a[0]);
}
public class A {
  // sigularity 只写
  private string[] words = new string[]{
    "The", // 0  ^9
    "quick", // 1 ^8
    "brown", // 2 ^7
    "fox", // 3 ^6
    "jumped", // 4 ^5
    "over", // 5 ^4
    "the", // 6 ^3
    "lazy", // 7 ^2
    "dog" // 8 ^1
  };
  // 创建索引需要使用this
  public string this[int index]
  {
    get
    {
      return words[index];
    }
    set
    {
      words[index] = value;
    }
  }
   public int this[string str]
  {
    get
    {
      // 查找输入元素的位置
      return Array.IndexOf(works, str);
    }
  }
}
```

#### Partial Class 局部类 局部方法

使用 partial 所有相关的都要用 partial

- 只适用于类、接口、结构，不支持委托和枚举
- 必须有修饰符 partical
- 必须同时编译
- 必须位于相同的命名空间中
- 各部分的访问修饰符必须一致
- 局部类是有累加效应的

```c#
// Point.cs
namespace HelloWorld
{
  public partial class A
  {
    public int a { get; set; }
  }

}
// Point.Delta.cs
namespace HelloWorld
{
  public partial class A
  {
    public int Delta { get; set; }
    public void PrintDelta()
    {
      Console.WriteLine(Delta);
    }
  }
}
```
