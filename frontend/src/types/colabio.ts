import { IDL } from '../idl/colabio';
import type { Program } from '@coral-xyz/anchor';

export type Colabio = Program<typeof IDL>;

export interface ProjectAccount {
  title: string;
  creator: string;
  fundingGoal: number;
  totalFunded: number;
  description: string;
  category: string;
  state: 'funding' | 'goalReached' | 'failed' | 'cancelled' | 'withdrawn';
  escrowBump: number;
  publicKey: string;
} 