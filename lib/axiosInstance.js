import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const axiosInstance = axios.create({
  baseURL: 'https://staging-api.biyekorun.us/api', // Replace with your API base URL
});

// Set up an interceptor to add the token to the request headers before each request is sent
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get the token from storage and add it to the headers
    const token = await SecureStore.getItemAsync("biyekorun_token"); // Use getItemAsync to retrieve the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
