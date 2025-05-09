# **Linkd Career Timeline Explorer with LinkedIn Progress Checker**

## **Project Overview**
The goal of this project is to build an app that allows users to:
1. Search for professionals who have landed their **dream job** or **internship** at top companies.
2. Display a timeline of their career journey, showing key milestones like **education**, **internships**, and **first full-time job**.
3. **Scrape the user's LinkedIn profile** to compare their career progress with others who have achieved similar goals.

### **Key Features**:
1. **Search for Dream Jobs**: Users input a company name (e.g., Google, Meta) or a job title (e.g., Software Engineer) and receive a list of profiles that match their query.
2. **Career Journey Timeline**: For each profile, users can see a timeline that displays their educational background, internships, and first full-time job.
3. **Motivation and Insight**: The app provides users with insights into how others got to their dream job, including internships, school programs, clubs, and side projects.
4. **LinkedIn Scraping**: The app will scrape the user's LinkedIn profile (with their permission) and analyze their career path, then compare it to others who have achieved similar goals.
5. **Progress Tracker**: The user will receive feedback on how on-track they are compared to others in terms of their milestones like education, internships, and job progression.

### **Target Audience**:
- College students
- Recent graduates
- Career coaches or mentors in the tech industry

---

## **Technical Tools and Stack**

### **Frontend (UI and Interaction)**
1. **Next.js (React)**
   - **Why**: Next.js is a full-stack framework built on React, ideal for fast development. It provides automatic routing, easy page setup, and a simple way to call APIs. 
   - **Key Benefits**: Server-side rendering, API routes, fast page loads, flexible routing.

2. **TailwindCSS**
   - **Why**: Tailwind is a utility-first CSS framework that allows developers to rapidly build out clean and responsive designs without writing custom CSS.
   - **Key Benefits**: No need to worry about styling from scratch, mobile-first design, and super fast layout development.
   - **Implementation**: Simple utility classes (e.g., `bg-blue-500`, `text-white`, `p-4`) make it easy to create responsive layouts with minimal effort.

3. **Framer Motion (optional for animations)**
   - **Why**: Framer Motion is a powerful library for React that adds animations to components with little code. It can be used to animate transitions between different views, such as fading in search results or sliding in profile timelines.
   - **Key Benefits**: Easy to integrate, adds polish to the user experience, great for transitions and visual appeal.
   
### **Fetching Data**
1. **Axios or Fetch API**
   - **Why**: These are simple, reliable tools for making API requests. Axios has a cleaner syntax, but `fetch()` is built into modern JavaScript and works well for most requests.
   - **Use Case**: We’ll use Axios or `fetch()` to send requests to the Linkd API and get profile data based on the user’s search query.

2. **Linkd API**
   - **Why**: Linkd provides an API that allows you to search for people based on specific queries like job titles or companies. This will be used to gather the profiles of people who match the user’s search (e.g., "Software Engineer at Google").
   - **API Endpoint**: 
     - `POST https://api.linkd.inc/v1/search`
   - **Query Format**: `"Software Engineer Intern at Google"`
   - **Response Format**: JSON response with profile data like name, headline, education, experience.

3. **LinkedIn Scraping**
   - **Why**: In order to compare a user’s progress with those who achieved the same goal, we’ll need to extract relevant information from the user’s **LinkedIn profile** (with their permission). This will allow us to analyze their education, work experience, and current job status to provide a comparison.
   - **Tool**: 
     - **LinkedIn Scraping API** (or use **Puppeteer**/ **Cheerio** for custom scraping).
     - **LinkedIn OAuth**: Users can log in via LinkedIn using OAuth, which allows us to access public profile data.
   - **Data to Scrape**: Key milestones like **education**, **skills**, **work experience**, and **job titles**.

4. **Comparison Engine**
   - **Why**: Once the user’s LinkedIn data is scraped, we need a backend system to compare the user’s career milestones to others who have landed the same dream job (based on the data from the Linkd API).
   - **Approach**: Use algorithms to check if the user has similar internships, school experience, and current position as others in the same career trajectory. This can help gauge how “on-track” the user is compared to others.

### **Backend (API Routing and Calls)**
1. **Next.js API Routes**
   - **Why**: If the Linkd API requires protection of the API key, you can set up API routes within Next.js to make the API calls server-side. This helps keep the API key secure.
   - **Use Case**: Set up a `/api/search` route in Next.js, where the frontend sends a search query. The backend makes the call to Linkd’s API and returns the result to the frontend.

