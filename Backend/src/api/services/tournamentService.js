import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: `${API_URL}/tournament`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies for all requests
});

// Create form data instance for file uploads
const formDataInstance = axios.create({
  baseURL: `${API_URL}/tournament`,
  withCredentials: true, // Enable cookies for file uploads
});

// Request interceptor for JSON requests
axiosInstance.interceptors.request.use(
  (config) => {
    // With cookie auth, this is optional but kept for backwards compatibility
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

// Request interceptor for form data (file uploads)
formDataInstance.interceptors.request.use(
  (config) => {
    // With cookie auth, this is optional but kept for backwards compatibility
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Don't set Content-Type here - axios will set it with boundary for multipart/form-data
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling
const responseHandler = (response) => {
  return response.data;
};

const errorHandler = (error) => {
  console.error("Response Error:", error);

  if (error.response?.status === 401) {
    // Authentication failed, redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("academyId");
    window.location.href = "/academy/login";
    return Promise.reject(new Error("Authentication failed"));
  }

  const errorMessage =
    error.response?.data?.message ||
    error.message ||
    "An unexpected error occurred";
  return Promise.reject(new Error(errorMessage));
};

axiosInstance.interceptors.response.use(responseHandler, errorHandler);
formDataInstance.interceptors.response.use(responseHandler, errorHandler);

const tournamentService = {
  // Public tournament endpoints
  getAll: async () => {
    return axiosInstance.get("/");
  },

  getById: async (tournamentId) => {
    return axiosInstance.get(`/${tournamentId}`);
  },

  search: async (params) => {
    return axiosInstance.get("/search", { params });
  },

  // Academy-specific tournament endpoints
  academy: {
    getAll: async (academyId) => {
      // Update this to match the backend route structure, if needed
      return axiosInstance.get(`/academy/${academyId}`);
    },

    getById: async (academyId, tournamentId) => {
      // Update this to match the backend route structure, if needed
      return axiosInstance.get(`/academy/${academyId}/${tournamentId}`);
    },

    create: async (academyId, tournamentData) => {
      console.log("Request URL:", `/academy/${academyId}/create`);
      console.log("Request Data:", tournamentData);

      // Check required fields are present and not empty
      const requiredFields = [
        "Name",
        "Start_Date",
        "End_Date",
        "Location",
        "Max_Teams",
      ];
      const missingFields = requiredFields.filter(
        (field) => !tournamentData[field]
      );

      if (missingFields.length > 0) {
        console.error("Missing required fields:", missingFields);
      }

      return axiosInstance.post(`/academy/${academyId}/create`, tournamentData);
    },

    update: async (academyId, tournamentId, tournamentData) => {
      // Updating to match your backend route structure
      return axiosInstance.put(`/academy/${academyId}/update`, tournamentData);
    },

    delete: async (academyId, tournamentId) => {
      // Updating to match your backend route structure
      return axiosInstance.delete(`/academy/${academyId}/delete`);
    },

    // File upload endpoint for tournament banner - adjust if needed
    uploadBanner: async (academyId, tournamentId, formData) => {
      return formDataInstance.post(
        `/academy/${academyId}/${tournamentId}/banner`,
        formData
      );
    },

    // Tournament participant management - adjust if needed
    getParticipants: async (academyId, tournamentId) => {
      return axiosInstance.get(
        `/academy/${academyId}/${tournamentId}/participants`
      );
    },

    approveParticipant: async (academyId, tournamentId, participantId) => {
      return axiosInstance.put(
        `/academy/${academyId}/${tournamentId}/participants/${participantId}/approve`
      );
    },

    rejectParticipant: async (academyId, tournamentId, participantId) => {
      return axiosInstance.put(
        `/academy/${academyId}/${tournamentId}/participants/${participantId}/reject`
      );
    },
  },

  // Participant endpoints
  participant: {
    register: async (tournamentId, participantData) => {
      return axiosInstance.post(`/${tournamentId}/register`, participantData);
    },

    withdrawRegistration: async (tournamentId, participantId) => {
      return axiosInstance.delete(
        `/${tournamentId}/participants/${participantId}`
      );
    },
  },
};

export default tournamentService;
