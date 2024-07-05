// 创建一个带有源数据的 SPL token
// @metaplex-foundation/mpl-token-metadata 处理token的元数据
import { payer, testWallet, connection } from "@/lib/vars";
import {
  buildTransaction,
  explorerURL,
  extractSignatureFromFailedTransaction,
  printConsoleSeparator,
  savePublicKeyToFile,
} from "@/lib/helpers";

import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMint2Instruction,
} from "@solana/spl-token";
import {
  PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
const METADATA_PROGRAM_ID = new PublicKey(
  "6PMCXBktNTscpKZTkUxbejBn6bETgWDkG9YGtwHFMGBE"
);
console.log({ TOKEN_PROGRAM_ID, METADATA_PROGRAM_ID });
(async () => {
  console.log("Payer address: ", payer.publicKey.toBase58());
  console.log("Test wallet address: ", testWallet.publicKey.toBase58());
  const mintKeypair = Keypair.generate();
  console.log("Mint address: ", mintKeypair.publicKey.toBase58());
  const tokenConfig = {
    decimals: 0,
    name: "S",
    symbol: "G",
    uri: "",
  };
  const createMintAccountInstruction = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: mintKeypair.publicKey,
    space: MINT_SIZE,
    lamports: await connection.getMinimumBalanceForRentExemption(MINT_SIZE),
    programId: TOKEN_PROGRAM_ID,
  });
  const initializeMintInstruction = createInitializeMint2Instruction(
    mintKeypair.publicKey,
    tokenConfig.decimals,
    payer.publicKey,
    payer.publicKey
  );

  // PDA 程序派生地址 特定元数据账户，由token账户所拥有
  const metadataAccount = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      mintKeypair.publicKey.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  )[0];
  console.log("metadata address: ", metadataAccount.toBase58());
  const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataAccount,
      mint: mintKeypair.publicKey,
      mintAuthority: payer.publicKey,
      payer: payer.publicKey,
      updateAuthority: payer.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        data: {
          name: tokenConfig.name,
          symbol: tokenConfig.symbol,
          uri: tokenConfig.uri,
          sellerFeeBasisPoints: 0,
          uses: null,
          creators: null,
          collection: null,
        },
        collectionDetails: null,
        // should the metadata be updatable?
        isMutable: false,
      },
    },
    METADATA_PROGRAM_ID
  );

  const tx = await buildTransaction({
    connection,
    payer: payer.publicKey,
    signers: [payer, mintKeypair],
    instructions: [
      createMintAccountInstruction,
      initializeMintInstruction,
      createMetadataInstruction,
    ],
  });

  printConsoleSeparator();
  try {
    const sig = await connection.sendTransaction(tx);
    console.log("tx Transaction completed.");
    console.log(explorerURL({ txSignature: sig }));
    savePublicKeyToFile("tokenMint", mintKeypair.publicKey);
    printConsoleSeparator();
  } catch (err) {
    console.error("tx Failed to send transaction:");
    console.log(tx);

    // attempt to extract the signature from the failed transaction
    const failedSig = await extractSignatureFromFailedTransaction(
      connection,
      err
    );
    if (failedSig)
      console.log(
        "tx Failed signature:",
        explorerURL({ txSignature: failedSig })
      );

    throw err;
  }
})();
