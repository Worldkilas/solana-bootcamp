import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import 'dotenv/config'
import { getExplorerLink,getKeypairFromEnvironment} from "@solana-developers/helpers";
import { Connection,PublicKey,clusterApiUrl } from "@solana/web3.js";

const connection= new Connection(clusterApiUrl('devnet'))


const user= getKeypairFromEnvironment("SECRET_KEY")
console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
  );

//acct that holds details about the token
const tokenMintAcct= new PublicKey("8MgXPtjmbTHyFLSQQ7r9zspNxpVzWbUU2KTZ9k8jbZpj")

const recipient= user.publicKey
try {

    //token account to hold the new minted tokens
    const tokenAcct= await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        tokenMintAcct,
        recipient
    )
    console.log("Token acct: ", tokenAcct.address.toBase58());
    const link = getExplorerLink(
        "address",
        tokenAcct.address.toBase58(),
        "devnet"
      );
      
      console.log(`✅ Created token Account: ${link}`);
    
} catch (error) {
    console.error("Error: ", error);
    
}