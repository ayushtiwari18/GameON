// src/models/tournamentModel.js
const { pool, poolConnect } = require("../config/database");
const sql = require("mssql");

class TournamentModel {
  // Get all tournaments
  static async getAllTournaments() {
    await poolConnect;
    const result = await pool.request().query(`
      SELECT * FROM Tournaments 
      WHERE Date >= GETDATE()
      ORDER BY Date ASC
    `);
    return result.recordset;
  }

  // Get tournament by ID
  static async getTournamentById(id) {
    await poolConnect;
    const result = await pool
      .request()
      .input("id", sql.UniqueIdentifier, id)
      .query("SELECT * FROM Tournaments WHERE Tournament_id = @id");
    return result.recordset[0];
  }

  // Create tournament
  static async createTournament(tournamentData) {
    await poolConnect;
    const request = pool.request();

    // Add input parameters
    Object.keys(tournamentData).forEach((key) => {
      request.input(key, tournamentData[key]);
    });

    const query = `
      INSERT INTO Tournaments (
        Academy_id,
        Name,
        Date,
        Location,
        description,
        Category
      )
      VALUES (
        @academyId,
        @Name,
        @Date,
        @location,
        @description,
        @category
      )
    `;

    try {
      await request.query(query);
    } catch (error) {
      console.error("Error creating tournament: ", error);
      throw new Error("Failed to create tournament");
    }
  }

  // Update tournament
  static async updateTournament(id, tournamentData) {
    await poolConnect;
    const request = pool.request();
    request.input("id", sql.UniqueIdentifier, id);

    Object.keys(tournamentData).forEach((key) => {
      request.input(key, tournamentData[key]);
    });

    const setClause = Object.keys(tournamentData)
      .map((key) => `${key} = @${key}`)
      .join(", ");

    const query = `
      UPDATE Tournaments 
      SET ${setClause}
      WHERE Tournament_id = @id
    `;

    try {
      await request.query(query);
    } catch (error) {
      console.error("Error updating tournament: ", error);
      throw new Error("Failed to update tournament");
    }
  }

  // Delete tournament
  static async deleteTournament(id) {
    await poolConnect;
    try {
      await pool
        .request()
        .input("id", sql.UniqueIdentifier, id)
        .query("DELETE FROM Tournaments WHERE Tournament_id = @id");
    } catch (error) {
      console.error("Error deleting tournament: ", error);
      throw new Error("Failed to delete tournament");
    }
  }
}

module.exports = TournamentModel;
