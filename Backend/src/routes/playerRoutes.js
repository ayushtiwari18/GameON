// src/routes/playerRoutes.js
const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const { authenticateToken } = require("../middleware/auth");

// Auth routes
router.post("/register", playerController.register);
router.post("/login", playerController.login);
router.post("/logout", playerController.logout); // Protected route

// Protected routes
router.get("/:id/home", playerController.getHome); // Not working
router.get("/:id/profile", playerController.getProfile);
router.get("/skill-set/:skillSet", playerController.getBySkillSet);
router.get("/:id/profile/update", playerController.getUpdateForm);
router.put("/:id/profile/update", playerController.updateProfile);
router.delete("/:id/delete", playerController.deletePlayer);

module.exports = router;
