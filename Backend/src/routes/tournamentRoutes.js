// src/routes/tournamentRoutes.js
const express = require("express");
const router = express.Router();
const tournamentController = require("../controllers/tournamentController");
const { authenticateToken } = require("../middleware/auth");

// Public routes
router.get("/", tournamentController.getAllTournaments);
router.get("/:id", tournamentController.getTournamentById);

// Protected routes - require authentication
// router.use(authenticateToken);
router.post("/academy/:id/create", tournamentController.createTournament);
router.put("/academy/:id/update", tournamentController.updateTournament);
router.delete("/academy/:id/delete", tournamentController.deleteTournament);

module.exports = router;
