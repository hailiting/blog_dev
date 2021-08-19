const fetch = require("node-fetch");
const config = require("../config");
class SafeRequest {
  constructor(url, options) {
    this.url = url;
    this.options = options;
    this.baseUrl = config.baseUrl;
  }
  fetch() {
    return new Promise((resolve, reject) => {
      let result = {
        code: 0,
        message: "",
        data: [],
      };
      fetch(this.baseUrl + this.url, {
        ...this.options,
        headers: {
          // "Content-Type": "application/json",
          // "Content-Length": 100,
        },
      })
        .then((res) => {
          console.log(this.url);
          if (this.url.indexOf("create") > -1) {
            console.log("sss", res);
          }

          let _json = {};
          try {
            return res.json();
          } catch (err) {
            result.code = 1;
            result.message = "解析JSON失败";
            reject(result);
          }
        })
        .then((json) => {
          console.log(json);
          result.data = json;
          resolve(result);
        })
        .catch((error) => {
          console.log(3, error);
          result.code = 1;
          result.message = "node-fetch error";
          reject(result);
        });
    });
  }
}
module.exports = SafeRequest;
