# Solidity 简介

智能合约的高级语言，用于编写运行在 EVM 上的智能合约

## Solidity 是什么

- Solidity 是一门面向对象的、为实现智能合约而创建的高级编 程语言。这门语言受到了 C++，Python 和 Javascript 语言的 影响，设计的目的是能在以太坊虚拟机(EVM)上运行。
- Solidity 是静态类型语言，支持继承、库和复杂的用户定义类型等特性。
- 内含的类型除了常见编程语言中的标准类型，还包括 address 等以太坊独有的类型，Solidity 源码文件通常以 .sol 作为扩展 名
- 目前尝试 Solidity 编程的最好的方式是使用 Remix。Remix 是一个基于 Web 浏览器的 IDE，它可以让你编写 Solidity 智 能合约，然后部署并运行该智能合约。

## 与传统语言的区别

- 1、Address 类型：由于以太坊的底层是基于账户的，所以拥有 address 类型，主要作用是定位合约，账户类型，合约代码等
- 2、Payable 关键字：通过 payable 可以让以太坊在语言层面支持支付
- 3、可见性：除去传统语言所支持的`public`,`private`,`solidity`，还支持`external`,`internal`
- 4、变量分类：solidity 分为状态变量和内存变量，其中状态变量永久存在（保存在合约的存储空间中）
- 5、最大的不同，异常机制，在 solidity 中，一旦出现异常，所有执行都会被回滚，主要是为了保证合约执行的原子性
- 6、solidity 是静态类型语言，在编译时就需要明确指定变量的类型

## Solidity 语言特性

Solidity 的语法接近于 JavaScript，是一种面向对象的语言。但作为一 种真正意义上运行在网络上的去中心合约，它又有很多的不同:

- 以太坊底层基于帐户，而不是 UTXO，所以增加了一个特殊的 address 的数据类型用于定位用户和合约账户。
- 语言内嵌框架支持支付。提供了 payable 等关键字，可以在语言层面 直接支持支付。
- 使用区块链进行数据存储。数据的每一个状态都可以永久存储，所以 在使用时需要确定变量使用内存，还是区块链存储。
- 运行环境是在去中心化的网络上，所以需要强调合约或函数执行的调 用的方式。
- 不同的异常机制。一旦出现异常，所有的执行都将会被回撤，这主要 是为了保证合约执行的原子性，以避免中间状态出现的数据不一致。

## Solidity 源码和智能合约

Solidity 源代码要成为可以运行在以太坊上的智能合约需要经历如下的 步骤:

- 1. 用 Solidity 编写的智能合约源代码需要先使用编译器编译为字节码 (Bytecode)，编译过程中会同时产生智能合约的二进制接口规范 (Application Binary Interface，简称为 ABI);
- 2. 通过交易(Transaction)的方式将字节码部署到以太坊网络，每次 成功部署都会产生一个新的智能合约账户;
- 3. 使用 Javascript 编写的 DApp 通常通过 web3.js + ABI 去调用智能合约中的函数来实现数据的读取和修改。

## Solidity 编译器

- Remix
  - Remix 是一个基于 Web 浏览器的 Solidity IDE;可在线使用而无需安装任 何东西
  - 浏览器 http://remix.ethereum.org
  - 直接安装 `npm install remix-ide -g`
  - 源码安装
    - `git clone https://github.com/ethereum/remix-ide.git`
    - `cd remix-ide`
    - `npm install`
    - `npm run setupremix`
    - `npm start`
- solcjs
  - solc 是 Solidity 源码库的构建目标之一，它是 Solidity 的命令行编译器
  - 使用 npm 可以便捷地安装 Solidity 编译器 solcjs `npm install -g solc`
- IntelliJ IDEA
  - 安装 idea `https://www.jetbrains.com/idea/download`
  - 打开 idea
  - Configure -> Setting -> Plugins
- VScode
  - 安装 vscode `https://code.visualstudio.com/
  - 进入扩展、搜索 solidity 插件、点击安装

```js
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.4.22 <0.9.0;
contract SimpleStorage {
  // 声明函数的状态变量
  uint256 private value;
  constructor (uint256 _value) {
    value = _value;
  }
  function setValue(uint256 _value) public{
    value = _value;
  }
  // public view returns  函数类型
  // uint256 返回类型
  function getValue() public view returns (uint256){
    return value;
  }
  function pureAdd(uint a, uint b) public pure returns(uint sum, uint origin_a){
    return (a+b, a);
  }
}



