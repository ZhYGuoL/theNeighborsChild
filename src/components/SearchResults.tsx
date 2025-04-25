'use client';

import { UserResult } from '@/types';
import UserCard from './UserCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, AlertCircle, FileSearch } from 'lucide-react';

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
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-full mt-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!searchQuery) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Enter a search query</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Try queries like &quot;People working on AI at FAANG&quot; or &quot;CS graduates working on autonomous vehicles&quot;
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
          <FileSearch className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No results found</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          No results found for &quot;{searchQuery}&quot;. Try a different search query or adjust your filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-sm text-muted-foreground mb-6">
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