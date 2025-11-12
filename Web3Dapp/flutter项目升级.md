# flutter项目升级问题

~~~sh
# 升级 Flutter SDK
flutter upgrade --version 3.24.5
# 检查项目兼容性
flutter analyze    
# 更新依赖库版本
flutter pub upgrade

flutter clean
flutter pub get
flutter build apk
~~~ 

## 升级java 与jdk
~~~sh
# 验证 Gradle 是否使用新版本 Java
./gradlew --version 
# . 升级 Gradle（可选）
# 修改 android/gradle/wrapper/gradle-wrapper.properties 中的 distributionUrl
distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-all.zip
# 重新构建项目
./gradlew wrapper --gradle-version 8.4
~~~


### 使用本地缓存 gradle
~~~sh
# 创建目标目录（如果不存在）：
   mkdir -p ~/.gradle/wrapper/dists/gradle-8.4-all/6e732g92d0fjkb95h0b92ivbp
# 将你的 gradle-8.4-all.zip 复制进去：
   cp ~/Downloads/gradle-8.4-all.zip ~/.gradle/wrapper/dists/gradle-8.4-all/6e732g92d0fjkb95h0b92ivbp/
# 修改 gradle-wrapper.properties 为标准远程 URL（Gradle 会自动识别本地缓存）
   distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-all.zip
~~~

手动复制 cacerts 文件（临时修复）

~~~bash
# 找到任意一个完整 JDK 的 cacerts 文件，
   /Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home/lib/security/cacerts
#    复制到你的 Liberica JRE 中：
      cp /path/to/cacerts /Users/hailiting/.asdf/installs/java/liberica-1.8.0/jre/lib/security/
    #   设置权限（可选）：
    chmod 644 /Users/hailiting/.asdf/installs/java/liberica-1.8.0/jre/lib/security/cacerts
~~~