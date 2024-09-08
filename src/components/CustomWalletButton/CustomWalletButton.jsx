import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';


export default function CustomWalletButton() {
  const { publicKey } = useWallet();

  return (
    <WalletMultiButton>
      {publicKey ? `Connected: ${publicKey.toString().slice(0, 6)}...${publicKey.toString().slice(-4)}` : 'Connect your wallet'}
    </WalletMultiButton>
  );
}
