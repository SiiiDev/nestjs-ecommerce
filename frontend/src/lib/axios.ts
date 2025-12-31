import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Important: allows cookies to be sent
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401, the user is not authenticated
    if (error.response?.status === 401) {
      // Don't throw here, let the component handle it
    }
    return Promise.reject(error);
  }
);

export default api;

