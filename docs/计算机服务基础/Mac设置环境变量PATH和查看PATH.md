# Mac设置环境变量PATH和查看PATH
## 前置科普
### Mac系统的环境变量地址：
#### 系统级别的
``/etc/profile``, ``/etc/paths``
系统启动就会加载
#### 当前用户级别的
``~/.bash_profile``, ``~/.bash_login``, ``~/.profile``,``~/.bashrc``
如果``~/.bash_profile``存在，后面几个就会被忽略【``~/.bashrc``没有上述规则】
### PATH语法
~~~
export PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:---:<PATh N>

修改完  source ~/.bash_profile 刷新环境变量
// eg
export PATH="/Users/username/.npm-global/bin:$PATH"
export ANDROID_HOME=/Users/username/Library/Android/sdk
export PATH=$PATH:/Users/username/Library/Android/sdk/emulator
export PATH=$PATH:/usr/local/mysql/bin
export NVM_DIR="$HOME/.nvm"
export JAVA_HOME=$(/usr/libexec/java_home)
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
export PATH="/Users/username/flutter/bin:$PATH"
export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
~~~
## 常用命令
- 查看已经存在的环境变量
``export``
- 查看当前用户的环境变量
``echo $PATH``
