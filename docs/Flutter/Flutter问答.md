# Flutter 问答

## 1. 请列举 Flutter 不同版本(Stable、Beta、Dev、Master)的特点

答：

- Stable: 稳定版，可用于生产环境
- Beta: 公测版，比较稳定，由上个月最佳 Dev 分支推送而来
- Master: 主分支，相对于 Dev 更加稳定
- Dev: 最新的开发分支，包含 Flutter 最新的变更

## 2. 如何创建快速 flutter 项目

- 1. `flutter create (my_app)`项目名
- 2. 项目结构
  - README.md
  - android 安卓宿主工程
  - ios ios 宿主工程
  - my_app.iml
  - pubspec.yaml 依赖包配置文件
  - lib dart 部分代码
  - pubspec.lock
  - test
- 3. 运行`flutter run`
- 4. 用 xcode 打开项目 `open ios/Runner.xcworkspace`
- 5. 打开 ios 模拟器`xcrun instruments -s` || `open -a Simulator`

## 3. Flutter doctor 命令是做什么用的

答：  
查看是否还需要安装依赖，同时第一次使用 flutter 命令也可以检测环境变量是否配置好

## 4. 配置 AndroidStudio 需要额外下载 JDK 吗，为什么

答：  
不需要，安装对应的 Dart 和 Flutter 插件即可

## 5. 如何在 Mac 上配置 Flutter 和 Android 环境变量

答？：  
在`.bash_profile`文件中对 FlutterSDK 以及 androidSDK 路径进行添加配置

## 6. [如何在 Windows 上配置 Flutter 和 Android 的环境变量](https://blog.csdn.net/sunbinkang/article/details/106935636)

## 7. 如何通过命令启动 IOS/Android 模拟器

开启一个 ios 模拟器：`open -a Simulator`

## 8. 你觉得 Flutter 开发工具有哪些吐槽点