// SPDX-License-Identifier: GPL-3.0
pragma solidity >0.4.22;
contract Car {
  bytes32 brand;
  uint public price;
  // 创建是时候设置初始化
  constructor(bytes32 initBrand, uint initPrice){
    brand = initBrand;
    price = initPrice;
  }
  // 0x7465737400000000000000000000000000000000000000000000000000000000
  function setBrand(bytes32 newBrand) public{
    brand = newBrand;
  }
  function getBrand() public view returns(bytes32){
    return brand;
  }
  function setPrice(uint newPrice) public {
    price = newPrice;
  }
}
```

## 开发测试环境搭建

### truffle 和 ganache 与 testrpc

truffle 和 testrpc 是配套的以太坊开发测试框架，truffle 可以快速编译和部署，testrpc 可以快速生成测试账号  
ganache 是 testrpc 的升级版（有 UI 界面）

```shell
> testrpc
```

### 安装

`npm install -g truffle`
`npm install -g ethereumjs-testrpc`
`truffle version`

## solidity 语法

- 类型
  - 1. `///` 文档注释
  - 2. 值类型与引用类型
    - 值传递：就是拷贝，不会对原数据造成影响（两份都在内存空间）
      - 整形
      - 布尔
      - 地址
      - 枚举
      - 函数
      - 定长字节数组（byte）
    - 引用传递：会对原数据的值产生影响 共用内存
      - 不定长度字节数组
      - 字符串
      - 数组
      - 结构体
  - 3. 整形
    - a) 分有符号与无符号
    - b) 步长为 8，在使用整形过程中，如果在已知的确定了数据大小的上限的情况下，尽量使用与其最靠近的步长
    - c) solidity 不支持 8 进制
    - d) 整形的上溢和下溢（以太坊底层使用四个 64 位整数串联成 256 位，因为所占位数写死了，所以在超过范围之后依然会发生溢出）
      - safemath 或 0.8.0 版本对溢出进行检测，如果溢出，则结果回退
      - 上溢：变量值+正数和-类型上限
      - 下溢：如果一个整形变量的值达到其类型的下限，再减去一个正数会变成他的上限值-该正数值
  - 4. true false
    - 运算符
      - 比较
      - 逻辑
  - 5. 地址类型
    - a) 代表以太坊地址，大小 20 个字节，160 位，所有地址都可以用 uint160 进行编码
    - b）支持运算符：比较运算（像 ABCD 字符串比较）
    - c) 地址类型拥有自己的成员
      - 属性
        - 获取地址余额
      - 转账
  - 6. 定长字节数组
    - a) 表现形式: bytes
    - b) 定长字节数组从 bytes1 开始到 bytes32
    - c) 步长是 1
    - d) bytes 默认值表示 bytes1
    - e) 支持的运算符：位运算，比较运算
    - f) 定长字节数组也拥有自己的方法
      - length： 获取定长数组的长度，不可修改
  - 8. 字符串
    - 字符串字面量不包含结束符
    - 对字符串的操作
      - 通过 bytes 转换可获取长度
      - 通过 bytes 转换可获取字符串指定下标元素值
      - 可通过 bytes 转换改变字符串中指定下标的元素值
    - 字符串与数组相互转换
- 变量
- 函数
- 表达式
- 控制语句
- 循环

## 值类型

```sol
pragma solidity ^0.4.18;
/** @title the basic of solidity */
/// the description
contract Des {
  function hello returns (string){
    return "hello world";
  }
}
contract Math {
  uint x =10;
  function add(uint x,uint y) view returns(uint z){
    return x+y
  }
  uint8 a = 255;
  function addA() view public returns (uint8){
    return a+100;
  }
}

contract Addr {
  address addr = 0x2E1C9Adc548963273d9e767413403719019bd639;
  // 创建合约的地址
  address addrCurrent = msg.sender;
  function getAddress() view public returns(address){
    return msg.sender;
  }
  function bigger() view public returns (bool){
    return addr > msg.sender;
  }
  function getBalance(address addre) view public returns(uint256){
    return address(addre).balance;
  }
  // 转账
  function deposit() public payable returns(bool) {
    // msg.value 内建变量
    return payable(address(this)).send(msg.value);
  }
  function withdraw(address addre) public payable returns(bool) {
    // payable(addr).transfer(amount);
    (bool success,)=payable(addre).call{value: msg.value}("");
    require(success, "Failed to deposit");
    return success;
  }
}
// 定长字节数组
contract TheBytes {
  bytes1 a = 0x0a; // 0a 算一个长度
  bytes1 c = 0xa0;
  bytes3 b = 0xa0ba01;
  function bigger() view public returns(bool){
    return a>b;
  }
  function and() view public returns(bytes1){
    return a & c;
  }
  function getLength() view  public returns(uint32){
    return a.length;
  }
}
contract String {
  string public name = "abcd";
  function getLength() public view returns (uint256){
    return bytes(name).length;
  }
  // 转换
  function getNameBytes() view public returns (bytes memory){
    return bytes(name);
  }
  // 对字符串取值
  function getValue() view public returns(bytes1){
    return bytes(name)[0];
  }

  // change
  function changeName() view public {
    bytes(name)[0] = "s";
  }
}

// 字符串转换
contract stringWithBytes {
  string name = "abcd";
  bytes4 bname = 0x61626364;
  function bytes4ToString() view public returns(string memory){
    // 分配的内存
    // memory 内存变量的关键字
    // storage 状态变量的关键字
    bytes memory newName = new bytes(bname.length);
    for(uint32 i = 0;i<bname.length; i++){
      newName[i] = bname[i];
    }
    return string(newName);
  }
}
```

### 十六进制字面量

