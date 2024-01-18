# mac 安装 go 语言配置 VsCode.md

## 1. 现在 go 安装包

https://golang.google.cn/dl/
xxx.pkg
直接下一步安装即可

## 2. 配置 go

```bash
go env -w GOPROXY=https://goproxy.cn,direct
```

go version

- GOPATH: 编写代码存放的目录
- GOROOT: Go 安装的路径
- 新建 go 的代码目录，下面建立`bin pkg src`
  - bin 存放编译后的可执行文件
  - pkg 存放编译后的包文件
  - src 存放项目源文件

## 3.配置环境变量

```sh
vim ~/.zshrc
export PATH=$PATH:/usr/local/go/bin
```

## 4. 在 vscode 中安装 Go 扩展插件

- `shift+command+p` 搜索
- `>Go: Insatall/Update Tools` 全选后确定

## 5. 输出 Hello world

```go
// main.go
package main
import (
  "fmt"
)
func main() {
  // ln => line
  fmt.Println("Hello World!")
}
```

## 6. 编译

编译与执行 go run main.go
go build main.go
