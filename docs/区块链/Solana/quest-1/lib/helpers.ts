import fs from "fs";
import path from "path";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

// define some default locations
const DEFAULT_KEY_DIR_NAME = ".local_keys";
const DEFAULT_PUBLIC_KEY_FILE = "keys.json";
const DEFAULT_DEMO_DATA_FILE = "demo.json";

export function loadPublicKeysFromFile(
  absPath: string = `${DEFAULT_KEY_DIR_NAME}/${DEFAULT_PUBLIC_KEY_FILE}`
) {
  try {
    if (!absPath) throw Error("No Path Provided");
    if (!fs.existsSync(absPath)) throw Error("File does not exist.");
    const data =
      JSON.parse(fs.readFileSync(absPath, { encoding: "utf-8" })) || {};
    for (const [key, value] of Object.entries(data)) {
      data[key] = new PublicKey(value as string) ?? "";
    }

    return data;
  } catch (err) {}
  return {};
}
export function loadKeypairFromFile(absPath: string) {
  try {
    if (!absPath) throw Error("No path provided");
    if (!fs.existsSync(absPath)) throw Error("File does not exist.");

    // load the keypair from the file
    const keyfileBytes = JSON.parse(
      fs.readFileSync(absPath, { encoding: "utf-8" })
    );
    // parse the loaded secretKey into a valid keypair
    const keypair = Keypair.fromSecretKey(new Uint8Array(keyfileBytes));
    return keypair;
  } catch (err) {
    // return false;
    throw err;
  }
}

export function loadOrGenerateKeypair(
  fileName: string,
  dirName: string = DEFAULT_KEY_DIR_NAME
) {
  try {
    // compute the path to locate the file
    const searchPath = path.join(dirName, `${fileName}.json`);
    let keypair = Keypair.generate();

    // attempt to load the keypair from the file
    if (fs.existsSync(searchPath)) keypair = loadKeypairFromFile(searchPath);
    // when unable to locate the keypair, save the new one
    else saveKeypairToFile(keypair, fileName, dirName);

    return keypair;
  } catch (err) {
    console.error("loadOrGenerateKeypair:", err);
    throw err;
  }
}
export function saveKeypairToFile(
  keypair: Keypair,
  fileName: string,
  dirName: string = DEFAULT_KEY_DIR_NAME
) {
  fileName = path.join(dirName, `${fileName}.json`);

  // create the `dirName` directory, if it does not exists
  if (!fs.existsSync(`./${dirName}/`)) fs.mkdirSync(`./${dirName}/`);

  // remove the current file, if it already exists
  if (fs.existsSync(fileName)) fs.unlinkSync(fileName);

  // write the `secretKey` value as a string
  fs.writeFileSync(fileName, `[${keypair.secretKey.toString()}]`, {
    encoding: "utf-8",
  });

  return fileName;
}

export function explorerURL({
  address,
  txSignature,
  cluster,
}: {
  address?: string;
  txSignature?: string;
  cluster?:
    | "devnet"
    | "testnet"
    | "mainnet"
    | "mainnet-beta"
    | "http%3A%2F%2F127.0.0.1%3A8899";
}) {
  let baseUrl: string;
  //
  if (address) baseUrl = `https://explorer.solana.com/address/${address}`;
  else if (txSignature)
    baseUrl = `https://explorer.solana.com/tx/${txSignature}`;
  else return "[unknown]";

  // auto append the desired search params
  const url = new URL(baseUrl);
  url.searchParams.append(
    "cluster",
    cluster || "http%3A%2F%2F127.0.0.1%3A8899"
  );
  return url.toString() + "\n";
}

export function printConsoleSeparator(message?: string) {
  console.log("\n===============================================");
  console.log("===============================================\n");
  if (message) console.log(message);
}

export async function buildTransaction({
  connection,
  payer,
  signers,
  instructions,
}: {
  connection: Connection;
  payer: PublicKey;
  signers?: Keypair[];
  instructions: TransactionInstruction[];
}): Promise<VersionedTransaction> {
  let blockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
  const messageV0 = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();
  const tx = new VersionedTransaction(messageV0);
  if (signers) {
    signers.forEach((s) => tx.sign([s]));
  }
  return tx;
}

export async function extractSignatureFromFailedTransaction(
  connection: Connection,
  err: any,
  fetchLogs?: boolean
) {
  if (err?.signature) return err.signature;
  const failedSig = new RegExp(
    /^((.*)?Error: )?(Transaction|Signature) ([A-Z0-9]{32,}) /gim
  ).exec(err?.message?.toString())?.[4];
  if (failedSig) {
    if (fetchLogs) {
      return await connection
        .getTransaction(failedSig, {
          maxSupportedTransactionVersion: 0,
        })
        .then((tx) => {
          console.log(`\n==== Transaction logs for ${failedSig} ====`);
          console.log(explorerURL({ txSignature: failedSig }), "");
          console.log(
            tx?.meta?.logMessages ?? "No log messages provided by RPC"
          );
          console.log(`==== END LOGS ====\n`);
        });
    } else {
      console.log("\n========================================");
      console.log(explorerURL({ txSignature: failedSig }));
      console.log("========================================\n");
    }
  }
  return failedSig;
}

export function savePublicKeyToFile(
  name: string,
  publickey: PublicKey,
  absPath: string = `${DEFAULT_KEY_DIR_NAME}/${DEFAULT_PUBLIC_KEY_FILE}`
) {
  try {
    let data: any = loadPublicKeysFromFile(absPath);
    for (const [key, value] of Object.entries(data)) {
      data[key as any] = (value as PublicKey).toBase58();
    }
    data = { ...data, [name]: publickey.toBase58() };
    console.log({ data });
    fs.writeFileSync(absPath, JSON.stringify(data), {
      encoding: "utf-8",
    });
    data = loadPublicKeysFromFile(absPath);
    return data;
  } catch {
    console.warn("Unable to save to file");
  }
  return {};
}
