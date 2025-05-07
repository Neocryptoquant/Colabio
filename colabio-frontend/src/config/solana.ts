import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

/**
 * Solana network configuration
 * Currently set to Devnet for development
 */
export const network = WalletAdapterNetwork.Devnet;

/**
 * RPC endpoint URL for Solana network
 */
export const endpoint = clusterApiUrl(network);

/**
 * Solana connection instance with optimized configuration
 */
export const connection = new Connection(endpoint, {
  commitment: 'confirmed',
  confirmTransactionInitialTimeout: 30000, // 30 seconds
});

/**
 * Program ID for the Colabio crowdfunding program
 * This should match the program ID from Anchor.toml
 */
export const PROGRAM_ID = new PublicKey('871mFBQrG5nUgZppc6BmdNnFmYvDRu6ixEQhKwfSS95j');

/**
 * Helper function to get the program ID as a string
 */
export const getProgramIdString = () => {
  try {
    return PROGRAM_ID.toString();
  } catch (error) {
    console.error('Failed to get program ID string:', error);
    return 'Invalid Program ID';
  }
};
