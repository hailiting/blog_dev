# salt

- solidity 中，可以选择性地为合约创建过程提供一个盐值（salt），以增加合约地址的唯一性和确定性。
- 作用是，在合约创建的过程中引入一定的随机性或唯一性，以确保每次创建的合约实例都有不同的地址

```sol
address(new PancakeV3Pool{salt: keccak256(abi.encode(token0, token1, fee))}())
```
