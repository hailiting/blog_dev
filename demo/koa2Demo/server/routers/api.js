/**
 * restful api 子路由
 */
const router = require("@koa/router")();
const userInfoController = require("./../controllers/user-info");

const routers = router
  .get("/user/getUserInfo", userInfoController.getLoginUserInfo)
  .post("/user/signIn", userInfoController.signIn)
  .post("/user/signUp", userInfoController.signUp);
module.exports = routers;
