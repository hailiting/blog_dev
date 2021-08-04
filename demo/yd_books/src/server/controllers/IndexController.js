const Index = require("../models/Index");
const { URLSearchParams } = require("url");
class IndexController {
  constructor() {}
  actionIndex() {
    return async (ctx, next) => {
      const index = new Index();
      const result = await index.getData();
      ctx.body = result;
    };
  }
  actionIndexHtml() {
    return async (ctx, next) => {
      const index = new Index();
      const result = await index.getData();
      const data = result.data;
      ctx.body = await ctx.render("index", { data: data });
    };
  }
  actionAddHtml() {
    return async (ctx, next) => {
      const params = new URLSearchParams();
      const index = new Index();

      params.append("Bookes[mid]", "abc");
      const result = await index.saveData("books%2Fcreate", {
        method: "POST",
        body: params,
      });
      ctx.body = await ctx.render("add", { data: "add" });
    };
  }
}
module.exports = IndexController;
