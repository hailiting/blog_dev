# Substrate Rust 进阶

双合成月饼

- 对 Rust 更深的理解
- Substrate 中使用的编码方式
- 如何测试 Substrate Runtime
- 如何升级/迁移 Substrate runtime logic & storage
- Oracle in Substrate
- Smart contract in Substrate
- 如何测试和定义 Substrate runtime 功能的费用

## 第一节 Poe demo + test

版本`polkadot-v0.9.25`

- `codec` 编解码包
- `scale-info` 链上存储上的类型编结为字节码，以及自动的导出给前端使用
- `frame-support` 添加了 runtime 开发所需要的宏与接口
- `frame-system` 系统接口，常用的数据类型
- `frame-benchmarking` 基本测试

```toml
<!-- pallets/poe/Cargo.html -->
...
[dependencies]
...
sp-std={default-features=false, version="4.0.0",git="https://github/paritytech/substrate.git", branch="polkadot-v0.9.25"}
...

[features]
...
std = [
  ...
  "sp-std/std"
]
...
```

```toml
<!-- /Cargo.toml -->
[workspace]
members=[
  ...
  "pallets/poe"
]
```

```toml
<!-- /runtime/Cargo.toml -->
...
pallet-template = {version="4.0.0-dev", default-featur....}
pallet-poe = {version="4.0.0-dev", default-featur...., path="../pallets/poe"}

[features]
...
std=[
  ...
  "pallet-template/std"
  <!-- 编译标签 -->
  "pallet-poe/std"
  ...
]
...
<!-- 升级的时候做链上数据测试 -->
try-runtime=
```

```rs
// pallets/poe/src/lib.rs
#![cfg_attr(not(feature="std"), no_std)]
pub use pallet::*;

// 引入测试模块
#[cfg(test)]
mod mock;
#[cfg(test)]
mod tests;

#[frame_support::pallet]
pub mod pallet {
  // 引入预定义的一些依赖
  use frame_support::pallet_prelude::*;
  use frame_system::pallet_prelude::*;
  use sp_std::prelude::*;
  // 定义接口
  // frame_system::Config 区块数量，hash类型等
  #[pallet::config]
  pub trait Config: frame_system::Config {
    type MaxClaimLength: Get<u32>;
    // From<Event<Self>> 从当前模块类型转换
    // IsType<<Self as frame_system::Config> 系统模块类型
    type Event: From<Event<Self>>+IsType<<Self as frame_system::Config>::Event>;
  }
  // 模块所需要的结构体
  // 生成所需要的存储项的trait store
  #[pallet::pallet]
  #[pallet::generate_store(pub(super) trait Store)]
  pub struct Pallet<T>(_);
  #[pallet:storage]
  pub type Proofs<T:Config> = StoreageMap<
    _,
    Blake2_128Concat,
    BoundedVec<u8, T::MaxClaimLength>,
    (T::AccountId, T::BlockNumber),
  >;

  // 事件
  #[pallet::event]
  #[pallet::generate_deposit(pub(super) fn deposit_event())]
  pub enum Event<T: Config> {
    ClaimCreated(T:: AccountId, Vec<u8>),
    ClaimRevoked(T:: AccountId, Vec<u8>),
  }

  // 错误类型
  #[pallet::error]
  pub enum Error<T> {
    ProofAlreadyExist,
    ClaimTooLong,
    ClaimNotExist,
    NotClaimOwner,
  }

  // 定义一些保留函数
  #[pallet::hooks]
  impl<T:Config> Hooks<BlockNumberFor<T>> for Pallet<T> {}

  #[pallet::call]
  impl<T:Config> Pallet<T> {
    #[pallet::weight(0)]
    // 创建存证
    pub fn create_claim(origin: OriginFor<T>, claim:Vec<u8>)->DispatchResultWithPostInfo {
      // 交易得签名
      let sender = ensure_signed(origin)?;
      let bounded_claim = BoundedVec::<u8, T::MaxClaimLength>::try_from(claim.clone())
        .map_err(|_| Error::<T>::ClaimTooLang)?;
      // Proof 还不存在
      ensure!(!Proofs::<T>::contains_key(&bounded_claim), Error::<T>::ProofAlreadyExist);

      Proofs::<T>::insert(
        &bounded_claim,
        (sender.clone(), frame_system::Pallet::<T>::block_number()),
      );

      // 存证被成功创建
      Self::deposit_event(Event::ClaimCreated(sender, claim));

      // 返回ok
      Ok(().into())
    }
  }
  // 删除存证
  pub fn revoke_claim(origin:OriginFor<T>, claim:Vec<u8>)->DispatchResultWithPostInfo {
    let sender:<T as Config>::AccountId = ensure_signed(origin)?;
    let bounded_claim: BoundedVec<u8, <T as Config>::MaxClaimLength> = BoundedVec::<u8, T::MaxClaimLength>::try_from(claim.clone())
      .map_err(op: |_| Error::<T>::ClaimTooLang)?;
    let (owner: <T as Config>::AccountId, _) = Proofs::<T>::get(key: &bounded_claim).ok_or(err: Error::<T>::ClaimNotExist)?;
    ensure!(owner==sender, Error::<T>::NotClaimOwner);
    Proofs::<T>::remove(key:&bounded_claim);
    Self::deposit_event(Event::ClaimRevoked(sender, claim));
    Ok(().into())
  }
  // 转移存证
  #[pallet::weight(0)]
  pub fn transfer_claim(origin:OriginFor<T>, claim:Vec<u8>, dest:T::AccountId) -> DispatchResultWithPostInfo {
    let sender: <T as Config>::AccountId = ensure_signed(origin)?;
    let bounded_claim:BoundedVec<u8, <T as Config>::MaxClaimLength> = BoundedVec::<u8, T::MaxClaimLength>::try_from(claim.clone()).map_err(op:|_| Error:<T>::ClaimTooLang)?;
    let (owener:<T as Config>::AccountId, _block_number: <T as Config>::BlockNumber) = Proofs::<T>::get(key:&bounded_claim).ok_or(err:Error::<T>::ClaimNotExist)?;
    ensure!(owner == sender, Error::<T>::NotClaimOwner);
    // 插入新发键值对
    Proofs::<T>::insert(key: &bounded_claim, val: (dest,frame_system::Pallet::<T>:: block_number()));
    Ok(().into())
  }
}
```

