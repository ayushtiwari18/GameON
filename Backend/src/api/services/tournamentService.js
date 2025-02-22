import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: `${API_URL}/tournament`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

const tournamentService = {
  // Public endpoints
  getAll: async () => {
    return axiosInstance.get("/");
  },

  getById: async (tournamentId) => {
    return axiosInstance.get(`/${tournamentId}`);
  },

  // Academy-specific tournament management
  academy: {
    create: async (academyId, tournamentData) => {
      return axiosInstance.post(`/academy/${academyId}/create`, {
        Name: tournamentData.name,
        Date: tournamentData.date,
        Location: tournamentData.location,
        Max_Teams: tournamentData.maxTeams,
        description: tournamentData.description,
        category: tournamentData.category,
      });
    },

    update: async (academyId, tournamentId, updateData) => {
      return axiosInstance.put(`/academy/${academyId}/update`, {
        tournamentId,
        ...updateData,
      });
    },

    delete: async (academyId, tournamentId) => {
      return axiosInstance.delete(`/academy/${academyId}/delete`, {
        data: { tournamentId },
      });
    },
  },

  // Additional tournament-related functionality
  search: {
    byDate: async (startDate, endDate) => {
      return axiosInstance.get("/search", {
        params: {
          startDate,
          endDate,
        },
      });
    },

    byLocation: async (location) => {
      return axiosInstance.get("/search", {
        params: { location },
      });
    },

    byCategory: async (category) => {
      return axiosInstance.get("/search", {
        params: { category },
      });
    },
  },
};

export default tournamentService;
