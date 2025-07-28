import axios from 'axios';

// Secure environment handling
const BASE_URL = import.meta.env.VITE_API_URL || 'https://proudcitizen-backend-app.grayisland-c2f3c413.eastus2.azurecontainerapps.io';
const API_URL = `${BASE_URL}/api/auth`.replace(/([^:]\/)\/+/g, '$1');

console.log('API Endpoint:', `${API_URL}/login`);


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
      transformRequest: [(data) => JSON.stringify(data)],
      withCredentials: true
    });
    
    if (response.data.token) {
      storeToken(response.data.token);
    }
    return response.data;
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

export const storeToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const removeToken = () => {
  localStorage.removeItem('authToken');
};