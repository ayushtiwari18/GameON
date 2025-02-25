// src/routes/academyRoutes.js
const express = require("express");
const router = express.Router();
const academyController = require("../controllers/academyController");
const { authenticateToken } = require("../middleware/auth");

// Public routes
router.post("/register", academyController.registerAcademy);
router.post("/login", academyController.loginAcademy); // checked

// Protected routes
// router.use(authenticateToken);
router.post("/logout", academyController.logoutAcademy); // not wroking be cookies required to be deleted
router.get("/:id/home", academyController.getAcademyHome); // same as player
// Get all academies
router.get("/", academyController.getAllAcademies);
router.get("/city/:city", academyController.getAcademyByCity);
router.get("/:id/profile", academyController.getAcademyProfile);
router.get("/:id/profile/update", academyController.getUpdateForm);
router.put("/:id/profile/update", academyController.updateAcademy);
router.delete("/:id/delete", academyController.deleteAcademy);

module.exports = router;
