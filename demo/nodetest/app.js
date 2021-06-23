var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(express.static("public"));
var urlencodedParser = bodyParser.urlencoded({
  extended: false,
});
app.get("/index.html", function(req, res) {
  // res.send("hello world");
  res.sendFile(__dirname + "/public/view/index.html");
});
app.post("/post", urlencodedParser, function(req, res) {
  var response = {
    name: req.body.name,
  };
  console.log(response);
  res.json({
    name: response,
  });
});
var server = app.listen("8080", function() {
  const address = server.address().address;
  const port = server.address().port;
  console.log("%s%s", address, port);
});
