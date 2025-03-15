import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: `${API_URL}/vacancy`,
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

const vacancyService = {
  // Create a new vacancy
  create: async (vacancyData) => {
    // Ensure all required fields are present before sending to the API
    const requiredData = {
      tournament_id: vacancyData.tournamentId,
      academy_id: vacancyData.academyId,
      position: vacancyData.position,
      requirements: vacancyData.requirements,
      vacancy_count: vacancyData.vacancyCount,
      gender_preference: vacancyData.genderPreference,
      age_limit: vacancyData.ageLimit,
    };

    // Validate required fields
    const missingFields = Object.entries(requiredData)
      .filter(([_, value]) => value === undefined || value === "")
      .map(([key]) => key);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    return axiosInstance.post("/", requiredData);
  },

  // Get vacancies by tournament ID
  getByTournament: async (tournamentId) => {
    return axiosInstance.get(`/vacancies/tournament/${tournamentId}`);
  },

  // Get all tournaments that have vacancies
  getTournamentsWithVacancies: async () => {
    return axiosInstance.get("/vacancies/tournaments");
  },
};

export default vacancyService;