- a) 特点：以关键字 hex 开头
  - i. `hex"00112233"`

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract HexLi {
    function hexToBytes() public pure
    // returns (bytes4, bytes1, uint16)
     returns (string memory)
    {
        bytes4 a = hex"61626364";
        return bytes4ToString(a);
        // return (a, a[0], a.length);
    }

    function bytes4ToString(bytes4 bname) public pure returns (string memory) {
        // 分配的内存
        // memory 内存变量的关键字
        // storage 状态变量的关键字
        bytes memory newName = new bytes(4);
        for (uint16 i = 0; i < bname.length; i++) {
            newName[i] = bname[i];
        }
        return string(newName);
    }
}
```

### 常量和变量

- 只有值类型和 string 支持常量
- 变量 -> 数据位置
  - 1. memory 存储在内存中
  - 2. storage 修饰的数据会永久的存储在区块链中
  - 3. calldata 不用在程序中指定，该位置上的数据是只读的，不会持久化到区块链上，一般在外部函数才会指定
- 存储位置说明：
  - 1. 状态变量默认存储在 storage 中
  - 2. 函数中的局部变量默认存储位置是 storage
  - 3. 函数参数和返回值默认存储位置是 memory
- 变量转换
  - memory -> memory
    - a) 引用传递会改变源数据的值
  - memory -> storage
    - a) 不会改变源数据
  - storage -> storage
    - a) 也会改变原数据的值
  - storage -> memory
    - a) 数据拷贝，不会改变源数据的值
- constant 常量 与 immutable 不可变量
  - constant 链上不会为这个变量分配存储空间
  - immutable 在部署时确定变量的值（在构造函数中赋值一次，之后不可在改变，变量的值会被追加到运行时的字节码中，因此它会比使用状态变量更便宜）

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract DataLocal {
    uint256[5] public x = [1, 2, 3, 4, 5];
    uint256[5] yy;

    // 1. memory -> memory 值传递
    function gmemory() public view returns (uint256[5] memory) {
        uint256[5] memory s = x;
        fmemory(s);
        // s的值别改变了
        return s;
    }

    function fmemory(uint256[5] memory y) internal pure {
        y[0] = 30;
    }

    // 2. memory -> storage
    function mToS() public returns (uint256[5] memory) {
        uint256[5] memory s = x;
        yy = s;
        yy[0] = 100;
        return s;
    }

    function inFunc(uint256[] memory xx) public pure {
        uint256[] memory y; // 默认为storage
        y = xx;
    }

    // 3. storage -> storage 引用传递
    function St(uint256[5] storage y) internal {
        y[0] = 20;
    }

    function g() public returns (uint256[5] memory) {
        St(x);
        return x;
    }
}
```

### 枚举

- a) 特点：用户的自定义类型，枚举可以显示的与整形进行转换，显示的转换会在运行时检测数值范围，如果范围不匹配会引发异常。枚举类型至少要有一个成员
- b) 默认从 0 开始

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract ENUMS {
    enum status {
        Created,
        Unlocked,
        Locked
    }
    status public aaa = status.Created;

    function getStatus() public pure returns (status) {
        status defaultStatus = status.Locked;
        return defaultStatus;
    }

    function setStatus(status a) public returns (status) {
        aaa = a;
        return aaa;
    }

    // function transfer() public pure returns (uint256) {
    //     // 不能与整形进行隐式的类型转换
    //     uint256 a = status.Locked;
    //     return a;
    // }
}
```

## 引用类型

### 结构体

- a) 结构体也是 solidity 中的自定义数据类型，在其中包含基本类型和复杂类型
- b) 初始化方式
  - i 根据成员名称进行初始化
  - ii 根据成员顺序进行初始化
- c) 在 solidity 中不能直接返回结构体，只能返回成员

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Struct {
    struct Bank {
        address addr;
        uint256 balance;
        Person p;
    }
    struct Person {
        string name;
        int256 age;
        string sex;
    }
    // 1. 通过此方式进行初始化，需要在结构体类型后面加上小括号
    Person p1 = Person({name: "aaa", age: 123, sex: "female"});
    // 根据成员进行初始化
    Bank b =
        Bank({
            addr: 0x2E1C9Adc548963273d9e767413403719019bd639,
            balance: 1000,
            p: p1
        });

    // 获取结构体信息
    // 在solidity中不能直接返回结构体
    function getBank()
        public
        view
        returns (
            address,
            uint256,
            string memory,
            int256,
            string memory
        )
    {
        return (b.addr, b.balance, b.p.name, b.p.age, b.p.sex);
    }

    // 2. 根据参数的定义顺序
    Person p2 = Person("bbb", 19, "male");

    function getC()
        public
        view
        returns (
            string memory,
            int256,
            string memory
        )
    {
        return (p2.name, p2.age, p2.sex);
    }
}
```

### 数组

- a) 数组分为定长和变长
- b) 对于 storage 数组来说，元素类型可以是任意
- c) 对于 memeory 数组来说，元素类型与函数可见性有关
  - 如果函数是外部可见，函数参数不能是一个映射类型的数组（`不存在->external(mapping[]`）
- d) 声明方式
  - 定长：`ARRAY[length]`
  - 不定长: `ARRAY[]`
  - 如果说状态变量类型是一个数组，并且加了 public，solidity 会自动创建访问器，可直接通过下标访问
- e) 初始化
  - 对于变长数组来说，可以通过关键字 new 进行初始化，通过 new 创建的 memory 数组，不能通过.length 长度修改数组的大小属性
