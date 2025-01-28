// src/routes/playerRoutes.js
const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const { authenticateToken } = require("../middleware/auth");

router.post("/register", playerController.register);
router.post("/login", playerController.login);

module.exports = router;
