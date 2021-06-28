var express = require("express");
var app = express();
app.use("/", function(req, res, next) {
  res.json({
    A: "asdfasdfas",
  });
});
app.listen(3000);
