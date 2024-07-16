import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
/*
    Keypairs are normally something that you should not be include in source code
    So because of that, I stored it in an environment so that I can use it dynamically
    through out the code

*/

const keypair= getKeypairFromEnvironment("SECRET_KEY")
const walletAddress= keypair.publicKey.toBase58() //public key
console.log(walletAddress);
console.log(keypair.secretKey);


const secretKey= keypair.secretKey// secret key
console.log("Process completed to load keys from environment");


