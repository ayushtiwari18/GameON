// src/api/services/playerService.js

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
console.log("API URL:", API_URL); // Debug log

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: `${API_URL}/player`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Add this for credentials
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Config:", config); // Debug log
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Data:", response.data); // Debug log
    return response.data;
  },
  (error) => {
    console.error("Response Error:", error);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
      return Promise.reject(new Error("Authentication failed"));
    }

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(errorMessage));
  }
);

const playerService = {
  auth: {
    register: async (playerData) => {
      try {
        console.log("Sending registration data:", playerData); // Debug log

        const response = await axiosInstance.post("/register", {
          Full_Name: playerData.fullName,
          Email: playerData.emailId,
          Password: playerData.password,
          Gender: playerData.gender,
          Dob: playerData.dateOfBirth,
          Contact_number: playerData.phoneNumber,
          State: playerData.state,
          City: playerData.city,
          Address: playerData.address,
          Skill_level: playerData.experience || "Beginner",
        });

        console.log("Registration response:", response); // Debug log
        return response;
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },
    // ... rest of the service methods
  },
};

export default playerService;
