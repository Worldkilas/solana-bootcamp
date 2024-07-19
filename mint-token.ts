import { mintTo } from "@solana/spl-token";
import 'dotenv/config'
import { getExplorerLink,getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection= new Connection(clusterApiUrl('devnet'))

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);
const user= getKeypairFromEnvironment("SECRET_KEY")
const tokenMintAccount=new PublicKey("8MgXPtjmbTHyFLSQQ7r9zspNxpVzWbUU2KTZ9k8jbZpj")
const recipientAssociatedAcct= new PublicKey("BFRKcryJey6uFH8FD6hFCXC8w6nskkJQHG9gKws6weQ")

try {
    const transactionSignature= await mintTo(
        connection,
        user,
        tokenMintAccount,
        recipientAssociatedAcct,
        user,
        10*MINOR_UNITS_PER_MAJOR_UNITS
    )
    const link= getExplorerLink('transaction', transactionSignature,'devnet')
    console.log("Success! Mint token trnasaction: ", link);
    

} catch (error) {
    console.error(error.message);
    
}