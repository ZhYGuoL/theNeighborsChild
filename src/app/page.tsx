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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
    <main className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-6xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Linkd People Search</h1>
          <p className="text-muted-foreground">Search for professionals using natural language queries</p>
        </div>
        
        <TokenInput 
          onTokenSubmit={handleTokenSubmit} 
          hasToken={!!token} 
        />
        
        {!token && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>
              You need to provide a valid Linkd API token to use this search interface.
            </AlertDescription>
          </Alert>
        )}
        
        {token && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Search Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SchoolFilter 
                    onFilterChange={setSelectedSchools} 
                    selectedSchools={selectedSchools} 
                  />
                  <Separator />
                  <LimitSelector 
                    limit={resultsLimit} 
                    onChange={setResultsLimit} 
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Tabs defaultValue="search" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="search">Search</TabsTrigger>
                  <TabsTrigger value="about">About This Tool</TabsTrigger>
                </TabsList>
                <TabsContent value="search" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <SearchResults 
                        results={data?.results || []} 
                        total={data?.total || 0} 
                        isLoading={isLoading} 
                        searchQuery={searchQuery} 
                        error={errorMessage} 
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="about">
                  <Card>
                    <CardHeader>
                      <CardTitle>About the Linkd Search API</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>This demo showcases the Linkd Search API, which allows you to search for professionals using natural language queries.</p>
                      
                      <h3 className="text-lg font-semibold">Example Queries</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>&quot;People working on AI at FAANG&quot;</li>
                        <li>&quot;People who started companies in Web3 or crypto&quot;</li>
                        <li>&quot;PhDs now working at FAANG companies&quot;</li>
                        <li>&quot;Who works at a VC firm?&quot;</li>
                        <li>&quot;CS graduates working on autonomous vehicles&quot;</li>
                        <li>&quot;People working on biotech in the Bay Area&quot;</li>
                      </ul>
                      
                      <Alert>
                        <InfoIcon className="h-4 w-4" />
                        <AlertTitle>API Information</AlertTitle>
                        <AlertDescription>
                          The Linkd Search API requires authentication. Your token is stored locally and only sent to the Linkd API servers.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
