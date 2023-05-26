# P2TR Transfer 方法

在 Taproot 地址中，除了可以使用 P2TR 花费规则之外，还可以使用传统的 P2PKH、P2MS 等地址类型进行转账

## 1. 构造 P2PKH 输入脚本

为从 P2TR 地址中取出需要花费的 UTXO，我们需要构建 P2PKH 输入脚本，以满足 P2PKH 花费规则

```dart
Uint8List createP2PKHInput(String txHash, int txOutputIndex, Uint8List privateKey,
Uint8List publicKey){
  // 构造输入脚本
  var builder = ScriptBuilder()
    .ops([Ops.OP_DUP, Ops.OP_HASH160])
    .data(sha256ripemd160(publicKey))
    .ops([Ops.OP_EQUALIERIFY, Ops.OP_CHECKSIG, Ops.OP_CHECKSIG]);
  // 使用私钥签名
  var txSig = TransactionSignature(
    BitcoinPrivateKey.fromBytes(privateKey),
    1,
    Sha256Hash(hashDecode(txHash)),
    SIGHASH_ALL
  );
  var sigSerializer = CompactTransactionOutputSerializer(TransactionOutput(0, builder.build())).serialize();
  var sigHash = CryptoUtils.sha256d(Uint8List.fromList(List.from(sigSerializer)..add(1)));
  var signature = txSig.sign(sigHash.asBigInt);
  // 按照脚本序列化规则构造输入脚本
  builder = ScriptBuilder().data(signature).data(publicKey);
  return builder.build().encode();
}
```

## 2. 构造 P2TR 输出脚本

接下来需要构造 P2TR 的输出脚本，以满足 P2TR 的花费规则

```dart
Uint8List createP2TROutput(Uint8List p2trAddress, int value) {
  // 构造P2TR输出脚本
  var builder = ScriptBuilder().ops([Ops.Op_HASH160]).data(p2trAddress).ops([Ops.OP_EQUAL]);
  return TransactionOutput(value, builder.build()).script.encode();
}
```

<!-- ### 使用`pointycastle`库中的`ScriptBuilder`类来构造输出脚本。按照P2TR地址格式，首先使用`sha256+ripemd160`算法计算出地址hash，然后构造 -->

### Schnorr 签名

Schnorr 签名是 Bitcoin 网络上的重要改进，它是为了支持 P2TR 转账和 Taproot 升级而被引入的。
用 dart 实现一个 Schnorr 签名

```dart
import "dart:typed_data";
import "dart:math";
import "package:convert/convert.dart";
import "package:pointycastle/ecc/api.dart";
import "package:pointycastle/export.dart";

Uint8List schnorrSign(Unit8List message, Uint8List privKey, Uint8List pubKey) {
  // 创建椭圆曲线secp256k1;
  ECCurve_prime curve = ECCurve_prime("secp256k1");
  // 解码公钥和私钥，生成点对象和标量对象
  ECPublicKey ecPubKey = ECCurveUtils.decodePublicKey(
      curve, pubKey, EccDomainParameters(curve.curve, curve.G, null, curve.n));
  ECPrivateKey ecPrivKey =
      ECPrivateKey(BigInt.parse(hex.encode(privKey), radix: 16));
  // 生成随机数k
  var rng = new Random.secure();
  BigInt k = BigInt.parse(
      '0x' + hex.encode(rng.nextBytes(32)), radix: 16) % curve.n;
  // 计算点R = k * G
  ECPoint R = k * curve.G;
  // 计算消息的哈希值h
  Uint8List h = sha256.convert(message).bytes;
  // 计算s = k + h * x
  BigInt x = ecPrivKey.d;
  BigInt s = (k + BigInt.parse(hex.encode(h), radix: 16) * x) % curve.n;
  // 将签名的两个整数r、s组成的字节数组返回
  return Uint8List.fromList(R.getEncoded(false) + BigInt.parse(s.toString()).toBytes());
}
```

## 具有特定目的 txout 脚本模板

- P2SM: multisig
- P2PK: pubkey
- P2PKH: PubkeyHash
- P2SH: ScriptHash
- P2WSH: WitnessScriptHash v0
- P2WPKH: WitnessPubkeyKeyHash v0
- P2TR: WitnessTaproot v1

- WITNESS_COMMITMENT: witnesscommitment
- NONSTANDARD: nonstandard
- NULLDATA: nulldata
