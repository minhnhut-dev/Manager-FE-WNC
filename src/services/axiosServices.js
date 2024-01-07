// axiosService.js

import axios from 'axios';
// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  headers: {
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": "true"
  },
});

axiosInstance.interceptors.response.use(
    response => {
      // Do something with response data
      return response;
    },
    error => {
      // Do something with response error
      if (!error.response) {
        // Network error (server is down, CORS issues, etc)
        console.error("Network error: ", error);
      } else {
        // HTTP status code error occurred
        console.error(`HTTP error: ${error.response.status} - ${error.response.statusText}`);
        // Optionally, you could emit an event or call a method to hide the overlay
        // hideOverlay(); // Implement this function as needed
      }
      // You can still return Promise.reject to keep the error unhandled, or handle it accordingly
      return Promise.reject(error);
    }
);

const axiosService = {
  get: (url) => axiosInstance.get(url),
  post: (url, data) => axiosInstance.post(url, data),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url) => axiosInstance.delete(url),
};

export { axiosService };
