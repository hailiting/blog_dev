# 卸载和安装 nodejs

## 卸载 npm 和 node.js

- 先卸载 npm, `sudo npm uninstall npm -g`
- 然后卸载 Nodejs `rm -r bin/node bin/node-waf include/node lib/node lib/pkgconfig/nodejs.pc share/man/man1/node.1`
- brew 安装的话`brew uninstall node@12`

## 安装

### 用 brew 安装

`brew install node@12`
`brew link node@12`