- f) 数组字面量：是指以表达式的方式隐式声明的一个数组，并作为一个数组变量使用的方式
  - 通过字面量只能创建 memory 的定长数组，元素类型正好是能够存储元素的长度
- e) 数组属性和方法
  - 1. 数组有`length`属性
    - 定长数组不可修改
    - 不定长数组 length 可以修改，如果当前元素数量小于 length,多余的用 0 来补，通过大于 length，则斩断
  - 2. 不定长数组拥有 push 方法，通过 push 方法可以附加新的元素到数组末尾，返回值是新的长度

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Array {
    uint256[5] a = [1, 2, 3, 4, 5];

    uint256[] b = [1, 2];
    // 对于变长数组来说，可以通过关键字 new 进行初始化， (10) 是可以变的
    uint256[] bb = new uint256[](10);

    // 数组操作
    function getA() public view returns (uint256[5] memory, uint256[] memory) {
        return (a, b);
    }

    function update(uint256 index, uint256 value) public {
        a[index] = value;
    }

    function query(uint256 index) public view returns (uint256, uint256) {
        return (a[index], b[index]);
    }

    function getLength() public view returns (uint256, uint256) {
        return (a.length, b.length);
    }

    function append(uint256 value) public {
        b.push(value);
    }
}

contract ConstArray {
    // 隐式的创建数组
    function f(uint256[3] memory array)
        public
        pure
        returns (uint256[3] memory)
    {
        return array;
    }

    function g() public pure returns (uint256[3] memory) {
        return f([uint256(1), 2, 3]);
    }
}
```

#### 二维数组

- 数组元素仍然是一个数组
- 二维数组的行列位置与大多数编程语言（golang）是相反的
  - `Uint[3][5]x`：代表 5 行 3 列
  - `Uint[][5]x`: 代表 x 是一个有 5 行，每一行的列是一个动态数组

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract TArray {
    uint256[3][4] a; // 4行3列

    function insert() public {
        a[3][2] = 1; // 第四行第3列
        a[3][1] = 1; // 第四行第2列
    }

    function getArray() public view returns (uint256[3][4] memory) {
        return a;
    }

    uint256[][] aa;

    // error
    // function insert02() public {
    //     aa[3][2] = 1; // 第四行第3列
    //     aa[3][9] = 1; // 第四行第2列
    // }

    function push02(uint256 value) public {
        aa[0].push(value); // 第四行第3列
    }

    function getArray02() public view returns (uint256[][] memory) {
        return aa;
    }
}
```

### 映射

- a) 字典、键值对的映射关系存储结构
  - `mapping(_keytype=>_keyvalue)`
- b) 映射本身、动态数组、合约、枚举、结构体都不能作为映射的键值，映射的值可以是任意类型
- c) 在 solidity 中映射没有长度，没有键集合（列表），值集合（列表）这样的概念
- d) delete 映射中的 key 值，不是删除，而是重置为初始值
- e) mapping 不支持遍历
- f) **自定义 mapping 遍历**

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Map {
    mapping(address => uint256) balances;

    function insert(address addr, uint256 amount) public {
        balances[addr] = amount;
    }

    function get(address addr) public view returns (uint256) {
        return balances[addr];
    }

    mapping(address => mapping(address => uint256)) curs;

    function insertM(address addr, uint256 amount) public {
        curs[addr][addr] = amount;
    }

    function deleteM(address addr) public {
      // 这是将key值重置了
      delete balances[addr];
    }
}
```

### 类型转换

- a) 隐式类型转换
  - i. 编译器自动转换
  - ii. 注意在转换过程中，防止数据丢失
  - iii. 任何无符号的整数都可以转换为相同或更大大小的字节值。
    - 任何一个可以转换为 uint160 的变量都可以转换为 address 类型
  - vi. 从 ·address payable· 到 address 可以隐式转换
- b) 显示类型转换
  - i. 在不允许类型转换的情况下，确保可以转换的前提下，进行强制转换
    - 如果由一个大类型(uint32)转换为小类型(uint16)，高位会被斩断
  - ii. 从 address 到 address payable 的必须显示转换

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// 隐式转换
contract YTrans {
    uint8 a = 1;
    uint16 b = 2;

    // 低位转高位
    function Itoh() public returns (uint16) {
        b = a;
        return b;
    }

    // 高位转低位
    // 报错，不允许
    // function htol() public returns (uint8) {
    //     a = b;
    //     return a;
    // }

    // uint160-> address;
    uint160 d = 1;
    address to01;
    address payable to02;

    function utoa() public returns (address, address) {
        // 从 ·address payable· 到address的隐式转换
        to01 = payable(address(d));
        // 从 address 到address payable 的显示转换
        to02 = payable(address(d));
        return (to01, to02);
    }
}

// 显示转换
contract XTrans {
    uint256 a = 256;
    int256 b = -1323;
    uint8 c = 1;

    // uint -> int
    function utoi() public returns (int256) {
        b = int256(a);
        return b;
    }

    // int -> uint
    // 如果b是负数，则计算出错
    function itou() public returns (uint256) {
        a = uint256(b);
        return a;
    }

    // 高位截断
    function htol() public returns (uint8) {
        c = uint8(a);
        return c;
    }
}
```

