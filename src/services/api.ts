import axios from 'axios';
import { SearchParams, SearchResponse } from '@/types';

const API_BASE_URL = 'https://search.linkd.inc/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the authorization token
export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Function to search users
export const searchUsers = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    const { query, limit = 10, school } = params;
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('query', query);
    
    if (limit) {
      queryParams.append('limit', limit.toString());
    }
    
    if (school && school.length > 0) {
      school.forEach(s => queryParams.append('school', s));
    }
    
    const response = await api.get<SearchResponse>(`/search/users?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle API key errors specifically
      if (error.response?.status === 401) {
        const errorDetail = error.response.data?.detail || "Invalid or expired API key";
        throw new Error(errorDetail);
      }
      
      // Handle other API errors
      if (error.response?.data) {
        // Try to extract error details from different possible formats
        const errorMessage = 
          error.response.data.error || 
          error.response.data.detail || 
          error.response.data.message || 
          JSON.stringify(error.response.data);
        throw new Error(errorMessage);
      }
    }
    
    // Generic error
    throw new Error('Failed to perform search. Please check your connection and try again.');
  }
}; 