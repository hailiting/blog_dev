import { payer, connection } from "@/lib/vars";
import {
  buildTransaction,
  explorerURL,
  extractSignatureFromFailedTransaction,
  loadPublicKeysFromFile,
  printConsoleSeparator,
} from "@/lib/helpers";
import { PublicKey } from "@solana/web3.js";
import { createUpdateMetadataAccountV2Instruction } from "@metaplex-foundation/mpl-token-metadata";
const METADATA_PROGRAM_ID = new PublicKey(
  "6PMCXBktNTscpKZTkUxbejBn6bETgWDkG9YGtwHFMGBE"
);

(async () => {
  console.log("Payer address: ", payer.publicKey.toBase58());
  let localKeys = loadPublicKeysFromFile();
  if (!localKeys?.tokenMint) {
    return console.warn(
      "No local keys were found. Please run '3.createTokenWithMetadata.ts'"
    );
  }
  const tokenMint = localKeys.tokenMint;
  console.log("==== Local PublicKeys loaded ====");
  console.log("Token's mint address:", tokenMint.toBase58());
  console.log(explorerURL({ address: tokenMint.toBase58() }));

  const tokenConfig = {
    // new name
    name: "New Super Sweet Token",
    // new symbol
    symbol: "nSST",
    // new uri
    uri: "https://thisisnot.arealurl/new.json",
  };

  const metadataAccount = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      tokenMint.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  )[0];
  console.log("Metadata address:", metadataAccount.toBase58());
  const updateMetadataInstruction = createUpdateMetadataAccountV2Instruction(
    {
      metadata: metadataAccount,
      updateAuthority: payer.publicKey,
    },
    {
      updateMetadataAccountArgsV2: {
        data: {
          creators: null,
          name: tokenConfig.name,
          symbol: tokenConfig.symbol,
          uri: tokenConfig.uri,
          sellerFeeBasisPoints: 0,
          collection: null,
          uses: null,
        },
        isMutable: true,
        primarySaleHappened: null,
        updateAuthority: payer.publicKey,
      },
    }
  );
  const tx = await buildTransaction({
    connection,
    payer: payer.publicKey,
    signers: [payer],
    instructions: [updateMetadataInstruction],
  });
  printConsoleSeparator();
  try {
    const sig = await connection.sendTransaction(tx);

    console.log("Transaction completed.");
    console.log(explorerURL({ txSignature: sig }));
  } catch (err) {
    console.error("Failed Transaction:");
    const failedSig = await extractSignatureFromFailedTransaction(
      connection,
      err
    );
    if (failedSig)
      console.log("Failed signature:", explorerURL({ txSignature: failedSig }));

    throw err;
  }
})();
