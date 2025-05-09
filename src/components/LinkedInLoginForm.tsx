'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, EyeIcon, EyeOffIcon, Loader2, InfoIcon } from 'lucide-react';

const linkedInFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  profileUrl: z.string().url('Must be a valid LinkedIn profile URL').includes('linkedin.com/in/', {
    message: 'Must be a valid LinkedIn profile URL (linkedin.com/in/...)'
  }),
});

type LinkedInFormValues = z.infer<typeof linkedInFormSchema>;

interface LinkedInLoginFormProps {
  onSubmit: (data: LinkedInFormValues) => Promise<void>;
}

export default function LinkedInLoginForm({ onSubmit }: LinkedInLoginFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [testMode, setTestMode] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LinkedInFormValues>({
    resolver: zodResolver(linkedInFormSchema),
    defaultValues: {
      email: '',
      password: '',
      profileUrl: '',
    },
  });
  
  const enableTestMode = () => {
    setTestMode(true);
    setValue('email', 'test@example.com');
    setValue('password', 'password123');
    setValue('profileUrl', 'https://www.linkedin.com/in/test-profile/');
  };
  
  const handleFormSubmit = async (data: LinkedInFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    
    try {
      await onSubmit(data);
      setSuccess('LinkedIn profile scraping initiated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scrape LinkedIn profile');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Your LinkedIn Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">LinkedIn Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="password">LinkedIn Password</Label>
            <div className="relative">
              <Input 
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="profileUrl">Profile URL to Scrape</Label>
            <Input 
              id="profileUrl"
              type="url"
              placeholder="https://www.linkedin.com/in/your-profile/"
              {...register('profileUrl')}
            />
            {errors.profileUrl && (
              <p className="text-sm text-red-500">{errors.profileUrl.message}</p>
            )}
          </div>
          
          {testMode && (
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Test Mode Enabled</AlertTitle>
              <AlertDescription>
                Using test credentials. This will return mock profile data instead of actually scraping LinkedIn.
              </AlertDescription>
            </Alert>
          )}
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={enableTestMode}
              disabled={testMode || isSubmitting}
              className="text-xs"
            >
              Enable Test Mode
            </Button>
            
            <CardFooter className="flex-1 p-0">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Scrape LinkedIn Profile'
                )}
              </Button>
            </CardFooter>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 