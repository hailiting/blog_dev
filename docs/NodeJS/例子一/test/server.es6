import requester from "supertest";
import app from "../app";

// 打开app端口
function request() {
  return requester(app.listen())
}

describe("测试接口路由", function () {
  it("点赞+1", function (done) {
    request(app)
      // .post("/index/update")
      // .send({ name: 'joh' })
      // .set("Accept", "application/json")
      .get("/index/update")
      .expect(200)
      .end(function (err, res) {
        if (err || !res.data == 1) {
          done(err)
        } else {
          done()
        }
      })
  })
})