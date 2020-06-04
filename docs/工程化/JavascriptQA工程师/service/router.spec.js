const axios = require("axios");
const app = require("./app");
const { expect } = require("chai");

app.listen();

describe("后台接口测试", function () {
  it("test接口测试", function (done) {
    axios.get("http://localhost:3100/test")
      .then(function (response) {
        console.log(response.data.data)
        expect(response.status).to.equal(200);
        if (response.data.data == "ok message111") {
          done();
        } else {
          done(new Error("数据不符合预期"));
        }
      }).catch(function (error) {
        done(error);
      })
  })
})