"use strict";

var _supertest = require("supertest");

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require("../app.js");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requset() {
  return (0, _supertest2.default)(_app2.default.listen());
}
describe("测试接口路由", function () {
  it("点赞+1", function (done) {
    requset(_app2.default).get("/index/update").expect(200).end(function (err, res) {
      if (res.data == 1) return done(err);
    }).done();
  });
});