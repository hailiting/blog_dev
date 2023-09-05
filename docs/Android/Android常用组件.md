# Android 常用组件

## DrawerLayout

- DrawerLayout 是 Android 应用开发中的一个组件，用于提供从屏幕左侧或右侧滑入的导航抽屉。
- 是 Android 支持库的一部分，通常与 ActionBar 或 Toolbar 一起使用

```xml
<androidx.drawerlayout.widget.DrawerLayout
  xmlns:android="http://schemas.android.com/apk/res/android"
  android:id="@+id/drawer_layout"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
>
  <LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
  >
  </LinearLayout>
  <!-- 导航抽屉 -->
  <LinearLayout
    android:id="@+id/drawer"
    android:layout_width="240dp"
    android:layout_height="match_parent"
    android:layout_gravity="start" // 指抽屉应该从左侧滑入，end 为从右侧滑入
    android:background="@android:color/white"
  >
    <!-- 抽屉内容 -->
  </LinearLayout>
</androidx.drawerlayout.widget.DrawerLayout>
```

## RelativeLayout

RelativeLayout 是一种相对定位布局，允许你在视图之间建立相对关系，使得视图可以根据其他视图位置进行定位。

## MagicIndicator

MagicIndicator 是一个用于实现各种指示器效果的开源库，常用于 Android 应用的导航栏，ViewPager 指示器等场景

### 1. 在项目级`settings.gradle`文件中添加

```groovy
dependencyResolutionManagement {
  repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
  repositories {
    maven {url: "https://jitpack.io"}
  }
}
```

### 2. 在模块的 build.gradle 中添加 MagicIndicator 的依赖项

lastest-version 可以在 github 仓库看

```groovy
dependencies {
  implementation "com.github.hackware1993:MagicIndicator:{lastest-version}"
}
```

### 3. 在模块的 build.gradle 文件中，将 Android 块中的 compileSdkVersion, buildToolsVersion 和 targetSdkVersion 更新为适合的版本

```groovy
android {
  ...
  compileSdkVersion 32
  buildToolsVersion "32.0.0"
  targetSdkVersion 32
}
```
