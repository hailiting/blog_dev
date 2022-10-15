# substrate_Rust 进阶第二课

## Substrate Kitties

- Metadata 元数据介绍
- Kitties Pallet 模块功能开发
- 单元测试
- Fra e 资产相关模块介绍
  - balances
  - assets

## 作业

- 1. 增加买和卖的 extrinsic, 对视频中的 kitties 的实现进行重构，提取公共代码
- 2. KittyIndex 不在 pallet 中指定，而是在 runtime 里绑定
- 3. 扩展存储，能得到一个账号拥有的所有 Kitties
- 4. 引入 Balances 里面的方法，create 和 breed 需要质押一定数量的 token,在 transfer 的时候转移质押
- 5. 通过 polkadotjs 可以成功调用 pallet 里面的功能
- 6. 测试代码能测试所有 5 个方法，能检查所有定义的 event， 能测试出所有定义的错误类型

参考 substrate/frame/treasury/src/lib.rs Balance 的用法

## Metadata

Extrinsic(交易)
描述系统基本的属性或特征  
其中包含了每个模块的元数据

- Storage
- Events
- Calls
- Constants
- Errors

- 前端通过`RPC calls state getMetadata(at)`得到元数据

```sh
# 生成metadata
# http://127.0.0.1:9944 为起的rust地址
subxt metadata --url http://127.0.0.1:9944 > metadata.json
```

```js
...
{
  name: TemplateModule
  storage: {
    prefix: TemplateModule
    items: [
      {
        name: Something
        modifier: Optional
        type: {
          Plain: 4
        }
        fallback: 0x00
        docs: []
      }
    ]
  }
  // 函数的调用
  calls: {
    type: 111
  }
  events: {
    type: 38
  }
  constants: []
  errors: {
    type: 114
  }
  index: 8
}
...
```

## 实例

### 功能：

- 领养 cat
  - 所有者
  - update
- 繁殖 cat
- 赠予 cat

```sh
# 版本`polkadot-v0.9.25`
git clone --branch polkadot-v0.9.25 https://github.com/substrate-developer-hub/substrate-node-template
// substrate node-template  polkadot-v0.9.25
pwd
~xxx/pallets
mkdir kitties && cd kitties
touch Cargo.toml
mkdir src && cd src
touch lib.rs
```

```toml
<!-- pallets/kitties/Cargo.toml -->
...
[dependecies]
...
<!-- 因为用到hash 所以引入了sp-io -->
sp-io={default-features=false, version="6.0.0",git="..."}
...
```

