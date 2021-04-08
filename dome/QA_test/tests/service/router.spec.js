const superagent = require("supertest");
const app = require("./app");

function request() {
  console.log(app);
  return superagent(app.listen());
}
describe("Node接口测试", function() {
  it("test接口测试", function(done) {
    request()
      .get("/test")
      .expect(200)
      .expect("content-type", /json/)
      .end(function(err, res) {
        // err  done  是 mocha 给的
        if (err) {
          done(err);
        } else {
          if (res.body.data === "222") {
            done();
          } else {
            done(new Error("接口数据异常"));
          }
        }
      });
  });
});
