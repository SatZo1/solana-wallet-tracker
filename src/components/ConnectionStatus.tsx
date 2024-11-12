import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface ConnectionStatusProps {
  endpoint: string;
  isError: boolean;
}

export function ConnectionStatus({ endpoint, isError }: ConnectionStatusProps) {
  const displayEndpoint = new URL(endpoint).hostname;
  
  return (
    <div className="flex items-center justify-between bg-gray-800/50 rounded-lg px-3 py-2 mb-4">
      <div className="flex items-center space-x-2">
        {isError ? (
          <WifiOff size={16} className="text-red-400" />
        ) : (
          <Wifi size={16} className="text-green-400" />
        )}
        <span className="text-xs text-gray-400">
          {displayEndpoint}
        </span>
      </div>
      <span className={`text-xs ${isError ? 'text-red-400' : 'text-green-400'}`}>
        {isError ? 'Reconnecting...' : 'Connected'}
      </span>
    </div>
  );
}