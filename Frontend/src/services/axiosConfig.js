// src/api/services/axiosConfig.js

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create base axios instance for all services
const createAxiosInstance = (basePath) => {
  const instance = axios.create({
    baseURL: `${API_URL}${basePath}`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Essential for sending/receiving cookies
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // With cookies, we don't need to manually set token in headers,
      // but keeping as fallback for environments where cookies might be disabled
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Request Error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor with better error handling
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      console.error("Response Error:", error);

      // Handle authentication errors
      // if (error.response?.status === 401) {
      //   // Clear local storage
      //   localStorage.removeItem("token");
      //   localStorage.removeItem("playerId");
      //   localStorage.removeItem("academyId");

      //   // Redirect to login based on the URL path
      //   const path = window.location.pathname;
      //   if (path.includes("/academy")) {
      //     window.location.href = "/academy/login";
      //   } else {
      //     window.location.href = "/signin";
      //   }
      //   return Promise.reject(new Error("Authentication failed"));
      // }

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      return Promise.reject(new Error(errorMessage));
    }
  );

  return instance;
};

export default createAxiosInstance;
