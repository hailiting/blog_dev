const { URLSearchParams } = require("url");
const cheerio = require("cheerio"); // 把字符串解释为jquery
class IndexController {
  constructor() {}
  actionIndexHtml() {
    return async (ctx, next) => {
      const result = await index.getData();
      ctx.body = await ctx.render("books/pages/index", {
        data: data,
      });
    };
  }
  actionAddHtml() {
    return async (ctx, next) => {
      ctx.body = await ctx.render("books/pages/add", { data: "add" });
    };
  }
}
module.exports = IndexController;
