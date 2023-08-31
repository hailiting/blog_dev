# build.gradle

build.gradle 用于定义项目的构建设置。

## app/build.gradle

- 指定应用程序的最小 SDK 版本（minSdkVersion）
- 目标 SDK 版本（targetSdkVersion）
- 编译 SDK 版本（compileSdkVersion）

## build.gradle/dependencies

- 添加应用程序所需的库和依赖项（Android 框架库、第三方库或自己的模块）

## compileSdk 指定应用程序编译所使用的 Android SDK 版本属性

- compileSdk 只影响编译过程，而不会影响应用程序在运行时的行为，运行时的行为取决于 minSdk 和 targetSdk 指定的版本

## Android SDK

Android SDK (Software Development Kit)是一个开发应用程序和软件的开发工具包，包含了开发 Android 应用程序所需要的一系列工具、库、文档和示例代码

- Android 调试桥(ADB): 用于在开发计算机和 Android 设备之间进行通信，可以安装、调试和管理应用程序
- Android 虚拟设备管理器(AVD Manager): 用于创建和管理 Android 虚拟设备(模拟器)，方便开发人员在没有实际设备的情况下进行应用程序的测试和调试
- Android 命令行工具(Android Command-line Tools): 提供一组命令行工具，用于执行各种开发任务，如构建应用程序、签名应用程序、检查设备状态等
- Android 库和 API: Android SDK 提供了一系列的类库和 API，使开发人员能够使用 Android 平台的各种功能，如用户界面设计、数据存储、网络通信、传感器访问等
- 开发工具和集成环境(IDE)支持: Android SDK 可与多个开发工具集成，如 Android Studio，Eclipe 等
- 示例代码

```groovy
// 管理插件配置块
pluginManagement {
  repositories {
    google() // Google 插件仓库
    mavenCentral() // Maven Central 插件仓库
    gradlePluginPortal() // Gradle Plugin Portal 插件仓库
  }
}
// 管理依赖解析的配置块
dependencyResolutionManagement {
  // 设置仓库模式为 FAIL_ON_PROJECT_REPOS
  repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
  repositories {
    google()
    mavenCentral()
  }
}
rootProject.name = "imooc_business" // 将根项目名称设为imooc_business
```
