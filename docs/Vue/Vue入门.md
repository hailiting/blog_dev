# Vue 入门

## Vue1.0

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue</title>
    <link
      href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.min.js"></script>
  </head>
  <body>
    <div id="app">
      <!-- v-on:submit.prevent -->
      <!-- @submit.prevent -->
      <form action="index.php" method="get" v-on:submit="submitMyForm">
        <p v-show="!message">**enter warn**</p>
        <input type="text" name="" v-model="message" />
        <p>{{message}}</p>
        <input type="submit" value="提交" />
        <input type="button" @click="changeMessage" value="click" />
      </form>
      <!-- <pre>{{$data | json}}</pre> -->
      <!-- 组件 -->
      <!-- // 想要驼峰，可以webpack或gulp安装 decamelize 进行配置 // -->
      <praise-app-compent title="👍🏻" pclass="btn btn-info"></praise-app-compent>
      <praise-app-compent
        title="踩"
        pclass="btn btn-danger"
      ></praise-app-compent>
      <template id="praise-template">
        <h3>{{title}}</h3>
        <input
          class="{{pclass}}"
          type="button"
          value="{{count}}"
          name=""
          @click="updateCount"
        />
      </template>
      <!-- 计算 -->
      <p>{{level}}</p>
    </div>
    <script type="text/javascript">
      new Vue({
        el: "#app",
        data: {
          message: "",
          score: 90,
        },
        computed: {
          level: function() {
            console.log(111);
            if (this.score >= 90) {
              return "good";
            }
            return "just so so";
          },
        },
        methods: {
          submitMyForm: function(e) {
            e.preventDefault();
            // 不以表单方式提交，而以自己的方式【ajax请求】
            console.log("submit" + e);
          },
          changeMessage: function() {
            console.log(222);
            this.message += "ddddd";
          },
        },
      });

      Vue.component("praise-app-compent", {
        props: ["title", "pclass"],
        template: "#praise-template",
        data: function() {
          return {
            count: 0,
          };
        },

        methods: {
          updateCount: function() {
            this.count++;
          },
        },
      });
    </script>
  </body>
</html>
```

### Vue 列表渲染

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue</title>
    <style>
      .done {
        text-decoration: line-through;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.min.js"></script>
  </head>
  <body>
    <div id="app">
      <task_template :tasks="tasks"></task_template>
    </div>
    <template id="task-template">
      <span>还剩被选中{{remain}}</span>
      <ul>
        <li
          @click="dontSelect(task)"
          :class="{'done': task.completed}"
          v-for="task in tasks"
        >
          {{task.content}}
          <span @click="removeTasks(task)">👆🏻</span>
        </li>
      </ul>
    </template>
    <script type="text/javascript">
      Vue.component("task_template", {
        template: "#task-template",
        props: ["tasks"],
        methods: {
          dontSelect: function(task) {
            task.completed = !task.completed;
          },
          removeTasks: function(task) {
            // $remove 对原始的data源删除
            this.tasks.$remove(task);
          },
        },
        computed: {
          remain: function() {
            return this.tasks.filter(function(task) {
              return !task.completed;
            }).length;
          },
        },
      });
      new Vue({
        el: "#app",
        data: {
          tasks: [
            {
              content: "看电影",
              completed: false,
            },
            {
              content: "打篮球",
              completed: false,
            },
            {
              content: "敲代码",
              completed: false,
            },
          ],
        },
      });
    </script>
  </body>
</html>
```

### Vue 异步获取数据

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.min.js"></script>
    <script src="https://cdn.jsdelivr.net/vue.resource/1.0.3/vue-resource.min.js"></script>
  </head>
  <body>
    <div id="app">
      <ul>
        <li v-for="item in list">{{item.name}} {{item.gender}}</li>
      </ul>
    </div>

    <script type="text/javascript">
      new Vue({
        el: "#app",
        data: {
          list: [],
        },
        ready: function() {
          var me = this;
          console.log(this.$http);
          this.$http.get("http://localhost/api/v2/user.php").then(
            (response) => {
              me.list = response.body.member;
            },
            (response) => {
              // error callback
            }
          );
        },
        // vue-async-data   异步开发
        asyncData: function(resolve, reject) {
          setTimeout(function() {
            // 这会调用`vm.$set("msg", "h1")`
            resolve({
              msg: "sss",
            });
          }, 2000);
        },
      });
    </script>
  </body>
</html>
```

## Vue 2.0

- 1. 1.0 的 ready 钩子函数被废弃了，而是用 mounted 替换，同时还增加了 beforeMount,beforeUpdate, updated 等
- 2. 同时废弃了 events, $dispatch, $broadcast, 官方推荐使用 vuex 或全局事件驱动
- 3. v-ref, v-el 废弃，统一使用 ref 属性为元素或组件增加标记，然后通过 `this.$refs` 获取
- 4. $els 也废弃，用$refs 代替
- 5. v-for 循环中常用的$index、$key 也不支持了，trackby 被 key 属性替换
- 6. 自定义组件中的 partial 弃用
- 7. 新增`v-once`指令
- 8. 新增 propsData
- 9. 新增 render

```js
// propsData
var Comp = Vue.extend({
  props: ["msg"],
  template: "<div>{{msg}}</div>",
});
var vm = new Comp({
  propsData: {
    msg: "hello",
  },
});
```

```js
// render
Vue.component("anchored-heading", {
  render: function(createElement) {
    return createElement("h" + this.level, this.$slots.default);
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
});
```
