// academyService.js - Updated for proper cookie handling

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: `${API_URL}/academy`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies are sent with requests
});

// Create form data instance for file uploads
const formDataInstance = axios.create({
  baseURL: `${API_URL}/academy`,
  withCredentials: true, // Ensures cookies are sent with file upload requests
});

// Request interceptor for JSON requests
axiosInstance.interceptors.request.use(
  (config) => {
    // With cookies, we don't need to manually set the token in headers
    // But we'll keep this as fallback for environments where cookies might be disabled
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
const responseHandler = (response) => {
  return response.data;
};

const errorHandler = (error) => {
  console.error("Response Error:", error);

  if (error.response?.status === 401) {
    // For cookie-based auth, we should still clear localStorage
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

const academyService = {
  getAll: async () => {
    return axiosInstance.get("/");
  },
  auth: {
    register: async (academyData) => {
      try {
        const response = await axiosInstance.post("/register", {
          name: academyData.name,
          contact_person: academyData.contactPerson,
          specialization: academyData.specialization,
          contact_email: academyData.email,
          contact_phone: academyData.phone,
          state: academyData.state,
          city: academyData.city,
          location: academyData.address,
          password: academyData.password,
        });

        // With cookie auth, we still store academyId in localStorage for component access
        if (response.academyId) {
          localStorage.setItem("academyId", response.academyId);
        }

        // We still store token as fallback for non-cookie environments
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        return response;
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },

    login: async (email, password) => {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // With cookie auth, token is stored in HTTP-only cookie by the server
      // But we still store in localStorage as a backup or reference
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      if (response.academy && response.academy.id) {
        localStorage.setItem("academyId", response.academy.id);
      }

      return response;
    },

    logout: async () => {
      // With cookie auth, the server will clear the cookie
      const response = await axiosInstance.post("/logout");

      // Clear localStorage as well
      localStorage.removeItem("token");
      localStorage.removeItem("academyId");

      return response;
    },

    // Checks if user is authenticated using cookies
    checkAuth: async () => {
      try {
        // This endpoint should verify the cookie and return user info
        const response = await axiosInstance.get("/check-auth");
        return { authenticated: true, academyId: response.academyId };
      } catch (error) {
        // If the request fails, user is not authenticated
        return { authenticated: false };
      }
    },

    checkDuplicate: async (data) => {
      return axiosInstance.post("/check-duplicate", {
        Email: data.Email,
        Contact_number: data.Contact_number,
      });
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

    uploadProfileImage: async (academyId, formData) => {
      return formDataInstance.post(`/${academyId}/profile/image`, formData);
    },

    deleteProfile: async (academyId) => {
      return axiosInstance.delete(`/${academyId}/delete`);
    },
  },

  // Location-based queries
  location: {
    getByCity: async (city) => {
      return axiosInstance.get(`/city/${city}`);
    },

    getByState: async (state) => {
      return axiosInstance.get(`/state/${state}`);
    },
  },

  // Sport/Specialization endpoints
  sports: {
    getBySportName: async (sport) => {
      return axiosInstance.get(`/sport/${sport}`);
    },
  },

  // Events and calendar
  events: {
    getAcademyEvents: async (academyId) => {
      return axiosInstance.get(`/${academyId}/events`);
    },

    createEvent: async (academyId, eventData) => {
      return axiosInstance.post(`/${academyId}/events`, eventData);
    },

    updateEvent: async (academyId, eventId, eventData) => {
      return axiosInstance.put(`/${academyId}/events/${eventId}`, eventData);
    },

    deleteEvent: async (academyId, eventId) => {
      return axiosInstance.delete(`/${academyId}/events/${eventId}`);
    },
  },
};

export default academyService;
