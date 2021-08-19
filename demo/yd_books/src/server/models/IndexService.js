const SafeRequest = require("../utils/safeRequest.js");

class Index {
  constructor(app) {
    this.app = app;
  }
  /**
   * 获取后台数据列表
   * @returns new Promise
   */
  getData(option) {
    const safeRequest = new SafeRequest("books/index");
    return safeRequest.fetch(option);
  }
  /**
   * 保存数据
   * @param mid
   * @example
   * return new Promis
   * saveDate(options)
   */
  saveData(url, options) {
    const safeRequest = new SafeRequest(url, options);
    return safeRequest.fetch();
  }
}
module.exports = Index;
