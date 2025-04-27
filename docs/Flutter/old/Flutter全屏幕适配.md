# Flutter 全屏幕适配

传统布局：`16:9`  
全面屏: `19.x:9`

- Scaffold 的 appbar 与 bottomNavigationBar 不需要额外配置，因为 Scaffold 已经自动帮我们完成了这些配置

- SafeArea 解决适配全屏手机的安全区域问题
- `MediaQuery.of(context).padding`
- 安卓需要额外配置
  - 按 Google 的需求，如果应用未做相应适配此区间长度比必须是在 1.3333 和 1.86 之间

```dart
@override
Widget build(BuildContext context) {
  final EdgeInsets padding = MediaQuery.of(context).padding;
  return MaterialApp(
    title: "全面屏适配",
    theme: ThemeData(
      primarySwatch: Colors.blue,
    ),
    home: Container(
      decoration:BoxDecoration(color:Colors.white),
      padding: EdgeInsets.fromLTRB(0, padding.top, 0, padding.bottom),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Text("顶部"),
          Text("底部"),
        ]
      )
    )
  )
}
```

- 适配安卓

```xml
<!-- android/app/src/AndroidManifest.xml -->
<!-- screenSize 屏幕变动 生命周期不变 -->
<application
  android:name=".MainActivity"
  android:launchMode="singleTask"
  android:theme="@style/LaunchTheme"
  android:screenOrientation="portrait"
  android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
  android:hardwareAccelerated="true"
  android:windowSoftInputMode="adjustResize"
  android:exported="true"
>
  ...
  <!-- 去除启动页的白屏 -->
  <meta-data
      android:name="io.flutter.app.android.SplashScreenUntilFirstFrame"
      android:value="true"/>
  <!-- 去除启动页的黑屏 -->
  <meta-data
      android:name="io.flutter.embedding.android.SplashScreenDrawable"
      android:resource="@drawable/launch_background" />
      <!-- app/main/drawable/launch_background -->
  <!-- 最大的适配比例 -->
  <meta-data
    android:name="android.max_aspect"
    android:value="2.1" />
  ...
</application>
```

```xml
<!-- android/app/main/drawable/launch_background -->
<?xml version="1.0" encoding="utf-8"?>
<!-- Modify this file to customize your launch splash screen -->
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@android:color/white" />

    <!-- You can insert your own image assets here -->
    <item>
        <bitmap
            android:gravity="fill"
            android:src="@mipmap/launch_image" />
    </item>
</layer-list>
```
