const express = require("express");
const router = express.Router();
const {
  registerAcademy,
  getAcademyByEmail,
  getAcademyById,
  updateAcademy,
  deactivateAcademy,
  getAllActiveAcademies,
  getAcademyByCity,
} = require("../controllers/academyController");
const { authenticateToken } = require("../middleware/auth");

// Public routes
router.post("/register", registerAcademy);
router.get("/list", getAcademyByEmail);
router.get("/:id", getAcademyById);
router.get("/city/:city", getAcademyByCity);

// Protected routes - require authentication
// Uncomment if you want to protect certain routes
// router.use(authenticateToken);

// Academy profile management (if needed in the future)
router.put("/:id", updateAcademy);
router.delete("/:id/deactivate", deactivateAcademy);

// Get all active academies
router.get("/active", getAllActiveAcademies);

module.exports = router;
