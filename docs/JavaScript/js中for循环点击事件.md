# js 中 for 循环点击事件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
    <script>
      // for循环
      var list_li = document.getElementsByTagName("li");
      // 01
      for (var i = 0; i < list_li.length; i++) {
        (function (i) {
          list_li[i].onclick = function () {
            console.log(i + 1);
          };
        })(i);
      }
      // 02
      for (let i = 0; i < list_li.length; i++) {
        list_li[i].onclick = function () {
          console.log(i + 1);
        };
      }
      // 03
      for (var i = 0; i < list_li.length; i++) {
        list_li[i].onclick = function () {
          console.log(this.innerHTML);
        };
      }
      // 04
      for (var i = 0; i < list_li.length; i++) {
        //为当前数组项(当前p对象)添加一个名为i的属性，值为循环体i变量的值
        //此时当前p对象的i属性并不是对循环体的i变量的引用，而是一个独立p对象的属性，属性值在声明的时候就确定了
        list_li[i].i = i;
        list_li[i].onclick = function () {
          console.log(this.i + 1);
        };
      }
      // 05 增加若干个对应的闭包域空间用来存储下标。新增的匿名闭包空间内完成事件绑定。
      for (var i = 0; i < list_li.length; i++) {
        list_li[i].onclick = (function (arg) {
          return function () {
            console.log(arg);
          };
        })(i + 1);
      }
    </script>
  </body>
</html>
```
