'use client';

import { useState } from 'react';

interface TokenInputProps {
  onTokenSubmit: (token: string) => void;
  hasToken: boolean;
}

export default function TokenInput({ onTokenSubmit, hasToken }: TokenInputProps) {
  const [token, setToken] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onTokenSubmit(token.trim());
    }
  };

  if (hasToken) {
    return (
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>✓ API Token set</span>
        <button
          onClick={() => onTokenSubmit('')}
          className="text-xs hover:underline"
          style={{ color: 'var(--error-text)' }}
        >
          Reset
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col">
        <label htmlFor="token" className="mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>
          API Token
        </label>
        <div className="flex">
          <div className="relative flex-grow">
            <input
              id="token"
              type={isVisible ? 'text' : 'password'}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your Linkd API token"
              className="rounded-l px-4 py-2 w-full focus:outline-none"
              style={{
                border: '1px solid var(--input-border)',
                backgroundColor: 'var(--input-bg)',
                color: 'var(--text-primary)'
              }}
            />
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-600"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {isVisible ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          <button
            type="submit"
            disabled={!token.trim()}
            className="font-bold py-2 px-4 rounded-r disabled:opacity-50"
            style={{ 
              backgroundColor: 'var(--button-primary)', 
              color: 'white',
              border: 'none'
            }}
          >
            Set Token
          </button>
        </div>
        <p className="mt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Your API token must be provided as a Bearer token for authentication.
          It will be stored in your browser&apos;s localStorage.
        </p>
      </div>
    </form>
  );
} 