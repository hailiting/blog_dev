# Flutter 基础 屏幕适配方案

## 获取设备信息

```dart
// device_info: ^2.0.3
Future getDeviceInfo() async {
  DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
  var dataInfo;
  if(Platform.isIOS){
    print("IOS设备");
    IosDeviceInfo iosInfo = await deviceInfo.iosInfo;
    dataInfo = iosInfo;
  } else if(Platform.isAndroid){
    print("Android设备");
    AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
    dataInfo = androidInfo;
  }
  return dataInfo;
}
```

## 获取设备尺寸

```dart
// 媒体查询信息
final mediaQueryData = MediaQuery.of(context);

// 获取屏幕宽度和高度
final screenWidth = mediaQueryData.size.width;
final screenHeight = mediaQueryData.sized.height;
final physicalWidth = window.physicalSized.width;
final physicalHeight = window.physicalSized.height;
final dpr = window.devicePixelRatio;

// 状态栏的高度
// 有刘海的屏幕：44， 没有刘海的屏幕 20
final statusBarHeight = mediaQueyData.padding.top;
// 有刘海的屏幕：34， 没有刘海的屏幕 0
final bottomHeight = mediaQueryData.padding.bottom;

print('屏幕width:$screenWidth height:$screenHeight');
print('分辨率: $physicalWidth * $physicalHeight');
print('像素比: $dpr');
print('状态栏height: $statusBarHeight 底部高度:$bottomHeight');
```

## 适配方案

### 1. 对比换算

`实际尺寸 = UI尺寸*设备宽度/设计图宽度`

```dart
class Adapt {

  static double screenWidth = 0;
  static double screenHeight = 0;
  static double physicalWidth = 0;
  static double physicalHeight = 0;
  static double dpr = 0;
  static double ratio = 1.0;
  static double statusBarHeight = 0;
  static double bottomHeight = 0;

  static void initialize(BuildContext context, {double UIWidth = 375}) {
    // 1.媒体查询信息
    final mediaQueryData = MediaQuery.of(context);

    // 2.获取宽度和高度
    screenWidth = mediaQueryData.size.width;
    screenHeight = mediaQueryData.size.height;
    physicalWidth = window.physicalSize.width;
    physicalHeight = window.physicalSize.height;
    //像素比
    dpr = window.devicePixelRatio;

    // 3.状态栏的高度
    // 顶部有刘海:47pt 没有刘海的屏幕为20pt
    statusBarHeight = mediaQueryData.padding.top;
    // 底部有刘海:34pt 没有刘海的屏幕0pt
    bottomHeight = mediaQueryData.padding.bottom;
    //比例
    ratio = screenWidth/UIWidth;
  }

  static pt(size){
    return size * Adapt.ratio;
  }
}
```

使用

```dart
Container(
  width: Adapt.pt(300),
  height: Adapt.pt(300)
)
```

### rpx 方案适配

`1rpx = 屏幕宽度/设计图宽度`

```dart
class Adapt {
  static MediaQueryData _mediaQueryData = MediaQueryData();
  static double screenWidth = 0;
  static double screenHeight = 0;
  static double rpx = 0;
  static double px = 0;

  static void initialize(BuildContext context, {double standardWidth = 750}) {
    _mediaQueryData = MediaQuery.of(context);
    screenWidth = _mediaQueryData.size.width;
    screenHeight = _mediaQueryData.size.height;
    rpx = screenWidth / standardWidth;
    px = screenWidth / standardWidth * 2;
  }

  // 按照像素来设置
  static double setPx(double size) {
    return Adapt.rpx * size * 2;
  }

  // 按照rxp来设置
  static double setRpx(double size) {
    return Adapt.rpx * size;
  }
}
```

用法

```dart
Container(
  width: Adapt.setPx(300),
  height: Adapt.setPx(300),
  color: Colors.orange,
  alignment: Alignment.center,
  child: Text(
    'Hello Word',
    style: TextStyle(fontSize: Adapt.setPx(30)),
    textAlign: TextAlign.center,
  ),
),
```

### 3. flutter_screenutil

```dart
ScreenUtil.init(context, width: 750, height: 1334, allowFontScaling: false);
```

```dart
Container(
  width: ScreenUtil().setWidth(300),
  height: ScreenUtil().setHeight(300)
}
```
