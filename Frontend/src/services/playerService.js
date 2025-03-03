// src/api/services/playerService.js

import createAxiosInstance from "./axiosConfig";

const axiosInstance = createAxiosInstance("/player");

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

        // Even with HTTP-only cookies, we still store non-sensitive data locally
        // for UI state management
        if (response.player && response.player.id) {
          localStorage.setItem("playerId", response.player.id);
          localStorage.setItem("playerName", response.player.name);
          localStorage.setItem("playerRole", "player");
        }

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

      // Store non-sensitive user data for UI
      if (response.player) {
        localStorage.setItem("playerId", response.player.id);
        localStorage.setItem("playerName", response.player.name);
        localStorage.setItem("playerRole", "player");
      }

      return response;
    },

    logout: async () => {
      const response = await axiosInstance.post("/logout");
      // Clear all player data from localStorage
      localStorage.removeItem("playerId");
      localStorage.removeItem("playerName");
      localStorage.removeItem("playerRole");
      localStorage.removeItem("token"); // Remove token if it exists
      return response;
    },

    // Check authentication status
    checkAuth: async () => {
      try {
        const response = await axiosInstance.get("/check-auth");
        return {
          authenticated: true,
          playerId: response.playerId,
          playerName: response.playerName,
        };
      } catch (error) {
        return { authenticated: false };
      }
    },

    // Add this to the auth object in playerService.js
    checkDuplicate: async (data) => {
      return axiosInstance.post("/check-duplicate", {
        Email: data.Email,
        Contact_number: data.Contact_number,
      });
    },
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
