var express = require("express");
var app = express();
app.use("/", function(req, res, next) {
  res.json({
    A: "2adsfas",
  });
});
app.listen(3001);
