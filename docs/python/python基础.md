# python 基础

## 下载 MAC

```shell
https://www.python.org/downloads/macos/
```

1. 查看操作系统类型

- `uname -a`

2. 查看安装路径

- `which python3`

```shell
# 1. 添加环境变量
# .zshrc
export PATH="/Library/Frameworks/Python.framework/Versions/3.8/bin:${PATH}"
alias python="/Library/Frameworks/Python.framework/Versions/3.8/bin/python3"
alias pip="/Library/Frameworks/Python.framework/Versions/3.8/bin/pip3"
# 2. python (原来叫python)
```
