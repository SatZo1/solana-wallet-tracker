import React from 'react';
import { format } from 'date-fns';
import { Target, Link } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(transaction.price);

  const formattedMC = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
  }).format(transaction.marketCap);

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 text-white">
      <div className="flex items-center gap-2 mb-2">
        {transaction.type === 'BUY' ? (
          <div className="flex items-center text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-400 mr-2" />
            <span className="text-xl font-bold">BUY</span>
          </div>
        ) : (
          <div className="flex items-center text-red-400">
            <div className="w-2 h-2 rounded-full bg-red-400 mr-2" />
            <span className="text-xl font-bold">SELL</span>
          </div>
        )}
        <Target className="w-5 h-5" />
        <span className="text-xl">on PUMP FUN</span>
      </div>

      <div className="mb-2">
        <span className="text-blue-400">💎 {transaction.token}</span>
        {transaction.type === 'BUY' ? (
          <span> swapped {transaction.solAmount} SOL for {transaction.amount.toLocaleString()}</span>
        ) : (
          <span> swapped {transaction.amount.toLocaleString()} for {transaction.solAmount} SOL</span>
        )}
        <span className="text-gray-400"> @${transaction.price}</span>
      </div>

      <div className="flex items-center gap-2 text-gray-300">
        <Link className="w-4 h-4" />
        <Target className="w-4 h-4" />
        <span>| MC: {formattedMC} | Seen: {format(transaction.timestamp, 'mm:ss')}</span>
      </div>

      <div className="mt-2 text-gray-400 text-sm font-mono break-all">
        {transaction.signature}
      </div>
    </div>
  );
}