import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
console.log("API URL:", API_URL); // Debug log

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: `${API_URL}/academy`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Add this for credentials
});

// Create form data instance for file uploads
const formDataInstance = axios.create({
  baseURL: `${API_URL}/academy`,
  withCredentials: true,
});

// Request interceptor for JSON requests
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

// Request interceptor for form data (file uploads)
formDataInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Don't set Content-Type here - axios will set it correctly with boundary for multipart/form-data
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling
const responseHandler = (response) => {
  console.log("Response Data:", response.data); // Debug log
  return response.data;
};

const errorHandler = (error) => {
  console.error("Response Error:", error);

  if (error.response?.status === 401) {
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
  auth: {
    register: async (academyData) => {
      try {
        console.log("Sending registration data:", academyData);

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

        // Store token if it's in the response
        if (response.token) {
          localStorage.setItem("token", response.token);

          // Store academy ID from response
          if (response.academyId) {
            localStorage.setItem("academyId", response.academyId);
          } else {
            // Extract from token as fallback
            try {
              const payload = JSON.parse(atob(response.token.split(".")[1]));
              if (payload && payload.id) {
                localStorage.setItem("academyId", payload.id);
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
        email: email,
        password: password,
      });
      if (response.token) {
        localStorage.setItem("token", response.token);
        if (response.academy.id) {
          localStorage.setItem("academyId", response.academy.id);
        }
      }
      return response;
    },

    logout: async () => {
      const response = await axiosInstance.post("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("academyId");
      return response;
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
