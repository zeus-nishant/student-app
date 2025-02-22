import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const api = axios.create({
  baseURL: API_URL,
  validateStatus: (status) => status < 500, // Resolve if status is below 500
});

// 🔹 Request Interceptor: Adds auth headers & abort signal
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    const abortController = new AbortController();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.signal = config.signal || abortController.signal;
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor: Handles errors gracefully
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (axios.isCancel(error)) {
      console.warn("Request cancelled:", error.message);
      return Promise.reject({ success: false, message: "Request was cancelled" });
    }

    if (error.response) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({ success: false, message: "Network error. Please try again later." });
  }
);

export default api;
