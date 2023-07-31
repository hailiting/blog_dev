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

### 映射 - Mapping 字典

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
- 0.5.0 以下 合约是继承地址类型

### 地址类型成员变量

大的一个对象和结构

#### `<address>.balance(uint256)`

- 该地址的 ether 余额，以 wei 为单位

```js
// SPDX-License-Identifier: UNLICENSED;
pragma solidity >0.4.0;
contract Car {
  string  brand;
  uint  price;
  constructor(string memory initBrand, uint  initPrice)  {
    brand = initBrand;
    price = initPrice;
  }
  function setBrand(string  memory newBrand)  public  {
    brand  = newBrand;
  }
  function getBrand() public view returns  ( string memory){
    return brand;
  }
  function setPrice(uint newPrice) public {
    price = newPrice;
  }
  fixed128x20 a;
}
contract CarPayable {
  string a;
  Car car = new Car("BMW", 10000);
  function aa() view public returns(uint) {
   return address(car).balance;
  }
  function aaaaa() view public returns(string memory) {
   return car.getBrand();
  }
}
```

#### `<address payable>.transfer(uint256 amount)`

- 向指定地址发送数量为`amount`的`ether`(以 wei 为单位)，失败时抛出异常（等价于 `requi(send())`），发送 2300gas 的矿工费，不可调节

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.0;
contract Faucet {
    constructor()  payable {
    }
  function deposit(address payable recipient, uint256 amount)  payable public returns (bool success){
   return recipient.send(amount);
  }
  function deposit02(address payable recipient, uint256 amount) payable public {
      require(address(this).balance >= amount, "balance");
      recipient.transfer(amount);
  }
  function sendValue(address payable recipient, uint256 amount)  payable public  {
      require(address(this).balance >= amount, "Address: insufficient balance");

      // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
      (bool success, ) = recipient.call{ value: amount }("");
      require(success, "Address: unable to send value, recipient may have reverted");
  }
  function balance(address payable recipient) public view returns (uint256 amount){
      return recipient.balance;
  }
  fallback () payable external {}
  receive () payable external {}
}
```

#### `<address payable>.send(uint256 amount) returns (bool)`

- send 和 transfer 类似，send 不会发生异常，而是抛出 flase
- 向指定地址发送数量为`amount`的`ether`(以 wei 为单位)，失败是返回 false，发送 2300 gas 的矿工费用，不可调节

#### `<address>.call(bytes memory) returns (bool, bytes memory)`

- 发出底层函数 call，失败时返回 false，发送所有可用 gas,可调节

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
function sendValue(address payable recipient, uint256 amount) internal {
    require(address(this).balance >= amount, "Address: insufficient balance");
    (bool success, ) = recipient.call{ value: amount }("");
    require(success, "Address: unable to send value, recipient may have reverted");
}
nameReg.call.gas(1000000).value(1 ether)(abi.encodeWithSignature("register(string)", "MyName"));
```

## 字符数组（Byte Arrays）

### 定长字符数组

