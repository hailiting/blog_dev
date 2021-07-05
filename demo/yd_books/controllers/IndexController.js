class IndexController {
  constructor() {}
  actionIndex() {
    return (ctx, next) => {
      ctx.body = "actionIndex.html";
    };
  }
  actionIndexHtml() {
    return async (ctx, next) => {
      ctx.body = await ctx.render("index", { data: "data" });
    };
  }
}
module.exports = IndexController;
