# EVM 里字符串编译后的值

Solidity 中，字符串的编码方式是将每个字符的 ASCII 值以 16 进制表示，并将它们连在一起。

## 获取字符串常量的编译后的十六进制

- bytes 表示动态字节数组，将字符串转换为字节数组可以使用 bytes 关键字
- `abi.encodePacked()`函数将数据编码为紧凑的字节序列

```solidty
pragma solidity ^0.8.0;
contract ExampleContract {
  string constant CardSignaturePrefix = "Entrypted Card: ";
  function getCardSignaturePrefixHex() public pure returns (bytes memmory) {
    bytes memory prefixBytes = bytes(CardSignaturePrefix); // 将字符串转换为字节数组的操作
    bytes memory hexBytes = abi.encodePacked(prefixBytes); // 将字节数组转换为紧凑的字节序列，可有可无
    return hexBytes;
  }
}
```
