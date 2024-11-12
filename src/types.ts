export interface Transaction {
  type: 'BUY' | 'SELL';
  token: string;
  amount: number;
  solAmount: number;
  price: number;
  timestamp: number;
  marketCap: number;
  signature: string;
}

export interface WalletData {
  address: string;
  transactions: Transaction[];
}

export interface TokenHolding {
  token: string;
  amount: number;
  percentage: number;
}