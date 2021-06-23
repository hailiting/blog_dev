const express = require("express");
const app = express();
app.get("/test", (req, res) => {
  res.send({
    data: "222",
  });
});
const server = app.listen(3000, () => {
  console.log("server start at 3000");
});
module.exports = app;
