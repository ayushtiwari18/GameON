// academyService.js - Updated for proper cookie handling

import createAxiosInstance from "./axiosConfig";

const axiosInstance = createAxiosInstance("/academy");

// Create a separate instance for file uploads with different content type
const formDataInstance = createAxiosInstance("/academy");
formDataInstance.defaults.headers["Content-Type"] = "multipart/form-data";

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

        // Store non-sensitive academy data for UI
        if (response.academyId) {
          localStorage.setItem("academyId", response.academyId);
          localStorage.setItem("academyName", academyData.name);
          localStorage.setItem("userRole", "academy");
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

      // Store non-sensitive academy data for UI
      if (response.academy) {
        localStorage.setItem("academyId", response.academy.id);
        localStorage.setItem("academyName", response.academy.name);
        localStorage.setItem("userRole", "academy");
      }

      return response;
    },

    logout: async () => {
      const response = await axiosInstance.post("/logout");

      // Clear all academy data from localStorage
      localStorage.removeItem("academyId");
      localStorage.removeItem("academyName");
      localStorage.removeItem("userRole");
      localStorage.removeItem("token"); // Remove token if it exists

      return response;
    },

    // Check if user is authenticated using cookies
    checkAuth: async () => {
      try {
        const response = await axiosInstance.get("/check-auth");

        // Make sure we're getting the expected properties from the response
        const academyId = response.academyId || response.academy?.id;
        const academyName = response.academyName || response.academy?.name;

        // Update localStorage if needed
        if (academyId && !localStorage.getItem("academyId")) {
          localStorage.setItem("academyId", academyId);
        }
        if (academyName && !localStorage.getItem("academyName")) {
          localStorage.setItem("academyName", academyName);
        }
        if (!localStorage.getItem("userRole")) {
          localStorage.setItem("userRole", "academy");
        }

        return {
          authenticated: true,
          academyId,
          academyName,
        };
      } catch (error) {
        // Clear authentication data on failure
        localStorage.removeItem("academyId");
        localStorage.removeItem("academyName");
        localStorage.removeItem("userRole");

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
