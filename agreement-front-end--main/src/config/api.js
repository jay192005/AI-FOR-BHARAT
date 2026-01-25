// API Configuration for lekha.ai Frontend

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  // Check if we're in development or production
  if (process.env.NODE_ENV === 'development') {
    // Local Flask backend
    return 'http://127.0.0.1:5000';
  } else {
    // Production backend (update this when deploying)
    return process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
  }
};

export const API_BASE_URL = getApiBaseUrl();

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  ANALYZE: '/api/analyze',
  HISTORY: '/api/history',
  HEALTH: '/api/health',
  DELETE_DATA: '/api/delete-data',
  CLEAR_HISTORY: '/api/clear-history'
};

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
};

export default API_BASE_URL;
