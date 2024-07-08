import { clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
/*
    Connection: used for establshing connection to a solana cluster
    Cluster: The different networks you can use solana(devnet,mainnet,testnet)
    PublicKey: Used for taking a public key
*/

const suppliedPublicKey= process.argv[2]||  null; //takes args from cmdline and the 2nd index is the provided arg
if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check balance of");
    
}


try {
    const connection= new Connection(clusterApiUrl('devnet'), "confirmed")

const publicKey= new PublicKey(suppliedPublicKey)

if (!PublicKey.isOnCurve(publicKey.toBuffer( ))) {
    throw new Error("Invalid wallet address");
    
}

const balanceInLamports= await connection.getBalance(publicKey)

const balanceInSOL= balanceInLamports/LAMPORTS_PER_SOL

console.log('Your balance in sol is ', balanceInSOL,' while your balance in lamports is ', balanceInLamports);

} catch (error) {
    console.error("Error: ",error.message);
    
}

