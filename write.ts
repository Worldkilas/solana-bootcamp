import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
/*
Transactions: a set of instructions that invoke solana program
They are atomic which means that they can either be succesful or fail
*/

import "dotenv/config";

import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const suppliedToKey= process.argv[2] || null

if (!suppliedToKey) {
    console.log('Please provide a wallet address to send sol to');
    process.exit(1)
    
}

const senderKeyPair=getKeypairFromEnvironment("SECRET_KEY")
console.log("supplied to this public key ", suppliedToKey);



