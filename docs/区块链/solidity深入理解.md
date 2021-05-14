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

#### `<address>.balance(uint256)`

- 该地址的 ether 余额，以 wei 为单位

#### `<address payable>.transfer(uint256 amount)`

- 向指定地址发送数量为`amount`的`ether`(以 wei 为单位)，失败时抛出异常，发送 2300gas 的矿工费，不可调节

#### `<address payable>.transfer(uint256 amount) returns (bool)`

- 向指定地址发送数量为`amount`的`ether`(以 wei 为单位)，失败是返回 false，发送 2300 gas 的矿工费用，不可调节

#### `<address>.delegatecall(bytes memory) returns (bool, bytes memory)`

- 发出底层函数 DELEGATECALL，失败时返回 false，发送所有可用 gas，可调节

#### `<address>.staticcall(bytes memory) returns (bool, bytes memory)`

- 发出底层函数 STATICCALL，失败时返回 false，发送所有可用 gas，可调节

### 地址成员变量用法

**balance 和 transfer**

- 可以使用 balance 属性来查询一个地址的余额，可以使用 transfer 函数向一个 payable 地址发送以太币`Ether`(以 wei 为单位)

```js
address payable x = address(0x123);
address myAddress =  address(this);
if(x.balance <10 &&  myAddress.balance>=10){
  x.transfer(10);
}
```

**send**

- send 是 transfer 的低版本，如果执行失败，当前的合约不会因为异常而终止，但 send 会返回 false
  **call**
- 也可以用 call 来实现转币的操作，通过添加`.gas()`和`.value()`修饰符

```js
nameReg.call.gas(1000000).value(1 ether)(abi.encodeWithSignature("register(string)", "MyName"));
```

## 字符数组（Byte Arrays）

### 定长字符数组

- 属于值类型，`bytes1,bytes2,....bytes32`分别代表了长度为 1 到 32 的字节序列
- 有一个`.length`属性，返回数组长度（只读）
- 属于引用类型，包括`bytes`和`string`，不同的是`bytes`是 Hex 字符串，而`string`是 `UTF-8`编码的字符串

## 枚举（Enum）

- 枚举类型用来用户自定义一组常量值
- 与 C 语言的枚举类型非常相似，对应整形值

```js
pragma solidity >= 0.4.0 <0.6.0;
contract Purchase {
  enum State  {Created,  Locked, Inactive}
}
```

## 数组(Array)

- 固定大小`k`和元素类型`T`的数组被写为`T[k]`,动态大小的数组为`T[]`。例如，一个由 5 个 uint 动态数组组成的数组是`uint[][5]`
- 要访问第三个动态数组中的第二个`uint`，可以使用`x[2][1]`
- 越界访问数组，会导致调用失败回退
- 如果要添加新元素，则必须使用`.push()`或将`.length`增大
- 变长的`storage`数组和`bytes`（不包括 string）有一个`push()`方法。可以将一个新元素附加到数组末端，返回值为当前长度

```js
pragma solidity>=0.4.16 <0.6.0;
contract C {
  function f(uint len) public pure{
    uint[] memory  a =  new uint[](7);
    bytes memory b = new bytes(len);
    assert(a.length == 7);
    assert(b.length == len);
    a[6] = 8;
  }
}
```

## 结构(Struct)

- 结构类型可以在映射和数组中使用，它们本身可以包含映射和数组
- 结构不能包含自己类型的成员，但可以作为自己数组成员的类型，也可以作为自己映射成员的值类型

```js
pragma solidity >=0.4.0 <0.6.0;
contract  Ballot  {
  struct  Voter{
    uint weight;
    bool voted;
    uint vote;
  }
}
```

## 映射(Mapping)

- 声明一个映射：`mapping (_KeyType=>_ValueType)`
- `_KeyType`可以是任何基本类型。这意味着他可以是任何内置值类型 加上字节和字符串。不允许使用用户定义的或复杂的类型，如枚举，映射，结构 以及除`bytes`和`string`之外的任何数组类型
- `_ValueType`可以是任何类型，包括映射

```js
pragma solidity >=0.4.0 <0.6.0;
contract MappingExample{
  mapping(address=>uint) public balances;
  function update(uint newBalance)public{
    balances[msg.sender] = newBalance;
  }
}
contract MappingUser {
  function f() public returns (uint){
    MappingExample m = new MappingExample();
    m.update(100);
    return m.balances(address(this));
  }
}
```

## Solidity 数据位置

- 所有的复杂类型，即`数组`、`结构`和`映射`，都有一个额外属性，“数据位置”。用来说明数据是保存在内存`memory`中还是存储在`storage`中
- 根据上下文不同，大多数时候数据有默认的位置，但也可以通过在类型名后添加关键字`storage`或`memory`进行修改
- 函数参数(包括返回的参数)的数据位置默认是 memory，局部变量的数据位置默认是`storage`，状态变量的数据位置强制`storage`
- 另外还存在第三种数据位置，calldata，这是一块只读的，且不会永久存储的位置，用来存储函数参数。外部函数的参数（非返回参数）的数据位置被强制指定为`calldata`，效果跟`memory`差不多

### 数据位置总结

**强制指定数据位置**

- 外部函数的参数（不包括返回参数）：calldata
- 状态变量：storage
  **默认数据位置**
