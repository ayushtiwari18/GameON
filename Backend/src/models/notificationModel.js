const { pool, poolConnect } = require("../config/database");
const sql = require("mssql");

class NotificationModel {
  // Create a new notification
  static async create(notificationData) {
    await poolConnect;
    const request = pool.request();

    // Add input parameters dynamically
    Object.keys(notificationData).forEach((key) => {
      request.input(key, notificationData[key]);
    });

    const query = `
      INSERT INTO Notifications (
        Academy_id,
        Player_id,
        Type,
        Message,
        Link_url,
        Read_status,
        Created_at
      )
      OUTPUT INSERTED.Notification_id
      VALUES (
        @academy_id,
        @player_id,
        @type,
        @message,
        @link_url,
        @read_status,
        GETDATE()
      )
    `;

    try {
      const result = await request.query(query);
      return result.recordset[0].Notification_id;
    } catch (error) {
      console.error("Error creating notification: ", error);
      throw new Error("Failed to create notification");
    }
  }

  // Get all notifications for an academy
  static async getByAcademyId(academyId, limit = 20, offset = 0) {
    await poolConnect;
    try {
      const result = await pool
        .request()
        .input("academyId", sql.UniqueIdentifier, academyId)
        .input("limit", sql.Int, limit)
        .input("offset", sql.Int, offset).query(`
          SELECT * FROM Notifications 
          WHERE Academy_id = @academyId 
          ORDER BY Created_at DESC
          OFFSET @offset ROWS
          FETCH NEXT @limit ROWS ONLY
        `);

      return result.recordset;
    } catch (error) {
      console.error("Error fetching academy notifications: ", error);
      throw new Error("Failed to fetch notifications");
    }
  }

  // Get unread notification count for an academy
  static async getUnreadCountByAcademyId(academyId) {
    await poolConnect;
    try {
      const result = await pool
        .request()
        .input("academyId", sql.UniqueIdentifier, academyId).query(`
          SELECT COUNT(*) as unread_count 
          FROM Notifications 
          WHERE Academy_id = @academyId AND Read_status = 0
        `);

      return result.recordset[0].unread_count;
    } catch (error) {
      console.error("Error fetching unread count: ", error);
      throw new Error("Failed to fetch unread count");
    }
  }

  // Mark notification as read
  static async markAsRead(notificationId) {
    await poolConnect;
    try {
      await pool
        .request()
        .input("notificationId", sql.UniqueIdentifier, notificationId).query(`
          UPDATE Notifications 
          SET Read_status = 1 
          WHERE Notification_id = @notificationId
        `);

      return true;
    } catch (error) {
      console.error("Error marking notification as read: ", error);
      throw new Error("Failed to update notification");
    }
  }

  // Mark all notifications as read for an academy
  static async markAllAsRead(academyId) {
    await poolConnect;
    try {
      await pool.request().input("academyId", sql.UniqueIdentifier, academyId)
        .query(`
          UPDATE Notifications 
          SET Read_status = 1 
          WHERE Academy_id = @academyId AND Read_status = 0
        `);

      return true;
    } catch (error) {
      console.error("Error marking all notifications as read: ", error);
      throw new Error("Failed to update notifications");
    }
  }

  // Delete a notification
  static async delete(notificationId) {
    await poolConnect;
    try {
      await pool
        .request()
        .input("notificationId", sql.UniqueIdentifier, notificationId).query(`
          DELETE FROM Notifications 
          WHERE Notification_id = @notificationId
        `);

      return true;
    } catch (error) {
      console.error("Error deleting notification: ", error);
      throw new Error("Failed to delete notification");
    }
  }

  // Delete old notifications (e.g., older than 30 days)
  static async deleteOld(days = 30) {
    await poolConnect;
    try {
      await pool.request().input("days", sql.Int, days).query(`
          DELETE FROM Notifications 
          WHERE Created_at < DATEADD(day, -@days, GETDATE())
        `);

      return true;
    } catch (error) {
      console.error("Error deleting old notifications: ", error);
      throw new Error("Failed to delete old notifications");
    }
  }
}

module.exports = NotificationModel;