- 属于值类型，`bytes1,bytes2,....bytes32`分别代表了长度为 1 到 32 的字节序列
- 有一个`.length`属性，返回数组长度（只读）
- 属于引用类型，包括`bytes`和`string`，不同的是`bytes`是 Hex 字符串，而`string`是 `UTF-8`编码的字符串

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.0;
contract Test{
  function test() pure public returns  (uint256 num){
    bytes17 a;
    return a.length;
  }
}
// 0:uint256: num 17
```

## 枚举（Enum）

- 枚举类型用来用户自定义一组常量值
- 与 C 语言的枚举类型非常相似，对应整形值

```js
pragma solidity >= 0.4.0 <0.6.0;
contract Purchase {
  //  0 1 2
  enum State  {Created,  Locked, Inactive}
  function test() public pure returns(uint){
    State a = State.Created;
    return uint(a); // 0
    // State a = State.Locked;
    // return uint(a); // 1
  }
}
```

## 数组(Array)

- 固定大小`k`和元素类型`T`的数组被写为`T[k]`,动态大小的数组为`T[]`。例如，一个由 5 个 uint 动态数组组成的数组是`uint[][5]`
- 要访问第三个动态数组中的第二个`uint`，可以使用`x[2][1]`
- 越界访问数组，会导致调用失败回退
- 如果要添加新元素，则必须使用`.push()`或将`.length`增大
- 变长的`storage`数组和`bytes`（不包括 string）有一个`push()`方法。可以将一个新元素附加到数组末端，返回值为当前长度
- memory 是给定长度的

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity>0.4.16;
contract C {
  function f(uint len) public pure{
    uint[] memory  a =  new uint[](7);
    bytes memory b = new bytes(len); // 分配路由
    assert(a.length == 7);
    assert(b.length == len);
    a[6] = 8;
  }
  function fun(uint len) public  pure  returns  (uint[] memory){
    uint[] memory a= new uint[](len);
    return a;
  }
  function fun01(uint len) public  pure  returns  (bytes memory){
    bytes memory b =new bytes(len);
    return b;
  }
}
```

## 结构(Struct)

- 结构类型可以在映射和数组中使用，它们本身可以包含映射和数组
- 结构不能包含自己类型的成员，但可以作为自己数组成员的类型，也可以作为自己映射成员的值类型

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.0;
contract Ballot  {
  // struct Ballot // err 不能引用循环
  struct Voter{
    uint weight;
    bool voted;
    uint vote;
  }
}
```

## 映射(Mapping)

- 声明一个映射：`mapping(_KeyType=>_ValueType)`
- `_KeyType`可以是任何基本类型。这意味着他可以是任何内置值类型 加上字节和字符串。不允许使用用户定义的或复杂的类型，如枚举，映射，结构 以及除`bytes`和`string`之外的任何数组类型
- `_ValueType`可以是任何类型，包括映射

**谁调起了方法，谁就是`msg.sender`**

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.0;
contract C{
  mapping(address=>uint) public balances;
  constructor(){
    balances[address(this)] = 300;
  }
  // 自己改自己的余额
  function update(uint newBalance)public{
    balances[msg.sender] = newBalance;
  }
  function updateAddr(address addr, uint newBalance)public{
    balances[addr] = newBalance;
  }
}
contract D {
  function f() public returns (uint[2] memory){
    // C 合约本身也是一个类型
    // new C() 调用了C 的 constructor
    C c = new C();
    // 一个合约的外面去调用合约方法
    c.update(100); // 这里更新的是D的余额，因为D调用了c
    c.updateAddr(msg.sender, 1000);
    // m.balances   访问的是内置的方法
    // 定义public   相当于定义了balances function 变量
    // 在输出台输出
    // decoded output	{ "0": "uint256[2]: 100,1000" }
    // decoded 已解码
    return [c.balances(address(this)),c.balances(address(msg.sender))];

    // msg.sender指部署合约的地址   所以是0
    // return c.balances(address(msg.sender));

    // decoded output	{ "0": "uint256: success 300" }
    // return c.balances(address(c));
  }
}
// 主地址 部署了 D，成为了msg.sender
// c是D调用的
// C的合约c来调用
// update是D来调用
// 只要msg.sender没有加代理，一定就是D
```

## Solidity 数据位置

