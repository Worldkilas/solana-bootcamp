import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const keypair= getKeypairFromEnvironment("SECRET_KEY")
const walletAddress= keypair.publicKey.toBase58()
console.log(walletAddress);

