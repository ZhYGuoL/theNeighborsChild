import os
import google.generativeai as genai
from dotenv import load_dotenv
from typing import List, Dict
import json

# Load environment variables
load_dotenv()

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GEMINI_API_KEY)

def analyze_timeline_similarity(user_profile: Dict, entries: List[Dict]) -> List[Dict]:
    """
    Analyze entries and find the 5 most similar ones to the user's profile timeline.
    
    Args:
        user_profile (Dict): The user's profile containing timeline information
        entries (List[Dict]): List of entries to analyze
        
    Returns:
        List[Dict]: Top 5 most similar entries
    """
    # Initialize Gemini model
    model = genai.GenerativeModel('gemini-pro')
    
    # Prepare the prompt
    prompt = f"""
    Given the following user profile timeline:
    {json.dumps(user_profile, indent=2)}
    
    And these entries:
    {json.dumps(entries, indent=2)}
    
    Please analyze the timeline similarities and return the 5 entries that have the most similar timeline patterns.
    Consider factors such as:
    - Time periods
    - Life events
    - Geographic locations
    - Major life transitions
    
    Return the results as a JSON array of the 5 most similar entries.
    """
    
    # Get response from Gemini
    response = model.generate_content(prompt)
    
    try:
        # Parse the response and return the top 5 similar entries
        similar_entries = json.loads(response.text)
        return similar_entries[:5]
    except json.JSONDecodeError:
        print("Error parsing Gemini response")
        return []

def display_similar_entries(similar_entries: List[Dict]):
    """
    Display the similar entries in a formatted way.
    
    Args:
        similar_entries (List[Dict]): List of similar entries to display
    """
    print("\nTop 5 Similar Timeline Entries:")
    print("-" * 50)
    
    for i, entry in enumerate(similar_entries, 1):
        print(f"\nEntry {i}:")
        for key, value in entry.items():
            print(f"{key}: {value}")
        print("-" * 50)

# Example usage
if __name__ == "__main__":
    # Example user profile (replace with actual data)
    user_profile = {
        "timeline": {
            "birth_year": 1990,
            "education": "Bachelor's Degree",
            "career": "Software Engineer",
            "location": "San Francisco"
        }
    }
    
    # Example entries (replace with actual data)
    entries = [
        {
            "id": 1,
            "timeline": {
                "birth_year": 1988,
                "education": "Bachelor's Degree",
                "career": "Software Developer",
                "location": "San Francisco"
            }
        }
        # Add more entries here
    ]
    
    similar_entries = analyze_timeline_similarity(user_profile, entries)
    display_similar_entries(similar_entries) 