- 所有的复杂类型，即`数组`、`结构`和`映射`，都有一个额外属性，“数据位置”。用来说明数据是保存在内存`memory`中还是存储在`storage`中
- 根据上下文不同，大多数时候数据有默认的位置，但也可以通过在类型名后添加关键字`storage`或`memory`进行修改
- 函数参数(包括返回的参数)的数据位置默认是 memory，局部变量的数据位置默认是`storage`，状态变量的数据位置强制`storage`
- 另外还存在第三种数据位置，calldata，这是一块只读的，且不会永久存储的位置，用来存储函数参数。外部函数的参数（非返回参数）的数据位置被强制指定为`calldata`，效果跟`memory`差不多
- `memory` 访问快，占用少
- `storage` 存储空间大，持久化存储

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
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.0;
contract C{
  uint[] public data1;
  uint[] public data2;
  function appendOne() public returns (uint[] memory){
    append(data1);
    data1.push(233);
    return data1;
  }
  function appendTwo() public {
    append(data2);
  }
  // d 是 data1 的引用
  function append(uint[] storage d) internal {
    d.push(1111);
  }
}
```

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.0;
contract  C{
  uint public a;
  uint public b;
  uint[] data; // 存的是data的长度
  function f() public{
    // TypeError: Data location must be "storage", "memory" or "calldata" for variable, but none was given.
    // 没有分配存储空间的一个属性
    // 元素的索引值和 x 的length
    uint[] x;
    x.push(123); // x指向全局 长度变为1  x的长度改变为1会指向C的第一位  所以a变为1
    data = x;
  }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.0;
contract  C{
  uint someVariable;
  uint[] data;
  function f() public{
    uint[] storage x = data;// err
    x.push(2);
    data = x;
  }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.0;
contract  C{
  uint public a;
  uint public b;
  uint[] data;
  function f() public{
    arrLen(data,  123);
  }
  function arrLen(uint[] storage arr, uint  num) internal returns (uint[] memory){
       arr.push(num);
       return arr;
  }
}
```

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.0;
contract C {
  uint[] x;
  function f(uint[] memory memoryArray) public {
    // memory和storage数据类型一样的话，可以互相传值
    // memory赋值给storage变量，是完整的拷贝
    // 局部转状态的时候是拷贝
    x = memoryArray;
    uint[] memory y = x;
    y[7];
    // y.length = 2; // read only
    delete x;
    y = memoryArray;
    delete y;
    g(x);
    h(x);
  }
  function g(uint[] storage storageArray) internal{
       storageArray.push(111);
  }
  function h(uint[] memory memoryArray) public pure returns(uint){
      return memoryArray.length;
  }
}
```

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.22;
contract Honeypot {
  constructor() payable {}
  uint luckyNum = 52;
  uint public last;
  struct Guess{
    address player;
    uint number;
  }
  Guess[] public guessHistory;
  function guesss(uint _num) public payable {
    Guess memory newGuess;
    newGuess.player = msg.sender;
    newGuess.number = _num;
    guessHistory.push(newGuess);
    if(_num == luckyNum){
      // 合约要给这个sender2倍币
      payable(msg.sender).transfer(msg.value *2);
    }
    last = block.timestamp;
  }
  fallback () payable external {}
  receive () payable external {}
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

- 内部函数只能在当前合约内被调用（更具体来说，在`当前代码块`内，包括`内部库函数`和`继承的函数`中调用），因为他们不能在当前合约上下文的外部被执行。
- 调用一个内部函数是通过跳转到它的入口标签来实现的，就像在当前合约的内部调用一个函数
- 外部函数由一个地址和一个函数签名组成，可以通过外部函数调用传递或返回
- 调用内部函数：直接 使用名字 f
- 调用外部函数：`this.f`(当前合约)，`a.f`(外部合约)

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.22;
contract C{
  uint a;
  function f() public {}
  function e() private {} // 私有方法不能被外部调用
  function d() internal {}
}
contract D{
  function g() public {
    C c = new C();
    c.f(); // 外部调用
  }
}
contract E is C{
  function g() public {
    f(); // 继承函数
  }
}
```

### Solidityy 函数可见性

函数的可见性可以指定为`external`, `public`, `internal`或`private`;
对于状态变量，不能设置为`external`，默认是`internal`

- `external`: 标识函数只能从合约外部调用，而不能从合约内部或其他合约中直接访问
  - 只能从合约外部进行调用，无法从合约内部调用
  - 无法在合约内部通过`this.functionName()`的方式来调用 external 函数
  - 调用 external 函数需要使用合约地址或接口来进行调用
