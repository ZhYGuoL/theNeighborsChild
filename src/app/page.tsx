'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchUsers, setAuthToken } from '@/services/api';
import { SearchResponse } from '@/types';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import TokenInput from '@/components/TokenInput';
import SchoolFilter from '@/components/SchoolFilter';
import LimitSelector from '@/components/LimitSelector';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState('');
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [resultsLimit, setResultsLimit] = useState(10);
  
  // Load token from localStorage on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem('linkd_api_token');
    if (savedToken) {
      setToken(savedToken);
      setAuthToken(savedToken);
    }
  }, []);

  // Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('linkd_api_token', token);
      setAuthToken(token);
    } else {
      localStorage.removeItem('linkd_api_token');
    }
  }, [token]);

  // Search query
  const { data, isLoading, error } = useQuery<SearchResponse>({
    queryKey: ['searchUsers', searchQuery, selectedSchools, resultsLimit],
    queryFn: () => 
      searchUsers({ 
        query: searchQuery, 
        school: selectedSchools,
        limit: resultsLimit
      }),
    enabled: !!searchQuery && !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTokenSubmit = (newToken: string) => {
    setToken(newToken);
  };

  // Extract error message directly
  const errorMessage = error instanceof Error ? error.message : 
                       data?.error ? data.error : 
                       error ? String(error) : null;

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>Linkd People Search</h1>
        
        <TokenInput 
          onTokenSubmit={handleTokenSubmit} 
          hasToken={!!token} 
        />
        
        {token ? (
          <>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="w-full md:w-1/4">
                <div className="rounded-lg shadow p-4" style={{ backgroundColor: 'var(--card-bg)', boxShadow: '0 1px 3px 0 var(--card-border)' }}>
                  <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Filters</h2>
                  <SchoolFilter 
                    onFilterChange={setSelectedSchools} 
                    selectedSchools={selectedSchools} 
                  />
                  <LimitSelector 
                    limit={resultsLimit} 
                    onChange={setResultsLimit} 
                  />
                </div>
              </div>
              
              <div className="w-full md:w-3/4">
                <div className="rounded-lg shadow p-4 mb-6" style={{ backgroundColor: 'var(--card-bg)', boxShadow: '0 1px 3px 0 var(--card-border)' }}>
                  <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                </div>
                
                <div className="rounded-lg shadow p-4" style={{ backgroundColor: 'var(--card-bg)', boxShadow: '0 1px 3px 0 var(--card-border)' }}>
                  <SearchResults 
                    results={data?.results || []} 
                    total={data?.total || 0} 
                    isLoading={isLoading} 
                    searchQuery={searchQuery} 
                    error={errorMessage} 
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="px-4 py-3 rounded" style={{ 
            backgroundColor: 'rgba(234, 179, 8, 0.1)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(234, 179, 8, 0.2)',
            color: 'rgb(161, 98, 7)'
          }}>
            <p className="font-semibold">Please enter your API token</p>
            <p className="text-sm">You need to provide a valid Linkd API token to use this search interface.</p>
          </div>
        )}
      </div>
    </main>
  );
}
