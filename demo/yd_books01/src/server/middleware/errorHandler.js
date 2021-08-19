const errorHandler = {
  error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        ctx.status = 200;
        ctx.body = "$)$";
        logger.error(err);
      }
    });
    app.use(async (ctx, next) => {
      await next();
      if (404 !== ctx.status) {
        return;
      }
      ctx.status = 200;
      ctx.body = "404";
    });
  },
};
module.exports = errorHandler;
