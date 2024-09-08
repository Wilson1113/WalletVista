import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import './BalanceTable.css';

export default function BalanceTable() {
  const { publicKey, connected } = useWallet();
  const [balances, setBalances] = useState([]);
  const [priceChanges, setPriceChanges] = useState({});

  useEffect(() => {
    const getTokenBalances = async () => {
      if (publicKey && connected) {
        const connection = new Connection("https://young-proportionate-fire.solana-mainnet.quiknode.pro/0c17b37032345886c8c5af71d6ea9c9494dfe079/");
        
        // Fetch SOL balance
        const solBalance = await connection.getBalance(publicKey);
        const solBalanceInSol = solBalance / 1e9; // Convert lamports to SOL

        // Fetch all token accounts for the wallet
        const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') });
        
        const tokenBalances = tokenAccounts.value.map(({ account }) => {
          const amount = account.data.parsed.info.tokenAmount.uiAmount;
          const mint = account.data.parsed.info.mint;
          return { mint, amount };
        });

        // Combine SOL balance with token balances
        const combinedBalances = [{ mint: 'SOL', amount: solBalanceInSol }, ...tokenBalances];

        setBalances(combinedBalances);
      }
    };

    const fetchPriceChanges = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana,bonk,raydium&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();

        const changes = {
          SOL: data.solana.usd_24h_change,
          BONK: data.bonk.usd_24h_change,
          RAY: data.raydium.usd_24h_change
        };

        setPriceChanges(changes);
      } catch (error) {
        console.error('Error fetching price changes:', error);
      }
    };

    getTokenBalances();
    fetchPriceChanges();

    const interval = setInterval(fetchPriceChanges, 60000); // Fetch price changes every minute

    return () => clearInterval(interval);
  }, [publicKey, connected]);

  return (
    <div className="balance-table">
      <h2>Balances</h2>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Amount</th>
            <th>24h Change</th>
          </tr>
        </thead>
        <tbody>
          {balances.map((balance, index) => (
            <tr key={index}>
              <td>{balance.mint}</td>
              <td>{balance.amount}</td>
              <td className={priceChanges[balance.mint] >= 0 ? "price-change-positive" : "price-change-negative"}>
                {priceChanges[balance.mint] ? `${priceChanges[balance.mint].toFixed(2)}%` : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
