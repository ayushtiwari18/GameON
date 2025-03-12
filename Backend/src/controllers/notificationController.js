const NotificationModel = require("../models/notificationModel");
const { v4: isUUID } = require("uuid");

const notificationController = {
  // Create a new notification
  async createNotification(req, res) {
    try {
      const { academy_id, player_id, type, message, link_url } = req.body;

      if (!academy_id || !type || !message) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      const notificationData = {
        academy_id,
        player_id: player_id || null,
        type,
        message,
        link_url: link_url || null,
        read_status: 0, // Unread by default
      };

      const notificationId = await NotificationModel.create(notificationData);

      // If we have real-time socket connections, emit event here
      if (req.app.get("io")) {
        const io = req.app.get("io");
        io.to(`academy:${academy_id}`).emit("notification", {
          id: notificationId,
          ...notificationData,
        });
      }

      res.status(201).json({
        message: "Notification created successfully",
        notificationId,
      });
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({
        message: "Error creating notification",
        error: error.message,
      });
    }
  },

  // Get notifications for an academy
  async getAcademyNotifications(req, res) {
    try {
      const { id } = req.params;
      const { limit = 20, offset = 0 } = req.query;

      if (!isUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const notifications = await NotificationModel.getByAcademyId(
        id,
        parseInt(limit),
        parseInt(offset)
      );

      const unreadCount = await NotificationModel.getUnreadCountByAcademyId(id);

      res.status(200).json({
        notifications,
        unreadCount,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: notifications.length === parseInt(limit),
        },
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({
        message: "Error fetching notifications",
        error: error.message,
      });
    }
  },

  // Mark notification as read
  async markAsRead(req, res) {
    try {
      const { id } = req.params;

      if (!isUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      await NotificationModel.markAsRead(id);

      res.status(200).json({
        message: "Notification marked as read",
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({
        message: "Error marking notification as read",
        error: error.message,
      });
    }
  },

  // Mark all notifications as read for an academy
  async markAllAsRead(req, res) {
    try {
      const { id } = req.params;

      if (!isUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      await NotificationModel.markAllAsRead(id);

      res.status(200).json({
        message: "All notifications marked as read",
      });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({
        message: "Error marking all notifications as read",
        error: error.message,
      });
    }
  },

  // Delete a notification
  async deleteNotification(req, res) {
    try {
      const { id } = req.params;

      if (!isUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      await NotificationModel.delete(id);

      res.status(200).json({
        message: "Notification deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({
        message: "Error deleting notification",
        error: error.message,
      });
    }
  },

  // Get unread notification count
  async getUnreadCount(req, res) {
    try {
      const { id } = req.params;

      if (!isUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const unreadCount = await NotificationModel.getUnreadCountByAcademyId(id);

      res.status(200).json({
        unreadCount,
      });
    } catch (error) {
      console.error("Error fetching unread count:", error);
      res.status(500).json({
        message: "Error fetching unread count",
        error: error.message,
      });
    }
  },
};

module.exports = notificationController;
