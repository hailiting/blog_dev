# Android 常用权限和使用说明

## 日历

- 读日历`android.permission.READ_CALENDAR`权限定义：

  - `android.permission.READ_CALENDAR`：允许应用获取用户日历数据
  - `android.permission.WRITE_CALENDAR`: 允许应用编辑用户日历数据

    - 日历的读写操作，在日历应用中可以查看对应的日程

```xml
<!-- 删除日历权限 -->
<uses-permission android:name="android.permission.WRITE_CALENDAR" tools:node="remove"/>
<uses-permission android:name="android.permission.READ_CALENDAR" tools:node="remove"/>
```
