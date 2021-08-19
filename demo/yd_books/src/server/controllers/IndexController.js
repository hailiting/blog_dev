import { route, GET } from "awilix-koa";
@route("/")
class IndexController {
  // constructor({ indexService }) {
  // this.indexService = indexService;
  // }
  @route("/")
  @GET()
  async actionAdd(ctx, next) {
    ctx.body = "这是首页！";
  }
}
module.exports = IndexController;
