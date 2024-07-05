import { payer, connection } from "@/lib/vars";
import { explorerURL, loadPublicKeysFromFile } from "@/lib/helpers";
import { PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
(async () => {
  console.log("payer address: ", payer.publicKey.toBase58());
  let localKeys = loadPublicKeysFromFile();
  if (!localKeys?.tokenMint) {
    return console.warn(
      "No local keys were found. Please run '3.createTokenWithMetadata.ts'"
    );
  }
  const tokenMint: PublicKey = localKeys.tokenMint();
  console.log("==== Local PublicKeys loaded ====");
  console.log("Token's mint address:", tokenMint.toBase58());
  console.log(explorerURL({ address: tokenMint.toBase58() }));
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    tokenMint,
    payer.publicKey
  ).then((ata) => ata.address);
  console.log("Token account address:", tokenAccount.toBase58());
  const amountOfTokensToMint = 1_000;
  console.log("Minting some tokens to the ata...");
  const mintSig = await mintTo(
    connection,
    payer,
    tokenMint,
    tokenAccount,
    payer,
    amountOfTokensToMint
  );
  console.log(explorerURL({ txSignature: mintSig }));
})();
