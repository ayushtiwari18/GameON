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
                Location,
                Contact_email,
                Contact_Phone,  
                City,
                Description,  
                Website_url, 
                Specialization
            )
            VALUES (
                @name,
                @location,
                @Contact_email,
                @Contact_phone,
                @city,
                @description,
                @website_url,
                @specialization
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
}

module.exports = AcademyModel;
