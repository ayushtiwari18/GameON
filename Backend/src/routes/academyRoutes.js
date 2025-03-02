const express = require("express");
const router = express.Router();
const academyController = require("../controllers/academyController");
const { authenticateToken } = require("../middleware/Academyauth");

// Public routes
router.post("/register", academyController.registerAcademy);
router.post("/login", academyController.loginAcademy);

// Protected routes (Requires Authentication)
router.post("/logout", authenticateToken, academyController.logoutAcademy);
router.get("/:id/home", authenticateToken, academyController.getAcademyHome);

// Get all academies
router.get("/", academyController.getAllAcademies);
router.get("/city/:city", academyController.getAcademyByCity);
router.get(
  "/:id/profile",
  authenticateToken,
  academyController.getAcademyProfile
);
router.get(
  "/:id/profile/update",
  authenticateToken,
  academyController.getUpdateForm
);
router.put(
  "/:id/profile/update",
  authenticateToken,
  academyController.updateAcademy
);
router.post(
  "/:id/profile/image",
  authenticateToken,
  academyController.uploadProfileImage
);
router.delete(
  "/:id/delete",
  authenticateToken,
  academyController.deleteAcademy
);

// Calendar and events routes
router.get(
  "/:id/calendar",
  authenticateToken,
  academyController.getCalendarEvents
);
router.get("/:id/updates", authenticateToken, academyController.getUpdates);
router.get(
  "/:id/tournaments",
  authenticateToken,
  academyController.getTournaments
);

module.exports = router;
