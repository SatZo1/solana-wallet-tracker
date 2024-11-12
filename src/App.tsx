import React from 'react';
import { WalletTracker } from './components/WalletTracker';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 p-4 mb-8">
        <h1 className="text-2xl font-bold text-white text-center">
          Solana Wallet Tracker
        </h1>
      </header>
      <WalletTracker />
    </div>
  );
}

export default App;