```rs
// 测试模块
// ./pallets/poe/src/mock.rs copy from  ./pallets/template/src/mock.rs
...
use frame_support::traits::{CountU16, ConstU32, ConstU64};
...
use crate as pallet_poe;
...
frame_support::construct_runtime!(
  ...
  PoeModule: pallet_poe::{Pallet, Call, Storage, Event<T>},
  ...
)
// Test 用于测试的runtime
impl system::Config for Test {
  ...
}
impl pallet_poe::Config for Test {
  type MaxClaimLength = ConstU32<512>;
  type Event = Event;
}
...
```

```rs
// 测试用例
// ./pallets/poe/src/test.rs
use super::*;
use create::{mock::*, Error};
use frame_support::{assert_noop, assert_ok, BoundedVec}

#[test]
fn create_claim_works(){
  // new_test_ext 初始化测试环境
  new_test_ext().execute_with(|| {
    let claim = vec![0,1];
    assert_ok!(PoeModule::create_claim(Origin::signed(1), claim.clone()));
    let bounded_claim = BoundedVec::<u8, <Test as Config>::MaxClaimLength>::try_from(claim.clone()).unwrap();
    assert_eq!(
      Proofs::<Test>::get(&bounded_claim),
      Some((1, frame_system::Pallet::<Test>::block_number()))
    );
  });
}

#[test]
fn create_claim_failed_when_claim_already_exist(){
  // new_test_ext 初始化测试环境
  new_test_ext().execute_with(execute: || {
    let claim:Vec<u8> = vec![0,1];
    let _ = PoeModule::create_claim(Origin::signed(1), claim.clone());
    assert_noop!(
      PoeModule::create_claim(Origin::signed(1),claim.clone()),
      Error::<Test>::ProofAlreadyExist
    );
  });
}
```

