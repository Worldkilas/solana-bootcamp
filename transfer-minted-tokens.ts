import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
const connection= new Connection(clusterApiUrl('devnet'))
const sender= getKeypairFromEnvironment("SECRET_KEY")
console.log("Loaded keypair successfully ");

const recipient=new PublicKey("UjrPReZo5dq19a2LwGfAY5MJc8V2F8gnHSgoDgXP6Y3")

const tokenMintAccount= new PublicKey("8MgXPtjmbTHyFLSQQ7r9zspNxpVzWbUU2KTZ9k8jbZpj")


// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
console.log("Attempting to send 1 token to ",recipient.toBase58());
// Get or create the source and destination token accts to store this token
try {
    const sourceTokenAcct= await getOrCreateAssociatedTokenAccount(
        connection,
        sender,
        tokenMintAccount,
        sender.publicKey
    )
    const destinationTokenAcct=await getOrCreateAssociatedTokenAccount(
        connection,
        sender,
        tokenMintAccount,
        recipient
    )
    //transfer tokens
    const signature= await transfer(
        connection,
        sender,
        sourceTokenAcct.address,
        destinationTokenAcct.address,
        sender,
        1*MINOR_UNITS_PER_MAJOR_UNITS
    )
    const explorerLink = getExplorerLink("transaction", signature, "devnet");

console.log(`✅ Transaction confirmed, explorer link is: ${explorerLink}`)
} catch (error) {
    console.error(error.message);
    
}

