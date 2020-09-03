# React组件开发 
## 完成一个组件库需要考虑的问题
* 代码结构
* 组件需求分析和编码
* 样式解决方案
* 组件测试用例分析和编码
* 代码打包输出和发布
* CI/CD，文档生成等
### 由简入繁，化繁为简
### 代码结构
~~~file
viking/
  README.md
  node_modules/
  package.json
  tsconfig.json
  src/
    components/
      Button/ 【帕斯卡命名方式】
        button.tsx
        button.test.tsx
        styles.scss
    styles/
    ...
    index.tsx
~~~
### 启动`eslink`配置文件
~~~json
// .vscode/settings.json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
      "autoFix": true
    }
  ]
}
~~~

