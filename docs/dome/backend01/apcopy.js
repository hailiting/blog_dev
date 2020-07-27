const express = require("express");
const http = require("http");
const app = express();

app.get("/setCookie", (req, res, next) => {
  res.cookie("name", "stome", { maxAge: 600000, httpOnly: true });
  res.send("successed")
})


http.createServer(app).listen(3001, () => {
  console.log("ok")
})
