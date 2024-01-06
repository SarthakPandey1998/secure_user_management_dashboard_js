// src/services/DataService.ts
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://reqres.in/api';

export const DataService = {
  getUserData: async (userId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  // Add more methods for data retrieval as needed
};

function handleApiError(error: AxiosError): void {
  if (error.response) {
    console.error('API Error Response:', error.response.data);
  } else if (error.request) {
    console.error('API No Response:', error.request);
  } else {
    console.error('API Setup Error:', error.message);
  }
  throw error;
}
