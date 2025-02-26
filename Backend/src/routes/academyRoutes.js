const express = require("express");
const router = express.Router();
const academyController = require("../controllers/academyController");
const { authenticateToken } = require("../middleware/auth");

// Public routes
router.post("/register", academyController.registerAcademy);
router.post("/login", academyController.loginAcademy);

// Protected routes
// router.use(authenticateToken);
router.post("/logout", academyController.logoutAcademy);
router.get("/:id/home", academyController.getAcademyHome);

// Get all academies
router.get("/", academyController.getAllAcademies);
router.get("/city/:city", academyController.getAcademyByCity);
// router.get("/email/:email", academyController.getAcademyByEmail);
router.get("/:id/profile", academyController.getAcademyProfile);
router.get("/:id/profile/update", academyController.getUpdateForm);
router.put("/:id/profile/update", academyController.updateAcademy);
router.post("/:id/profile/image", academyController.uploadProfileImage);
router.delete("/:id/delete", academyController.deleteAcademy);

// Calendar and events routes
router.get("/:id/calendar", academyController.getCalendarEvents);
router.get("/:id/updates", academyController.getUpdates);
router.get("/:id/tournaments", academyController.getTournaments);

module.exports = router;
