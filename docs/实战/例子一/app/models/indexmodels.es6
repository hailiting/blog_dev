import rpA from "request-promise";
class indexModel {
  // 构造函数
  constructor(ctx) {
    this.ctx = ctx;
  }
  // 方法
  updateNum() {
    // 封装php接口
    const options = {
      uri: 'http://192.168.64.2/praise.php',
      methods: "GET",
    }
    return new Promise((resolve, reject) => {
      rpA(options).then(function (result) {
        const info = JSON.parse(result);
        if (info) {
          resolve({ data: info.result });
        } else {
          reject({})
        }
        console.log(info);
      })
    })
  },
  getData() {
    return new Promise(function (resolve, reject) {
      try {
        // 趴网站
        rpA('urlLink').then(function (result) {
          var htmlBody = cheerio.load(body);
          var title = htmlBody(".article-title h2").text();
          resolve(title);
        })
      } catch (err) {
        reject(new Error("err"))
      }
    })
  }
}
export default indexModel;