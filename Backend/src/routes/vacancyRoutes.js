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

module.exports = router;
