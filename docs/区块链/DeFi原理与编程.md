# DeFi 原理与编程

## 大纲

- 1
  - 区块链中的计算机密码学
  - 对消息签名
  - 对 TypedData 签名
  - ERC20 Permit 实现
  - 任务
    - Sign Typed Data
    - ERC20 Permit
- 2
  - Merkle Proof
  - Gasless Meta-transaction(EIP 2771)
  - Geth 使用 / Dune 使用
  - 任务
    - Markle Proof 实现
    - Meta-transaction 实现
- 3
  - 可升级智能合约(Proxy 原理与实现)
  - Seaport 代码
  - 任务
    - 可升级智能合约
    - 阅读 Seaport 代码

### 区块链中的计算机密码学

- 用到的密码学

  - 非对称加密
  - 加密哈希函数
  - 椭圆曲线密码学
  - 椭圆曲线数字签名 ECDSA

- 用到的算法
  - 哈希函数 keccak256
  - 椭圆曲线 secp256k1

```js
ethers.utils.keccak256();
ethers.utils.id(); // hash

Signer.signMessage();
ethers.utils.verifyMessage();

ethers.utils.hashMessage();

Signer.sendTransaction();
```

- 公钥： 私钥通过椭圆曲线乘法计算 得来的
