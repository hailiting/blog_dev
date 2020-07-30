var express = require("express");
var app = express();
app.get("/test", function (req, res) {
  res.send({
    data: "ok message111"
  })
})
var server = app.listen(3100, function () {
  console.log("3100")
})
module.exports = app;