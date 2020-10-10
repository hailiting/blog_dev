# 使用`scripty`剥离`npm-script`

常规启动 node 项目的方法是在`package.json`里的`script`添加命令，如下：

```json
  "scripts": {
    "test:dev": "node index.js --mode=develop",
    "test": "",
    "start": "pm2 start",
    "build": "",
    "server:dev": "gulp",
    "server:prod": "cross-env NODE_ENV=production gulp",
    "server:lint": "cross-env NODE_ENV=lint gulp",
    "client:dev": "webpack --mode=development",
    "client:prod": "webpack --mode=production",
    "docs": "jsdoc ./src/nodeuii/**/*.js -d ./docs/jsdocs",
  },
```

像`start:dev`，随着项目复杂度的上升，script 命令让人眼花缭乱。
`scripty`的目的就是净化`package.json`里的`script`，用独立的文件去定义方法。

## 具体用法

```json
npm i scripty --save-dev

// package.json
"script": {
  "client:dev": "scripty",
  "client:prod": "scripty",
  "client:server": "scripty",
  "client:test": "scripty",
}

// mac  项目的根目录创建 scripts/client文件夹，在client文件夹里分别创建 `dev.sh`, `prod.sh`,`server.sh`,`test.sh`脚本

// 在Windows环境下创建scripts-win目录，将.sh文件改为.bat文件，其余同上

// dev.sh
webpack --mode development



├── scripts
│   └── client
│       ├── dev.sh
│       ├── lint.sh
│       └── prod.sh
```
