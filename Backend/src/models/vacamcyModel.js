const { pool, poolConnect } = require("../config/database");
const sql = require("mssql");

const VacancyModel = {
  // Create a new vacancy
  async createVacancy(vacancyData) {
    try {
      await poolConnect;
      const {
        tournament_id,
        academy_id,
        position,
        requirements,
        vacancy_count,
        gender_preference,
        age_limit,
      } = vacancyData;

      const request = pool
        .request()
        .input("tournament_id", sql.UniqueIdentifier, tournament_id)
        .input("academy_id", sql.UniqueIdentifier, academy_id)
        .input("position", sql.NVarChar, position)
        .input("requirements", sql.NVarChar, requirements)
        .input("vacancy_count", sql.Int, vacancy_count)
        .input("gender_preference", sql.NVarChar, gender_preference)
        .input("age_limit", sql.Int, age_limit);

      const query = `
        INSERT INTO Vacancies (Tournament_id, Academy_id, Position, Requirements, Vacancy_count, Gender_preference, Age_limit)
        VALUES (@tournament_id, @academy_id, @position, @requirements, @vacancy_count, @gender_preference, @age_limit)
      `;

      await request.query(query);
    } catch (error) {
      throw new Error("Error creating vacancy: " + error.message);
    }
  },

  // Get vacancies by tournament
  async getVacanciesByTournament(tournamentId) {
    try {
      await poolConnect;
      const request = pool
        .request()
        .input("tournament_id", sql.UniqueIdentifier, tournamentId);

      const query = `
        SELECT v.*, a.Name as academy_name, t.Name as tournament_name
        FROM Vacancies v
        JOIN Academies a ON v.Academy_id = a.Academy_id
        JOIN Tournaments t ON v.Tournament_id = t.Tournament_id
        WHERE v.Tournament_id = @tournament_id
      `;

      const result = await request.query(query);
      return result.recordset;
    } catch (error) {
      throw new Error("Error fetching vacancies: " + error.message);
    }
  },

  // Get tournaments with vacancies
  async getTournamentsWithVacancies() {
    try {
      await poolConnect;
      const query = `
        SELECT DISTINCT t.*, 
          (SELECT COUNT(*) FROM Vacancies v WHERE v.Tournament_id = t.Tournament_id) as vacancy_count
        FROM Tournaments t
        INNER JOIN Vacancies v ON t.Tournament_id = v.Tournament_id
      `;

      const result = await pool.request().query(query);
      return result.recordset;
    } catch (error) {
      throw new Error(
        "Error fetching tournaments with vacancies: " + error.message
      );
    }
  },
};

module.exports = VacancyModel;
