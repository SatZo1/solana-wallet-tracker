import React from 'react';

interface WalletInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function WalletInput({ value, onChange }: WalletInputProps) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm"
        placeholder="Enter wallet address"
      />
    </div>
  );
}