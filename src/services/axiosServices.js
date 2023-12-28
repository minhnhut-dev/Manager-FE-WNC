// axiosService.js

import axios from 'axios';
// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your API base URL
  headers: {
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": "true"
  },
});

const axiosService = {
  get: (url) => axiosInstance.get(url),
  post: (url, data) => axiosInstance.post(url, data),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url) => axiosInstance.delete(url),
};

export { axiosService };