```rs
// pallets/kitties/src/lib.rs
// - kitty 的标识  type KittyIndex = u32
// - 存储kitty
pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
  use frame_support::pallet_prelude::*;
  use frame_system::pallet_prelude::*;
  use frame_support::traits::Randomness;
  use sp_io::hashing::blake2_128;

  type KittyIndex = u32;

  #[pallet::type_value]
  pub fn GetDefaultValue()->KittyIndex {
    0_u32
  }

  #[derive(Encode, Decode, Clone, PartialEq, Eq, Debug, TypeInfo, MaxEncodedLen)]
  pub struct Kitty(pub [u8; 16]);

  #[pallet::config]
  pub trait Config: frame_system::Config {
    // event 定义
    type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
    // random 从runtime绑定pallet的实现
    type Randomness: Randomness<Self::Hash, Self::BlockNumber>;
  }

  #[pallet::pallet]
  #[pallet::generate_store(pub(super) trait Store)]
  pub struct Pallet<T>(_);

  #[pallet::storage]
  #[pallet::getter(fn, next_kitty_id)]
  // 默认值
  pub type NextKittyId<T> = StorageValue<_, KittyIndex, ValueQuery, GetDefaultValue>;

  #[pallet::storage]
  #[pallet::getter(fn kitties)]
  // Blake2_128Concat hash的方法  在map的时候做值的映射
  pub type Kitties<T> = StorageMap<_, Blake2_128Concat, KittyIndex, Kitty>;

  #[pallet::storage]
  #[pallet::getter(fn kitty_owner)]
  pub type KittyOwner<T: Config> = StorageMap<_, Blake2_128Concat, KittyIndex, T::AccountId>;

  #[pallet::event]
  #[pallet::generate_deposit(pub(super) fn deposit_event)]
  pub enum Event<T:Config> {
    KittyCreated(T::AccountId, KittyIndex, Kitty),
    KittyBreed(T::AccountId, KittyIndex, Kitty),
    KittyTransfered(T::AccountId, T::AccountId, KittyIndex)
  }

  #[pallet::error]
  pub enum Error <T>{
    InvalidKittyId,
    NotOwner,
    SameKittyId
  }
  #[pallet::call]
  impl<T:Config> pallet<T> {
    #[pallet::weight(10_000)]
    pub fn create(origin: OriginFor<T>)->DispatchResult {
      let who = ensure_signed(origin)?;
      let kitty_id = Self::get_next_id().map_err(|_| Error::<T>::InvalidKittyId)?;
      let dna = Self::random_value(&who);
      let kitty = Kitty(dna); // 对dna Kitty结构的check

      Kitties::<T>::insert(kitty_id, &kitty);
      KittyOwner::<T>::insert(kitty_id, &who);
      NextKittyId::<T>::Set(kitty_id+1);
      Self::deposit_event(Event::KittyCreated(who, kitty_id, kitty));
      Ok(())
    }
    #[pallet::weight(10_000)]
    // origin, kitty_id_1, kitty_id_2
    pub fn breed(origin: OriginFor<T>, kitty_id_1: KittyIndex, kitty_id_2:KittyIndex)->DispatchResult {
      let who = ensure_signed(origin)?;
      ensure!(kitty_id_1!=kitty_id_2, Error::<T>::SameKittyId);
      // check kitty id
      let kitty_1 = Self::get_kitty(kitty_id_1).map_err(|_| Error::<T>::InvalidKittyId)?;
      let kitty_2 = Self::get_kitty(kitty_id_2).map_err(|_| Error::<T>::InvalidKittyId)?;

      // get next id
      let kitty_id = Self::get_next_id().map_err(|_| Error::<T>::InvalidKittyId)?;

      let selector = Self::random_value(&who);

      let mut data = [0u8, 16];
      for i in 0..kitty_1.0.len() {
        // 0 choose Kitty2  and 1 choose kitty1
        data[i] = (kitty_1.0[i] & selector[i] ) | (kitty_2.0[i] & !selector[i] );
      }
      let new_kitty = Kitty(data);

      // update storage
      Kitties::<T>::insert(kitty_id, &new_kitty);
      KittyOwner::<T>::insert(kitty_id, &who);
      NextKittyId::<T>::Set(kitty_id+1);

      Self::deposit_event(Event::KittyBreed(who, kitty_id, new_kitty));
      Ok(())
    }
    #[pallet::weight(10_000)]
    pub fn transfer(origin:OriginFor<T>, kitty_id: u32, new_owner: T::AccountId)->DispatchResult {
      let who = ensure_signed(origin)?;
      Self::git_kitty(kitty_id).map_err(|_| Error::<T>::InvalidKittyId)?;
      ensure!(Self::Kitty_owner(kitty_id) == Some(who.clone()), Error::<T>::NotOwner);
      <KittyOwner<T>>::insert(kitty_id, new_owner);
      Self::deposit_event(Event::KittyTransfered(who, new_owner, kitty_id));
      Ok(())
    }
  }

  impl<T:Config> pallet<T> {
    // get random 256
    fn random_value(&sender:T::AccountId)->[u8; 16]{
      // AccountId + extrinsic_index + blake2_128 -> [u8; 16]
      let payload = (
        T::Randomness::random_seed(),
        &sender,
        // extrinsic_index -> nonce的值
        <frame_system::Pallet::<T>>::extrinsic_index()
      );
      payload.using_encoded(blake2_128)
    }
    fn get_next_id()->Result<KittyIndex, ()> {
      match Self::next_kitty_id(){
        KittyIndex::MAX=>Err(()), // Id最大值的时候，返回err
        val=>Ok(val),
      }
    }
    fn get_kitty(kitty_id: KittyIndex) -> Result<Kitty, ()>{
      match Self::kitties(kitty_id){
        Some(kitty)=>Ok(kitty),
        None=>Err(())
      }
    }
  }
}
```

