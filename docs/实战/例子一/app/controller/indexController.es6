import indexModel from "../models/indexmodels";
const indexController = {
  index() {
    return async (ctx, next) => {
      ctx.body = await ctx.render("index.html", {
        title: "大拇指点赞",
      })
    }
  },
  update() {
    return async (ctx, next) => {
      const indexM = new indexModel();
      ctx.body = await indexM.updateNum();
    }
  }
}
export default indexController;