# circom

1. 设计电路

- 用自己的 code
- 用官方的 templates

2. 将电路编程成 R1CS

- R1CS: 是一种表示方式，用于描述电路中的约束关系。他将电路中的变量、约束和关系转换为一组线性的约束，其中每个约束都是两个线性多项式之间的等式

```sh
# --output zk 指定输出文件夹
# --02 优化等级
circom circuit.circom --r1cs --wasm --sym --output zk --02
```

3. 用 snarkjs 计算见证(witness)

```sh
snarkjs calculatewitness --wasm circuit.wasm --input input.json --witness witness.json
```

4. 生成可信设置(trusted setup)，并获取 zk-SNARK 证明

```sh
snarkjs setup
snarkjs proof
```

5. 验证产生的证明或用合约验证他

```sh
snarkjs validate
snarkjs generateverifier
```

## getting start

### installation

- 下载 rust

```sh
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

- Node 10+

#### Installing circom

```sh
git clone git@github.com:iden3/circom.git
cd circom
cargo build --release
cd target/release
cargo install --path circom
cp circom /usr/local/bin
circom --version
```

#### Installing snarkjs

```sh
npm install -g snarkjs
```

### 写一个 circuits

```circuits
// multiplier2.circom
pragma circom 2.0.0;
template Multiplier2() {
  signal input a;
  signal input b;
  signal output c;
  c <== a * b;
}
// 实例化 Multiplier2 模板并赋值给 main 组件
component  main =  Multiplier2();
```

```sh
# 将 multiplier2.circom 生成不同版本的电路
circom multiplier2.circom --r1cs --wasm --sym --c
```

### Computing the witness

上面的目录产生了 `multiplier2_js`文件夹

```sh
cd multiplier2_js
```

创建 input.json

```json
{
  "a": "2",
  "b": "11"
}
```

```sh
# multiplier2.wasm 使用 WebAssembly 格式的电路文件名
# input.json 输入数据的文件名，包含了用于计算证据的输入值
# witness.wtns 生成的文件名，包含了算出的证据信息
node generate_witness.js multiplier2.wasm input.json witness.wtns
```

### Proving circuits

```sh
# 时间会长
# 生成一个新的 powers of tau 文件
# powersoftau 指定要进行的操作与powersoftau有关
# new 创建一个新的Powers of Tau文件
# bn128 选择要使用的曲线类型，这里是bn128曲线，一种椭圆曲线  12 指定进行调整的回合数，用于增强zk-SNARKs的安全性
# pot12_0000.ptau 生成的文件， -v 启用详细模式
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
# --name="First contribution" 指定贡献的名称或描述
# 贡献是为了增强zk-SNARKs的安全性和可靠性
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v
# prepare phase2 第二次贡献
# pot12_final.ptau 第二次贡献生成的 Powers of Tau
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v

# groth16 setup 进行Groth16设置
# pot12_final.ptau 用于设置Groth16的 Powers of Tau文件
# 生成Groth16 设置输出到 multiplier2_0000.zkey，该文件包含系统的公共参数，通常进行证明、验证等操作
snarkjs groth16 setup multiplier2.r1cs pot12_final.ptau multiplier2_0000.zkey
# 用于对zk-SNARKs的证明密钥文件进行贡献
# zkey zk-SNARKs的关键操作，指定要进行的操作与证明秘钥
snarkjs zkey contribute multiplier2_0000.zkey multiplier2_0001.zkey --name="1st Contributor Name" -v


# 从zk-SNARK的证明秘钥文件中导出验证秘钥
# export verificationkey 从证明秘钥文件中导出验证秘钥
# multiplier2_0001.zkey 证明秘钥文件的文件名，要导出验证秘钥的文件
# verification_key.json 导出验证秘钥的输出文件名，包括验证秘钥信息的JSON文件
snarkjs zkey export verificationkey multiplier2_0001.zkey verification_key.json

# proof.json生成证明的输出文件名
# public.json生成公共信号的输出文件名
snarkjs groth16 prove multiplier2_0001.zkey witness.wtns proof.json public.json

# 验证
# verification_key.json 秘钥
# public.json 公共信号
# proof.json 要验证的证明文件的文件名
snarkjs groth16 verify verification_key.json public.json proof.json

# 从 multiplier2_0001.zkey 证明秘钥文件中导出Solidity验证合约
snarkjs zkey export solidityverifier multiplier2_0001.zkey verifier.sol
```
