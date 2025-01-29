const { pool, poolConnect } = require("../config/database");
const sql = require("mssql");

class PlayerModel {
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
}

module.exports = PlayerModel;
