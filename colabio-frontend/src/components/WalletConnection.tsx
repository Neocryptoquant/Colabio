import React, { useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import { network, endpoint } from '@/config/solana';

interface WalletConnectionProps {
  children: React.ReactNode;
}

"use client"

export const WalletConnection = ({ children }: WalletConnectionProps): JSX.Element => {
  // Using configuration from config file
  const endpoint = useMemo(() => endpoint as string, []);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking--
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  );

  // Handle errors
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Wallet connection error:', event);
      setError(event.message);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Wallet Connection Error</h1>
        <p className="mb-4 text-red-500">{error}</p>
        <button
          onClick={() => setError(null)}
          className="bg-[#9945FF] text-white px-4 py-2 rounded-lg hover:bg-[#8035e0]"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
