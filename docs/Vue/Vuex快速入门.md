# Vuex 快速入门

## vue

双向数据绑定

## Vuex 理论介绍

**Vuex 真正管理的是 vue 里的 data**

- 1. Vuex 是一个专门为 Vuejs 应用程序开发的状态管理模式。
  - 它采用集中式存储管理应用的所有组件状态，并以相应的规则保证状态一种可预测的方式发生变化。Vuex 也集成到 devtools
- 2. 不开发大型单页应用，尽量不要用 Vuex
- 3. 解决的核心问题：多个视图依赖于同一状态。来自不同视图的行为需要变更同一状态

## Vuex 核心概念

- state 驱动应用的数据源
- view 以声明方式将 state 映射到视图
- actions 响应在 view 上的用户输入导致的状态变化

### Vuex 的不同

1. Vuex 的状态存储是响应式的，当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新
2. 你不能直接改变 store 中的状态，改变 store 中的状态的唯一途径就是显式地提交 mutaions。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好的了解我们的应用

```js
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, done: true },
      { id: 2, done: false },
    ],
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  getters: {
    doneTodos: (state) => {
      return states.todos.filter((todo) => todo.done);
    },
  },
});
store.commit("increment");
console.log(store.state.count);

// computed: {
//   doneTodosCount(){
//     return this.$store.getters.doneTodos
//   }
// }

// computed: {
//   ...mapGetters([
//     "doneTodosCount"
//   ])
// }
```

```js
import { mapState } from "vuex";
export default {
  computed: mapState({
    count: (state) => state.count,
    countAlias: "count",
    countPlusLocalState(state) {
      // 对共用的count与本地的count进行扩展
      return state.count + this.localCount;
    },
  }),
  // mapState({count}) 扩展函数符
};
```

### Mutations

- 更改 Vuex 的 store 中的状态的唯一方法是 mutation
- mutations 就是 vue methods
- 每个 mutation 都有一个字符串的事件类型（type）和一个回调函数（handler）
- 使用常量替代 Mutation 事件类型
- mutation 必须是同步函数 异步回调，提交 Mutation,action 里

```js
// mutation-types.js
export const SOME_MUTATION = "some_mutation";
// store.js
import {SOME_MUTATION} from "./mutation-types";

const store = new Vuex.Store({
  state: {...},
  mutations: {
    [SOME_MUTATION](state){
      // mutate state
    }
  }
})



import {mapMutations} from "vuex";
import {SOME_MUTATION} from "./mutation-types";
export default {
  methods: {
    test(){
      this.$store.commit(SOME_MUTATION)
    },
    ...mapMutations([
      "SOME_MUTATION"
      // 映射 this.increment() 为 this.$store.commit("SOME_MUTATION")
    ])
  }
}
```

### Actions

- Action 提交的是 mutation
- Action 可以包含任意异步操作
- mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
- view->store.dispatch("increment");
- action -> commit("someMutation")

```js
actions: {
  async actionA({commit}){
    commit("gotData", await getData())
  },
  async actionB({dispatch, commit}){
    await dispatch("actionA") // 等待A完成
    commit("gotOtherData", await getOtherData())
  }
}
```

### Modules

- Vuex 运行我们将 store 分割到模块（module）.每个模块拥有自己的 state, mutation, action, getters,甚至是嵌套子模块--从上至下进行类似的分割
- store 创建之后，你可以使用 store.registerModule 方法去注册

```js
const moduleA = {
  state: {...},
  mutations: {...},
  actions: {...},
  geters: {...}
}
const moduleB = {
  state: {...},
  mutations: {...},
  actions: {...},
  geters: {...}
}
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB,
  }
})
store.state.a // moduleA 的状态
store.state.b // moduleB 的状态
```

### plugin

Vuex hook

- Vuex 的 store 接收 plugins 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，他接收 store 做为唯一参数
- 在插件中不允许直接修改状态-->只能通过 mutation
- 自定义的状态快照

```js
const myPlugin = (store) => {
  // 当store初始化后调用
  // 消息订阅者  $.on $.off $.child
  store.subscribe((mutation, state) => {
    // 每次mutaion之后调用
    // mutation的格式为{type, payload}
  });
};
const store = new Vuex.Store({
  plugins: [myPlugin],
});
```

### 测试 Actions 演示

测试 Actions 需要增加一个 mocking 服务层，测试文件中用 mock 服务回应 API 调用。为便于 mock 依赖，可以用 webpack 和 inject-loader 打包测试文件

```js
import { expect } from "chai";
const actionsInjector = require("inject!./actions");
// 使用mocks创建模块
const actions = actionsInjector({
  "../api/shop": {
    getProducts(cb) {
      setTimeout(() => {
        cb([
          // mocked response
        ]);
      }, 1000);
    },
  },
});
```

## Vuex 搭载`vue-resource`和`vue-router` `vuex-router-sync`

- vue 视图
- vuex 数据源
- vue-router 路由
- vuex-router-sync vuex 和 router 链接起来

```js
import { sync } from "vuex-router-sync";
import store from "./vuex/store";
import router from "./router";
sync(store, router);
// 当前path string
this.$store.state.route.path;
// 当前参数
this.$store.state.route.params;
// 当前query
this.$store.state.route.query;
```

## Vue2+webpack2+koa2 构建大型应用
