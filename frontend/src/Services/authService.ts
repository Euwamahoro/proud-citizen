import axios from 'axios';
import type { User } from '../Store/authSlice'; // Import User interface

// Secure environment handling
// const BASE_URL = 'http://localhost:5000'; 

const BASE_URL = import.meta.env.VITE_API_URL || 'https://proudcitizen-backend-app.grayisland-c2f3c413.eastus2.azurecontainerapps.io';
const API_URL = `${BASE_URL}/api/auth`.replace(/([^:]\/)\/+/g, '$1');


interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const register = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.msg || 'Registration failed');
    }
    throw new Error('Registration failed');
  }
};

export const login = async (userData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    });
      console.log('Full login response:', response.data); // Keep for debugging

    if (response.data.token) {
      storeToken(response.data.token);
    }
    
    // Return both token and user data
    return {
      token: response.data.token,
      user: response.data.user as User // Cast to User type
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMsg = error.response?.data?.msg || 
                      error.response?.data?.message || 
                      'Login failed. Please check your credentials.';
      console.error('Login error details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      throw new Error(errorMsg);
    }
    throw new Error('Network error during login');
  }
};

export const fetchUserProfile = async () => {
  const token = getToken(); // Get token from localStorage
  if (!token) {
    return null;
  }

  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        'x-auth-token': token // Pass token in the header
      }
    });
    return response.data; // This will be the user object
  } catch (error) {
    console.error('Failed to fetch user profile', error);
    removeToken(); // Token might be invalid, so clear it
    return null;
  }
};

export const storeToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const removeToken = () => {
  localStorage.removeItem('authToken');
};