- `public`: `public`函数是合约接口的一部分，可以在内部或通过消息调用。对于 `public` 状态变量，会自动生成一个 `getter` 函数
- `internal`: 这些函数和状态变量只能是内部访问（即从当前合约内部或从它派生的合约访问），不使用`this`调用
- `private`: `private`函数和状态变量仅在当前定义它们的合约中使用，并且不能被派生合约使用

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.22;
contract C {
  uint private data;
  function f(uint  a) private pure returns (uint b){
    return a+1;
    }
  function setData(uint a) public {
    data = a;
  }
  function getData() public view returns(uint) {
    return data;
  }
  function compute(uint a, uint b) internal pure returns (uint) {
    return a+b;
  }
}
contract D{
  function readData() public {
    C c = new C();
    uint local;
    // private 仅在当前合约内部访问
    // uint local = c.f(7);

    c.setData(3);
    local = c.getData();
    // compute internal 当前合约内部 或 派生合约 访问
    // local =c.compute(3, 5);
  }
}
contract E is C{
  function g() public pure returns(uint) {
    uint val = compute(3, 5);
    return val;
  }
}
```

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.22;
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

### Solidity 函数状态可变性

- pure: 纯函数，不允许修改或访问状态
- view: 不允许修改状态
- payable: 允许从消息调用中接收以太币 Ether
- constant: 与 view 相同，一般只修饰状态变量，不允许赋值（除初始化以外）

#### 以下情况被认为是修改状态

- 修改状态变量
- 产生事件 `emit` `event`
- 创建其他合约
- 使用 selfdestruct
- 通过调用发送以太币
- **调用任何没有标记 view 或 pure 的函数**
- 使用低级调用 call xxxcall
- 使用包含特定操作码的内联汇编

#### 以下被认为是从状态中进行读取

- 读取状态变量
- 访问`this.balance`或`<address>.balance`
- 访问`block`,`tx`,`msg`中任意成员（除`msg.sig`和`msg.data`之外）
- 调用任何未标记为 pure 的函数
- 使用包含某些操作码的内联汇编

### 函数修饰器（modifier）

- 使用修饰器`modifier`可以轻松改变函数的行为。例如，他们可以在执行函数之前自动检查某个条件。修饰器`modifier`是合约的可继承属性，并可能被派生合约覆盖
- 如果同一个函数有多个修饰器`modifier`，他们之间以空格隔开，修饰器`modifier`会依次检查执行
- 把一个固定的操作添加到某一个函数上

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.22;
contract Purchase {
  address public seller;
  uint256 public a;// a 为300
  constructor(){
      seller = msg.sender;
  }
  modifier onlySeller(){
    _; // 自己原有的代码在这执行
    a = 300;
    require(msg.sender == seller, "only seller can call");

  }
  function abort() public onlySeller returns(uint256){
    // modifier user
    // ...
    a = 200;
    return 1111;
  }
}
```

### 回退函数

- 回退函数（fallback function）是合约中特殊的函数；没有名字，不能有参数也不能有返回值
- 如果在一个到合约的调用中，没有其他函数与给定的函数标识符匹配（或没有提供调用数据），那么这个函数（fallback 函数）会被执行
- 每当合约收到以太币（没有任何数据，纯转账），回退函数就会被执行。此外，为了接收以太币，fallback 函数必须标记为 payable。如果不存在这样的函数，则 合约不能通过常规交易接收以太币
- 在上下文中通常只有很少的 gas 可以用来完成回退函数的调用，所以使 fallback 函数的调用尽量廉价很重要
- 自己的合约调用别人的合约，没有判定地址是什么地址类型，重复的回退调用（thedog）

```js
// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.4.22;
contract Sink{
  function() external  payable{}
}
contract Test {
  function() external {x=1;}
  uint x;
}
contract Caller {
  function callTest(Test test) public returns (bool){
    (bool success,) = address(test).call(abi.encodeWithSignature("nonExistingFunction")) ;
    require(success);
    address payable testPayable = address(uint160(address(test)));
    return testPayable.send(2 ether);
  }
}
```

