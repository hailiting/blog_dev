import { explorerURL, printConsoleSeparator } from "@/lib/helpers";
import { connection, payer } from "@/lib/vars";
import {
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
(async () => {
  console.log("Payer address: ", payer.publicKey.toBase58());
  console.log(
    "Receiver address: ",
    "FKup5YT1ZHWZbUmWVRQtdEDF3GLzmJd72BxmK1sVrfkc"
  );

  const receiver = new PublicKey(
    "FKup5YT1ZHWZbUmWVRQtdEDF3GLzmJd72BxmK1sVrfkc"
  );
  const transferToTestWalletIx = SystemProgram.transfer({
    lamports: 4_000_000_000, // 转账1 SOL，注意1 SOL = 1,000,000,000 lamports
    fromPubkey: payer.publicKey,
    toPubkey: receiver,
    programId: SystemProgram.programId,
  });
  let recentBlockhash = await connection
    .getLatestBlockhash()
    .then((res) => res.blockhash);
  const message = new TransactionMessage({
    payerKey: payer.publicKey,
    recentBlockhash: recentBlockhash,
    instructions: [transferToTestWalletIx],
  }).compileToV0Message();
  const tx = new VersionedTransaction(message);
  tx.sign([payer]);
  const sig = await connection.sendTransaction(tx);
  printConsoleSeparator();
  console.log("Transaction completed.");
  console.log(explorerURL({ txSignature: sig }));
})();