```rs
// ./runtime/src/lib.rs
...
impl pallet_template::Config for Runtime{
  type Event = Event;
}
impl pallet_poe::Config for Runtime{
  // ConstU32 multget接口
  type MaxClaimLength = ConstU32<512>;
  type Event = Event;
}
...
...
construct_runtime!(
  pub enum Runtime where
  ...
  {
    ...
    PoeModule: pallet_poe,
    ...
  }
)
```

```shell
$ git log
$ cargo build --release
# 运行节点
$ ./target/release/node-template --dev

# 0x01


# 测试
$ cargo test -p pallet-poe
```

## 第二节 SCALE 编解码

- 数据序列化和反序列化
- SCALE 编解码原理
- 实现

### 数据序列化和反序列化

数据对象转换成二进制码，高效地进行存储和传输;  
反之，以相同规则将二进制码解码，可以获得原始数据：

- Bitcoin specific serialization format 比特币特定的序列化格式 (BTC)
- RLP(recursive length prefix)递归长度前缀 (ETH)
- SCALE (Substrate)

### SCALE Codec 介绍

简单拼接聚合的小端数据格式（Simple Concatenated Aggregate Little-Endian）

- 轻量、高效的二进制码格式
- 适用于`Blockchain runtime`、低内存的资源有限环境
- 链上数据和交易传输的编码格式
- 不包含类型信息，解码调用方必须有类型信息
- 新类型，`#[derive(Encode, Decode)]`
- 不同的类型对应的编码规则不同

### SCALE Codec 原理

固定宽度整数，如 u8, i8, u32,i32...

- i8: 69, binary: 0100 0101, hex: 0x45
- u16: 42, binary: 0000 0000, 0010 1010, hex: 0x2a00
- u32: 16777215, binary: 0000 0000, 1111 1111, 1111 1111,1111 1111, hex: 0xff ff ff 00

`整数的压缩（compact）编码`, 编码大整数更高效，最大值`2^536`

- 整数类型前标记
  - 整数作为参数时`#[compact]`
  - 结构体：`#[codec(compact)]`
- 最低位的两个 bit 位表示模式
  - 0b00, 单字节模式，高 6 位是值的 LE 编码（0~63）
  - 0b01, 两字节模式，高 6 位和下一个字节是值的 LE 编码（64~2^14-1）
  - 0b10, 四字节模式，高 6 位和下 3 个字节值是 LE 编码(2^14-1)~(2^32-1)
  - 0b11, 大整数模式，高 6 位表示用来编码值的字节数减去 4，之后的字节值的编码(2^30-1~2^536-1)

`布尔值`，单字节的最小位表示

- `false, binaray: 0000 0000, hex: 0x00`
- `true, binaray: 0000 0001, hex: 0x01`

`Option<T>类型`

- 如果有值，将保存的值编码后拼接，如 `Option<i8>`
  - `None, binaray: 0000 0000, hex: 0x00`
  - `Some(69), binary: 0000 0001, 0100 0101, hex: 0x01 45`
- 特例，`Option<bool>`
  - `None,hex: 0x00`
  - `Some(true), hex: 0x01`
  - `Some(false), hex: 0x02`

`Result<T,E>类型`

- 0x00 表示 Ok(v), 后面紧跟值 v 的编码
- 0x01 表示 Err(e), 后面紧跟错误信息 e 的编码
  例如: `type MyResult = std::result::Result<u8, bool>`
  - Ok(42), hex: 0x002a
  - Err(false), hex: 0x0100

`Vectors(lists, series, sets)`,以集合内元素数量的`compact`编码开始，紧跟各个元素值的编码，按顺序拼接，例如：

- origin: u16 整数的集合，`[4,8,15,16,23,42]`, 共 6 个元素
- binary:
  - 0001 1000 (6 in compact),
  - 0000 0000, 0000 0100 (4), 0000 0000, 0000 1000 (8),
  - 0000 0000, 0000 1111 (15), 0000 0000, 0001 0000 (16),
  - 0000 0000, 0000 0111 (23), 0000 0000, 0010 1010 (42),
