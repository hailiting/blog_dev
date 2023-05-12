# btc 地址生成

用 dart_bech32 2.0.0 版本 和 hex 0.2.0 实现 已知 bitcoin 公钥 获取 p2tr 地址 的方法，公钥为 03f5d8a4615e73440c48f0559a8b1af1e15f19eaa569968a74a5928348fa93313b
BIP-173
BIP（BIP340、BIP341、BIP342）

```dart
// Uint8List sha256ripemd160(Uint8List data) {
//   var sha256 = sha256.convert(data);
//   var ripemd160 = ripemd160.convert(sha256.bytes);
//   return Uint8List.fromList(ripemd160.bytes);
// }

```

```dart
import 'package:dart_bech32/dart_bech32.dart';
import 'package:hex/hex.dart';

void main() {
  String publicKeyHex =
      '03f5d8a4615e73440c48f0559a8b1af1e15f19eaa569968a74a5928348fa93313b';

  List<int> publicKey = HEX.decode(publicKeyHex);

  List<int> script = [
    0x51, // OP_1
    ...publicKey,
    0x52, // OP_2
    0x75, // OP_DROP
    0x63, // OP_IF
    0xa9, // OP_HASH160
    0x20, // OP_PUSH20
    ...HEX.decode(
        '03edf5c2c9ac9cbafce3b3e08b1d2a8a5a42858b3d9ccc6e7b6e9d6f7c6e4f4d56b'),
    0x88, // OP_EQUALVERIFY
    0x76, // OP_DUP
    0xa9, // OP_HASH160
    0x14, // OP_PUSH14
    ...HEX.decode(
        'f6ee7d4f4b7d88e1428f5a5e5b5d5a5e5a5e5b5d5a5e5a5e5b5d5a5e5b5d5a5a'),
    0x67, // OP_ELSE
    0x52, // OP_2
    0x21, // OP_PUSH33
    ...HEX.decode(
        '02bd42d7f49b8f6b7c3b2d2b7ffcc28ac9b3a3a834aef200b7d197cac8e831c7ff'),
    0x21, // OP_PUSH33
    ...HEX.decode(
        '03ce4d8645f8f4c5cd5d5a5e5a5e5b5d5a5e5a5d5a5e5a5e5a5e5b5d5a5e5a5a'),
    0x52, // OP_2
    0xae, // OP_CHECKMULTISIG
    0x68, // OP_ENDIF
    0xac, // OP_CHECKSIG
  ];

  List<int> sha256Digest = sha256.convert(script).bytes;

  List<int> p2trAddressBytes = bech32.encode('bcrt', 0, sha256Digest);

  String p2trAddress = utf8.decode(p2trAddressBytes);

  print(p2trAddress);
}
```

```dart
import 'package:hex/hex.dart';
import 'package:dart_bech32/dart_bech32.dart';

String convertBits(List<int> data, int fromBits, int toBits, bool pad) {
  var acc = 0;
  var bits = 0;
  var ret = '';
  var maxv = (1 << toBits) - 1;
  var max_acc = (1 << (fromBits + toBits - 1)) - 1;
  for (var i = 0; i < data.length; ++i) {
    var value = data[i];
    if (value < 0 || (value >> fromBits) != 0) {
      return '';
    }
    acc = ((acc << fromBits) | value) & max_acc;
    bits += fromBits;
    while (bits >= toBits) {
      bits -= toBits;
      ret += String.fromCharCode(((acc >> bits) & maxv) + 'a'.codeUnitAt(0));
    }
  }
  if (pad) {
    if (bits > 0) {
      ret += String.fromCharCode(((acc << (toBits - bits)) & maxv) + 'a'.codeUnitAt(0));
    }
  } else if (bits >= fromBits || ((acc << (toBits - bits)) & maxv) != 0) {
    return '';
  }
  return ret;
}

void main() {
  var publicKeyHex = '03f5d8a4615e73440c48f0559a8b1af1e15f19eaa569968a74a5928348fa93313b';
  var publicKey = HEX.decode(publicKeyHex);
  var encodedData = convertBits([0, ...publicKey], 8, 5, true);
  var words = Bech32.encode('bc', encodedData);
  var address = words.substring(0, words.indexOf('1:'));
  print(address); // 输出：bc1qtnqd6f0n6scx7k8rfzqxntwv6d2z6wk7a9eh2
}

String getAddressFromPubkey(String pubkey) {
    var publicKey = HEX.decode(pubkey);
    var pubkeyWords = convertBits([0, ...publicKey], 8, 5, true);
    var newList = List<int>.from(pubkeyWords);
    newList.insert(0, 1);
    var newWords = Uint8List.fromList(newList);
    var encoded = bech32m.encode(Decoded(prefix: "bc", words: newWords));
    return encoded;
}
```

```dart
 /// Try to decode the address using bech32m
try {
  final _decoded = segwit.decode(address);
  decoded = Decoded(
    prefix: prefix,
    words: Uint8List.fromList(
      _decoded.program,
    ),
  );
} on InvalidChecksum {
  decoded = bech32m.decode(Encoded(data: address));
} catch (e) {
  throw SegwitException(e);
}
```
