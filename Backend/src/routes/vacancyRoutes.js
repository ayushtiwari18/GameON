// src/routes/vacancyRoutes.js
const express = require("express");
const router = express.Router();
const vacancyController = require("../controllers/vacancyController");
// const { authenticateToken } = require("../middleware/auth");

// Define routes with their corresponding controller methods
// Public routes
router.post("/", vacancyController.createVacancy); // Create a new vacancy
router.get(
  "/vacancies/tournament/:id",
  vacancyController.getVacanciesByTournament
); // Get vacancies by tournament
router.get(
  "/vacancies/tournaments",
  vacancyController.getTournamentsWithVacancies
); // Get tournaments with vacancies

// Academy-specific routes
router.get(
  "/academy/:academyId/vacancies",
  vacancyController.getAcademyVacancies
); // Get all vacancies for an academy
router.get("/vacancies/:id", vacancyController.getVacancyById); // Get specific vacancy by ID
router.put("/vacancies/:id", vacancyController.updateVacancy); // Update a vacancy
router.delete("/vacancies/:id", vacancyController.deleteVacancy); // Delete a vacancy

// Application routes (if you implement this feature later)
// router.post("/vacancies/:id/apply", authenticateToken, vacancyController.applyToVacancy);
// router.get("/vacancies/:id/applications", authenticateToken, vacancyController.getVacancyApplications);

module.exports = router;
