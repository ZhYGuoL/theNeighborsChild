# Linkd Search API Demo

A Next.js application that demonstrates how to use the Linkd Search API to find and display user profiles based on search queries.

## Features

- Search for users using natural language queries
- Filter results by school name
- Adjust the number of results shown
- Secure API token storage
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Linkd API token

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd search-api-demo
```

2. Install dependencies:

```bash
npm install
```

3. Set up your API key:

   Enter your API key directly in the application UI when you run it.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. If you've set up the API token via environment variable, it will be loaded automatically.
   Otherwise, enter your Linkd API token in the token input field.
2. Type a search query in the search bar (e.g., "People working on AI at FAANG")
3. Optionally, filter results by school
4. View user profiles and their details

## Example Queries

- "People working on AI at FAANG"
- "People who started companies in Web3 or crypto"
- "PhDs now working at FAANG companies"
- "Who works at a VC firm?"
- "CS graduates working on autonomous vehicles"
- "People working on biotech in the Bay Area"

## API Reference

This application uses the Linkd Search API. The endpoint structure is:

```
GET /api/search/users
```

Required headers:
- `Authorization: Bearer <token>`

Query parameters:
- `query` (required): The search query string
- `limit` (optional): Maximum number of results to return (default: 10, max: 30)
- `school` (optional): Filter results by school name(s)

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TanStack Query](https://tanstack.com/query) - Data fetching library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Axios](https://axios-http.com/) - HTTP client
