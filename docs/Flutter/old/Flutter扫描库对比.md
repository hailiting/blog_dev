# Flutter 扫描库对比

## qr_code_scanner 与 mobile_scanner

这两个都是一个社区写的

- qr 是基于 zxing 对于安卓，MTBBarcodeScanner 对于 IOS
  - 只支持扫描二维码和条形码
- moblie 是基于 MLKit 与 CameraX 对于安卓，AVFoundation 对于 IOS
  - 支持扫描二维码、条形码、ARKit Anchor、ARKit WorldMap 和 ARKit Surface 等类型的码

## qr_code_scanner

- 通过实现 StatefulWidget 来实现扫描界面和状态管理
- 使用 Platform Channel 机制来调用 zxing 扫描库，来实现底层的扫描功能
- 支持二维码和条形码扫描，扫描速度较快，适合对扫码速度比较高要求的场景

## mobile_scanner

- 使用 Platform Channel 机制调用 MLKit 与 CameraX 扫描库

### moblie_scanner 实现较为复杂，涉及到的底层机制主要包括

- Flutter 的 Platform Channel 机制
- Android 和 ios 扫描库
- Flutter 的 widget 机制
- 图形处理算法
- dart 的 isolate 机制
