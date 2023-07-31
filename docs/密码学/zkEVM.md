# zkEVM

- EVM-equivalent zk-Rollup -> Best user and developer experience
- Decentralization 去中心化 -> Decentralized proving network
- Align with Ethereum -> Open-source, co-build with community

## zk-Rollup

- zk rollup 是一种基于零知识证明（Zero-Knowledge Proof）的 Layer2 扩展解决方案，用于提高区块链的可扩展性和吞吐量。在 zk rollup 中，交易数据会被汇总到一个叫"电路"（Circuit）的数据结构中，并通过 ZKP 的方式将该数据结构的验证和执行工作转移到链下，从而减少链上的负载和交易成本。
- "电路"(Circuit)的意思是一种特定的数据结构和算法，用于描述和执行交易的验证和计算。它包含了一系列逻辑门、加密算法和运算符等，可以对输入数据进行运算和判断，输出验证结果。
- 由于 zk rollup 中的交易数据会被编码成电路的形式，并在链下进行计算和验证，因此这种方法被称为"电路设计"(Circuit Computing)，并成为 zk rollup 技术的核心部分之一。

不需要把每个交易传输到 p2p 网络，只需要把交易发送给 layer2 节点，节点在收到交易（多笔）后，可以产生一个数学证明(零知识证明 π)，p2p 网络不需要 breadcash 整个交易，只需要验证其中的一部分，publish input，只需要验证 prove

- zk rollup 里的电路图是一种逻辑电路，是由一系列逻辑门和运算符等组成的数字模型，用来描述 zk rollup 中交易验证和计算过程。
- **电路的形式**
  - 在计算机科学和电子工程中，“电路的形式”（Circuit Form）通常是指一种数字模型或描述方式，用于**表示和计算电子电路的性质和行为**。这种数字模型通常基于布尔代数（Boolean Algebra）和逻辑门（Logic Gates）等理论基础，通过将电路中的元件和连接关系转化为逻辑表达式或图形，来描述和分析电路的输入和输出关系、逻辑功能和性能指标等。
- 电路的形式可以采用多种不同的表示方法，如布尔函数、真值表、逻辑门电路图、Karnaugh 地图等。这些表示方法的选择取决于电路的复杂程度、设计要求和分析目标等因素。通过采用电路的形式，可以方便地进行电路的优化、仿真、验证和测试等工作，从而提高电路的可靠性和性能。

```
Program
def function(x):
  y=x**3;
  return x+y+5;

Circuit
x * x == var1
var1 * x == y
(y+x) * 1 == var2
(var2+5) * 1 == out
```

- Smart contract root vk
  - Circuit
    - The signature is correct
    - Enough balance
    - The path is updated correctly (hashes)
- zkEVM Circuit
  - The signature is correct
  - The smart contract is loaded correctly
  - The execution trace is valid
  - The storage is updated correctly

### How is a smart contract compiled and executed?

- Language
  - Solidity Vyper
  - Intermediate Representation IR
- Bytecode
  - EVM Bytecode
- Runtime
  - Ethereum Virtual Machine (EVM) -> Storage
    - Stack
    - Memory
    - State Machine

### Three flavours of zkEVM

- language-level
- bytecode-level
- consensus-level 共识层面

- STARKWARE: Solidity-> Readable Cairo -> Cairo assembly -> zkVM
- zkSync Zinc: (IR-)LLVM -> Zinc instruction -> zkVM
- polygon Hermez: Solidity -> IR -> Bytecode -> Micro opcode->uVM
- Scroll: Solidity -> IR -> Bytecode -> zkEVM
- ethereum: Solidity -> IR -> Bytecode -> EVM

## zkEVM 优点

- Security inherited from EVM
- Compatible with all infrastructure seamlessly
  - 与所有基础架构无缝兼容
- High encapsulated complexity
  - 高度封装的复杂性
- Efficiency problem solved through crypto and hardware
  - 通过加密和硬件解决效率问题
- Align with Ethereum

## The workflow of zkEVM

- Geth (Sequencer)
  - -> data availability
  - Trace
    - Execution logs
    - Block header
    - Transactions
    - Contract bytecode
    - Merkle proofs
  - Roller
    - zkEVM circuits -> Proofs -> Aggregation circuit -> Aggr. proof
  - -> validity proof

## The architecture of zkEVM circuits

zkEVM 电路的体系结构

- EVM circuit
  - Fixed table: bitwise opcodes, range check
    - 固定表：按位操作码，范围检查
  - Keccak table: sha3
    - Keccak circuit
  - RAM table: stack memory ...
    - MPT circuit
    - RAM circuit
  - Bytecode table: pc, opcode
    - Bytecode circuit
  - Transaction table -> Transaction circuit -> Signature table <- ECDSA circuit
  - Block context table -> Block circuit

## Plonkish Arithmetization - Custom gate
