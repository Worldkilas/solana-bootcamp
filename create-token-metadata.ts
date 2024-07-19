import 'dotenv/config'
import { getKeypairFromEnvironment,getExplorerLink, } from "@solana-developers/helpers";
import { 
    Connection,
    clusterApiUrl,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
 } from "@solana/web3.js";
 import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

 //get the user from the environment variable
 const user= getKeypairFromEnvironment("SECRET_KEY")
 const connection= new Connection(clusterApiUrl("devnet"))

 console.log("Loaded our keypair succesfully. The public key is: ",user.publicKey.toBase58());
 
 const TOKEN_METADATA_PROGRAM_ID= new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
 
 const tokenMintAcct= new PublicKey("8MgXPtjmbTHyFLSQQ7r9zspNxpVzWbUU2KTZ9k8jbZpj")
 const metadata= {
    name: "KONNEKTO",
    symbol: "KNT",
    uri: 'https://arweave.net/py3LMPP5a0Nngavn0-9X77Tmonz5sLw535Ro3sQi040',
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null

 }

 const metadataPDAAndBump= PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAcct.toBuffer()
    ],
    TOKEN_METADATA_PROGRAM_ID
 )
 const metadataPDA= metadataPDAAndBump[0]
 const transaction= new Transaction()
 const createMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint: tokenMintAcct,
        mintAuthority:user.publicKey,
        payer: user.publicKey,
        updateAuthority:user.publicKey,
    },
    {
        createMetadataAccountArgsV3:{
            collectionDetails:null,
            data: metadata,
            isMutable: true
        }
    }
 )
 transaction.add(createMetadataAccountInstruction)
 const transactionSignature=await sendAndConfirmTransaction(connection,transaction,[user])
 const transactionLink= getExplorerLink(
    "transaction",
    transactionSignature,
    'devnet'
 )
 console.log("Transaction confirmed, explorer link is: ", transactionLink);
 
 const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAcct.toString(),
    "devnet"
  );
  
  console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);