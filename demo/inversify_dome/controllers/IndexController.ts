import {
  controller,
  inject,
  interfaces,
  httpGet,
  Router,
  TAGS,
  TYPE,
  provideThrowable,
} from "../ioc/ioc";
@controller("/")
// 让当前controller唯一，当遇到IndexController这个类时，开始注入
@provideThrowable(TYPE.Controller, "IndexController")
export default class IndexController implements interfaces.Controller {
  private indexService;
  constructor(@inject(TAGS.IndexService) indexService) {
    this.indexService = indexService;
  }
  @httpGet("/")
  private async index(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    const result = await this.indexService.getUser(1);
    // ctx.body = result;
    ctx.body = await ctx.render("index", {
      data: result,
    });
  }
}
