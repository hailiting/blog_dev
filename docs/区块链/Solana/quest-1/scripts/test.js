import fetch from "node-fetch";
import { Agent } from "http";
import { HttpProxyAgent } from "http-proxy-agent";
// "type": "module",

// const agent = new HttpProxyAgent("http://127.0.0.1:10887", {
//   keepAlive: true,
// });
fetch("http://api.devnet.solana.com", {
  agent: new Agent({
    host: "127.0.0.1",
    port: 10887,
  }),
})
  .then((response) => {
    console.log({ response });
  })
  .catch((error) => console.error("xxxx Error:", error));
