import axios from 'axios';

const api = axios.create({
  baseURL: 'http://64.227.189.106:3003',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;