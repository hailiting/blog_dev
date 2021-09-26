# Vue 生命周期

## Vue2.0 生命周期

![Vue2life](./img/Vue2life.png)

```js
// 构造函数生成Vue实例
var app = new Vue({
  el: "#app",
  data: function() {
    return {
      rendered: false,
    };
  },
  // 事件和生命周期钩子初始化
  /// 实例初始化后，data observer和事件配置之前被调用
  beforeCreate: function() {
    console.log(this.rendered); // undefined
  },
  // init injections & reactivity
  // 初始化inject provide state属性
  /// data已初始化，计算属性、event/watch事件回调，但dom树并未挂载
  create: function() {
    console.log(this.$el); // undefined
    console.log(this.renderd); // false
  },
  // Has el option ? no -> when vm.$mount(el) is called 无则挂载
  // -> has template option 是否有模板
  // --> No Compile el's outerHTML as template  无则编译el对象外层html作为模板
  // -> 有则将模板转化为render函数，通过render函数去渲染创建dom树
  /// 在挂载前被调用render函数首次被调用生成虚拟dom
  beforeMount: function() {
    console.log(this.$el); // undefined
  },
  // Create vm.$el and replace "el" with it 创建vue实例下的$el(虚拟)并将其替换真正的dom
  /// 挂载完成，dom树已经完成渲染到页面，可进行dom操作
  mounted: function() {
    console.log(this.$el); // dom
  },
  // Mounted
  updated: function() {},
  // Virtual DOM re-render and patch
  beforeUpdate: function() {
    console.log(this.$el);
    console.log(this.rendered);
  },
  // when vm.$destory() is called
  // 实例销毁之前调用，在这还可以访问实例的数据
  beforeDestory: function() {},
  // 清除watcher、子组件事件监听器等
  // Destroyed
  destroyed: function() {
    // 只是解绑指令和移动事件监听，并没有删除dom，这期间还可以访问到vue实例
    console.log(this.$el);
    console.log(this.rendered);
  },
});
```

### data props computed watch methods 他们之间的生成顺序

props => methods => data => computed => watch

```js
export function initState(vm: Component) {
  vm._watchers = [];
  const opts = vm.$options;
  if (opts.props) initProps(vm, opts.props);
  if (opts.methods) initMethods(vm, opts.methods);
  if (opts.data) {
    initData(vm);
  } else {
    observe((vm._data = {}), true);
  }
  if (opts.computed) initComputed(vm, opts.computed);
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
```

## Vue3

Vue3 引入`Composition API`

- Vue3 Componsition API 附带着`setup()`方法。此方法封装了我们大多数组件代码，并处理了响应式，生命周期钩子函数

```js
// Vue2 Instance Options
data(){
  return {
    input: "",
    groceries: []
  }
},
methods: {
  addGrocery(){
    this.groceries.push(this.input);
    this.input ="";
  }
}


// Vue3 Composition API
let state = reactive({
  input: "",
  groceries: []
})
function addGrocery(){
  state.groceries.push(state.input);
  state.input = "";
}
return {state, addGrocery}
```

### 有 11 个旧的生命周期钩子，可以在`setup`中访问

- beforeCreate
- create
- onBeforeMount
- onMounted
- onUpdated
- onBeforeUnmount
- onUnmounted
- onActivated
- onDeactivated
- onErrorCaptured

```js
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from "vue";

export default {
  setup() {
    onBeforeMount(() => {
      // ...
    });
    onMounted(() => {
      // ...
    });
    onBeforeUpdate(() => {
      // ...
    });
    onUpdated(() => {
      // ...
    });
    onBeforeUnmount(() => {
      // ...
    });
    onUnmounted(() => {
      // ...
    });
    onActivated(() => {
      // ...
    });
    onDeactivated(() => {
      // ...
    });
    onErrorCaptured(() => {
      // ...
    });
  },
};
```

### Vue2 -> Vue3 生命周期的转换

- beforeCreate -> use setup()
- created -> use setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destoryed -> onUnmounted
- errorCaptured -> onErrorCaptured

### Vue3 新的函数钩子

- onRenderTracked
- onRenderTriggered

```js
export default {
  onRenderTriggered(e) {
    debugger;
    // 检查哪个依赖项导致组件重新呈现
  },
};
```