- hex: 0x18 0400 0800 0f00 1000 1700 2a00

`字符串 String`

- 以`Vec<u8>`的形式进行表示和编码
- `u8`数值来源于字符的`UTF8`编码

`元祖Tuple`，各个元素的编码直接拼接，例如

- origin: `(3, false)`, binary: 0000 1100, 0000 0000, hex: 0x0c00

`结构体`Struct

- 属性名不会被编码到结果中
- 和元组类似，通常是各个属性值的编码直接拼接

```rs
struct MyStruct {
  #[codec(compact)]
  a: u32,
  b: bool,
}
let my_struct = MyStruct {
  a: 42,
  b: true,
}

// binary: 0010 1010, 0000 0001
// binary add mode: 1010 1000, 0000 0001
// hex: 0xa8 01
```

`枚举Enum`，第一个字节用来标识变体的位置，即最多支持 256 个变体，其后的内容用来编码变体里可能包含的值

- `#[codec(index="1")]`, 指定某个变体的 index 编码

```rs
enum IntOrBool {
  Int(u8),
  Bool(bool)
}
- Int(42), hex: 0x002a
- Bool(true), hex: 0x0101
```

### SCALE Codec 实现

- Rust: paritytech/parity-scale-codec
- JavaScript: polkadot-js/api
- Python: polkascan/py-scale-codec
- Golang: itering/scale.go
- C++: soramitsu/scale
- AssemblyScript: LimeChain/as-scale-codec
- Haskell: airalab/hs-web3
- Java: emeraldpay/polkaj
- Ruby: itering/scale.rb

## 第三节：交易费用和权重

- 交易费用存在的原因
- 设计思路
- 组成部分
- FRAME 模块导读

### 交易费用存在的原因

#### web2.0

**用户数据信息的所有者属于服务提供方**
服务提供方利用用户的个人信息、产生的数据、注意力等来变现：

- 广告推送
- 用户数据分析指导商家决策
- 直接共享、贩卖用户隐私等

#### web3.0

用户通过私钥掌握数据，敏感数据可以通过加密防止被窃取

### 如何设计交易费用

- 不同地区宽带差异巨大、有限的区块大小
  - 计算每笔交易占用的字节数来收取费用
- 有限的区块生成时间
  - 计算或性能测试得出不同交易所消耗的时间
- 昂贵的链上存储空间
  - 一次性付费和租赁两种模式
- 如何分配交易费用
  - 通过链上治理进行分配

### Substrate 交易费用组成

`总费用=基本费用+字节费用+权重费用*动态调节费率+小费`

#### 基本费用

- 每笔交易所需支付的最少费用
- ExtrinsicBaseWeight
- WeightToFee 将权重转换为费用

#### 字节费用

- `字节费用 = 每字节费用*字节数`
  - kusama 网络：5MB，0.0000003ksm
- 字节数是 SCALE 编码后的长度
- 最大区块长度`BlockLength`
- 每字节的费用`TransactionByteFee`
- 配置在可升级的 runtime 代码

#### 权重费用

- 区块的总权重 BlockWeights
- 不同级别的交易类型 `Normal`, `Operational`(可占满整个区块), `Mandatory`(区块满了也可以打包占用)
- 可用区块比
- 每个交易都有一个基本权重 ExtrinsicBaseWeight
- 数据库读写权重是常量

- Kusama 网络

  - 区块的总权重 2,000,000,000,000
  - 可用区块比：75%
  - Base weight: `125*1,000,000`

- 通过 Pays::No 来取消交易费用
- 权重纠正，可调用函数返回实际权重值
- WeightToFee 将权重值转换成费用
- 合理的权重值需要通过性能测试来获取
- 设置权重的方式：默认形式，自定义形式

