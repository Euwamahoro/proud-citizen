import axios from 'axios';
require('dotenv').config();

const API_URL = process.env.API_URL + 'api/auth';

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
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.msg || 'Login failed');
    }
    throw new Error('Login failed');
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