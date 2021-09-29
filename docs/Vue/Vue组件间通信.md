# Vue 组件间通信

- bus
- props
- inject provide

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.staticfile.org/vue/2.5.17-beta.0/vue.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript">
      var bus = new Vue();
      Vue.component("child01", {
        inject: ["for"],
        data() {
          return {
            mymessage: this.message,
            mymessage02: this.for,
          };
        },
        created: function() {
          // bus.$emit("globalEvent", val);
        },
        updated: function() {
          // console.log(this.message);
          // bus.$emit("globalEvent", this.message);
        },
        mounted: function() {
          bus.$emit("globalEvent", this.message);
        },
        methods: {
          passData(val) {
            bus.$emit("globalEvent", val);
          },
        },
        template: `
    <div>
      <h1>兄弟节点1</h1>
      <h5>{{mymessage}}</h5>
      <h6>{{mymessage02}}</h6>
      <input type="text" v-model="mymessage" @input="passData(mymessage)"  />
    </div>
  `,
        props: ["message"],
      });
      Vue.component("child02", {
        data() {
          return {
            brothermessage: "",
          };
        },
        template: `
    <div>
      <h1>兄弟节点2</h1>
      <p>brothermessage: {{brothermessage}}</p>
    </div>
  `,
        created() {
          bus.$on("globalEvent", (val) => {
            this.brothermessage = val;
          });
        },
      });
      Vue.component("parent", {
        provide: {
          for: "我是传递的信息",
        },
        data() {
          return {
            message: "hello",
          };
        },
        template: `
    <div>
      <h1>我是父节点</h1>
      <child01 :message="message"/>
      <child02 :message="message"/>
    </div>
  `,
      });
      var app = new Vue({
        el: "#app",
        template: `
    <div>
      <parent />
    </div>
  `,
      });
    </script>
  </body>
</html>
```
