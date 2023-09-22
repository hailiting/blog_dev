# Android 常用组件

## LinearLayout 线性布局

线性布局是一种按水平或垂直方向排列子视图的布局方式。可以通过设置权重（weight）属性来调整子视图的占用空间比例

```xml
<LinearLayout
  android:layout_width="match_parent"
  android:layout_height="wrap_content"
  android:orientation="vertical"
>
  <TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Hello" />
  <Button
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    />
</LinearLayout>
```

## RelativeLayout 相对布局

相对布局可以通过相对于其他视图的位置来排列子视图的布局方式。可以使用各种规则（如：alignParentTop、alignParentLeft、above、below 等）来定义子视图之间的相对关系

```xml
<RelativeLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello"
        android:layout_alignParentTop="true"
        android:layout_alignParentLeft="true" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Click Me"
        android:layout_below="@id/textView1"
        android:layout_alignParentRight="true" />

</RelativeLayout>
```

## FrameLayout 帧布局

帧布局是一种将子视图叠放在同一个位置上的布局方式。每个子视图可以使用 layout_gravity 属性来指定在父视图中的位置。

```xml
<FrameLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:src="@drawable/image" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Click Me"
        android:layout_gravity="center" />

</FrameLayout>
```

## GridLayout 网格布局

网格布局是一种将子视图按照网格形式排列的布局方式。可以通过设置行数、列数以及子视图的位置来实现灵活的布局。

```xml
<GridLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:rowCount="2"
    android:columnCount="2">

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Button 1"
        android:layout_columnWeight="1"
        android:layout_row="0"
        android:layout_column="0" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Button 2"
        android:layout_columnWeight="1"
        android:layout_row="0"
        android:layout_column="1" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Button 3"
        android:layout_columnWeight="1"
        android:layout_row="1"
        android:layout_column="0" />

    <Button
        android:layout_width="wrap_content"
        android:layout_columnWeight="1"
        android:layout_height="wrap_content"
        android:text="Button 4"
        android:layout_row="1"
        android:layout_column="1" />

</GridLayout>
```

## TableLayout 表格布局

表格布局是一种将子视图按照表格形式进行排列的布局方式。可以通过添加行和列来组织子视图的位置。

```xml
<TableLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <TableRow>
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Name:" />

        <EditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />
    </TableRow>

    <TableRow>
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Email:" />

        <EditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />
    </TableRow>

</TableLayout>
```

## ConstraintLayout 约束布局

约束布局是一种相对定位的布局方式，可以通过定义视图之间的约束关系来实现灵活的布局。它可以减少布局层次的复杂性，并且适用于各种屏幕尺寸和方向

```xml
<!-- 没实现 -->
<ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <TextView
        android:id="@+id/textView1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Click Me"
        app:layout_constraintTop_toBottomOf="@id/textView1"
        app:layout_constraintEnd_toEndOf="parent" />

</ConstraintLayout>
```

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
