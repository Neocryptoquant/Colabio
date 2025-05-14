'use client';

import { ReactNode } from 'react';
import SolanaWalletProvider from './WalletProvider';

export default function ClientProvider({ children }: { children: ReactNode }) {
  return <SolanaWalletProvider>{children}</SolanaWalletProvider>;
} 