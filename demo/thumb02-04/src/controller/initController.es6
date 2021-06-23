import index from "./indexController";
const controllerInit = {
  init(app, router) {
    app.use(router(_ => {
      _.get("/index/index", index.index());
      _.get("/index/update", index.update());
      _.get("/index/star", index.star());
      _.get("/index/thumb", index.thumb());
      _.get("/index/adv", index.advertisement());
    }))
  }
}
export default controllerInit;