# TypeScript

- JavaScrip 的超集
- 拥有类型机制

## tsc 的安装和使用

- 本地 `ts-node`
- 线上 `play-ground`
- 开发 `webpack(ts-loader)`

```sh
npm init -y
npm i -D typescript nodemon ts-node
npx tsc --init

npm install typescript -g

tsc -v
touch demo.ts && echo 'console.log("hello ts")' > demo.ts
tsc demo.ts && node demo.ts
tsc * # 将当前目录下的所有文件编译成同名的js文件

npm install ts-node -g
ts-node demo.ts
```
