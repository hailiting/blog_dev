# bit 尝试

## 1. 在[bit.dev](https://bit.dev/)中申请账户

## 2. 下载 shell

```shell
npm install bit-bin --global
# or
brew install bit
```

## 3. cd 文件夹

### 初始化项目

```shell
cd project_directory
bit init # 初始化bit项目
bit login
```

### 跟踪组件

```
bit add src/utils/*  跟踪src/utils目录下的所有组件
bit status
```

### 设置组件版本

```
bit tag --all 1.0.0
```

### 导出/发布组件

```
bit export user_name.collextion_name
bit export zgtest.bitdemo
```
