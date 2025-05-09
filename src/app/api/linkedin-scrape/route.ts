import { NextRequest, NextResponse } from 'next/server';
import { scrapeLinkedInProfile, LinkedInProfile } from '@/utils/linkedinScraper';

// Mock profile data for testing/development
const mockProfileData: LinkedInProfile = {
  name: "Jane Doe",
  headline: "Software Engineer at Tech Company",
  education: [
    "Stanford University - Computer Science (2015-2019)",
    "Harvard University - MBA (2020-2022)"
  ],
  experience: [
    {
      title: "Software Engineer",
      company: "Tech Company",
      date_range: "2022 - Present"
    },
    {
      title: "Software Engineer Intern",
      company: "Google",
      date_range: "2021 - 2022"
    },
    {
      title: "Research Assistant",
      company: "Stanford AI Lab",
      date_range: "2018 - 2019"
    }
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning", "Product Management"]
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, profileUrl } = body;
    
    // Validate input
    if (!email || !password || !profileUrl) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Email, password, and profile URL are required' 
        },
        { status: 400 }
      );
    }
    
    let profileData: LinkedInProfile;
    const useMockData = process.env.NODE_ENV === 'development' && 
                        (process.env.USE_MOCK_LINKEDIN_DATA === 'true' || 
                         email.includes('test@example.com'));
    
    if (useMockData) {
      // Use mock data for testing/development purposes
      console.log('Using mock LinkedIn profile data');
      profileData = { ...mockProfileData };
    } else {
      // Scrape LinkedIn profile
      profileData = await scrapeLinkedInProfile(email, password, profileUrl);
    }
    
    // Return success response with the scraped data
    return NextResponse.json({
      status: 'success',
      data: profileData
    });
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    
    // In development mode, return mock data even on error
    if (process.env.NODE_ENV === 'development' && process.env.FALLBACK_TO_MOCK_ON_ERROR === 'true') {
      console.log('Falling back to mock LinkedIn profile data due to error');
      return NextResponse.json({
        status: 'success',
        data: mockProfileData,
        warning: 'Real scraping failed, using mock data instead'
      });
    }
    
    // Return error response
    return NextResponse.json(
      { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Failed to scrape LinkedIn profile' 
      },
      { status: 500 }
    );
  }
} 