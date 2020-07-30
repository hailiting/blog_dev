const app = require("../app");
const debug = require("debug")("server:server");
const http = require("http");

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
const server = http.createServer(app).listen(port, () => {
  console.log(`The server is running at *: ${port}`);
})

const io = require("socket.io")(server, {
  path: "/socket"
})
app.io(io);

server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
}
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe" + port : "Port" + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " require elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("listening on " + bind);
}