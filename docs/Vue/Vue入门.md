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
