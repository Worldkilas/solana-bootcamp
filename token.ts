//Token mint
import { createMint } from "@solana/spl-token";
//token metadata
//creating a token acct
//minting
//transferring tokens
//burning tokens
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import "dotenv/config"
import { Connection, clusterApiUrl } from "@solana/web3.js";


const connection= new Connection(clusterApiUrl('devnet'))
// A user object that represents a user with public and secret key
const user= getKeypairFromEnvironment("SECRET_KEY") 
console.log("Connected with: ", user.publicKey.toBase58());
try {
    const tokenMint= await  createMint(connection, user, user.publicKey,user.publicKey,2)
    const link= getExplorerLink("address",tokenMint.toString(), 'devnet')
    console.log("Finished! Created token mint: ",link);
} catch (error) {
    console.error(error.message);
    
}




