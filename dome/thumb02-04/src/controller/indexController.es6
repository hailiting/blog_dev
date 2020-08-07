import indexModel from "../models/indexmodel";
const indexController = {
  index() {
    return async (ctx, next) => {
      ctx.body = await ctx.render("index.html", {
        title: "大拇指点赞"
      })
    }
  },
  update() {
    return async (ctx, next) => {
      const indexM = new indexModel();
      ctx.body = await indexM.updateNum();
    }
  },
  star() {
    return async (ctx, next) => {
      if (ctx.request.header["x-pjax"]) {
        ctx.body = "<x-star></x-star>";
      } else {
        ctx.body = await ctx.render("star.html", {
          title: "星星点赞"
        })
      }
    }
  },
  thumb() {
    return async (ctx, next) => {
      if (ctx.request.header["x-pjax"]) {
        ctx.body = "<x-praise></x-praise>";
      } else {
        ctx.body = await ctx.render("index.html", {
          title: "星星点赞"
        })
      }
    }
  },
  advertisement() {
    return async (ctx, next) => {
      ctx.body = "<div style='color: #f00'>this is adv</div>"
    }
  }
}
export default indexController;