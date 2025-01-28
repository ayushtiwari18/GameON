const { pool, poolConnect } = require("../config/database");
const sql = require("mssql");

class AcademyModel {
  static async create(academyData) {
    await poolConnect;
    const request = pool.request();

    // Add input parameters
    Object.keys(academyData).forEach((key) => {
      request.input(key, academyData[key]);
    });

    const query = `
            INSERT INTO Academies (
                Name, 
                Email, 
                Password, 
                Phone, 
                Address, 
                City, 
                State, 
                Description, 
                IsActive, 
                Logo, 
                Website, 
                EstablishedYear
            )
            VALUES (
                @name,
                @email,
                @password,
                @phone,
                @address,
                @city,
                @state,
                @description,
                @isActive,
                @logo,
                @website,
                @establishedYear
            )
        `;

    return request.query(query);
  }

  static async findByEmail(email) {
    await poolConnect;
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Academies WHERE Email = @email");

    return result.recordset[0];
  }

  static async findById(id) {
    await poolConnect;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Academies WHERE Id = @id");

    return result.recordset[0];
  }

  static async update(id, academyData) {
    await poolConnect;
    const request = pool.request();
    request.input("id", sql.Int, id);

    // Add input parameters for update
    Object.keys(academyData).forEach((key) => {
      request.input(key, academyData[key]);
    });

    // Build SET clause dynamically based on provided fields
    const setClause = Object.keys(academyData)
      .map((key) => `${key} = @${key}`)
      .join(", ");

    const query = `
            UPDATE Academies 
            SET ${setClause}
            WHERE Id = @id
        `;

    return request.query(query);
  }

  static async deactivate(id) {
    await poolConnect;
    return pool
      .request()
      .input("id", sql.Int, id)
      .query("UPDATE Academies SET IsActive = 0 WHERE Id = @id");
  }

  static async getAllActive() {
    await poolConnect;
    const result = await pool
      .request()
      .query("SELECT * FROM Academies WHERE IsActive = 1");

    return result.recordset;
  }
}

module.exports = AcademyModel;
