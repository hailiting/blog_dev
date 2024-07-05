import { payer, connection } from "@/lib/vars";
import { explorerURL, printConsoleSeparator } from "@/lib/helpers";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

(async () => {
  const res = await connection.getBlockHeight();
  console.log({ res });
  // console.log("Payer address: ", payer.publicKey.toBase58());
  // let currentBalance = await connection.getBalance(payer.publicKey);
  // console.log("1 Current balance of 'payer' (in lamports): ", currentBalance);
  // if (currentBalance <= LAMPORTS_PER_SOL) {
  //   console.log(1);
  //   const res = await connection.requestAirdrop(
  //     payer.publicKey,
  //     LAMPORTS_PER_SOL
  //   );
  //   console.log({ res });
  // }
  // currentBalance = await connection.getBalance(payer.publicKey);
  // console.log("2 Current balance of 'payer' (in lamports): ", currentBalance);

  // const keypair = Keypair.generate();
  // console.log("New Keypair generate: ", keypair.publicKey.toBase58());
  // // 租金问题
  // const space = 0;
  // try {
  //   const lamports = await connection.getMinimumBalanceForRentExemption(space);

  //   // <!-- 构建第一步交易-->
  //   // 创建账户
  //   const createAccountIx = SystemProgram.createAccount({
  //     fromPubkey: payer.publicKey, // 交易支付的地址
  //     newAccountPubkey: keypair.publicKey,
  //     lamports, // 预先支付租金
  //     space,
  //     programId: SystemProgram.programId, // 程序的所有者（系统）
  //   });

  //   // 最近的区块hash
  //   let recentBlockhash = await connection
  //     .getLatestBlockhash()
  //     .then((res) => res.blockhash);
  //   // 构建一个版本化交易
  //   const message = new TransactionMessage({
  //     payerKey: payer.publicKey,
  //     recentBlockhash: recentBlockhash,
  //     instructions: [createAccountIx],
  //   }).compileToV0Message();

  //   const tx = new VersionedTransaction(message);

  //   tx.sign([payer, keypair]);
  //   console.log("TX after signing: ", tx);

  //   const sig = await connection.sendTransaction(tx);
  //   printConsoleSeparator();
  //   console.log("Transaction completed.");
  //   console.log(
  //     explorerURL({
  //       txSignature: sig,
  //     })
  //   );
  // } catch (error) {
  //   console.log("asdfsdfd error: ", error);
  // }
})();
