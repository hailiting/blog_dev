# Vue 组件通讯有几种方式

- props 和`$emit`
- 自定义事件
- `$attrs`
- `$parent`
- `$refs`
- `provide/inject` 上下级（跨多级）组件
- Vuex -> 全局的状态管理，数据同步

## props 和 `$emit`

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.8/dist/vue.js"></script>
<template id="home">
  <hello-world v-bind:msg="msg" @show-msg="showMsg"></hello-world>
</template>

<template id="helloWorld">
  <h1 @click="clickHandler">{{msg}}</h1>
</template>

<div id="app">
  <home></home>
</div>

<script>
  Vue.component("home", {
    template: "#home",
    data() {
      return {
        msg: "Hello World",
      };
    },
    methods: {
      showMsg(msg) {
        this.msg = msg + "x";
        console.log(msg);
      },
    },
  });

  Vue.component("hello-world", {
    template: "#helloWorld",
    data(){
      return {
        name: "This is from helloworld componants"
      }
    },
    props: {
      msg: String,
    },
    emits: ["show-msg"],
    methods: {
      clickHandler: function () {
        this.$emit("show-msg", "Get It!");
      },
    },
  });

  new Vue({
    el: "#app",
  });
```

## 自定义事件

- 多对多

```vue
<!-- CustomEvent1.vue -->
<template>
  <p>receive custom event</p>
</template>
<script>
// 事件中心
import event from "../utils/event.js"
export default {
  name: "CustomEvent1",
  methods: {
    showMsg(msg){
      console.log(msg)
    }
  },
  mounted(){
    event.on("showMsg", this.showMsg)
  }
  // Vue2.x beforeDestroy
  beforeUnmount(){
    event.off("showMsg", this.showMsg)
  }
}
</script>

<!-- CustomEvent2 -->
<template>
  <p><button @click="trigger">trigger custom event</button></p>
</template>
<script>
import event from "../utils/event.js";
export default {
  name: "CustomEvent2",
  methods: {
    trigger() {
      event.emit("showMsg", "hello custom event");
    },
  },
};
</script>
```

```js
// event.js
import ee from "event-emitter";
const event = ee();
export default event;
// Vue
```

## `$attrs` `$listeners`

- vue3 `$listeners`合并到`$attrs`

```vue
<template>
  <AttrsDome>
</template>

<!--Level1 -->
<template>
  <p>Level1</p>
  <Level2
    :a="a"
    :b="b"
    :c="c"
    @getA="getA"
    @getB="getB"
    @getC="getC"
  ></Level2>
</template>
<script>
import Level2 from "./Level2"
export default {
  name: "Level1",
  components: {Level2},
  data(){
    return {
      a: "aaa",
      b: "bbb",
      c: "ccc",
    }
  },
  methods: {
    getA(){return this.a},
    getB(){return this.b},
    getC(){return this.c},
  }
}
</script>


<!--Level2 -->
<template>
  <p>Level2</p>
  <Level3
    :X="X"
    :Y="Y"
    :Z="Z"
    @getX="getX"
    @getY="getY"
    @getZ="getZ"
    v-bind="$attrs" // 传递所有attrs到 Level3
  ></Level3>
</template>
<script>
import Level3 from "./Level3"
export default {
  name: "Level2",
  components: {Level3},
  props: ["a"], // Level1 传递参数未被包含在 props 以 emits 内，则就存在于`this.$attrs`里
  emits: {"getA"}
  data(){
    return {
      X: "XXX",
      Y: "YYY",
      Z: "ZZZ",
    }
  },
  methods: {
    getX(){return this.X},
    getY(){return this.Y},
    getZ(){return this.Z},
  },
  created(){
    console.log("level2", Object.keys(this.$attrs))
  }
}
</script>


<template>
  <p>Level3</p>
</template>
<script>
export default {
  name: "Level3",
  props: ["X"], // Level1 传递参数未被包含在 props 以 emits 内，则就存在于`this.$attrs`里
  inheritAttrs: false, // Level3 去除 dom 中的 attrs
  emits: {"getX"}
  created(){
    console.log("level3", Object.keys(this.$attrs))
  }
}
</script>
```

## `$parent` `$refs`

```vue
<template>
  <p>Level3</p>
  <HelloWorld msg="hi this from Level3" ref="helloRef" />
</template>
<script>
import HelloWorld from "../HelloWorld.vue"
export default {
  name: "Level3",
  props: ["X"], // Level1 传递参数未被包含在 props 以 emits 内，则就存在于`this.$attrs`里
  inheritAttrs: false, // Level3 去除 dom 中的 attrs
  emits: {"getX"},
  created(){}, // $parent与$refs 需要页面加载完成才能读到
  mounted(){
    console.log("level3", this.$parent.Z)
    console.log("level3", this.$parent.getZ())
    console.log(this.$refs.helloRef.name)
  }
}
</script>
```

## `provide/inject`

```vue
<!--Level1 -->
<template>
  <p>Level1</p>
  <Level2></Level2>
</template>
<script>
import Level2 from "./Level2";
import { computed } from "vue";
export default {
  name: "Level1",
  components: { Level2 },
  data() {
    return {
      a: "aaa",
    };
  },
  provide() {
    return {
      info: computed(() => this.a),
    };
  },
};
</script>

<!--Level2 -->
<template>
  <p>Level2</p>
  <Level3></Level3>
</template>
<script>
import Level3 from "./Level3";
export default {
  name: "Level2",
  components: { Level3 },
};
</script>

<!--Level3 -->
<template>
  <!-- info.value -->
  <p>Level3 {{ info }}</p>
</template>
<script>
export default {
  name: "Level3",
  inject: ["info"],
};
</script>
```

## Vuex mutation action 区别

- mutation: 原子操作，必须同步代码
- action: 可包含多个 mutation，可包含异步代码