- 函数参数（包括返回参数）： memory;
- 引用类型的局部变量：storage
- 值类型的局部变量：栈（stack）
  **特别要求**
- 公开可见（public visible）的函数参数一定是 memory 类型，如果要求是`storage`类型则必须是`private`或者`internal`函数，这是为了防止随意的公开调用占用资源

```js
pragma solidity ^0.4.0;
contract C{
  uint[] data1;
  uint[] data2;
  function appendOne() public{
    append(data1);
  }
  function appendTwo() public {
    append(data2);
  }
  function append(uint[] storage d) internal {
    d.push(1);
  }
}
```

```js
// 找错
pragma solidity ^0.4.0;
contract C {
  uint[] x;
  function f(uint[] memoryArray) public {
    x=memoryArray;
    uint[] y = x;
    y[7];
    y.length = 2;
    delete  x;
    y = memoryArray;
    delete y;
    g(x);
    h(x);
  }
  function g(uint[] storage storageArray) internal {}
  function h(uint[] memoryArray) public {}
 }
```

```js
pragma solidity >0.4.22;
contract Honeypot {
  uint luckyNum = 52;
  uint public last;
  struct Guess{address player, uint number;}
  Guess[] public guessHistory;
  address owner = msg.sender;
  function guesss(uint _num) public payable {
    Guess newGuess;
    newGuess.player = msg.sender;
    newGuess.number = _num;
    guessHistory.push(newGuess);
    if(_num == luckyNum){
      msg.sender.transfer(msg.value *2);
    }
    last = now;
  }
}
```

## Solidity 函数声明和类型

函数的值类型有两类： - 内部（internal）函数和外部（external）函数

```js
// getBrand     函数名
// public view returns   函数类型
// returns (string)  返回类型
function getBrand() public view returns (string) {
  return brand;
}
```

- 内部函数只能在当前合约内被调用（更具体来说，在当前代码块内，包括内部库函数和继承的函数中），因为他们不能在当前合约上下文的外部被执行。
- 调用一个内部函数是通过跳转到它的入口标签来实现的，就像在当前合约的内部调用一个函数
- 外部函数由一个地址和一个函数签名组成，可以通过外部函数调用传递或返回
- 调用内部函数：直接 使用名字 f
- 调用外部函数：`this.f`(当前合约)，`a.f`(外部合约)

### Solidityy 函数可见性

函数的可见性可以指定为`external`, `public`, `internal`或`private`;
对于状态变量，不能设置为`external`，默认是`internal`

- `external`: 外部函数作为合约接口的一部分，意味着我们可以从其他合约和交易中调用。一个外部函数`f`不能从内部调用（即 f 不起作用，但`this.f()`可以）。当收到大量数据的时候，外部函数有时候会更有效率
- `public`: `public`函数是合约接口的一部分，可以在内部或通过消息调用。对于 public 状态变量，会自动生成一个 getter 函数
- `internal`: 这些函数和状态变量只能是内部访问（即从当前合约内部或从它派生的合约访问），不使用`this`调用
- `private`: `private`函数和状态变量仅在当前定义它们的合约中使用，并且不能被派生合约使用

```js
// 找错误
pragma solidity >=0.4.0 <0.6.0;
contract C {
  uint private data;
  function f(uint  a) private pure returns (uint b){
    return a+1;
    }
  function setData(uint a) public {
    data = a;
  }
  function getData(uint a) public view returns(uint) {
    return data;
  }
  function compute(uint a, uint b) internal pure returns (uint) {
    return a+b;
  }
}
contract D{
  function readData() public {
    C c = new C();
    uint local = c.f(7);
    c.setData(3);
    local = c.getDate();
    local =c.compute(3, 5);
  }
}
contract E is C{
  function g() public {
    C c=new C();
    uint val = compute(3, 5);
  }
}
```

```js
pragma solidity >=0.4.16 <0.6.0;
contract C {
  function f(uint a) private pure returns (uint b){
    return a+1;
  }
  function setData(uint a) internal {
    data = a;
  }
  uint public data;
  function x() public{
    data = 3; // 内部访问
    uint val  = this.data(); // 外部访问
    uint val2 = f(data);
  }
}
```

```js
// 找错误
pragma solidity ^0.4.0;
contract C {
  uint private data;
  function f(uint a) private returns (uint b) {
    return a+b;
  }
  function setData(uint a) public {
    data = a;
  }
  function getData() public returns (uint){
    return data;
  }
  function compute(uint a,  uint b) internal  returns (uint)  {
    return a+b;
  }
}
contract D{
  function readData() public {
    C c=new C();
    uint local =c.f(7);  // 错误   成员f不可见
    c.setData(3);
    local = c.getData();
    local = c.compute(3, 5); // 错误：成员 compute 不可见
  }
}
contract E is C {
  uint local = c.f(7);
  c.setData(3);
  local =c.getData();
  local = c.compute(3,5); // 错误：成员 compute 不可见
}
```

### Solidity 函数状态可变性

- pure: 纯函数，不允许修改或访问状态
- view: 不允许修改状态
- payable: 允许从消息调用中接收以太币 Ether
- constant: 与 view 相同，一般只修饰状态变量，不允许赋值（除初始化以外）

### Solidity 函数状态可变性
