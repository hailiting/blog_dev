# input 标签

## multiple 属性

适用于 input type 为 email 和 file 的属性
可接受多个值的文件上传字段

### 定义和用法

- multiple 属性规定输入字段可选择多个值
- 如果使用该属性，则字段可接受多个值

```html
<form action="demo_form.asp" method="get">
  select images: <input type="file" name="img" multiple="multiple" />
  <input type="submit" />
</form>
```

## accept 属性

tips: 最好在服务器端验证文件的上传
在文件上传中使用 accept 属性设置可以接收的文件类型，如果不限制图像格式，可以写 accept="image/\*"

```html
<form>
  <input type="file" name="pic" accept="image/gif, image/jpeg" />
</form>
```
