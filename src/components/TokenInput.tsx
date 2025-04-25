'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Eye, EyeOff, Key } from 'lucide-react';

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
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
          <Key className="h-3 w-3 mr-1" />
          API Token Set
        </Badge>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onTokenSubmit('')}
          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 h-7 px-2 text-xs"
        >
          Reset
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Authentication</CardTitle>
        <CardDescription>
          Enter your Linkd API token to access the search functionality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="token"
                type={isVisible ? 'text' : 'password'}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your Linkd API token"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">
                  {isVisible ? 'Hide token' : 'Show token'}
                </span>
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={!token.trim()}
            className="w-full"
          >
            <Key className="h-4 w-4 mr-2" />
            Set API Token
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <p>Your API token is stored locally in your browser&apos;s localStorage.</p>
        </div>
      </CardFooter>
    </Card>
  );
} 