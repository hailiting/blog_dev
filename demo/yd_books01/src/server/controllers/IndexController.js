const Index = require("../models/Index");
const { URLSearchParams } = require("url");
const cheerio = require("cheerio"); // 把字符串解释为jquery
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
      ctx.body = await ctx.render("books/pages/index", {
        data: data,
      });
    };
  }
  actionAddHtml() {
    return async (ctx, next) => {
      const params = new URLSearchParams();
      const index = new Index();

      params.append("Books[newsTitle]", `${new Date().valueOf()}`);
      params.append("Books[newsImg]", `${Math.random()}`);
      params.append("Books[newsContent]", `${new Date().valueOf()}`);
      const html = await ctx.render("books/pages/add", { data: "add" });
      if (ctx.request.header["x-pjax"]) {
        const $ = cheerio.load(html);
        let _result = "";
        $(".pjaxcontent").each(function() {
          _result += $(this).html();
        });
        $(".lazyload-js").each(function() {
          _result += `<script src="${$(this).attr("src")}"></script>`;
        });
        $(".lazyload-css").each(function() {
          _result += `<link class="lazyload-css" rel="stylesheet" href="${$(
            this
          ).attr("href")}"></link>`;
        });
        ctx.body = _result;
      } else {
        ctx.body = html;
      }
      // const result = await index.saveData("books%2Fcreate", {
      //   method: "POST",
      //   body: params,
      // });
      // ctx.body = await ctx.render("books/pages/add", { data: "add" });
    };
  }
}
module.exports = IndexController;
