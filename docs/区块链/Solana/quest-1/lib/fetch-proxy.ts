import { Agent } from "http";
import { RequestInit, Response } from "node-fetch";

// Function to create a fetch with proxy
const createFetchWithProxy = (proxyUrl: string): typeof globalThis.fetch => {
  return (url: RequestInfo, init?: RequestInit): Promise<Response> =>
    fetch(url, {
      ...(init || {}),
      agent: new Agent({
        host: "127.0.0.1",
        port: 10887,
      }),
    });
};

// Set the global fetch function with proxy
if (!globalThis.fetch) {
  const httpProxy = process.env.http_proxy || process.env.HTTP_PROXY;
  if (httpProxy) {
    globalThis.fetch = createFetchWithProxy(httpProxy);
  } else {
    globalThis.fetch = fetch;
  }
}