### 控制语句

- 循环控制

  - i. for
  - ii. continue, break
  - iii. while 前判断
  - vi. do-while 后判断

- 条件控制
  - i. if-else
  - ii. 三目运算符

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract For {
    // 等差数列求和
    // 10 1
    // sum 函数声明的时候  默认返回sum
    function getSum(uint256 n, uint256 x) public pure returns (uint256 sum) {
        for (uint256 index = 0; index < n; index += x) {
            sum += index;
            if (index > 50) {
                break;
            }
        }
    }
}

contract While {
    function getSum(uint256 n, uint256 x) public pure returns (uint256 sum) {
        uint256 i = 0;
        while (i < n) {
            sum += i;
            i += x;
        }
    }
}

contract DoWhile {
    function getSum(uint256 n, uint256 x) public pure returns (uint256 sum) {
        uint256 i = 0;
        do {
            sum += i;
            i += x;
        } while (i < n);
    }
}

// 条件控制
contract IF {
    function getT(uint256 x, uint256 y) public pure returns (string memory) {
        // x*y%z
        return mulmod(x, y, 2) == 0 ? "0 : "1";
    }
}
```

### 全局单位

- 货币单位
  - wei 1
  - kwei 1e3
  - mwei 1e6
  - gwei 1e9
  - mircroether 1e12
  - milliether 1e15
  - ether 步长为 3 1e18
- 时间单位
  - seconds, minutes, hours, weeks, years
  - 1 minutes = 60 seconds
- 内建的全局变量
  - 在 solidity 中，内建的全局变量可以在合约脚本的任何地方使用
  - msg 的成员
    - sender, value, data, gas(剩余 gas)
  - this 的部分成员
    - balance
  - tx 的部分成员
    - origin 交易发送者的地址
    - gasprice gas 的价格
  - now 当前时间（timestamp 一样）
  - block 成员
    - number 区块号
    - difficulty 当前区块难度
    - coinbase 矿工地址
    - timestamp 时间戳
    - gaslimit() 当前区块的 gaslimit
    - blockhash(num) 指定区块的 hash 值，只支持最近的 256 块
    - ...

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract tm {
    uint256 a = 2;
    uint256 b = a * 41 seconds;

    function getTime() public view returns (uint256) {
        return b;
    }
}
```

### 函数

- 函数基础
  - 函数式编程语言（函数作为参数，变量，返回值）
  - 函数属于值类型，支持多返回值
  - 调用方式
    - 内部调用（不会拷贝到内存里）
      - 采用 evm 跳转调用，能够直接使用上下文中的数据，不用拷贝数据，所以在数据传递的时候非常高效
      - 对合约内的函数，引入的库函数和从父合约中继承的函数都可以进行内部调用
    - 外部调用（会拷贝到内存里）
      - 采用外部交易调用，使用 external，对于一个外部调用，所有的函数参数必须要拷贝到内存中
- 函数定义类型
  - i. view: 只读，不改变合约内部的状态 remix 可看到，没有 view 只能在交易详情里看到
    - 不是 view, 会改变合约状态的操作
      - a) 写入状态变量
      - b) 触发事件
      - c) 创建合约
      - d) 使用自毁函数
      - e) 发送以太币
      - f) 调用任何一个没有被标记为 view 或 pure 的函数
      - g) 底层调用
  - ii. pure: 不会修改合约状态，也不能读取合约的状态（读取与合约状态无关的数据）
    - 与 view 相比，pure 有更多限制内容
      - a) 不能读取状态变量
      - b) 不能访问`this.balance`或`address.balance`
      - c) 不能访问 block, tx, msg 的大多数成员（可以访问`msg.sing`, `msg.data`）
      - d) 不能调用任何没有被标记为 pure 的函数
- 特殊函数类型

  - i. 回退函数
    - 在每个合约中最多有一个不带任何参数不带 function 关键字的 fallback 和 receive 函数
      - receive 必须是 payable 的，里面的语句只有在通过外部地址往合约转账的时候执行
      - fallback 可以是 payable 也可以不是 payable,如果不是 payable，且交易里带有转账信息，交易会被 revert
      - fallback 如果设置了 payable,其消耗的 gas 最大量就会被限定在 2300
    - 作用：
      - a) 在调用合约时，没有匹配上任何一个函数
      - b) 给合约发送 ether 时调用，如果没有，则会触发异常
      - c) 如果回调函数要接收 ether,则必须是 payable 的
  - ii. 自毁函数：

    - 摧毁当前合约，如果合约中还有以太，则会将以太币转移给另一个地址
    - 如果有人转账给已摧毁的合约，以太币消失，无法赎回

  - iii. 常函数 【0.5.+】被移除

  - vi. 访问器（getter）
    - 所有 public 变量都会自动追加 getter 函数
    - 访问函数具有外部可见性，内部调用，可直接当成一个变量，如果外部访问，比如通过 this, 则必须通过函数的方式
  - v. 函数可见性与权限
    - 分类
      - 1. 内部函数 internal, 只能在当前合约内部调用，比如：当前合约的代码块，内部的库函数，继承的合约中
      - 2. 外部函数 external
      - 3. 私有函数 private
      - 4. 公有函数 public

