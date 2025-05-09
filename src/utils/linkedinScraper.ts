import { spawn } from 'child_process';

export interface LinkedInProfile {
  name?: string;
  headline?: string;
  education?: string[];
  experience?: {
    title: string;
    company: string;
    date_range: string;
  }[];
  skills?: string[];
}

/**
 * Scrapes LinkedIn profile data using the linkedin_scraper Python package
 * @param username LinkedIn username or email
 * @param password LinkedIn password
 * @param profileUrl URL of the LinkedIn profile to scrape
 * @returns Promise with the scraped profile data
 */
export async function scrapeLinkedInProfile(
  username: string,
  password: string,
  profileUrl: string
): Promise<LinkedInProfile> {
  return new Promise((resolve, reject) => {
    // Create a Python script that will be executed
    const pythonScript = `
import json
import sys
import traceback

try:
    # Import the linkedin_scraper library - note that it uses Selenium internally
    from linkedin_scraper import Person, actions

    # Set up the driver - this is handled by linkedin_scraper, but we need a driver object
    print("Initializing scraper...", file=sys.stderr)
    from selenium import webdriver
    driver = webdriver.Chrome()
    
    # Login to LinkedIn using the actions module
    print("Logging in to LinkedIn...", file=sys.stderr)
    email = "${username}"
    password = "${password}"
    actions.login(driver, email, password)
    
    # Wait for login to complete
    print("Waiting for login to complete...", file=sys.stderr)
    
    # Scrape the profile using Person class
    print(f"Scraping profile: ${profileUrl}", file=sys.stderr)
    person = Person("${profileUrl}", driver=driver)
    
    # Format the education and experience data
    education_list = []
    for edu in person.educations:
        if hasattr(edu, 'institution_name') and edu.institution_name:
            education_str = edu.institution_name
            
            # Add degree if available
            if hasattr(edu, 'degree') and edu.degree:
                education_str += f" - {edu.degree}"
                
            # Add dates if available
            date_range = ""
            if hasattr(edu, 'from_date') and edu.from_date:
                date_range += str(edu.from_date)
            if hasattr(edu, 'to_date') and edu.to_date:
                date_range += f"-{edu.to_date}"
            if date_range:
                education_str += f" ({date_range})"
                
            education_list.append(education_str)
    
    experience_list = []
    if hasattr(person, 'experiences'):
        for exp in person.experiences:
            try:
                # Extract the position title
                title = ""
                if hasattr(exp, 'position_title') and exp.position_title:
                    title = exp.position_title
                
                # Extract the company name
                company = ""
                if hasattr(exp, 'institution_name') and exp.institution_name:
                    company = exp.institution_name
                
                # Create the date range
                date_range = ""
                if hasattr(exp, 'from_date') and exp.from_date:
                    date_range += str(exp.from_date)
                if hasattr(exp, 'to_date') and exp.to_date:
                    date_range += f" - {exp.to_date}"
                else:
                    date_range += " - Present"
                
                # Add the experience if we have at least a title or company
                if title or company:
                    experience_list.append({
                        "title": title or "Unknown Position",
                        "company": company or "Unknown Company",
                        "date_range": date_range
                    })
            except Exception as exp_error:
                print(f"Error processing experience: {exp_error}", file=sys.stderr)
    
    # Create a dictionary to store the profile data
    profile_data = {
        "name": person.name if hasattr(person, 'name') else None,
        "headline": person.headline if hasattr(person, 'headline') else None,
        "education": education_list,
        "experience": experience_list,
        "skills": person.skills if hasattr(person, 'skills') and person.skills else []
    }
    
    # Output the data as JSON
    print(json.dumps(profile_data))
    
except Exception as e:
    error_msg = f"Error scraping LinkedIn profile: {str(e)}\\n{traceback.format_exc()}"
    print(error_msg, file=sys.stderr)
    # Also output a valid JSON with error info to stdout for easier parsing
    print(json.dumps({"error": error_msg}))
finally:
    if 'driver' in locals():
        print("Closing browser...", file=sys.stderr)
        driver.quit()
`;

    // Execute the Python script
    const pythonProcess = spawn('python3', ['-c', pythonScript]);
    
    let outputData = '';
    let errorData = '';
    
    pythonProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      errorData += data.toString();
      console.log(`Python stderr: ${data.toString()}`);
    });
    
    pythonProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
      console.log(`Python stdout: ${outputData}`);
      console.log(`Python stderr: ${errorData}`);
      
      if (code !== 0) {
        reject(new Error(`Python process exited with code ${code}. Error: ${errorData}`));
        return;
      }
      
      try {
        // Try to parse the JSON output
        let outputStr = outputData.trim();
        
        // Check if output is empty
        if (!outputStr) {
          reject(new Error(`No output from Python script. Error: ${errorData}`));
          return;
        }
        
        // If multiple JSON objects are printed, try to get the last one
        if (outputStr.includes('}\n{')) {
          const lastBraceIndex = outputStr.lastIndexOf('{');
          outputStr = outputStr.substring(lastBraceIndex);
        }
        
        const profile = JSON.parse(outputStr);
        
        if (profile.error) {
          reject(new Error(profile.error));
        } else {
          resolve(profile);
        }
      } catch (error) {
        reject(new Error(`Failed to parse Python output: ${error}. Output was: ${outputData}`));
      }
    });
  });
}

/**
 * Test function to verify LinkedIn scraper functionality
 * This is a simplified version just to verify the scraper works
 */
export async function testLinkedInScraper(): Promise<string> {
  try {
    // Check if Python and the required packages are installed
    const pythonTestScript = `
import sys
import json

try:
    # Import linkedin_scraper
    import linkedin_scraper
    
    # Output success as JSON
    result = {
        "linkedin_scraper_version": linkedin_scraper.__version__ if hasattr(linkedin_scraper, "__version__") else "unknown",
        "status": "installed"
    }
    print(json.dumps(result))
except ImportError as e:
    # Output error as JSON
    print(json.dumps({"error": str(e)}))
except Exception as e:
    import traceback
    print(json.dumps({
        "error": str(e),
        "traceback": traceback.format_exc()
    }))
`;

    const pythonProcess = spawn('python3', ['-c', pythonTestScript]);
    
    let outputData = '';
    let errorData = '';
    
    pythonProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      errorData += data.toString();
    });
    
    return new Promise((resolve, reject) => {
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          resolve(`LinkedIn scraper test failed with code ${code}. You may need to install the required dependencies. Error: ${errorData}`);
          return;
        }
        
        try {
          const result = JSON.parse(outputData.trim());
          if (result.error) {
            resolve(`LinkedIn scraper is installed but there was an issue: ${result.error}`);
          } else {
            resolve(`LinkedIn scraper is installed and configured. Using linkedin_scraper version ${result.linkedin_scraper_version}`);
          }
        } catch (error) {
          resolve(`LinkedIn scraper is installed, but couldn't verify versions. To use it with real credentials, provide a username, password, and profile URL.`);
        }
      });
    });
  } catch (error) {
    return `Error testing LinkedIn scraper: ${error instanceof Error ? error.message : String(error)}`;
  }
} 