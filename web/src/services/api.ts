import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3003',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default api;