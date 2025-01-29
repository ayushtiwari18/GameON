const { pool, poolConnect } = require("../config/database");
const sql = require("mssql");

class AcademyModel {
  // Create a new academy
  static async create(academyData) {
    await poolConnect;
    const request = pool.request();

    // Add input parameters dynamically
    Object.keys(academyData).forEach((key) => {
      request.input(key, academyData[key]);
    });

    const query = `
      INSERT INTO Academies (
        Name, 
        Location, 
        Contact_email, 
        Contact_phone,  
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

    try {
      await request.query(query);
    } catch (error) {
      console.error("Error creating academy: ", error);
      throw new Error("Failed to create academy");
    }
  }

  // Find an academy by email
  static async findByEmail(email) {
    await poolConnect;
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Academies WHERE Contact_email = @email");

    return result.recordset[0];
  }

  // Find an academy by ID
  static async findById(id) {
    await poolConnect;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Academies WHERE id = @id");

    return result.recordset[0];
  }

  // Update academy information
  static async update(id, academyData) {
    await poolConnect;
    const request = pool.request();
    request.input("id", sql.Int, id);

    // Add input parameters dynamically for update
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
      WHERE id = @id
    `;

    try {
      await request.query(query);
    } catch (error) {
      console.error("Error updating academy: ", error);
      throw new Error("Failed to update academy");
    }
  }

  // Delete an academy
  static async delete(id) {
    await poolConnect;
    const query = `
      DELETE FROM Academies 
      WHERE id = @id
    `;

    try {
      const request = pool.request();
      request.input("id", sql.Int, id);
      await request.query(query);
    } catch (error) {
      console.error("Error deleting academy: ", error);
      throw new Error("Failed to delete academy");
    }
  }

  // Get all academies in a specific city
  static async findByCity(city) {
    await poolConnect;
    const result = await pool
      .request()
      .input("city", sql.NVarChar, city)
      .query("SELECT * FROM Academies WHERE City = @city");

    return result.recordset;
  }
}

module.exports = AcademyModel;
