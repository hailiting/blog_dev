import xtag from "./libs/x-tag";
// import * as $ from "jquery";
// console.log($)
let t;
xtag.register("x-praise", {
  content: '<h1 id="ThumbUpNumber">-</h1>' +
    '<button id="BtnThumbUp">点赞</button>',
  lifecycle: {
    created: function () {
      console.log("created")
    },
    inserted: function () {
      console.log("inserted")
    },
    removed: function () {
      console.log("removed")
    },
    attributeChanged: function () {
      console.log("attributeChanged")
    },
  },
  methods: {
    praise: function () {
      let _this = this;
      console.log("click praise")
    }
  },
  accessors: {
    someAccessor: {
      attribute: {},
      set: function () {
        console.log("set")
      },
      get: function () {
        console.log("get")
      },
    }
  },
  events: {
    click: function (e) {
      /**
       * 请求稀释
       * t 为定时器时 || 为空时
       **/
      if (t) {
        clearTimeout(t);
      }
      t = setTimeout(() => {
        this.praise()
      }, 500)
    },
    tap: function () {
      console.log("tap")
    },
    focus: function () {
      console.log("focus")
    },
  }
})
