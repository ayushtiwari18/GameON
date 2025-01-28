const express = require("express");
const router = express.Router();
const academyController = require("../controllers/academyController");
const { authenticateToken } = require("../middleware/auth");

// Public routes
// router.post("/register", academyController.register);
// router.post("/login", academyController.login);
// router.get("/list", academyController.getAllAcademies);
// router.get("/:id", academyController.getAcademyById);

// Protected routes - require authentication
router.use(authenticateToken);

// Academy profile management
// router.put("/profile", academyController.updateProfile);
// router.get("/profile/me", academyController.getOwnProfile);

// Academy facilities and amenities
// router.post("/facilities", academyController.addFacility);
// router.get("/facilities", academyController.getFacilities);
// router.put("/facilities/:id", academyController.updateFacility);
// router.delete("/facilities/:id", academyController.deleteFacility);

// Academy coaches/staff management
// router.post("/coaches", academyController.addCoach);
// router.get("/coaches", academyController.getCoaches);
// router.put("/coaches/:id", academyController.updateCoach);
// router.delete("/coaches/:id", academyController.deleteCoach);

// Academy schedule and availability
// router.post("/schedule", academyController.addSchedule);
// router.get("/schedule", academyController.getSchedule);
// router.put("/schedule/:id", academyController.updateSchedule);
// router.delete("/schedule/:id", academyController.deleteSchedule);

module.exports = router;
