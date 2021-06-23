webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(6);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);

var f = new _index.Thumb();
var t = "";
xtag.register("x-praise", {
  content: "<div class='hand' id='thumb'>" + "<div class='finger'></div>" + "<div class='finger'></div>" + "<div class='finger'></div>" + "<div class='finger'></div>" + "<div class='finger thumb'></div>" + "<div class='arm'></div>" + "</div>" + "<span id='animation'>+1</span>",
  methods: {
    praise: function praise() {
      var _this = this;
      f.clickAction();
      var animation = _this.querySelector("#animation");
      animation.className = "hide num";
      setTimeout(function () {
        animation.className = "hide";
      }, 800);
    }
  },
  events: {
    click: function click(e) {
      var _this = this;
      if (e.target.id == "thumb") {
        // 稀释点击
        if (t) {
          clearTimeout(t);
        }
        t = setTimeout(function () {
          _this.praise();
        }, 500);
      }
    }
  }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);

var f = new _index.Star();
var t = "";
xtag.register("x-star", {
  content: "<div class='star' id='star'>" + "<div class='star1'></div>" + "</div>" + "<span class='hide' id='animation'>+1</span>",
  methods: {
    praise: function praise() {
      var _this = this;
      f.clickAction();
      var animation = _this.querySelector("#animation");
      animation.className = "hide num";
      setTimeout(function () {
        animation.className = "hide";
      }, 800);
    }
  },
  events: {
    click: function click(e) {
      var _this = this;
      if (e.target.id == "star") {
        if (t) {
          clearTimeout(t);
        }
        t = setTimeout(function () {
          _this.praise();
        }, 500);
      }
    }
  }
});

/***/ })
],[4]);