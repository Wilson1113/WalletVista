import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useMemo } from 'react';
import Dashboard from './pages/Dashboard.jsx'
import NoPage from './pages/NoPage'
import Transaction from './pages/Transaction.jsx'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';


function App() {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => "https://young-proportionate-fire.solana-mainnet.quiknode.pro/0c17b37032345886c8c5af71d6ea9c9494dfe079/");

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className='main-container'>
            <BrowserRouter>
              <Routes>
                <Route index element={<Dashboard/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/history' element={<Transaction/>}/>
                <Route path='*' element={<NoPage/>}/>
              </Routes>
            </BrowserRouter>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
