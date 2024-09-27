import { PublicKey } from "@solana/web3.js";
import * as bip39 from "bip39";
import * as ed25519 from "ed25519-hd-key";
import * as nacl from "tweetnacl";
// 生成助记词
// const mnemonic = bip39.generateMnemonic();
const mnemonic =
  "blanket minute square canvas miss buyer sheriff celery rifle dizzy stove lesson";
// 从助记词派生种子
const seed = bip39.mnemonicToSeedSync(mnemonic);

// 从种子派生密钥对
const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
const publicKey = new PublicKey(keyPair.publicKey).toBase58();
const privateKey = Buffer.from(keyPair.secretKey.slice(0, 32)).toString("hex");

// 根据 BIP-44 标准, Solana 的路径是 m/44'/501'/0'/0'
for (let i = 0; i < 5; i++) {
  const path = `m/44'/501'/${i}'/0'`;
  const derivedKey = ed25519.derivePath(path, seed.toString("hex"));
  const childKeyPair = nacl.sign.keyPair.fromSeed(derivedKey.key);
  const childPrivateKey = childKeyPair.secretKey;
  const childPublicKey = childKeyPair.publicKey;
  console.log("childPrivateKey: ", new PublicKey(childPublicKey).toBase58());
  console.log(
    "childSolanaPublicKey: ",
    Buffer.from(childPrivateKey.slice(0, 32)).toString("hex")
  );
}

console.log("Public Key:", publicKey);
console.log("Private Key:", privateKey);

console.log("Mnemonic:", mnemonic);
