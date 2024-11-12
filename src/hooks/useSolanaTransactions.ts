import { useState, useEffect, useCallback } from 'react';
import { Connection, PublicKey, ParsedTransactionWithMeta } from '@solana/web3.js';
import { SOLANA_RPC_ENDPOINTS, REFRESH_INTERVAL } from '../config/constants';

export function useSolanaTransactions(walletAddress: string) {
  const [transactions, setTransactions] = useState<ParsedTransactionWithMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEndpointIndex, setCurrentEndpointIndex] = useState(0);

  const rotateEndpoint = useCallback(() => {
    setCurrentEndpointIndex((current) => 
      current === SOLANA_RPC_ENDPOINTS.length - 1 ? 0 : current + 1
    );
  }, []);

  const fetchTransactions = useCallback(async () => {
    if (!walletAddress) {
      setError('Please enter a wallet address');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const connection = new Connection(SOLANA_RPC_ENDPOINTS[currentEndpointIndex], {
        commitment: 'confirmed',
        confirmTransactionInitialTimeout: 60000
      });

      const pubKey = new PublicKey(walletAddress);
      const signatures = await connection.getSignaturesForAddress(pubKey, { limit: 10 });
      
      const txPromises = signatures.map(sig => 
        connection.getParsedTransaction(sig.signature, 'confirmed')
      );
      
      const txs = await Promise.all(txPromises);
      setTransactions(txs.filter((tx): tx is ParsedTransactionWithMeta => tx !== null));
    } catch (error) {
      if (error instanceof Error) {
        const isRpcError = error.message.includes('403') || 
                          error.message.includes('429') || 
                          error.message.includes('timeout');
        
        if (isRpcError) {
          rotateEndpoint();
          setError(`RPC endpoint error. Trying another endpoint...`);
        } else {
          setError(error.message);
        }
      } else {
        setError('Invalid wallet address or network error');
      }
    } finally {
      setLoading(false);
    }
  }, [walletAddress, currentEndpointIndex, rotateEndpoint]);

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchTransactions]);

  return { 
    transactions, 
    loading, 
    error,
    currentEndpoint: SOLANA_RPC_ENDPOINTS[currentEndpointIndex]
  };
}