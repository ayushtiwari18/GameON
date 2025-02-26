// src/models/playerModel.js
const { pool, poolConnect } = require("../config/database");
const sql = require("mssql");

class PlayerModel {
  // Existing create and findByEmail methods remain the same...
  static async create(playerData) {
    try {
      await poolConnect;
      const request = pool.request();

      // Bind each parameter to the request
      request.input("Full_Name", sql.NVarChar, playerData.Full_Name);
      request.input("Email", sql.NVarChar, playerData.Email);
      request.input("Password", sql.NVarChar, playerData.Password);
      request.input("State", sql.NVarChar, playerData.State);
      request.input("City", sql.NVarChar, playerData.City);
      request.input("Address", sql.NVarChar, playerData.Address);
      request.input("Gender", sql.NVarChar, playerData.Gender);
      request.input("Dob", sql.Date, playerData.Dob);
      request.input("Contact_number", sql.NVarChar, playerData.Contact_number);
      request.input("Skill_level", sql.NVarChar, playerData.Skill_level);
      request.input("Language", sql.NVarChar, playerData.Language);

      // Add OUTPUT clause to get the inserted ID
      const query = `
      INSERT INTO Players (
        Full_Name,
        Email,
        Password,
        State,
        City, 
        Address, 
        Gender, 
        Dob, 
        Contact_number, 
        Skill_level,
        Language
      ) 
      OUTPUT INSERTED.Player_id
      VALUES (
        @Full_Name, 
        @Email, 
        @Password, 
        @State, 
        @City, 
        @Address, 
        @Gender, 
        @Dob, 
        @Contact_number, 
        @Skill_level,
        @Language
      )
    `;

      const result = await request.query(query);
      return result;
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

  static async findByContactNumber(contactNumber) {
    try {
      await poolConnect;
      const result = await pool
        .request()
        .input("Contact_number", sql.NVarChar, contactNumber)
        .query("SELECT * FROM Players WHERE Contact_number = @Contact_number");

      return result.recordset[0];
    } catch (error) {
      console.error("Database error in findByContactNumber:", error);
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

      // Define valid column names that exist in the database
      const validColumns = [
        "Full_Name",
        "Email",
        "Password",
        "State",
        "City",
        "Address",
        "Gender",
        "Dob",
        "Contact_number",
        "Skill_level",
        "Language",
        "Preferred_position",
      ];

      // Filter updateData to only include valid columns
      const filteredData = Object.entries(updateData)
        .filter(([key]) => validColumns.includes(key))
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      // If nothing valid to update, return early
      if (Object.keys(filteredData).length === 0) {
        console.warn("No valid fields to update");
        return { rowsAffected: [0] };
      }

      // Build dynamic update query with only valid fields
      const updateFields = Object.keys(filteredData)
        .map((key) => `${key} = @${key}`)
        .join(", ");

      // Add parameters for each field being updated
      Object.entries(filteredData).forEach(([key, value]) => {
        // Determine SQL type based on field name (simplified version)
        let sqlType;
        if (key === "Dob") {
          sqlType = sql.Date;
        } else {
          sqlType = sql.NVarChar;
        }
        request.input(key, sqlType, value);
      });

      const query = `
      UPDATE Players 
      SET ${updateFields}
      WHERE Player_id = @Player_id
    `;

      console.log("Executing update query:", query);
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
