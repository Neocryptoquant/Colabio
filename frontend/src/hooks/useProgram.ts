'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as anchor from '@coral-xyz/anchor';
import { useMemo } from 'react';
import { IDL } from '../idl/colabio';
import type { Colabio } from '../types/colabio';

// This should match your program ID from Anchor.toml
export const PROGRAM_ID = new anchor.web3.PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || '2QkJLTKTtYFHS6xir1TEXLSdajM7r1Djf96JogKnRGSR'
);

export const useProgram = () => {
  const { connection } = useConnection();
  const { wallet } = useWallet();

  const program = useMemo(() => {
    if (!wallet) {
      console.warn('Anchor program not initialized: wallet not connected');
      return null;
    }
    if (!connection) {
      console.warn('Anchor program not initialized: connection not ready');
      return null;
    }
    try {
      const provider = new anchor.AnchorProvider(
        connection,
        wallet as any,
        {
          commitment: 'confirmed',
          preflightCommitment: 'confirmed',
        }
      );
      return new anchor.Program(
        IDL as any,
        PROGRAM_ID,
        provider
      );
    } catch (error) {
      console.error('Error initializing program:', error);
      return null;
    }
  }, [connection, wallet]);

  return { program };
}; 