// 元数据 + 注入
import "reflect-metadata";
function inject(serviceIdentifier) {
  return function(target, targetKey, index) {
    // Reflect 是一个内置对象，它提供拦截JavaScript操作的方法，与proxy相似
    Reflect.defineMetadata(serviceIdentifier, "xxxx", target);
  };
}
class IndexController {
  public indexService;
  constructor(@inject("indexService") indexService) {
    this.indexService = indexService;
  }
}
const indexController = new IndexController("经陈毅等");
console.log("----1111---", indexController.indexService);
console.log(
  "----2222---",
  Reflect.getMetadata("indexService", IndexController)
);