2. **LinkedIn OAuth**
   - **Why**: LinkedIn OAuth is used to authenticate users and retrieve the necessary data from their LinkedIn profiles.
   - **Use Case**: Set up OAuth authentication to let users securely log in and share their LinkedIn profile data.

---

## **Suggested Page Structure**

### **1. Search Page (/search)**
This will be the main page where users search for their dream jobs and see the results.

#### **Components**:
1. **Search Bar**
   - Input: "Enter company name or job title" (e.g., Google, Software Engineer)
   - Button: "Search"
   
2. **Search Results**
   - List of profiles matching the search query. Each result will be shown in a simple card format.
   - Example Result:
     - Name: Alice Johnson
     - Headline: Software Engineer Intern at Google
     - Education: UC Berkeley, Computer Science
     - Experience: Software Engineer Intern at Google (2023)
   - Clicking on a profile card will lead to the **Profile Timeline Page**.

#### **UI Features**:
- **Simple animations**: As results load, use a fade-in animation for each card to enhance UX (using TailwindCSS and Framer Motion).
- **Responsive design**: The page should work seamlessly on both desktop and mobile screens.

---

### **2. Profile Page (/profile/[id])**
When a user clicks on a profile from the search results, they will be taken to the profile timeline page, which will show the person’s **career journey**.

#### **Components**:
1. **Timeline**
   - **Vertical Timeline** (or Horizontal if preferred) showing key milestones:
     - **Education**: When they started college, graduation year, major, etc.
     - **Internships**: Companies and job titles, along with dates.
     - **First Full-time Job**: When they landed their first job after graduation.
     
2. **Timeline Format**:
   - **Education**: UC Berkeley, Computer Science (2019-2023)
   - **Internships**: 
     - Google Software Engineer Intern (2022)
     - Meta Software Engineer Intern (2021)
   - **First Full-Time Job**: Software Engineer at Google (2023-present)
   
3. **Data Visualization** (Optional):
   - Display the timeline as a scrollable or expandable list. You could use simple icons or badges to visually indicate each type of event (e.g., 🎓 for graduation, 💼 for internships).

#### **UI Features**:
- Use **Framer Motion** for sliding in the timeline elements when they click on a profile. This will create a smooth, interactive experience.

---

### **3. LinkedIn Progress Comparison (/profile/[id]/progress)**
After the user logs in with their LinkedIn profile, this page will display their **progress** compared to others who have achieved the same goal (e.g., a job at Google).

#### **Components**:
1. **LinkedIn Progress**
   - **Education Comparison**: How the user’s education timeline compares with those of people who have landed the same job.
   - **Internship Comparison**: Does the user have the same or similar internships as others who have achieved the same goal?
   - **Job Progress**: Where is the user in their career compared to others?

2. **Progress Tracker**:
   - A visual indicator (e.g., bar, graph, or checklist) showing how close the user is to matching the career milestones of those who landed the same job.

---

## **Folder Structure**

/pages /index.js // Home page with intro, optional /search.js // Search page (input + results display) /profile/[id].js // Profile page (timeline view for selected user) /profile/[id]/progress.js // LinkedIn progress comparison page

/components SearchBar.jsx // Search bar component ProfileCard.jsx // Profile card layout for search results Timeline.jsx // Timeline component to display career milestones LinkedInProgress.jsx // Component to compare user's progress to others

/utils linkdApi.js // Helper functions to call Linkd API using Axios or fetch() linkedinScraper.js // Function to scrape LinkedIn profile data

/public assets/ // Images, icons, logos (if needed)

/styles globals.css // Global styles (tailwind should be configured here)

---

## **Deployment**
1. **Vercel**: The app can be easily deployed on **Vercel** for free. Vercel supports Next.js out of the box, making it the best choice for quick deployment.
2. **GitHub**: Ensure the project is pushed to a GitHub repository before deployment for easy management.

---

## **Conclusion**
This app will allow users to search for their dream jobs, explore the career paths of those who have already landed them, get motivated by the timelines of their careers, and compare their progress to those who have followed similar paths. With **Next.js** and **TailwindCSS**, the app will be fast and easy to build, with minimal design overhead. The **Framer Motion** animations will add a subtle polish to the user experience, while **Linkd’s API** and **LinkedIn scraping** will provide the core data for profile search and progress tracking.

### **Next Steps**:
1. Set up the project with **Next.js** and **TailwindCSS**.
2. Implement the **search functionality**, **timeline views**, and **LinkedIn scraping**.
3. Deploy the app on **Vercel**.
4. Test, iterate, and showcase the app to potential users or hackathon judges.