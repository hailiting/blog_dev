import { reject } from "q";

import rpA from "request-promise"
export default class indexModel {
  constructor(ctx) {
    this.ctx = ctx;
  }
  updateNum() {
    const options = {
      uri: 'http://192.168.64.2/praise.php',
      methods: 'GET',
    }
    return new Promise((resolve, reject) => {
      rpA(options).then(function (result) {
        const info = JSON.parse(result);
        if (info) {
          resolve({ data: info.result })
        } else {
          reject({})
        }
        console.log(info)
      })
    })
  }
}