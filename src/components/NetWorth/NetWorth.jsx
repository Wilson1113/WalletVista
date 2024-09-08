import './NetWorth.css';
import AssetBreakdownChart from '../AssetBreakdownChart.jsx';
import React, { useMemo, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function NetWorth() {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState(null);
  const [usdBalance, setUsdBalance] = useState(null);

  // Create a connection to Solana's Mainnet
  const connection = useMemo(() => new Connection("https://young-proportionate-fire.solana-mainnet.quiknode.pro/0c17b37032345886c8c5af71d6ea9c9494dfe079/"), []);

  useEffect(() => {
    const getBalanceInfo = async () => {
      if (publicKey && connected) {
        // Get account information using the public key
        const balanceInLamports = await connection.getBalance(publicKey);
        // Convert balance from Lamports to SOL
        const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
        setBalance(balanceInSol);

        // Fetch the current SOL to USD exchange rate
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        const solToUsdRate = data.solana.usd;

        // Convert balance from SOL to USD
        const balanceInUsd = balanceInSol * solToUsdRate;
        setUsdBalance(balanceInUsd);
      }
    };

    getBalanceInfo();
  }, [publicKey, connected, connection]);

  return (
    <div className="networth">
      <h2>Net Worth</h2>
      <h1>${usdBalance !== null ? usdBalance.toFixed(2) : 'Loading...'}</h1>
      <AssetBreakdownChart />
    </div>
  );
}
