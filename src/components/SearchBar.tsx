'use client';

import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="flex items-center py-2" style={{ borderBottomWidth: '1px', borderBottomColor: 'var(--input-border)' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for people (e.g., 'People working on AI at FAANG')"
          className="appearance-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-primary)'
          }}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="flex-shrink-0 text-sm border-4 py-1 px-2 rounded"
          style={{
            backgroundColor: 'var(--button-primary)',
            borderColor: 'var(--button-primary)',
            color: 'white',
            opacity: (isLoading || !query.trim()) ? '0.5' : '1'
          }}
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
} 