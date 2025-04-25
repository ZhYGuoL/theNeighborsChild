'use client';

import { UserResult } from '@/types';
import UserCard from './UserCard';

interface SearchResultsProps {
  results: UserResult[];
  total: number;
  isLoading: boolean;
  searchQuery: string;
  error: string | null;
}

export default function SearchResults({ 
  results, 
  total, 
  isLoading, 
  searchQuery, 
  error 
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        {error}
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
        <p>Enter a search query to find people.</p>
        <p className="text-sm mt-2">Try queries like &quot;People working on AI at FAANG&quot; or &quot;CS graduates working on autonomous vehicles&quot;</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
        <p>No results found for &quot;{searchQuery}&quot;</p>
        <p className="text-sm mt-2">Try a different search query or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4" style={{ color: 'var(--text-secondary)' }}>
        Found {total} result{total !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
      </div>
      <div className="space-y-4">
        {results.map((user) => (
          <UserCard key={user.profile.id} user={user} />
        ))}
      </div>
    </div>
  );
} 