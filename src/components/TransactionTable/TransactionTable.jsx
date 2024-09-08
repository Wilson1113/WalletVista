import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import './TransactionTable.css';

export default function TransactionTable() {
  const { publicKey, connected } = useWallet();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (publicKey && connected) {
      const connection = new Connection("https://young-proportionate-fire.solana-mainnet.quiknode.pro/0c17b37032345886c8c5af71d6ea9c9494dfe079/");

      const fetchTransactions = async () => {
        const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });
        const transactionDetails = await Promise.all(
          signatures.map(async (signature) => {
            const tx = await connection.getTransaction(signature.signature);
            return {
              date: new Date(tx.blockTime * 1000).toLocaleString(),
              txid: signature.signature,
              platform: 'Solana',
              type: tx.meta.postBalances[0] < tx.meta.preBalances[0] ? 'Receive' : 'Send',
              outgoing: tx.meta.postBalances[0] < tx.meta.preBalances[0] ? (tx.meta.preBalances[0] - tx.meta.postBalances[0]) / 1e9 : null,
              incoming: tx.meta.postBalances[0] > tx.meta.preBalances[0] ? (tx.meta.postBalances[0] - tx.meta.preBalances[0]) / 1e9 : null,
            };
          })
        );
        setTransactions(transactionDetails);
      };

      fetchTransactions();

      const subscriptionId = connection.onSignature(
        publicKey.toBase58(),
        async (signature) => {
          const tx = await connection.getTransaction(signature);
          const newTransaction = {
            date: new Date(tx.blockTime * 1000).toLocaleString(),
            txid: signature,
            platform: 'Solana',
            type: tx.meta.postBalances[0] < tx.meta.preBalances[0] ? 'Receive' : 'Send',
            outgoing: tx.meta.postBalances[0] < tx.meta.preBalances[0] ? (tx.meta.preBalances[0] - tx.meta.postBalances[0]) / 1e9 : null,
            incoming: tx.meta.postBalances[0] > tx.meta.preBalances[0] ? (tx.meta.postBalances[0] - tx.meta.preBalances[0]) / 1e9 : null,
          };
          setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
        },
        'confirmed'
      );

      return () => {
        connection.removeSignatureListener(subscriptionId);
      };
    }
  }, [publicKey, connected]);

  return (
    <div className='Transaction-table'>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>TXID</th>
            <th>Platforms</th>
            <th>Type</th>
            <th>Outgoing</th>
            <th>Incoming</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx.date}</td>
              <td>{tx.txid.slice(0, 6)}...</td>
              <td>
                <svg className="crypto-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="#9945FF"/>
                  <path d="M7.64 14.94l2.69-2.69-2.69-2.69 1.06-1.06 2.69 2.69 2.69-2.69 1.06 1.06-2.69 2.69 2.69 2.69-1.06 1.06-2.69-2.69-2.69 2.69-1.06-1.06z" fill="white"/>
                </svg>
                Solana
              </td>
              <td className={tx.type === 'Receive' ? 'receive' : 'send'}>{tx.type === 'Receive' ? '← Receive' : '→ Send'}</td>
              <td>{tx.incoming ? `- ${tx.incoming} SOL` : ''}</td>
              <td>{tx.outgoing ? `${tx.outgoing} SOL` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
  