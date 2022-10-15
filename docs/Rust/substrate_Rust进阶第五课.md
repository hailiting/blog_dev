# Substrate Rust 进阶第五课

## Ink! 智能合约

https://contracts-ui.substrate.io/

## 环境初始化设置

https://docs.substrate.io/tutorials/smart-contracts/prepare-your-first-contract/

```shell
rustup update
rustup default
  - stable
    - rustup default stable
  - nightly
    - rustup default nightly


rustup component add rust-src --toolchain nightly
rustup target add wasm32-unknown-unknown --toolchain stable
brew install binaryen

## 安装contract插件
cargo install dylint-link
cargo install cargo-contract --version 2.0.0-alpha.3

## 安装substrate contracts node 节点
git clone https://github.com/paritytech/substrate-contracts-node.git
git checkout v0.20.0
cargo build --release
./target/release/substrate-contracts-node --dev --tmp
```

## 环境

- cargo contract --version
  cargo-contract 2.0.0-alpha.1-unknown-aarch64-apple-derwin
- substrate-contracts-node
  v0.20.0 !1 ?1

```shell
$ cargo contract new flipper
# 生成一个erc20
# $ cargo contract new erc20
$ cd  flipper
$ ll
$ cargo contract build
# cargo +nightly contract build
cargo +stable contract build

$ proxy_on
$ cd flipper
$ cargo contract build
```

erc20

