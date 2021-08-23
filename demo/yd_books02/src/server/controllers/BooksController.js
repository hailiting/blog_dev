import { route, GET } from "awilix-koa";

@route("/books")
class BooksController {
  constructor({ indexService }) {
    this.indexService = indexService;
  }

  @route("/")
  @GET()
  async actionIndexHtml(ctx, next) {
    const result = this.indexService.getData();
    const data = result.data;
    ctx.body = await ctx.render("books/pages/index", {
      data: data,
    });
  }
  @route("/add")
  @GET()
  async actionAddHtml(ctx, next) {
    ctx.body = await ctx.render("books/pages/add", { data: "add" });
  }
}
export default BooksController;
