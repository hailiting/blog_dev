# co

异步控制
把函数全部自动向下执行 next->next->done

## 实例

```js
co(function*() {
  var result = yield Promise.resolve(true);
  return result;
}).then(
  function(value) {
    console.log(value);
  },
  function(err) {
    console.log(err.stack);
  }
);
```

## 如果想把一个`co-generator-function`转成真实的`function`并返回一个`promise`可以使用`co.wrap(fn*)`

```js
var fn = co.wrap(function*(val) {
  return yield Promise.resolve(val);
});
fn(true)
  .then(function(val) {})
  .catch(onerror);
function onerror(err) {
  console.log(err.stack);
}
```

在 koa2 中做`koa-swig`封装的做法

```js
import koa from "koa";
import render from "koa-swig";
import path from "path";
import co from "co";
const app = new koa();
app.context.render = co.wrap(
  render({
    root: path.join(__dirname, "../views"),
    autoescape: true,
    cache: "memory",
    ext: "html",
    varControls: ["[[", "]]"],
    writeBody: false,
  })
);
app.use(...)
app.listen(3000, ()=>{
  console.log(`app is listening on 3000`);
})
```
