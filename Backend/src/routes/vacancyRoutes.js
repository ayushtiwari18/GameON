// src/routes/vacancyRoutes.js
const express = require("express");
const router = express.Router();
const vacancyController = require("../controllers/vacancyController");
const { authenticateToken } = require("../middleware/auth");

// Define routes with their corresponding controller methods
router.post("/create", authenticateToken, vacancyController.createVacancy);
router.get(
  "/tournament/:id",
  authenticateToken,
  vacancyController.getVacanciesByTournament
);
router.get(
  "/with-tournaments",
  authenticateToken,
  vacancyController.getTournamentsWithVacancies
);

module.exports = router;
