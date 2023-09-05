# maven 私服搭建

- 什么是 maven 私服
- maven 私服搭建的流程
- 项目如何接入 maven 私服

## maven 仓库

- 本地仓库
- 远程仓库
  - 中央仓库
    - mavenCenter
    - jCenter
  - 私服
    - 局域网
  - 其他公共库
    - 公网

### maven 私服优势

- 节省自己的外网带宽
- 加速构建过程
- 部署第三方构件(缓存的作用)
- 提高稳定性，增强控制
- 降低中央仓库的负荷

## nexus

### nexus 需要 Java 版本是 1.8

### 配置 nexus

- [下载 Nexus](!https://www.sonatype.com/products/sonatype-nexus-oss)
- 安装 Maven Nexus：解压下载的文件，并将其放置在你选择的目录中
- 配置 Nexus: 打开终端应用程序，进入 nexus 解压目录，执行以下命令启动 nexus

```bash
# /Users/admin/nexus-3.59.0-01-mac/nexus-3.59.0-01/bin/nexus run
/Users/admin/nexus-3.59.0-01-mac/nexus-3.59.0-01/bin/nexus start
```

#### [打开浏览器](!http://localhost:8081/)

```
admin
Your admin user password is located in
/Users/admin/nexus-3.59.0-01-mac/sonatype-work/nexus3/admin.password on the server.
```

setting -> Repositories -> create repository -> maven2(hosted) ->name && version policy(release) 创建成功

## Maven 私服接入

`gradle`:

- 根目录的 `build.gradle`称为`项目级别的build.gradle`或`项目build.gradle`
- app 模块下的`build.gradle`文件可以称为`模块级别的build.gradle`或`应用build.gradle`

1. 项目 settings.gradle
   指定 maven 仓库的地址

```groovy
pluginManagement {
  repositories {
    maven {
      url "http://localhost:8081/repository/imooc_snapshots/"
      // 设置账号密码
      credentials{
          "admin"
          "12345678"
      }
    }
  }
}
```

2. 在要使用私有库的 app 模块 build.gradle 文件里，添加仓库和依赖项

```groovy
dependencies {
  // com.example:mylibrary:1.0.0 为私有仓库的实际坐标
  implementation "com.example:mylibrary:1.0.0"
}
```

3. 设置 gradle.properties
   定义脚本需要用到的常量

```groovy
NEXUS_REPOSITORY_URL=http://localhost:8081/repository/imooc-snapshots/
POM_GROUPID=com.imooc.android
POM_PACKAGING=aar
NEXUS_USERNAME=admin
NEXUS_PASSWORD=12345678
```

4. 在 library 里上传
   添加 Maven 发布插件的配置，确保引入 maven 插件和配置发布任务

```groovy
...
apply plugin: "maven"

def pomName = this.getName()
def pomVersion = "1.0.0-SNAPSHOT"
def pomDescription = "the audio library for all projects"
uploadArchives {
  repositories {
    mavenDeployer {
      resporitory(url: NEXUS_REPOSITORY_URL){
        authentication(username: NEXUS_USERNAME, password: NEXUS_PASSWORD)
      }
      pom.project {
        name pomName
        version pomVersion
        description pomDescription
        artifactId pomVersion
        groupId POM_GROUPID
        packaging POM_PACKAGING
      }
    }
  }
}
```
