import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000/api",
})

// Attach Bearer token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
