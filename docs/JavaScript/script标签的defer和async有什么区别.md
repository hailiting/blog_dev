# script 标签的 defer 和 async 有什么区别

- 无：HTML 暂停解析，下载 JS，执行 JS，再继续解析 HTML
- defer: HTML 继续解析，并行下载 JS，HTML 解析完再执行 js
- async: HTML 继续解析，并行下载 JS，执行 JS，再解析 HTML

- defer 和 async 有什么区别
  - defer 并行加载，先解析，后执行
  - script 不需要放 html 最后
- async
  - async 并行加载，加载结束就执行
