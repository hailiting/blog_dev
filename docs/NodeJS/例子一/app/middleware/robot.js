// 中间层 eg: 禁止百度爬虫访问[通过Middleware获取到User-Agent判断]
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get("user-agent") || "";
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = "you are robot.";
    } else {
      await next();
    }
  }
}
/**
 * config/config.default.js
 * export.middleware=[
 * "robot"
 * ];
 * export.robot = {
 *  ua:[
 *    /Baiduspider/i,
 *  ]
 * }
 */