# 基于电路开发的 dapp 工作流程

- zk 应用概述
  - zk（zore knowledge）应用是指利用零知识证明技术构建的应用程序。它允许在保护隐私的同时验证某些断言的真实性
  - zk 应用可以应用于各种场景，如身份验证、匿名交易、隐私保护数据处理等
- ZK-SNARK Dapp 工作流程
  - ZK-SNARK 是一种零知识证明系统，允许生成紧凑且高效的证明
  - ZK-SNARK Dapp 是基于 ZK-SNARK 技术构建的去中心化应用程序
  - ZK-SNARK Dapp 的工作流程包括：电路设计、电路编译、证明生成、验证和智能合约交互
- circom 入门
  - circom 是一种用于编写计算机电路的领域特定语言(DSL)
  - 开始使用 circom
    - 安装 circom 编译器
    - 创建 circom 电路文件，定义信号和约束
    - 使用 circom 编译器将 circom 文件编译为中间表示显示(如 R1CS)
    - 进一步处理和优化中间表示，以生成用于生成和验证零知识证明的二进制文件
- 逐步构建 ZK-SNARK Dapp
  - 定义应用场景和需求
  - 设计电路，描述断言和计算逻辑
  - 使用 circom 编写电路代码，并进行编译和优化
  - 使用 ZK-SNARK 系统生成证明
  - 在智能合约中验证证明的有效性
  - 在 Dapp 中集成和使用证明功能
- 电路设计技巧
  - 选择合适的信号表示方式，以减少计算和存储需求
  - 使用条件语句和循环来处理复杂逻辑
  - 考虑电路的可扩展性和模块化设计
  - 注意信号和约束的命名和注释，以提高可读性和可维护性
  - 进行电路优化，如约束消除和算术优化

## ZK 应用

### L2 Zk Rollup

L2 Zk Rollup 利用零知识证明技术，将一批交易的状态转移和计算验证聚合到一个有效性证明中，然后将该证明提交到以太坊主链。

- Bundle(or 'roll up') transactions into batches that are executed off-chain
- Submit them as one transaction (validity proof) into Ethereum

### 具体产品

- Rullup: starkNET, zkSync, LoopRing,Hermez, polygon zero, polygon miden, aztec, scroll
- Apps: Curve, Zigzag, paraswap, maker, starvote, zk.link, zkspace, zknft

- Validium/Volition: starkex, zkporter, dydx, immjtaxx, devefi, scorare
- infrastructure(基础设置): ramp,iqlusion, syscoin, infura
- 电路：
  - Semphore
  - Circomlib
  - zkEVM-circuits

## zkSNARKs Dapp Workflow

- Circuit build & compile
  - Circuit -> R1CS
- Setup
  - Phase1 trust-setup(ceremony for all)
  - Phase2(specific-circuit) trust-setup
  - Create proving key, verification key
- Create proof
  - prover input witness
  - prover create proot with pk
- Verify proof
  - Verifier verify proof(Off-chain or on-chain with contract)

```circon
// hello.circon
pragma circom 2.0.0;
template hello() {
  signal input x;
  signal output out;
  out <== x*x +1;
}
component main = hello();
```

```sh
# 运行
circom hello.circom --inspect --wasm --c --r1cs

snarkjs r1cs info hello.r1cs
```

```js
async function run() {
  const { proof, publicSignals } = await snarkjs.plonk.fullProve(
    { a: 1, b: 2, c: 5 },
    "f.wasm",
    "f_final.zkey"
  );
  console.log("proof: ");
  console.log(JSON.stringify(proof, null, 1));
  const vKey = JSON.parse(fs.readFileSync("f_vkey.json"));
  const res = await snarkjs.plonk.verify(vKey, publicSignals, proof);
  if (res === true) {
    console.log("Verification Ok");
  } else {
    console.log("Invalid proof");
  }
}
run().then(() => {
  process.exit(0);
});
```

```
1. 设计电路，产生 wasm
2. 接入合约
3. 前端每移动一步计算 fullProve
4. 对比前端和合约，看对不对
```
