import React, { useState } from 'react';
import { TransactionCard } from './TransactionCard';
import { WalletData, Transaction } from '../types';

export function WalletTracker() {
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [newWallet, setNewWallet] = useState('');

  const addWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWallet && !wallets.find(w => w.address === newWallet)) {
      setWallets([...wallets, { address: newWallet, transactions: [] }]);
      setNewWallet('');
    }
  };

  const addTransaction = (walletAddress: string, transaction: Transaction) => {
    setWallets(wallets.map(wallet => {
      if (wallet.address === walletAddress) {
        return {
          ...wallet,
          transactions: [...wallet.transactions, transaction].sort((a, b) => b.timestamp - a.timestamp)
        };
      }
      return wallet;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={addWallet} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={newWallet}
            onChange={(e) => setNewWallet(e.target.value)}
            placeholder="Enter Solana wallet address"
            className="flex-1 p-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Wallet
          </button>
        </div>
      </form>

      {wallets.map(wallet => (
        <div key={wallet.address} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-white">
            Wallet: {wallet.address.slice(0, 8)}...{wallet.address.slice(-8)}
          </h2>
          <div className="space-y-4">
            {wallet.transactions.map((tx, index) => (
              <TransactionCard key={index} transaction={tx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}