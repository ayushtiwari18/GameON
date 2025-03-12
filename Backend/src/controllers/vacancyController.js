const { pool, poolConnect } = require("../config/database");
const sql = require("mssql"); // Add this import

const vacancyController = {
  // Create a new vacancy
  async createVacancy(req, res, next) {
    // Added next for error handling
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
      } = req.body;

      const request = pool
        .request()
        .input("tournament_id", sql.UniqueIdentifier, tournament_id)
        .input("academy_id", sql.UniqueIdentifier, academy_id)
        .input("position", sql.NVarChar, position)
        .input("requirements", sql.NVarChar, requirements)
        .input("vacancy_count", sql.Int, vacancy_count)
        .input("gender_preference", sql.NVarChar, gender_preference)
        .input("age_limit", sql.Int, age_limit); // Changed to Int if it's a number

      const query = `
        INSERT INTO Vacancies (Tournament_id, Academy_id, Position, Requirements, Vacancy_count, Gender_preference, Age_limit)
        VALUES (@tournament_id, @academy_id, @position, @requirements, @vacancy_count, @gender_preference, @age_limit)
      `;

      await request.query(query);
      res.status(201).json({ message: "Vacancy created successfully" });
    } catch (error) {
      next(error); // Use error middleware instead of console.error
    }
  },

  // Get vacancies by tournament
  async getVacanciesByTournament(req, res, next) {
    try {
      await poolConnect;
      const tournamentId = req.params.id;

      if (!tournamentId) {
        return res.status(400).json({ message: "Tournament ID is required" });
      }

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
      res.json(result.recordset);
    } catch (error) {
      next(error);
    }
  },

  // Get tournaments with vacancies
  async getTournamentsWithVacancies(req, res, next) {
    try {
      await poolConnect;
      const query = `
        SELECT DISTINCT t.*, 
          (SELECT COUNT(*) FROM Vacancies v WHERE v.Tournament_id = t.Tournament_id) as vacancy_count
        FROM Tournaments t
        INNER JOIN Vacancies v ON t.Tournament_id = v.Tournament_id
      `;

      const result = await pool.request().query(query);

      if (!result.recordset.length) {
        return res
          .status(404)
          .json({ message: "No tournaments with vacancies found" });
      }

      res.json(result.recordset);
    } catch (error) {
      next(error);
    }
  },
  // Inside the function that handles vacancy applications
  async applyToVacancy(req, res) {
    try {
      // Your existing application logic...

      // After successfully saving the application, create a notification
      if (req.app.get("io")) {
        const io = req.app.get("io");

        // Create notification record
        const notificationData = {
          academy_id: vacancy.academy_id,
          player_id: req.user.id,
          type: "vacancy_application",
          message: `Player ${playerName} has applied for the ${vacancyTitle} position`,
          link_url: `/vacancy/applications/${applicationId}`,
          read_status: 0,
        };

        const notificationId = await NotificationModel.create(notificationData);

        // Emit real-time notification
        io.to(`academy:${vacancy.academy_id}`).emit("notification", {
          id: notificationId,
          ...notificationData,
        });
      }

      res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
      // Error handling...
    }
  },
};

module.exports = vacancyController;
