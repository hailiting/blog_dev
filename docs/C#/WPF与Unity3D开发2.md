# WPF 与 Unity3D 开发

技术栈
C# .NET Unity3d

.NET 6
https://learn.microsoft.com/zh-cn/dotnet/core/tutorials/with-visual-studio-code?pivots=dotnet-6-0

```sh
- 选定文件夹
- 命令行运行
  - dotnet new console --framework net6.0 --use-program-main
- dotnet run
```

## System

### Console

- `Console.Wirte([string value])`: 输出字符串而不换行
- `Console.WirteLine([string value])`: 输出字符串并换行
- `Console.Read()`: 读取控制台的一个字符，返回一个整数值，代表 ASCII 码
- `Console.ReadKey(true)`: 读取一个按键，true 参数表示不显示按键在控制台上的输出
- `Console.ReadLine()`: 读取一行用户输入的文本
- `Console.Clear(value)`: 清空控制台屏幕

```c#
namespace CHello;
class Program
{
  static void Main(string[] args)
  {
    Console.WriteLine("111");
    Console.WriteLine("222");
    Console.WriteLine("333");
    ConsoleKeyInfo a = Console.ReadKey();
    Console.WriteLine(a.key);
    Console.Read();
    Console.ReadLine();
  }
}
```

## 变量与数据类型

- c#有 13 种基本数据类型
- 预先定义好的内建类型，可以直接使用
- `Primitive Types`

```c#
// type 数据类型
// name 变量名称
// data 具体数据
type name = data

int number = 5;
float pi = 3.1415;
bool isEarthRound = true
string hello = "hello world";
char initChar = "A";
double scientificDouble = 1.23e-5; // 双精度浮点数，用于需要高精度的数值计算
```

### 整型

- sbyte: 有符号字节 8 位 -128 --- 127
- byte: 无符号字节 8 位
- short: 有符号整形 16 位
- ushort: 无符号整形 16 位
- int: 有符号整形 32 位
- uint: 无符号整数，32 位
- long: 有符号长整数，64 位
- ulong: 无符号长整型，64 位

### 浮点型

- float: 单精度浮点数，32 位
- double: 双精度浮点数，64 位
- decimal: 十进制数，128 位，适合财务计算和其他需要高精度的应用场景

### 字符型

- char: Unicode 字符 16 位 存储任何 Unicode 字符，无法表示中文字符

### 布尔型

- bool

### 内建类型

- string 类型
- object 对象类型
- dynamic 动态类型

#### string 的基本操作

```c#
- 声明与初始化
string greeting = "Hello world!";
- 连接字符串
string name = "John";

  string message = $"Hello,\n {name} !"; // 模板字符串
  string message = @"Hello,\n {name} !"; // @ 原意字符串

  message = String.Concat("Hello, ", name, "!");

  string[] parts = {"Hello, ",",", name, "!"};
  String.Join("", parts);

  StringBuilder sb = new StringBuilder();
  sb.Append("Hello, ");
  sb.Append(name);
  sb.Append("!");
  message = sb.ToString();

- 获取长度
int length = greeting.length;
- 截取字符串
string part = greeting.Substring(7, 5); // 获取第7个字符开始的5个字符
- 查找子字符串
int index = greeting.IndexOf(","); // 获取逗号位置
bool contains = greeting.Contains("World"); // 检查是否包含特定子字符串
- 替换子字符串
string modified = greeting.Replace("World", "Dolly"); // 将 World 替换位 Dolly
- 拆分字符串
string[] words = greeting.Split(","); // 使用逗号分割字符串
- 转换大小写
string upper = greeting.ToUpper(); // 大写
string lower = greeting.ToLower(); // 小写
- 空白
string trimmed = greeting.Trim(); // 移除两端的空白字符
bool isEmpty = string.IsNullOrEmpty(greeting); // 检查是否为空或空字符串
```

## 决策与分支

### 1. if elseif else

```c#
if(){
} else if(){
}else{}
```

### 2. switch

```c#
switch(条件表达式){
  case 情况1:
    执行逻辑;
    break;
  case 情况2:
    执行逻辑;
    break;
  default: // 默认情况
    执行逻辑;
    break;
}
```

### 3. 三元运算符

```c#
var result = 条件?值1:值2;
```

### 4. `null-coalescing`运算符 ??

```c#
string value = nullableVeriable ?? "默认值"
```

## 循环

- for 循环
- while 循环
- do while 循环

```c#
for(int counter =0; counter<10; counter++)
{
  if(counter == 3) {
    Console.WriteLine("循环停止");
    break; // 跳出循环
    continue; // 跳出当前循环
  }
  Console.WriteLine(counter);
}

int counter = 0;
while( counter<10)
{
  Console.WriteLine(counter);
  counter++;
}

int counter = 0;
do {
  Console.WriteLine(counter);
  counter++;
} while (counter < 10);
```

## 方法签名

```#c
<Access Specifier> <Modifier> <Return Type> <Method Name> (Parameter List)
{
  Method Body
}
```

- `Access Specifier`: 访问修饰符
  - `Public`: 共有方法，可以被外部调用
  - `Private`: 表示私有，方法会被隐藏起来，其他 class 不可调用
  - `Protected`: 表示受保护的，只能在它的类本身或它的派生类中访问
  - `Private protected`:
  - `Internal`: 内部方法，同一个程序集中的所有类都可以访问
  - `Protected internal`:
- Modifier 声明修饰符
  - Static: 静态类型
  - Abstract: 抽象类型
  - Virtual: 派生类重写的虚函数
  - Override: 允许方法继承后重写
  - New: 可以隐藏基类成员
  - Sealed: 表示不能被继承
  - Partial: 允许在同一个程序集分散定义
  - Extern: 用于声明外部实现的 Extern

```c#
public static int FindMax(int num1, int num2)
{
  int result;
  if(num1 > num2){
    result = num1;
  } else {
    result = num2;
  }
  return result;
}
```

### 形参与实参

- 形参，parameter, 形式上的参数
- 实参，argument, 真正调用方法过程中传入的具体数据

### 值传参 引用传参 输出传参

- ref 引用 => 内存地址的引用
- ref 引用传参的变量必须已经完成了初始化
- out 输出传参没这个要求

```c#
 static void swap(ref int x, ref int y)
{
    int c = x;
    x = y;
    y = c;
}
static void getValue(out int x)
{
  x = 10;
}
static void Main(string[] arg)
{
    int a = 1;
    int b = 99999;
    swap(ref a, ref b);
    Console.WriteLine("a: " + a);
    Console.WriteLine("b: " + b);
    getValue(out a);
    Console.WriteLine("a: " + a);
}
```
