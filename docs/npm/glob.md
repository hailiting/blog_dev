# glob

glob 是 shell 使用路径通配符，类似于正则表达式，但与正则表达式不完全相同。

## 语法和使用

- `*`:匹配一个路径部分中 0 或多个字符，注意不匹配以`.`开始路径，比如`.a`
- `**`: 匹配 0 个或多个子文件夹
- `?`: 匹配一个字符
- `{a,b}`: 匹配 a 或 b，a 和 b 也是通配符，可以由其他通配符组成
- `!`: 排除文件

## 实例

基于 node 的 gulp 时遇到 glob 匹配文件路径

```js
glob("js/*.js", function (er, files) {
  console.log(files);
});
```

`.gitignore`中遇到 glob 匹配文件路径

```bash
# 此为注释
*.a # 忽略所有.a结尾的文件
!lib.a # lib.a 除外
/dist  # 忽略根目录下的dist文件，但不包括 src/dist
build、 # 忽略所有文件夹为build的文件【包括子目录】
doc/*.txt  # 忽略doc/*.txt所有文件，但不包括 doc/src/*.txt
```
