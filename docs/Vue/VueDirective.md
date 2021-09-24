# Vue 自定义指令

## directive 生命周期

```html
<body>
  <div id="app">
    <input v-focus />
  </div>
  <script type="text/javascript">
    Vue.directive("focus", {
      bind: function(el, binding, vnode) {
        // 做绑定的准备工作
        // 比如添加事件监听器，或其他只需要执行一次的复杂操作
      },
      inserted: function(el) {
        // 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）
        el.focus();
      },
      update: function() {
        // 根据获得的新值执行对应的更新
        // 对于初始值也会调用一次
      },
      componentUpdated: function() {
        // 被绑定元素所在模板完成一次更新周期时调用
      },
      unbind: function() {
        // 做清理操作
        // 比如移除bind时绑定的事件的监听器
      },
    });
    var app = new Vue({
      el: "#app",
    });
  </script>
</body>
```

### binding

- `binding.name`：名称，不包括`v-`前缀
- `binding.value`：的绑定值，例如: `v-my-directive="1+1"`, `value`的值是 2
- `binding.oldValue`：绑定的前一个值，仅在`update`和`componentUpdated`钩子中可用。无论值是否改变都可用
- `binding.expression`: 绑定值的字符串形式，例如：`v-my-directive="1+1"`, expression 的值是"1+1"
- `binding.arg`: 传给指令的参数，例如`v-my-directive:foo`, arg 的值是"foo"
- `binding.modifiers`: 一个包含修饰符的对象。例如：`v-my-directive.foo.bar`，修饰符对象`modifiers`的值就是`{foo: true, bar: true}`