```rs
// 默认权重
// Normal交易
#[weight=2_000_000]
pub fn accumulate_dummy(origin:OriginFor<T>, increase_by: T::Balance)=>DispatchResult {
  //-- snip--
}
// reads_writes 数据库读写
#[weight=T::DbWeight::get().reads_writes(1,2)+20_000]
pub fn accumulate_dummy(origin:OriginFor<T>, increase_by: T::Balance)=>DispatchResult {
  //-- snip--
}

// Operational交易
// DispatchClass 交易类型
#[weight=(2_000_000, DispatchClass::Operational)]
pub fn accumulate_dummy(origin:OriginFor<T>, increase_by: T::Balance)->DispatchResult {
  //-- snip--
}
// Pays::No 不需要任何交易费
#[weight=(100_000, DispatchClass::Operational, Pays::No)]
pub fn accumulate_dummy(origin:OriginFor<T>, increase_by:T::Balance)->DispatchResult {
  //-- snip--
}
```

#### 自定义权重

自定义权重计算方法，自定义的结构体，并实现接口：

- WeighData, 计算权重
- ClassifyDispatch, 判断交易级别
- PaysFee, 设置是否付费标志位

```rs
// the struct with a multiplier
struct LenWeight(u32);
impl<T:Encode> WeighData<T> for LenWeight {
  fn weigh_data(&self, target:T)->Weight {
    let multiplier = self.0;
    let encoded_len = target.encode().len() as u32;
    multiplier*encoded_len
  }
}
impl<T:Encode> ClassifyDispatch<T> for LenWeight {
  fn classify_dispatch(&self, target:T)->DispatchClass {
    let encoded_len = target.encode().len() as u32;
    if encoded_len >100{
      DispatchClass::Operational
    } else {
      DispatchClass::Normal
    }
  }
}
impl<T:Encode> PaysFee<T> {
  fn pays_fee(&self, target:T)->Pays {
    let encoded_len = target.encoded().len() as u32;
    if encoded_len>10{
      Pays::Yes
    } else {
      Pays::No
    }
  }
}
// 使用自定义权重 Apply weight to dispatchable call
#[weight=LenWeight(10)]
pub fn set_dummy(origin:OriginFor<T>, #[compact] new_value:T::Balance){
  //-- snip--
}

// 权重费用转换
pub struct WeightToFee;
impl WeightToFeePolynomial for WeightToFee {
  type Balance = Balance;
  fn polynomial()->WeightToFeeCoefficients<Self::Balance>{
    //-- snip--
  }
}
```

#### 动态调节费率

网络平稳运行的过程中，区块资源的使用比例应该稳定：

- TargetBlockFullness 参数，通常为 25%
- 当前区块资源使用超过 25%时，提高下一区块动态调节费率，增加交易费用
- 当资源使用率不足 25%时，减低下一区块的动态调节费率，减少交易费用，鼓励交易的发生

#### 小费

不是必须的，具体数量由交易发送者决定，并且完全由区块生产者获得；  
而交易费用的其他组成部分会根据一定的比例分配进入”国库“

### FRAME 组成部分

- SystemModule: Types, Storages, Helper functions, Core Types, Events
- SupportLibrary: macros, traits
- ExecutiveModule: Runtime 编排层
- Pallets: business models

### FRAME 模块导读

- system
- timestamp
- transaction-payment
- utility

```
- bin
  - node
    - 节点的可执行程序
  - node-template
    - 模板
  - utils
    - chain-spec-builder
    - subkey
      - 管理密钥
- client 包含了节点所必须要的组件
  - 共识，数据库。。。
- primitives
  - 常用的runtime所需要的类型和方法
- frame
  - runtime 所需要的模块
  - system `crates.parity.io/frame_system/index.html 文档`
    - lib.rs
      blockLen...

```

## 作业：

- 一：编写存证模块的单元测试代码，包括
  - 创建存证的测试用例
  - 撤销存证的测试用例
  - 转移存证的测试用例
- 二：创建存证时，为存证内容的哈希值`Vec<u8>`
  - 设置长度上限，超过限制时返回错误
  - 并编写测试用例
