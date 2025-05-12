import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

/**
 * Solana network configuration
 * Currently set to Devnet for development
 */
export const network: WalletAdapterNetwork = WalletAdapterNetwork.Devnet;

/**
 * RPC endpoint URL for Solana network
 */
export const endpoint: string = clusterApiUrl(network);

/**
 * Solana connection instance with optimized configuration
 */
export const connection: Connection = new Connection(endpoint, {
  commitment: 'confirmed',
  confirmTransactionInitialTimeout: 30000, // 30 seconds
});

/**
 * Program ID for the Colabio crowdfunding program
 * This should match the program ID from Anchor.toml
 */
export const PROGRAM_ID: PublicKey = new PublicKey('DSU6vAdyoNZwuQFPY4fenDuFtycxf615Pu2jXME9DDzp');

/**
 * Helper function to get the program ID as a string
 */
export function getProgramIdString(): string {
  try {
    return PROGRAM_ID.toString();
  } catch (error) {
    console.error('Failed to get program ID string:', error);
    return 'Invalid Program ID';
  }
};
