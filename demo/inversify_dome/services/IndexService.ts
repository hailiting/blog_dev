// 使用service实现接口
import { IIndex } from "../interface/IIndex";
import { Model } from "../models/User";
import { provide, TAGS } from "../ioc/ioc";
// 把当前service灌入到container中
@provide(TAGS.IndexService)
export default class IndexService implements IIndex {
  private userList: Model.User[] = [
    {
      email: "xx@mals",
      name: "xx",
    },
    {
      email: "ssss@mals",
      name: "ssss",
    },
  ];
  public getUser(id: string): Model.User {
    let result: Model.User;
    result = this.userList[id];
    return result;
  }
}
