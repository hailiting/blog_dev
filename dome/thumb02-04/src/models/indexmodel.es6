import rpA from "request-promise";
import { resolve } from "path";
import { rejects } from "assert";
class indexModel {
  constructor(ctx) {
    this.ctx = ctx;
  }
  updateNum() {
    const options = {
      uri: 'http://192.168.64.2/thumb.php',
      methods: 'GET',
    }
    return new Promise((resolve, reject) => {
      rpA(options).then(function (result) {
        const info = JSON.parse(result);
        if (info) {
          resolve({ data: info.result });
        } else {
          reject({});
        }
        console.log(info);
      })
    })
  }
}
export default indexModel;