```rs
// erc20/lib.rs
#![cfg_attr(not(feature="std"), no_std)]

#[ink::contract]
mod erc20 {
  use ink::storage::Mapping;
  #[ink(storage)]
  #[derive(Default)]
  pub struct Erc20 {
    total_supply: Balance,
    balances: Mapping<AccountId, Balance>,
    allowances: Mapping<(AccountId, AccountId), Balance>,
  }

  #[ink(event)]
  pub struct Transfer {
    #[ink(topic)]
    from: Option<AccountId>,
    #[ink(topic)]
    to: Option<AccountId>,
    value: Balance,
  }

  #[ink(event)]
  pub struct Approval {
    #[ink(topic)]
    owner: AccountId,
    #[ink(topic)]
    spender: AccountId,
    value: Balance,
  }

  #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
  #[cfg_attr(feature="std", derive(scale_info::TypeInfo))]
  pub enum Error {
    InsufficientBalance,
    InsufficientAllowance,
  }
  pub type Result<T> = core::result::Result<T, Error>;
  impl Erc20 {
    #[ink(constructor)]
    pub fn new(total_supply: Balance)-> Self {
      let mut balances = Mapping::default();
      let caller = Self::env().caller();
      balances.insert(&caller, &total_supply);
      Self::env().emit_event(Transfer {
        from: None,
        to: Some(caller),
        value: total_supply,
      });
      Self {
        total_supply,
        balances,
        allowances: Default::default(),
      }
    }
    #[ink(message)]
    pub fn total_supply(&self) -> Balance {
      self.total_supply
    }
    #[ink(message)]
    pub fn balance_of(&self, owner:AccountId) -> Balance {
      self.balance_of_impl(&owner)
    }
    #[inline]
    fn balance_of_impl(&self, owner: &AccountId)-> Balance {
      self.balances.get(owner).unwrap_or_default()
    }
    #[ink(message)]
    pub fn allowance(&self, owner: AccountId, spender: AccountId)-> Balance {
      self.allowance_impl(&owner, &spender)
    }
    #[inline]
    fn allowance_impl(&self, owner: &AccountId, spender: &AccountId)->Balance {
      self.allowances.get((owner, spender)).unwrap_or_default()
    }
    #[ink(message)]
    pub fn transfer(&mut self, to:AccountId, value: Balance)->Result<()>{
      let from = self.env().caller();
      self.transfer_from_to(&from, &to, value)
    }
    #[ink(message)]
    pub fn approve(&mut self, spender: AccountId, value: Balance)->Result<()>{
      let owner = self.env().caller();
      self.allowances.insert((&owner, &spender), &value);
      self.env().emit_event(Approval {
        owner,
        spender,
        value
      });
      Ok(())
    }
    #[ink(message)]
    pub fn transfer_from(
      &mut self,
      from: AccountId,
      to: AccountId,
      value: Balance,
    )->Result<()>{
      let caller = self.env().caller();
      let allowance = self.allowance_impl(&from, &caller);
      if allowance < value {
        return Err(Error::InsufficientAllowance)
      }
      self.transfer_from_to(&from, &to, value)?;
      self.allowances
        .insert((&from, &caller), &(allowance-value));
      Ok(())
    }
    fn transfer_from_to(
      &mut self,
      from: &AccountId,
      to: &AccountId,
      value: Balance,
    )->Result<()> {
      let from_balance = self.balance_of_impl(from);
      if from_balance < value {
        return Err(Error::InsufficientBalance)
      }
      self.balances.insert(from, &(from_balance-value));
      let to_balance = self.balance_of_impl(to);
      self.balances.insert(to, &(to_balance+value));
      self.env().emit_event(Transfer {
        from: Some(*from),
        to: Some(*to),
        value
      });
      Ok(())
    }
  }
  #[cfg(test)]
  mod tests {
    use super::*;
    use ink::primitives::Clear;
    type Event = <Erc20 as ::ink::reflect::ContractEventBase>::Type;
    fn assert_transfer_event(
      event: &ink::env::test::EmittedEvent,
      expected_from: Option<AccountId>,
      expected_to: Option<AccountId>,
      expected_value: Balance,
    ){
      let decoded_event = <Event as scale::Decode>::decode(&mut &event.data[..]).expect("encountered invalid contract event data buffer");
      if let Event::Transfer(Transfer {from, to, value}) = decoded_event {
        assert_eq!(from, expected_from, "encountered invalid Transfer.from");
        assert_eq!(to, expected_to,"encountered invalid Transfer.to");
        assert_eq!(value, expected_value, "encountered invalid Transfer.value");
      } else {
        panic!("encounter unexpected event kind: expected a Transfer event");
      }
      let expected_topics = vec![
        encoded_into_hash(&PrefixedValue {
          value: b"Erc20::Transfer",
          prefix: b"",
        }),
        encoded_into_hash(&PrefixedValue {
          prefix: b"Erc20::Transfer::from",
          value: &expected_from,
        }),
               encoded_into_hash(&PrefixedValue {
          prefix: b"Erc20::Transfer::to",
          value: &expected_to,
        }),
        encoded_into_hash(&PrefixedValue {
          prefix: b"Erc20::Transfer::value",
          value: &expected_value
        }),
      ];
      let topics = event.topics.clone();
      for(n, (actual_topic, expected_topic)) in topics.iter().zip(expected_topics).enumerate() {
        let mut topic_hash = Hash::clear();
        let len = actual_topic.len();
        topic_hash.as_mut()[0..len].copy_from_slice(&actual_topic[0..len]);
        assert_eq!(
          topic_hash, expected_topic,
          "encountered invalid topic at {}",
          n
        );
      }
    }
    #[ink::test]
    fn new_works(){
      let _erc20 = Erc20::new(100);
      let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
      assert_transfer_event(
        &emitted_events[0],
        None,
        Some(AccountId::from([0x01; 32])),
        100,
      );
    }
    #[ink::test]
    fn total_supply_works(){
      let erc20 = Erc20::new(100);
      let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
      assert_transfer_event(
        &emitted_events[0],
        None,
        Some(AccountId::from([0x01; 32])),
        100
      );
      assert_eq!(erc20.total_supply(), 100);
    }
    #[ink::test]
    fn balance_of_works() {
      let erc20 = Erc20::new(100);
      let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
      assert_transfer_event(
        &emitted_events[0],
        None,
        Some(AccountId::from([0x01; 32])),
        100,
      );
      let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
      assert_eq!(erc20.balance_of(accounts.alice), 100);
      assert_eq!(erc20.balance_of(accounts.bob), 0);
    }
    #[ink::test]
    fn transfer_works(){
      let mut erc20 = Erc20::new(100);
      let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
      assert_eq!(erc20.balance_of(accounts.bob), 0);
      assert_eq!(erc20.transfer(accounts.bob, 10), Ok(()));
      assert_eq!(erc20.balance_of(accounts.bob), 10);

      let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
      assert_transfer_event(
        &emitted_events[0],
        None,
        Some(AccountId::from([0x01; 32])),
        100,
      );
      assert_transfer_event(
        &emitted_events[1],
        Some(AccountId::from([0x01; 32])),
        Some(AccountId::from([0x02; 32])),
        10,
      );
    }
    #[ink::test]
    fn invalid_transfer_should_fail(){
      let mut erc20 = Erc20::new(100);
      let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
      assert_eq!(erc20.balance_of(accounts.bob), 0);

      let contract = ink::env::account_id::<ink::env::DefaultEnvironment>();
      ink::env::test::set_callee::<ink::env::DefaultEnvironment>(contract);
      ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.bob);

      assert_eq!(
        erc20.transfer(accounts.eve, 10),
        Err(Error::InsufficientBalance)
      );
      assert_eq!(erc20.balance_of(accounts.alice), 100);
      assert_eq!(erc20.balance_of(accounts.bob), 0);
      assert_eq!(erc20.balance_of(accounts.eve), 0);

      let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
      assert_eq!(emitted_events.len(),1);
      assert_transfer_event(
        &emitted_events[0],
        None,
        Some(AccountId::from([0x01; 32])),
        100
      );
    }
    #[ink::test]
    fn transfer_from_works(){
      let mut erc20 = Erc20::new(100);
      let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

      assert_eq!(erc20.transfer_from(accounts.alice, accounts.eve, 10),Err(Error::InsufficientAllowance));
      assert_eq!(erc20.approve(accounts.bob, 10), Ok(()));
      assert_eq!(ink::env::test::recorded_events().count(),2);

      let contract = ink::env::account_id::<ink::env::DefaultEnvironment>();
      ink::env::test::set_callee::<ink::env::DefaultEnvironment>(contract);
      ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.bob);

      assert_eq!(
        erc20.transfer_from(accounts.alice, accounts.eve, 10),
        Ok(())
      );
      assert_eq!(
        erc20.balance_of(accounts.eve),
        10
      );

      let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
      assert_eq!(emitted_events.len(), 3);
      assert_transfer_event(
        &emitted_events[0],
        None,
        Some(AccountId::from([0x01; 32])),
        100
      );
      assert_transfer_event(
        &emitted_events[2],
        Some(AccountId::from([0x01; 32])),
        Some(AccountId::from([0x05; 32])),
        10
      );
    }
    #[ink::test]
    fn allowance_must_not_change_on_failed_transfer(){
      let mut erc20 = Erc20::new(100);
      let accounts = ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
      let alice_balance = erc20.balance_of(accounts.alice);
      let initial_allowance = alice_balance+2;
      assert_eq!(erc20.approve(accounts.bob, initial_allowance), Ok(()));

      let callee = ink::env::account_id::<ink::env::DefaultEnvironment>();
      ink::env::test::set_callee::<ink::env::DefaultEnvironment>(callee);
      ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.bob);

      let emitted_events_before = ink::env::test::recorded_events().count();
      assert_eq!(
        erc20.transfer_from(accounts.alice, accounts.eve, alice_balance+1),
        Err(Error::InsufficientBalance)
      );
      assert_eq!(
        erc20.allowance(accounts.alice, accounts.bob),
        initial_allowance
      );
      assert_eq!(
        emitted_events_before,
        ink::env::test::recorded_events().count()
      );
    }
    struct PrefixedValue<'a,'b,T> {
      pub prefix: &'a [u8],
      pub value: &'b T,
    }
    impl<X> scale::Encode for PrefixedValue<'_, '_, X>
    where
      X: scale::Encode,
      {
        #[inline]
        fn size_hint(&self) -> usize{
          self.prefix.size_hint()+self.value.size_hint()
        }
        #[inline]
        fn encode_to<T: scale::Output + ?Sized>(&self, dest: &mut T){
          self.prefix.encode_to(dest);
          self.value.encode_to(dest);
        }
      }
      fn encoded_into_hash<T>(entity: &T)-> Hash where T: scale::Encode {
        use ink::{
          env::hash::{
            Blake2x256,
            CryptoHash,
            HashOutput,
          },
          primitives::Clear,
        };
        let mut result = Hash::clear();
        let len_result = result.as_ref().len();
        let encoded = entity.encode();
        let len_encoded = encoded.len();
        if len_encoded <= len_result {
          result.as_mut()[..len_encoded].copy_from_slice(&encoded);
          return result
        }
        let mut hash_output = <<Blake2x256 as HashOutput>::Type as Default>::default();
        <Blake2x256 as CryptoHash>::hash(&encoded, &mut hash_output);
        let copy_len = core::cmp::min(hash_output.len(), len_result);
        result.as_mut()[0..copy_len].copy_from_slice(&hash_output[0..copy_len]);
        result
      }
  }
}
```

