# vscode 下改变 css 语法

webpack + postcss，postcss 可以对 css 文件直接进行处理，所以在 css 里写 scss 语法是可行的，为避免 vscode 报错，可设置 vscode 来避免。

## 方法

1. 按`CTRL + ,`，打开用户设置
2. setting.json

```
"files.associations":{
  "*.css": "scss"
}
```

## 常用的 vscode 功能

marketplace.visualstudio.com

- 图标 Material Icon Theme
- Code Runner -> 本地运行环境
- Settings Sync 同步
- Color Highlight
- TypeScript Extension Pack
