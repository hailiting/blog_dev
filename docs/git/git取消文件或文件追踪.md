# git取消文件或文件追踪

## 记录
2022.2.7 设置忽略追踪的一些文件
～～～sh
git update-index --assume-unchanged ./pubspec.yaml
git update-index --assume-unchanged ./android     
git update-index --assume-unchanged ./android/*
git update-index --assume-unchanged /Users/hailiting/Desktop/zg_work/merge/aplink-app-flutter/android/build.gradle
git update-index --assume-unchanged ./android/ 
git update-index --assume-unchanged /Users/hailiting/Desktop/zg_work/merge/aplink-app-flutter/android/settings.gradle
git update-index --assume-unchanged /Users/hailiting/Desktop/zg_work/merge/aplink-app-flutter/android/gradle/wrapper/gradle-6.7.1-bin.zip 
fatal: Unable to mark file android/gradle/wrapper/gradle-6.7.1-bin.zip
git update-index --assume-unchanged /Users/hailiting/Desktop/zg_work/merge/aplink-app-flutter/android/gradle/wrapper/gradle-wrapper.properties
git update-index --assume-unchanged /Users/hailiting/Desktop/zg_work/merge/aplink-app-flutter/lib/page/makedao/kverso_page.dart
～～～
恢复追踪
～～～sh
git update-index --no-assume-unchanged *
～～～