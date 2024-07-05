import * as dotenv from "dotenv";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { loadKeypairFromFile, loadOrGenerateKeypair } from "./helpers";
import { PublicKey } from "@metaplex-foundation/js";
import fetch, { RequestInfo, RequestInit } from "node-fetch";
import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
dotenv.config();

export const payer = process.env?.LOCAL_PLAYER_JSON_ABSPATH
  ? loadKeypairFromFile(process.env?.LOCAL_PLAYER_JSON_ABSPATH)
  : loadOrGenerateKeypair("payer");

export const testWallet = loadOrGenerateKeypair("testWallet");

export const CLUSTER_URL = "https://explorer-api.devnet.solana.com";
// process.env.RPC_URL ?? clusterApiUrl("devnet", false);
// export http_proxy=http://127.0.0.1:10887;export https_proxy=http://127.0.0.1:10887;
export const connection = new Connection(CLUSTER_URL, "single");

export const STATIC_PUBLICKEY = new PublicKey(
  "6YQj1Z3mKeFMN7Xnx4azjnmDvLJuEp13XssToL6wu7an"
);
// https://api.devnet.solana.com
// wss://api.devnet.solana.com/ (computed)

// ping api.devnet.solana.com
// ping api.testnet.solana.com
// ping api.mainnet-beta.solana.com

// dev
// https://api.devnet.solana.com
// https://explorer-api.devnet.solana.com

// test
// https://api.testnet.solana.com

// mainnet
// https://solana.api.onfinality.io/public // ok
// https://rpc.ankr.com/solana
// https://explorer.api.mainnet-beta.solana.com
// https://api.mainnet-beta.solana.com
// https://solana-api.projectserum.com
// https://solana-mainnet.phantom.tech
