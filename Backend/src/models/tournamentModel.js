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

    // Properly set SQL parameter types for critical fields
    request.input("academyId", sql.UniqueIdentifier, tournamentData.academyId);
    request.input("Name", sql.NVarChar, tournamentData.Name);
    request.input("Start_Date", sql.Date, new Date(tournamentData.Start_Date));
    request.input("End_Date", sql.Date, new Date(tournamentData.End_Date));
    request.input("Location", sql.NVarChar, tournamentData.Location);
    request.input("Max_Teams", sql.Int, tournamentData.Max_Teams);
    request.input(
      "description",
      sql.NVarChar,
      tournamentData.description || ""
    );
    request.input("category", sql.NVarChar, tournamentData.category || "");

    // Add the missing input parameters
    request.input(
      "registration_deadline",
      sql.Date,
      tournamentData.registration_deadline
        ? new Date(tournamentData.registration_deadline)
        : null
    );
    request.input(
      "registration_fee",
      sql.Decimal(10, 2),
      tournamentData.registration_fee || null
    );
    request.input(
      "prize_pool",
      sql.Decimal(10, 2),
      tournamentData.prize_pool || null
    );
    request.input("rules", sql.NVarChar, tournamentData.rules || "");
    request.input(
      "contact_phone",
      sql.NVarChar,
      tournamentData.contact_phone || ""
    );
    request.input(
      "contact_email",
      sql.NVarChar,
      tournamentData.contact_email || ""
    );
    request.input("Min_Teams", sql.Int, tournamentData.Min_Teams || 1);

    const query = `
      INSERT INTO Tournaments (
       Academy_id, Name, Start_Date, End_Date, Location, Max_Teams, [description], Category, Registration_Deadline, Registration_Fee, Prize_Pool, Rules, Min_Teams
      )
      VALUES (
        @academyId,
        @Name,
        @Start_Date,
        @End_Date,
        @Location,
        @Max_Teams,
        @description,
        @category,
        @registration_deadline,
        @registration_fee,
        @prize_pool,
        @rules,
        @Min_Teams
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

    // Build set clause and parameters dynamically, with proper type handling
    const setClause = [];
    const validFields = {
      Name: sql.NVarChar,
      Date: sql.Date,
      Location: sql.NVarChar,
      Max_Teams: sql.Int,
      description: sql.NVarChar,
      category: sql.NVarChar,
    };

    Object.keys(tournamentData).forEach((key) => {
      if (validFields[key]) {
        let value = tournamentData[key];
        // Handle dates specially
        if (key === "Date" && value) {
          value = new Date(value);
        }
        request.input(key, validFields[key], value);
        setClause.push(`${key} = @${key}`);
      }
    });

    if (setClause.length === 0) {
      return; // Nothing to update
    }

    const query = `
      UPDATE Tournaments 
      SET ${setClause.join(", ")}
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