- 0.6+版本引入了`abstract`, `virtual`, `override`几个关键字，对合约的继承更好的支持
- 其它内置函数
  - 加密函数
    - solidity 中的加密实际上调用的是以太坊中的加密函数
    - `keccak256(x)`
    - `sha256(x)`
    - `sha3(x)`
    - `ripemd160(x)`
    - `ecrecover(hash, v, r, s)`
  - 数据函数
    - `addmod(x,y,k)` -> `(x+y)%k`
    - `mulmod(x,y,k)` -> `(x*y)%k`
- 函数修改器`modifier`
  - 修改器是一种合约是属性，可以被继承也可以被派生的重写
  - 修改器的作用是在函数执行前检查某种前置条件是否满足
  - 一个函数可以有多个修改器
  - 修改器的生效顺序与调用顺序一样

```sol
abstract contract Employee {
  function getSalary() public virtual;
}
contract Manager is Employee {
  function increaseSalary() public {}
  function getSalary() public overrider {}
}
```

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract FunctionType {
    uint256 public x = 100;

    function modifyx() public returns (uint256) {
        // 改变了状态，不能用 view 或 pure
        x = 50;
        g();
        return x;
    }

    function g() internal pure {}

    function getBalanceOfAddress() public pure returns (bytes memory) {
        // return address(this).balance;
        // return msg.value;
        return msg.data;
    }
}
```

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// 回退函数
// 调用一个不存在的函数
contract ExecuteFallback {
    // 新建一个事件，把调用的数据打印出来
    event FallbackCalled(bytes data);
    // 调用已存在的函数事件，会把调用的原始数据，请求参数打印出来
    event ExistFuncCalled(bytes data, uint256 para);

    // 一个存在的函数
    function existFunc(uint256 para) public {
        emit ExistFuncCalled(msg.data, para);
    }

    // 模拟从外部对一个存在的函数发起一个调用，将直接调用函数
    function callExistFunc() public returns (bool) {
        bytes4 funcIdentifier = bytes4(keccak256("existFunc(uint256)"));
        (bool success, ) = address(this).call(
            abi.encode(funcIdentifier, uint256(1))
        );
        return success;
    }

    function callNonExistFun() public payable returns (bool) {
        bytes4 funcIdentifier = bytes4(keccak256("functionNotExist()"));
        (bool success, ) = address(this).call(abi.encode(funcIdentifier));
        return success;
    }
    // 数据验证
    function getExist() pure public returns(bytes32){
        return keccak256("existFunc(uint256)");
    }

    function getNotExist() pure public returns(bytes32){
        return keccak256("functionNotExist()");
    }


    // 新的fallback函数写法
    fallback() external payable {
        emit FallbackCalled(msg.data);
    }

    receive() external payable {
        // emit FallbackCalled(msg.data);
        // currentBalance = currentBalance + msg.value;
    }
}
```

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// 访问器
// 被调用方
contract C {
    uint256 public c = 10;

    function accessInternal() public view returns (uint256) {
        return c; // 调用的是访问器
    }

    function accessExternal() external view returns (uint256) {
        // 加了this,只能以函数形式调用
        return this.c();
    }
}

// 调用方
contract D {
    C c = new C(); // 实例化其他合约对象

    function getData() public view returns (uint256) {
        return c.c();
    }
}
```

```sol
// 加密
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Hash {
    // 10  false
    // bytes32 是64位16进制
    // Array(64).fill("0").join("")
    // 0x0000000000000000000000000000000000000000000000000000000000000000
    function TKeccka256(
        uint256 value,
        bool fake,
        bytes32 secret
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(value, fake, secret));
    }
}
```

```sol
contract Modifier {
    address public owner = msg.sender;
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    modifier balances() {
        require(address(msg.sender).balance >= 10000000, "balance error");
        _;
    }

    function getbalance() public view balances returns (uint256) {
        return address(msg.sender).balance;
    }

    function modifierOwner(address addr) public onlyOwner returns (address) {
        owner = addr;
        return owner;
    }
}

