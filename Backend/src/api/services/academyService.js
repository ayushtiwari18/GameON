import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: `${API_URL}/academy`,
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

const academyService = {
  // Get all academies
  getAll: async () => {
    return axiosInstance.get("/"); // Assuming your API has an endpoint that returns all academies
  },

  // Auth endpoints
  auth: {
    register: async (academyData) => {
      return axiosInstance.post("/register", {
        name: academyData.name,
        location: academyData.location,
        contact_email: academyData.email,
        contact_phone: academyData.phone,
        city: academyData.city,
        description: academyData.description,
        website_url: academyData.websiteUrl,
        specialization: academyData.specialization,
        password: academyData.password,
      });
    },

    login: async (email, password) => {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
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

  // Profile endpoints
  profile: {
    getHome: async (academyId) => {
      return axiosInstance.get(`/${academyId}/home`);
    },

    getProfile: async (academyId) => {
      return axiosInstance.get(`/${academyId}/profile`);
    },

    getUpdateForm: async (academyId) => {
      return axiosInstance.get(`/${academyId}/profile/update`);
    },

    updateProfile: async (academyId, updateData) => {
      return axiosInstance.put(`/${academyId}/profile/update`, updateData);
    },

    deleteProfile: async (academyId) => {
      return axiosInstance.delete(`/${academyId}/delete`);
    },
  },

  // Location-based endpoints
  location: {
    getByCity: async (city) => {
      return axiosInstance.get(`/city/${city}`);
    },
  },

  // Additional academy-specific endpoints
  getByEmail: async (email) => {
    return axiosInstance.get(`/email/${email}`);
  },

  // Calendar and events
  events: {
    getCalendar: async (academyId) => {
      return axiosInstance.get(`/${academyId}/calendar`);
    },

    getUpdates: async (academyId) => {
      return axiosInstance.get(`/${academyId}/updates`);
    },

    getTournaments: async (academyId) => {
      return axiosInstance.get(`/${academyId}/tournaments`);
    },
  },
};

export default academyService;