## 事件（event）

- 事件是以太坊 EVM 提供的一种日志基础设施。事件可以用来做操作记录，存储为日志。也可以用来实现一些交互功能 ，比如通知 UI，返回函数调用结果等
- 当定义的事件触发时，我们可以将事件存储到 EVM 的交易日志中，日志是区块链中的一种特殊数据结构；日志与合约关联，与合约的存储合并存入区块链中；只要某个区块可以访问，其相关的日志就可以访问；但在合约中，我们不能直接访问日志和事件数据
- 可以通过日志实现简单支付验证 SPV(Simplified Payment Verification), 如果一个外部实体提供了一个带有这种证明的合约，它可以检查日志是否真实存在于区块链中

## Solidity 异常处理

- Solidity 使用“状态恢复异常”来处理异常。这样的异常将撤销对当前调用（及其所有子调用）中的状态所做的所有更改，并向调用者返回错误
- 函数 assert 和 require 可用于判断条件，并在不满足条件时抛出异常
- assert() 一般只应用于测试内部错误，并检查常量
- require() 应用于确保满足条件（如收入或合约状态变量），或验证调用外部合约的返回值
- revert 用于标记错误并回滚当前的调用
- throw 关键字也可以用作 `revert()` 的替代方法

## Solidity 中的单位

### 以太币（ether）

- 以太币 Ether 单位之间的换算就是在数字后加 wei， finny, szabo 或 ether 来实现，如果后面没有单位，默认为 wei，例如 `2 ether == 2000 finney`的逻辑判定值为`true`

| Unit               | Wei Value | Wei                       |
| ------------------ | --------- | ------------------------- |
| wei                | 1         | 1 wei                     |
| Kwei(babbage)      | 1e3 wei   | 1,000                     |
| Mwei(lovelace)     | 1e6 wei   | 1,000,000                 |
| Gwei(shannon)      | 1e9 wei   | 1,000,000,000             |
| microether(szabo)  | 1e12 wei  | 1,000,000,000,000         |
| milliether(finney) | 1e15 wei  | 1,000,000,000,000,000     |
| ether              | 1e18 wei  | 1,000,000,000,000,000,000 |

### 时间

- 秒为缺省时间单位，在时间单位之间，数字后面带有`seconds`,`minutes`,`hours`,`day`,`weeks`和`years`的可以进行换算，基本换算关系如下

```js
1 == 1 seconds
1 minutes == 60 seconds
1 hours == 60 minutes
1 days == 24 hours
1 weeks ==  7 days
1 years == 365 days
```

- 这些后缀不能直接用在变量后面，如果想用时间单位（如 days）来将输入变量换算为时间，我们可以用如下方式来完成

```js
function f(uint start,uint daysAfter) public {
  if(now>= start  + daysAfter* 1 days){
    // ...
  }
}
```

## 使用汇编 Assembly 代码

与 c/c++类似，solidity 程序中，可以使用 EVM 汇编语言

### 内联汇编

使用内联汇编，可以在 Solidity 源程序中嵌入汇编代码，对 EVM 要更细粒度的控制，在编写库函数时很有用

```js
pragma solidity ^0.8.0;
library Sum {
  function sumUsingInlineAssembly(uint[] memory _data) public pure returns (uint o_sum){
    for(uint i=0;i<_data.length; ++i){
      assembly {
        o_sum := add(o_sum, mload(add(add(_data, 0x20), mul(i, 0x20))))
      }
    }
  }
}
contract Test {
  uint[] data;
  constructor() public {
    data.push(1);
    data.push(2);
    data.push(3);
    data.push(4);
    data.push(5);
  }
  function sum() external view returns(uint){
    return Sum.sumUsingInlineAssembly(data);
  }
}
```