```

```sol
// 自毁函数
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract SelfDestructContract {
    // 一般来说，能够摧毁合约的必须是合约的所有者
    address payable immutable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier ownerRestricted() {
        require(owner == msg.sender);
        _;
    }

    // 设置一个值
    function mint() public payable returns (bool) {
        return payable(address(this)).send(msg.value);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // 调用自毁函数
    function destroyContract() public ownerRestricted {
        selfdestruct(owner);
    }
}
```

```sol
// 函数可见性权限
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// 函数可见性权限
contract Chmod {
    function internalFn() internal pure returns (string memory) {
        return "internal fn";
    }

    function callInternalFn() public pure returns (string memory) {
        return internalFn();
    }

    // 外部函数
    function externalFunc() external pure returns (string memory) {
        return "external func";
    }

    // 调用外部函数
    function callExternalFunc() public view virtual returns (string memory) {
        // return externalFunc(); // error
        return this.externalFunc();
    }
}

contract externalCall {
    Chmod cm = new Chmod(); // 合约实例化

    function callInternalFn() public view returns (string memory) {
        // return cm.internalFn(); // error
    }

    function callExternalFunc() public view returns (string memory) {
        return cm.externalFunc();
    }
}

contract Child is Chmod {
    function callInternal() public pure returns (string memory) {
        return internalFn();
    }

    function callExternalFunc() public view override returns (string memory) {
        return string(abi.encodePacked(this.externalFunc(),"111"));
    }
}
```

### solidity 面向对象

- a)

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// 继承
// 1. 父合约
contract Father {
    uint256 public x;

    constructor(uint256 _x) {
        x = _x;
    }

    // 使用 virtual 关键字可以被重写
    function returnName(string memory str)
        public
        pure
        virtual
        returns (string memory, string memory)
    {
        return ("father", str);
    }
}

contract Mother {
    uint256 public xz;

    constructor() {
        xz = 100;
    }

    function returnName(string memory str)
        public
        pure
        virtual
        returns (string memory, string memory)
    {
        return ("mother", str);
    }
}

// 2. 子合约
contract child is  Mother,Father {
    uint256 public y;

    // constructor(uint256 _y) Father(_y * _y) {
    //     y = _y;
    // }

    constructor(uint256 _y, uint256 _x) Father(_x) {
        y = _y;
    }

    // override
    function returnName(string memory str)
        public
        pure
        // 具体执行哪一个  看谁最后一个继承
        override(Father, Mother)
        returns (string memory, string memory)
    {
       return super.returnName(str);
    }

    function call(string memory str)
        public
        pure
        returns (string memory, string memory)
    {
        return returnName(str);
    }

    function getx() public view returns (uint256, uint256) {
        return (y, x);
    }
}

```

#### 抽象

- 1. 抽象合约是一个包含了没有函数体的函数，也可能包含一些正常函数，只要合约里有一个抽象函数，他就是抽象函数。不能够通过编译，可以被继承
- 2. 抽象类似于多态，子合约通过继承完成同名函数的不同实现

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

abstract contract AbstractContract {
    function someAbstractFunction(uint256 x) virtual public; // 抽象函数
}

contract add is AbstractContract {
    uint256 sum;

    function someAbstractFunction(uint256 x) override  public{
        sum = x + x;
    }

    function getSum() public view returns (uint256) {
        return sum;
    }
}

contract Square is AbstractContract {
    uint256 sq;

    function someAbstractFunction(uint256 x) override public{
        sq = x ** 2; // ** 表示求幂
    }

    function getSq() public view returns (uint256) {
        return sq;
    }
}
```

### 库

- a) 关键字：library
- b) 在 solidity 中，库也是一种合约，没有存储，不会存储以太币
- c) 没有 payable，也没有 fallback 函数
- d) 无状态变量，不能继承或被继承，不能销毁一个库
- e) gas 依赖于合约的规模。可以把库想象成使用其合约的父合约，使用父合约切分共同代码不会节省 gas，因为在 solidity 中，继承通过复制代码工作的。库可以用于给数据类型添加成员函数
- f) `using for *(附着库)`
  - 声明方式：`using A for B` 将 A 中定义的所有函数都附着在任意类型 B 上，类型 B 的实例可调用 A 中的所有方法

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

library Math {
    function add(uint256 x, uint256 y) public pure returns (uint256) {
        return x + y;
    }
}

contract Call {
    function getSum(uint256 x, uint256 y) public pure returns (uint256) {
        return Math.add(x, y);
    }
}
```

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

library Set {
    // 定义一个结构体，保存主函数的数据（本身并未实际存储数据）
    struct Data {
        mapping(uint256 => bool) flags;
    }

    // self 是一个存储类型的引用，传入的是一个引用，而不是一个拷贝的值，这是库函数的特定
    function insert(Data storage self, uint256 value) public returns (bool) {
        if (self.flags[value]) return false;
        self.flags[value] = true;
        return true;
    }
}

contract C {
    Set.Data knownValues;

    function register(uint256 value) public {
        // 库函数不需要实例化就可以调用，因为实例就是当前合约
        require(Set.insert(knownValues, value));
    }
    // 可直接访问 knownValues.flags
}
```

```js
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

// using for
library Search {
    function indexOf(uint256[] storage self, uint256 value)
        public
        view
        returns (uint256)
    {
        for (uint256 i = 0; i < self.length; i++) {
            if (self[i] == value) {
                return i;
            }
        }
        return type(uint256).min;
    }
}

contract Arr {
    using Search for uint256[];
    uint256[] data;

    function append(uint256 value) public {
        data.push(value);
    }

    function contains(uint256 value) public view returns (bool) {
        // search 库中的函数会接受到 uint[] 数组的实例，会把data作为第一个参数
        if (type(uint256).min == data.indexOf(value)) {
            return false;
        } else {
            return true;
        }
    }
}
```

```js
// using for 与 map
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

library Set {
    struct Data {
        mapping(uint256 => bool) flags;
    }

    // 插入
    function insert(Data storage self, uint256 value) public returns (bool) {
        if (self.flags[value]) {
            return false;
        } else {
            self.flags[value] = true;
            return true;
        }
    }

    // 删除
    function remove(Data storage self, uint256 value) public returns (bool) {
        if (self.flags[value]) {
            self.flags[value] = false;
        }
        return true;
    }

    // 包含
    function contains(Data storage self, uint256 value)
        public
        view
        returns (bool)
    {
        return self.flags[value];
    }
}

contract UseSet {
    using Set for Set.Data;
    Set.Data data; // 结构体

    // 插入数据
    function insert(uint256 value) public returns (bool) {
        return data.insert(value);
    }

    function contains(uint256 value) public view returns (bool) {
        return data.contains(value);
    }
}
```

### 事件

- a) 事件是使用 EVM 的日志内置的工具，关键字`event`
- b) 为什么要有事件
  - 在真实的环境中，发送交易调用智能合约的过程
    - 交易发送-> 打包->执行交易，在发送交易之后，不会马上执行结果，只会立刻返回一个交易的 hash
- c) 事件可以继承，在合约内部不能直接访问

### 文件：import

- a) 导入其他源文件
- b) `import filename;` 吧指定文件导入到当前全局范围内

### 异常处理

- `throw`: 已废弃，如果发生异常，消耗发送的所有 gas，不会有异常信息，回滚所有状态
- `require(condition, msg);`:自行判断，如果不满足条件，也会产生异常,返回未使用的 gas，一般来说，尽可能的只使用`require`
- `assert`: 断言，如果产生异常，返回剩余未使用的 gas，回滚状态
- `revert`: 终止执行，消耗所有 gas，回滚所有状态
- 在智能合约开发中，如果要对异常进行处理
  - 尽早抛出异常
  - 在函数中，针对异常的发生组织代码顺序
    - 检查所有的前置条件
    - 修改合约状态
    - 和其他合约进行交互

```js
// throw
contract EX {
    mapping(string => uint256) nameToBalance;

    function insert(string name, uint256 balance) public {
        nameToBalance[name] = balance;
    }

    function getBalance(string name) public view returns (uint256) {
        if (nameToBalance[name] == 0) {
            throw;
        }
        if (bytes(name).length == 0) {
            throw;
        }
        return nameToBalance[name];
    }
}
```

### 实现 solidity 中 map 的遍历

```js
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

library IterableMapping {
    struct itmap {
        uint256 size;
        // 存储所有key
        KeyFlag[] keys;
        // mapping 以key为索引，index为值的map结构
        mapping(uint256 => IndexValue) data;
    }
    // key值的列表
    struct KeyFlag {
        uint256 key;
        bool deleted;
    }
    // value
    struct IndexValue {
        uint256 KeyIndex;
        uint256 value;
    }

    // 增删改查
    function insert(
        itmap storage self,
        uint256 key,
        uint256 value
    ) internal returns (bool) {
        uint256 keyIdx = self.data[key].KeyIndex;
        self.data[key].value = value;
        if (keyIdx > 0) {
            return true;
        } else {
            uint256 len = self.keys.length;
            // keys列表长度+1得到最新的keyIdx
            keyIdx = len+1;
            self.data[key].KeyIndex = keyIdx + 1;
            self.keys.push(KeyFlag(key, false));
            self.size++;
            return false;
        }
    }

    function remove(itmap storage self, uint256 key) internal returns (bool) {
        // 逻辑删除
        uint256 keyIdx = self.data[key].KeyIndex;
        if (keyIdx == 0) {
            return true;
        } else {
            delete self.data[key];
            self.keys[keyIdx - 1].deleted = true;
            self.size--;
            return true;
        }
    }

    function iterate_get(itmap storage self, uint256 keyIdx)
        internal
        view
        returns (uint256 key, uint256 value)
    {
        key = self.keys[keyIdx].key;
        value = self.data[key].value;
    }

    function iterate_contains(itmap storage self, uint256 key)
        internal
        view
        returns (bool)
    {
        return self.data[key].KeyIndex > 0;
    }

    /**
        iterator()
        next()
     */
    //  i++
    //  获取下一个索引
    function iterate_next(itmap storage self, uint256 _keyIndex)
        internal
        view
        returns (uint256)
    {
        _keyIndex++;
        while (_keyIndex < self.keys.length && self.keys[_keyIndex].deleted) {
            _keyIndex++;
        }
        return _keyIndex;
    }

    // i=0
    // 开始遍历
    function iterate_start(itmap storage self)
        public
        view
        returns (uint256)
    {
        return iterate_next(self, type(uint256).min);
    }

    // i<length;
    // 判断循环是否要退出
    function iterate_valid(itmap storage self, uint256 keyIndex)
        public
        view
        returns (bool)
    {
        return keyIndex < self.keys.length;
    }
}

contract User {
    // using for
    IterableMapping.itmap public data;

    function insert(uint256 key, uint256 value) public returns (uint256,bool) {
     bool bol =    IterableMapping.insert(data, key, value);
        return (data.size, bol);
    }

    // 遍历求和
    function sum() public view returns (uint256 s) {
        if(data.size ==0){
            return 0;
        }
        (, uint256 _s) = IterableMapping.iterate_get(data,0);
        s= _s;
        for (
            uint256 i = IterableMapping.iterate_start(data);
            IterableMapping.iterate_valid(data, i);
            i = IterableMapping.iterate_next(data, i)
        ) {
            (, uint256 value) = IterableMapping.iterate_get(data, i);
            s += value;
        }
    }

    // 删除
    function remove(uint256 key) public {
        IterableMapping.remove(data, key);
    }
}

```