erc20_contract 文件

#### debug

- 节点日志： `ink_env::debug_println!("balance in constractor, Account: {:?} | balance: {:}",sender, balances.get(&sender));`

## 可升级的

### 合约的存储和逻辑分离，只关心逻辑，不关心存储

#### contracts-ui

- 1. set-code-hash/target/incrementer.contract 部署
  - initvalue: 0
- 2. set-code-hash/updated-incrementer/target/updated_incrementer.contract 部署
- 3. 复制 incrementer.contract 地址
- 4. forword_call.contract 部署
  - forwordTo -> 选择 incrementer
  - forword 指定一个合约地址

#### polkadot.js

- 复制 forword_call 地址
  - add an existing contract
    - contract address -> forword_call 地址
    - contract name -> ForwardCall
    - contract ABI incrementer 的 metadate.json

### setCodeHash

合约地址 mapping 到 prxoy 上,
**setCode** 替换当前地址的逻辑

incrementer 指向 updated-incrementer 合约的逻辑

- add an existing contract
  - contract address -> incrementer 地址
  - contract name -> Incrementer
  - contract ABI incrementer 的 metadate.json
- 复制 updated-incrementer/target/metadata.json source hash
- polkadot.js incrementer 合约下的`setCode`方法 codehash -> source hash

trait -> interface
