import { NextResponse } from 'next/server';
import { testLinkedInScraper } from '@/utils/linkedinScraper';

export async function GET() {
  try {
    // Test the LinkedIn scraper setup
    const result = await testLinkedInScraper();
    
    // Return the result
    return NextResponse.json({ status: 'success', message: result });
  } catch (error) {
    // Return error response
    return NextResponse.json(
      { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'An unknown error occurred' 
      },
      { status: 500 }
    );
  }
} 