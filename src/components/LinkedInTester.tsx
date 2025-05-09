'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, LinkedinIcon, InfoIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LinkedInLoginForm from './LinkedInLoginForm';
import LinkedInProfileDisplay from './LinkedInProfileDisplay';
import { LinkedInProfile } from '@/utils/linkedinScraper';

export default function LinkedInTester() {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{ status: string; message: string } | null>(null);
  const [scrapedProfile, setScrapedProfile] = useState<LinkedInProfile | null>(null);
  
  // Test the LinkedIn scraper setup
  const testLinkedInScraper = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/linkedin-test');
      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      setTestResult({
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to test LinkedIn scraper'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle form submission for LinkedIn scraping
  const handleLinkedInFormSubmit = async (data: { 
    email: string; 
    password: string; 
    profileUrl: string; 
  }) => {
    try {
      const response = await fetch('/api/linkedin-scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.status === 'error') {
        throw new Error(result.message);
      }
      
      // Set scraped profile data
      setScrapedProfile(result.data);
      
      return result;
    } catch (error) {
      console.error('Error scraping LinkedIn profile:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <LinkedinIcon className="h-6 w-6 text-[#0077B5]" />
              <CardTitle>LinkedIn Scraper</CardTitle>
            </div>
            <CardDescription>
              Connect your LinkedIn profile to compare your career journey with others
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Our LinkedIn scraper allows you to automatically extract information from your LinkedIn profile
              to compare your career progress with others who have achieved similar goals.
            </p>
            
            <Alert variant="default">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>How it works</AlertTitle>
              <AlertDescription>
                After providing your LinkedIn credentials, we analyze your education, work experience, 
                and skills to help you track your progress toward your career goals.
              </AlertDescription>
            </Alert>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
              <h4 className="font-medium mb-2">Information we extract:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Education history and institutions</li>
                <li>Work experience and roles</li>
                <li>Skills and endorsements</li>
                <li>Certifications and accomplishments</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Verify LinkedIn Integration</CardTitle>
            <CardDescription>
              Test if the LinkedIn scraper is properly installed and configured
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Click the button below to verify that the LinkedIn scraper is properly configured. 
              No actual scraping will be performed at this stage.
            </p>
            
            <Separator />
            
            {testResult && (
              <Alert variant={testResult.status === 'success' ? 'default' : 'destructive'}>
                {testResult.status === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>{testResult.status === 'success' ? 'Success' : 'Error'}</AlertTitle>
                <AlertDescription>{testResult.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={testLinkedInScraper} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Testing...' : 'Test LinkedIn Scraper'}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Tabs defaultValue="scrape" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scrape">Scrape a Profile</TabsTrigger>
          <TabsTrigger value="results" disabled={!scrapedProfile}>Results</TabsTrigger>
        </TabsList>
        <TabsContent value="scrape" className="pt-4">
          <LinkedInLoginForm onSubmit={handleLinkedInFormSubmit} />
        </TabsContent>
        <TabsContent value="results" className="pt-4">
          {scrapedProfile ? (
            <LinkedInProfileDisplay profile={scrapedProfile} />
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">
                  No profile data to display yet. Please scrape a LinkedIn profile first.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 