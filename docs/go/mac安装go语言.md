# mac 安装 go 语言

## 1. 现在 go 安装包

去 go 语言中文网https://studygolang.com/dl
下载相应安装包
go1.14.4.darwin-amd64.pkg
直接下一步安装即可

## 2. 配置 go path

```bash
go env
```

- GOPATH: 编写代码存放的目录
- GOROOT: Go 安装的路径
- 新建 go 的代码目录，下面建立`bin pkg src`
  - bin 存放编译后的可执行文件
  - pkg 存放编译后的包文件
  - src 存放项目源文件

## 3. 如果没有环境变量则`export GOPATH="/User/aaa/go"`
