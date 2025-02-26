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
    // Update playerService.js to handle token in registration response
    register: async (playerData) => {
      try {
        console.log("Sending registration data:", playerData);

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
          Language: playerData.language || "English",
        });

        // Store token if it's in the response
        if (response.token) {
          localStorage.setItem("token", response.token);

          // Store player ID from response
          if (response.player && response.player.id) {
            localStorage.setItem("playerId", response.player.id);
          } else {
            // Extract from token as fallback
            try {
              const payload = JSON.parse(atob(response.token.split(".")[1]));
              if (payload && payload.id) {
                localStorage.setItem("playerId", payload.id);
              }
            } catch (error) {
              console.error("Error decoding token:", error);
            }
          }
        }

        console.log("Registration response:", response);
        return response;
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },
    login: async (email, password) => {
      const response = await axiosInstance.post("/login", {
        Email: email,
        Password: password,
      });
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      return response;
    },

    logout: async () => {
      const response = await axiosInstance.post("/logout");
      localStorage.removeItem("token");
      return response;
    },
  },
  // Add this to the auth object in playerService.js
  checkDuplicate: async (data) => {
    return axiosInstance.post("/check-duplicate", {
      Email: data.Email,
      Contact_number: data.Contact_number,
    });
  },
  // Profile endpoints
  profile: {
    getHome: async (playerId) => {
      return axiosInstance.get(`/${playerId}/home`);
    },

    getProfile: async (playerId) => {
      return axiosInstance.get(`/${playerId}/profile`);
    },

    getUpdateForm: async (playerId) => {
      return axiosInstance.get(`/${playerId}/profile/update`);
    },

    updateProfile: async (playerId, updateData) => {
      return axiosInstance.put(`/${playerId}/profile/update`, updateData);
    },

    deleteProfile: async (playerId) => {
      return axiosInstance.delete(`/${playerId}/delete`);
    },
  },

  // Skill-related endpoints
  skills: {
    getBySkillSet: async (skillSet) => {
      return axiosInstance.get(`/skill-set/${skillSet}`);
    },
  },
};

export default playerService;
