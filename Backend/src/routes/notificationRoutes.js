const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authenticateToken } = require("../middleware/Academyauth");

// Get notifications for an academy
router.get(
  "/:id",
  authenticateToken,
  notificationController.getAcademyNotifications
);

// Get unread notification count
router.get(
  "/:id/unread",
  authenticateToken,
  notificationController.getUnreadCount
);

// Mark notification as read
router.put("/:id/read", authenticateToken, notificationController.markAsRead);

// Mark all notifications as read for an academy
router.put(
  "/academy/:id/read-all",
  authenticateToken,
  notificationController.markAllAsRead
);

// Delete a notification
router.delete(
  "/:id",
  authenticateToken,
  notificationController.deleteNotification
);

// Create a notification (internal API route)
router.post("/", authenticateToken, notificationController.createNotification);

module.exports = router;
