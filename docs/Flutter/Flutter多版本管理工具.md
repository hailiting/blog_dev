# Flutter 多版本管理工具 - fvm

- 添加 homebrew tap

```shell
brew tap xinfeng-tech/fvm
```

- 安装 fvm

```shell
$ brew install fvm
$ vim .bash_profile
export PUB_HOSTED_URL=http://mirrors.cnnic.cn/dart-pub
export FLUTTER_STORAGE_BASE_URL=http://mirrors.cnnic.cn/flutter 
export FVM_DIR="$HOME/.fvm"
$ cd /usr/local/opt/fvm
$ sh init.sh
```

## 如何使用呢？

- 安装 Flutter 某个版本，如：1.22.4
  `fvm install 1.22.4`

- 使用 Flutter 某个版本，如：1.22.4
  `fvm use 1.22.4`

- 查看本地已安装的 Flutter 版本
  `fvm list`
- 需要切到你要设置项目的根目录,然后执行如下命令并指定你所想要设置的 Flutter 版本
  `fvm use 1.22.4 --local`

## 卸载

`brew untap befovy/taps`
