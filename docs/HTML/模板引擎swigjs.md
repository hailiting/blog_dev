# 模板引擎 swigjs

swig 是 JS 模板引擎，它有如下特点

- 根据路径渲染页面
- 面对对象的模板继承，页面复用
- 动态页面
- 快速上手
- 功能强大

## swig 的使用

### swig 的变量

```html
{{foo.bar}} {{foo["bar"]}}
```

### swig 的标签

#### extends

使用当前模板继承父模板，必须在文件的最前面，参数：file。

```js
// index.html
{% extends "./layout.html" %}
...
```

#### block

定义一个块，使之可以被继承的模板重写，或重写父模板的同名块，参数：name 块的名字，必须以 字母、数字、下划线开头。

```js
//layout.html
<!DOCTYPE html>
<html>
  <body>
    {% block content %}this is layout{% endblock %}
  </body>
</html>

// index.html
{% extends "./layout.html" %}
{% block content %} this is index
{% endblock %}
```

#### parent

将父模板中同名块注入当前块中

```js
//layout.html
<!DOCTYPE html>
<html>
  <body>
    {% block content %}this is layout{% endblock %}
  </body>
</html>

// index.html
{% extends "./layout.html" %}
{% block content %}
{% parent %}
<!-- 这里会渲染 this is layout -->
{% endblock %}
```

#### include

包含一个模板到当前位置，这个模板将使用当前上下文，参数：file。
包含模板相对模板 root 的相对路径

```js
{% include "a.html" %}
{% include "template.js" %}
```

#### raw

停止解析标记中任何内容，所有内容都将输出，参数 file

```js
{% extends "./layout.html" %}
<code data-language="js">
{% raw %}
var swig = require("swig");
...
{% endraw %}
</code>
```

#### for

遍历对象和数组，参数 x 当前循环迭代名

```js
// in 语法标记， y: 可迭代对象
{% for x in y %}
<p>{{x}}</p>
{% endfor %}
```

#### if

条件语句，可接受任何有效 Javascript 条件语句

```js
{% if foo %}
  <p>foo is true</p>
{% else if "foo" in bar %}
  <p>foo in bar</p>
{% else %}
  <p>fail</p>
{% endif %}
```

#### autoescape

改变当前变量的自定义转义行为，参数：on.
当前内容是否转义 type: 转义类型，js 或 html，默认 html

```js
input = '<p>Hello "you" & \'them\'</p>';
{% autoescape false %}
  {{input}} // <p>Hello "you" & 'them'</p>
{% endautoescape %}
{% autoescape true %}
{{input}} //&lt;p&gt;Hello &quot;you&quot; &amp; &#39;them&#39; &lt;/p&gt
{% autoescape true "js" %} //  // \u003Cp\u003EHello \u0022you\u0022 & \u0027them\u0027\u003C\u005Cp\u003E
{%  %}
```

#### set

设置一个变量，在当前上下文中复用

```js
{% set foo = [0,1,2,3,4,5] %}
{% for num in foo %}
  <li>{{num}}</li>
{% endfor %}
```

## 常用模板

```js
//layout.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>{% block title %}My Site{% endblock %}</title>

    {% block head %} {% endblock %}
  </head>
  <body>
    {% block content %}{% endblock %}
  </body>
</html>
//index.html
{% extends './layout.html' %}
{% block title %}My Page{% endblock %}
{% block head %}
{% parent %}
{% endblock %}
{% block content %}
    <p>This is just an awesome page.</p>
    <h1>hello,lego.</h1>
    <script>
        //require('pages/index/main');
    </script>
{% endblock %}
```