```toml
<!-- ./Cargo.toml -->
<!-- 添加到workspace -->
[workspace]
members = [
  ...
  "pallets/kitties"
]
```

```toml
<!-- ./runtime/Cargo -->
<!-- 添加到runtime的wasm文件 -->
pallet-template ...
pallet-kitties = {default-features = false, path="../pallets/kitties"}
```

```rs
// ./runtime/lib.rs
...
pub use pallet_template;
pub use pallet_kitties;
...
impl pallet_template::Config for Runtime {
  type Event = Event;
}
impl pallet_kitties::Config for Runtime {
  type Event = Event;
  type Randomness = RandomnessCollectiveFlip;
}
...

construct_runtime!(
  ...
  TemplateModule: pallet_template,
  KittiesModule: pallet_kitties,
)
```

```sh
cargo build --release
cd pallet/kitties
./target/release/node-template --dev
cargo test -p pallet-kitties
```

### `cargo expand`

```sh
# 检查`rust`构建工具的版本`rustup default`
rustup default
  1.59.0-x86_64-apple-darwin (default)
rustup install nightly
 Copy snippet
rustup default nightly
  nightly-x86_64-apple-darwin unchanged
# 宏的展开
# cargo expand
cargo rustc --profile=check -- -Zunpretty=expanded
```

### Balances Assets 源代码

#### Balances

`./frame/balance/src/lib.rs`

- 主要的 pallet
  - Currency
  - ReservableCurrency
  - NamedReservableCurrency
  - LockableCurrency
  - Imbalnces
- Currency 的例子

```rs
use frame_support::traits::Currency;
pub trait Config: frame_system::Config {
  type Currency: Currency<Self::AccountId>;
}

pub type BalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>::Balance;
pub type NegativeImbalanceOf<T> = <<T as Config>::Currency as Currency<<T as frame_system::Config>::AccountId>>:NagativeImbalance;

fn main(){}
```

- LockableCurrency

```rs
use frame_support::traits::{WithdrawReasons, LockableCurrency};
use sp_runtime::traits::Bounded;
pub trait Config: frame_system::Config {
  type Currency: LockableCurrency<Self::AccountId, Moment=Self::BlockNumber>;
}
struct StakingLedger<T: Config> {
  stash: <T as frame_system::Config>::AccountId,
  total: <<T as Config>::Currency as frame_support::traits::Currency<<T as frame_system::Config>::AccountId>>::Balance,
  phantom: std::marker::PhantomData<T>,
}
const STAKING_ID: [u8; 8] = *b"staking ";
fn update_ledger<T: Config>(
  controller: &T::AccountId,
  ledger: &StakingLedger<T>
){
  T::Currency::set_lock(
    STAKING_ID,
    &ledger.stash,
    ledger.total,
    WithdrawReasons::all()
  );
  <Ledger<T>>::insert(controller, ledger);
}
fn main(){}
```

```rs
// 转账 支付
fn reserve(who: &T::AccountId, value: Self::Balance)->DispatchResult{
  if value.is_zero(){
    return Ok(())
  }
  Self::try_mutate_account(who, |account, _|->DispatchResult {
    account.free=account.free.checked_sub(&value).ok_or(Error::<T, T>::InsufficientBalance)?;
    account.reserved = account.reserved.checked_add(&value).ok_or(ArithmeticError::Overflow)?;
    Self::ensure_can_withdraw(&who, value, WithdrawReasons::RESERVE, account.free)
  })?;
  Self::deposit_event(Event::Reserved { who: who.clone(), amount: value});
  Ok(())
}
```
