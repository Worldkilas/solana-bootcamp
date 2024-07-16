// Import necessary modules from the @solana/web3.js library
import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

// A transaction in Solana is a set of instructions that invoke Solana programs. They are atomic, meaning they either succeed entirely or fail entirely.

import "dotenv/config"; // Import dotenv to load environment variables from a .env file

import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers"; // Import helper functions for airdropping SOL and getting keypair from the environment

const suppliedToKey = process.argv[2] || null; // Get the recipient wallet address from the command line arguments

// If no wallet address is provided, log an error message and exit the program
if (!suppliedToKey) {
    console.log('Please provide a wallet address to send SOL to');
    process.exit(1);
}

const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY"); // Retrieve the sender's keypair from the environment variables
console.log("Supplied to this public key: ", suppliedToKey);
const toPubKey = new PublicKey(suppliedToKey); // Create a PublicKey object from the provided wallet address
const connection = new Connection(clusterApiUrl('devnet'), "confirmed"); // Establish a connection to the Solana devnet cluster

console.log("✅ Loaded our own keypair, the destination public key, and connected to Solana");

const transaction = new Transaction(); // Create a new transaction object
const solToSend = 5; // Amount of SOL to send

// Create an instruction to transfer SOL from the sender to the recipient
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey, // Sender's public key
    toPubkey: toPubKey, // Recipient's public key
    lamports: solToSend * LAMPORTS_PER_SOL // Amount to send, converted to lamports (1 SOL = 1,000,000,000 lamports)
});

// Airdrop SOL to the sender's account if needed, ensuring they have enough balance for the transaction and fees
await airdropIfRequired(connection, senderKeyPair.publicKey, solToSend * LAMPORTS_PER_SOL, 2 * LAMPORTS_PER_SOL);

try {
    transaction.add(sendSolInstruction); // Add the transfer instruction to the transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeyPair]); // Send the transaction and await confirmation
    console.log("Sent ", solToSend, " SOL to the address ", toPubKey.toBase58()); // Log the success message with the transaction details
} catch (error) {
    console.error(error.message); // Log any errors that occur during the transaction
}
