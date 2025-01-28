// src/models/playerModel.js
const { pool, poolConnect } = require("../config/database");
const sql = require("mssql");

class PlayerModel {
  static async create(playerData) {
    await poolConnect;
    const request = pool.request();

    // Add input parameters
    Object.keys(playerData).forEach((key) => {
      request.input(key, playerData[key]);
    });

    const query = `
      INSERT INTO Players (Name, Email, Password, Gender, Preferred_position, 
        Skill_level, Dob, Contact_number, Aadhar_no)
      VALUES (@name, @email, @password, @gender, @preferred_position, 
        @skill_level, @dob, @contact_number, @aadhar_no)
    `;

    return request.query(query);
  }

  static async findByEmail(email) {
    await poolConnect;
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Players WHERE Email = @email");

    return result.recordset[0];
  }
}

module.exports = PlayerModel;
