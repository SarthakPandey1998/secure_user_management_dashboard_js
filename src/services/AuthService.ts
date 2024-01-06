// src/services/AuthService.ts
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://reqres.in/api';

interface ErrorResponse {
  error: string;
}

export const AuthService = {
  signIn: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      return response.data;
    } catch (error:any) {
      handleApiError(error);
    }
  },

  signUp: async (email: string, password: string, fullName: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { email, password, fullName }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error:any) {
      handleApiError(error);
    }
  },
};

function handleApiError(error: AxiosError<ErrorResponse>): void {
  if (error.response) {
    const { data, status } = error.response;
    console.error(`API Error Response (Status ${status}):`, data);
  } else if (error.request) {
    console.error('API No Response:', error.request);
  } else {
    console.error('API Setup Error:', error.message);
  }
  throw error;
}
