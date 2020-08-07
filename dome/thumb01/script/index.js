"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PraiseButton = /*#__PURE__*/function () {
  function PraiseButton(num) {
    _classCallCheck(this, PraiseButton);

    this.num = num;
  }

  _createClass(PraiseButton, [{
    key: "Like",
    value: function Like() {
      return +this.num + 1;
    }
  }]);

  return PraiseButton;
}();

var myThumb = document.getElementById("myThumb");
var myLikeVal = document.getElementById("myLikeVal");
myThumb.addEventListener("click", function () {
  var val = myLikeVal.innerHTML;
  var myThumbBtn = new PraiseButton(val);
  myLikeVal.innerHTML = myThumbBtn.Like();
});
