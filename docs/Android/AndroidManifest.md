# AndroidManifest

AndroidManifest.xml 是 Android 应用程序的清单文件，包含了应用程序的各种元数据，如应用程序名称、图标、权限要求、组件声明（如活动、服务、接收器）等

## `AndroidManifest.xml`常用的标签

- `<manifest>`：清单文件的根元素，用于指定包名和版本号等应用程序级别的属性
- `<application>`：定义应用程序整体配置和属性，包含活动、服务、广播接收器等组件的声明
- `<activity>`：声明应用程序的活动组件，用于提供用户界面和处理用户交互
- `<service>`：声明应用程序的服务组件，用于后台执行长时间运行的操作
- `<receiver>`：声明应用程序广播接收器组件，用于接收系统广播或自定义广播
- `<provider>`：声明应用程序的内容提供器组件，用于管理应用程序的数据共享和访问
- `<intent-filter>`：在活动、服务、广播接收器等组件内部使用，用于指定组件可以响应的 Intents
- `<uses-permission>`：声明应用程序需要的权限，如访问互联网、读取设备状态等
- `<use-sdk>`：指定应用程序的最低和目标 SDK 版本
- `<meta-data>`：用于在组件内部定义元数据信息，供应用程序或其他组件使用
- `<activity-alias>`：声明活动的别名，用于为现有的活动定义其他入口点
- `<supports-screens>`：指定应用程序支持的屏幕尺寸和密度规范

### application

- `android:name`: 指定应用程序的名称
- `android:icon`: 指定应用程序的图标
- `android:label`: 指定应用程序的显示名称（标签）

以上配置表明应用程序在设备上的图标及其他配置，通常在应用程序列表、桌面和任务管理器中显示

### activity

- `android:name`: 指定活动的类名或全限定类名
- `android:label`: 指定活动的显示名称（标签）
- `android:icon`: 指定活动的图标
- `android:theme`: 指定活动的主题样式
- `android:launchMode`: 指定活动的启动模式，如标准模式，单例模式等
- `android:screenOrientation`: 指定活动的屏幕方向，如横向、纵向等
- `android:configChanges`: 指定活动在配置更改时需要处理的变化类型，如屏幕旋转、键盘可用性等

以上配置表明特定活动在应用程序内部的图标，通常在应用程序的标题栏、任务切换器和导航栏中显示

```xml
<activity
  android:name=".MainActivity"
  android:label="Main Activity"
  android:icon="@drawable/ic_launcher"
  android:theme="@style/AppTheme"
  <!-- 标准模式的启动模式 -->
  android:launchMode="standard"
  <!-- 屏幕方向为纵向 -->
  android:screenOrientation="portrait"
  <!-- 在屏幕旋转和键盘可用性发生变化时不重新创建活动 -->
  android:configChanges="orientation|keyboardHidden"
>
</activity>
```
