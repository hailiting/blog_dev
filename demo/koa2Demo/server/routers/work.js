/**
 * 工作台子路由
 */
const router = require("@koa/router")();
const controllers = require("./../controllers/work");

const routers = router.get("/", controllers.indexPage);
module.exports = routers;
