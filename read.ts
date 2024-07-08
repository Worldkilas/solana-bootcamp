import { clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection= new Connection(clusterApiUrl('devnet'))
const address = new PublicKey('UjrPReZo5dq19a2LwGfAY5MJc8V2F8gnHSgoDgXP6Y3')
const balance= await connection.getBalance(address)
//balance in solana
const balance_in_sol= balance/LAMPORTS_PER_SOL
console.log(' Your balance is: ',balance);
console.log('The balance in sol is: ', balance_in_sol);
//NOTE: Lamports is the smallest unit of tokens in the solana network

