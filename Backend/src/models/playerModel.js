// src/models/playerModel.js
const { pool, poolConnect } = require("../config/database");
const sql = require("mssql");

class PlayerModel {
  // Existing create and findByEmail methods remain the same...
  static async create(playerData) {
    try {
      await poolConnect;
      const request = pool.request();

      // Define SQL types for each field
      const sqlTypes = {
        Name: sql.NVarChar,
        Email: sql.NVarChar,
        Password: sql.NVarChar,
        Gender: sql.NVarChar,
        Dob: sql.Date,
        Contact_number: sql.NVarChar,
        Skill_level: sql.NVarChar,
      };

      // Add input parameters with proper SQL types
      Object.keys(playerData).forEach((key) => {
        request.input(key, sqlTypes[key] || sql.NVarChar, playerData[key]);
      });

      const query = `
        INSERT INTO Players (
          Name, 
          Email, 
          Password, 
          Gender, 
          Dob, 
          Contact_number,
          Skill_level
        )
        VALUES (
          @Name, 
          @Email, 
          @Password, 
          @Gender, 
          @Dob, 
          @Contact_number,
          @Skill_level
        )
      `;

      return await request.query(query);
    } catch (error) {
      console.error("Database error in create:", error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      await poolConnect;
      const result = await pool
        .request()
        .input("Email", sql.NVarChar, email)
        .query("SELECT * FROM Players WHERE Email = @Email");

      return result.recordset[0];
    } catch (error) {
      console.error("Database error in findByEmail:", error);
      throw error;
    }
  }

  static async findById(playerId) {
    try {
      await poolConnect;
      const result = await pool
        .request()
        .input("Player_id", sql.UniqueIdentifier, playerId)
        .query("SELECT * FROM Players WHERE Player_id = @Player_id");

      return result.recordset[0];
    } catch (error) {
      console.error("Database error in findById:", error);
      throw error;
    }
  }

  static async update(playerId, updateData) {
    try {
      await poolConnect;
      const request = pool.request();

      // Add player ID parameter
      request.input("Player_id", sql.UniqueIdentifier, playerId);

      // Build dynamic update query
      const updateFields = Object.keys(updateData)
        .map((key) => `${key} = @${key}`)
        .join(", ");

      // Add parameters for each field being updated
      Object.entries(updateData).forEach(([key, value]) => {
        request.input(key, value);
      });

      const query = `
        UPDATE Players 
        SET ${updateFields}
        WHERE Player_id = @Player_id
      `;

      return await request.query(query);
    } catch (error) {
      console.error("Database error in update:", error);
      throw error;
    }
  }

  static async delete(playerId) {
    try {
      await poolConnect;
      return await pool
        .request()
        .input("Player_id", sql.UniqueIdentifier, playerId)
        .query("DELETE FROM Players WHERE Player_id = @Player_id");
    } catch (error) {
      console.error("Database error in delete:", error);
      throw error;
    }
  }

  static async findBySkillSet(skillSet) {
    try {
      await poolConnect;
      const result = await pool
        .request()
        .input("Skill_level", sql.NVarChar, skillSet)
        .query("SELECT * FROM Players WHERE Skill_level = @Skill_level");

      return result.recordset;
    } catch (error) {
      console.error("Database error in findBySkillSet:", error);
      throw error;
    }
  }

  static async getCalendarEvents(playerId) {
    try {
      await poolConnect;
      const result = await pool
        .request()
        .input("Player_id", sql.UniqueIdentifier, playerId).query(`
          SELECT * FROM Calendar 
          WHERE Player_id = @Player_id 
          AND Event_date >= GETDATE()
          ORDER BY Event_date
        `);

      return result.recordset;
    } catch (error) {
      console.error("Database error in getCalendarEvents:", error);
      throw error;
    }
  }

  static async getAcademyUpdates() {
    try {
      await poolConnect;
      const result = await pool.request().query(`
          SELECT * FROM AcademyUpdates 
          WHERE Publish_date >= DATEADD(month, -1, GETDATE())
          ORDER BY Publish_date DESC
        `);

      return result.recordset;
    } catch (error) {
      console.error("Database error in getAcademyUpdates:", error);
      throw error;
    }
  }

  static async getUpcomingTournaments() {
    try {
      await poolConnect;
      const result = await pool.request().query(`
          SELECT * FROM Tournaments 
          WHERE Tournament_date >= GETDATE()
          ORDER BY Tournament_date
        `);

      return result.recordset;
    } catch (error) {
      console.error("Database error in getUpcomingTournaments:", error);
      throw error;
    }
  }
}

module.exports = PlayerModel;
