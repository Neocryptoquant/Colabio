'use client';

import { FC } from 'react';
import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

require('@solana/wallet-adapter-react-ui/styles.css');

const Navbar: FC = () => {
  const { wallet } = useWallet();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/" className="flex ml-2 md:mr-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Colabio
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/projects/create" 
              className="hidden sm:inline-flex items-center text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create Project
            </Link>
            <WalletMultiButton className="phantom-button" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 