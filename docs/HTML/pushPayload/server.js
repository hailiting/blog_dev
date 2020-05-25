// webpush 配置VAPID密钥
const webPush = require("web-push");
if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log(webPush.generateVAPIDKeys());
  return;
}
webPush.setVapidDetails(
  "https://serviceworke.rs/",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);
module.exports = function (app, route) {
  app.get(route + "vapidPublicKey", function (req, res) {
    res.send(process.env.VAPID_PRIVATE_KEY);
  });
  app.post(route + "register", function (req, res) {
    res.sendStatus(201);
  })
  app.post(route + "sendNotification", function (req, res) {
    const subscription = req.body.subscription;
    const payload = req.body.payload;
    const options = {
      TTL: req.body.ttl
    };
    setTimeout(function () {
      webPush.sendNotification(subscription, payload, options).then(function () {
        res.sendStatus(201);
      }).catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
    }, req.body.delay * 1000);
  })
}