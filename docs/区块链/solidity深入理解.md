# Solidity 深入理解

## Solidity 源文件布局

### `pragma`版本杂注

- 源文件可以被版本杂注 pragma 所注解，表明要求的编译器版本
- 例如: `pragma solidity ^0.4.0;`
- 源文件将即不允许低于`0.4.0`版本的编译器编译，也不允许高于（包含）0.5.0 版本的编译器编译（第二个条件因为使用了`^`被添加）

### `import`(导入其他源文件)

- Solidity 所支持的导入语句`import`，语法同`javascript`（ES6）非常类似

#### 具体用法解析

- `import "filename"`
  - 从“filename”中导入所有的全局符号到当前全局作用域中
- `import * as symbolName from "filename";`
  - 创建一个新的全局符号 symbolName，其 成员均来自“filename”中全局符号
- `import "filename" as symbolName;`
  - 这条语句等同于`import * as symmbolName from "filename";`

## Solidity 值类型

- 布尔(bool): 可能的取值为字符常量值`true`或`false`
- 整形(int/uint): 分别表示有符号和无符号的不同位数的整形变量；支持关键字 uint8 到 uint256(无符号，从 8 位到 256 位)以及 int8 发哦 int256，以 8 位为步长递增
- 定长浮点型(fixed/ufixed): 表示各种大小的有符号和无符号的定长浮点型；在关键字`ufixedMxN`和`fixedMxN`中，M 表示该类型占用的位数，N 表示可用的小数位数
- 地址(address): 存储一个 20 字节的值（以太坊地址大小）
- 定长字节数组：关键字有`bytes1`,`bytes2`....`bytes32`
- 枚举(enum): 一种用户可以定义类型的方法，与 C 语言类似，默认从 0 开始递增，一般用来模拟合同的状态
- 函数(function): 一种表示函数的类型

## Solidity 引用类型

### 数组 - Array

- 数组可以在声明时指定长度（定长数组），也可以动态调整大小（变长数组、动态数组）
- 对于存储型（storage）的数组来说，元素类型可以是任意的（即元素也可以是 数组类型，映射类型或者结构体）
- 对于内存型(memory)的数组来说，元素类型不能是映射(mapping)类型

### 结构 - Struct

- Solidity 支持通过构造结构体的形式定义新的类型

### 映射 - Mapping

- 映射可以视作`哈希表`，在实际的初始化过程中创建每个可能的 key，并将其映射到字节形式其实零的值（类型默认值）

## Solidity 地址类型

### address

- 地址类型存储一个 20 字节的值（以太坊地址大小）；地址类型也有成员变量，并作为所有合约的基础

### address payable (v0.5.0 引入)

- 与地址类型基本相同，不过多出`transfer`和`send`两个成员变量

### 两者区别和转换

- Payable 地址是可以发送 ether 的地址，而普通`address`不能
- 允许从 `payable address`到`address`的隐式转换,而反过来的直接转换是不可能的（唯一的方法是通过`uint160`来 进行中间的转换）
- 从 0.5.0 版本开始，合约不再是从地址型派生而来，但如果它有`payable`的回退函数，那同样可以显示转换为`address`或`address payable`类型

### 地址类型成员变量
