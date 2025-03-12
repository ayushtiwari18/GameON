import createAxiosInstance from "./axiosConfig";
const axiosInstance = createAxiosInstance("/notifications");

const notificationService = {
  // Get all notifications for an academy
  getAcademyNotifications: async (academyId, limit = 20, offset = 0) => {
    return axiosInstance.get(`/${academyId}?limit=${limit}&offset=${offset}`);
  },

  // Get unread notification count
  getUnreadCount: async (academyId) => {
    return axiosInstance.get(`/${academyId}/unread`);
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    return axiosInstance.put(`/${notificationId}/read`);
  },

  // Mark all notifications as read
  markAllAsRead: async (academyId) => {
    return axiosInstance.put(`/academy/${academyId}/read-all`);
  },

  // Delete a notification
  deleteNotification: async (notificationId) => {
    return axiosInstance.delete(`/${notificationId}`);
  },

  // Setup WebSocket connection for real-time notifications
  setupSocketConnection: (socket, academyId) => {
    if (!socket || !academyId) return;

    // Join academy's room to receive notifications
    socket.emit("join", `academy:${academyId}`);

    // Listen for notification events
    socket.on("notification", (notification) => {
      // You can dispatch an action to update Redux store
      // or use a callback function passed from the component
      console.log("New notification received:", notification);

      // Show browser notification if permission granted
      if (Notification.permission === "granted") {
        new Notification("Academy Update", {
          body: notification.message,
          icon: "/logo.png",
        });
      }

      // Update notification count in localStorage or state
      const currentCount = parseInt(
        localStorage.getItem("unreadNotifications") || "0"
      );
      localStorage.setItem(
        "unreadNotifications",
        (currentCount + 1).toString()
      );

      // Trigger event for UI update
      const event = new CustomEvent("newNotification", {
        detail: notification,
      });
      window.dispatchEvent(event);
    });

    return () => {
      // Cleanup function
      socket.off("notification");
      socket.emit("leave", `academy:${academyId}`);
    };
  },

  // Request browser notification permission
  requestNotificationPermission: async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return false;
    }

    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }

    return Notification.permission === "granted";
  },
};

export default notificationService;
