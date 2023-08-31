# Flutter 打包流程

- 修改 app name
  - AndroidManifest.xml
  - main.dart
  - 添加 APP 名和快照名
- 检查和配置 build.gradlue(app)文件
  - applicationId
  - versionCode & versionName
  - minSdkVersion & targetSdkVersion
- 添加 app 的启动图标
  `app/res/mipmap/ic_launcher`
- 签名 APP
  - 创建一个证书
- 启用混淆配置
  - `app/proguard-rules`
  - `flutter build apk  --obfuscate --split-debug-info=./app` 代码混淆和拆分调试信息

```gradle
release {
    debuggable false
    minifyEnabled true // 优化和混淆代码
    useProguard true    // 代码压缩设置
    shrinkResources true //删除无用资源
    signingConfig signingConfigs.release
    proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    ndk {
    abiFilters "armeabi", "armeabi-v7a", "arm64-v8a","x86_64", "x86"    // 测试要注释 打包不能注释
    }
}
```

```pro
<!-- app/proguard-rules.pro -->
 -keep class io.flutter.app.** { *; }
 -keep class io.flutter.plugin.** { *; }
 -keep class io.flutter.util.** { *; }
 -keep class io.flutter.view.** { *; }
 -keep class io.flutter.** { *; }
 -keep class io.flutter.plugins.** { *; }
 -keep class com.google.firebase.** { *; }
 -dontwarn io.flutter.embedding.**
```

```gradle
<!-- android/gradle.properties -->
android.enableR8=true
```

- 构建 release 包

```bash
flutter build apk
flutter build apk  --obfuscate --split-debug-info=./app
```

包的后缀`.apk`改为`.rar`，就可以看到原代码
