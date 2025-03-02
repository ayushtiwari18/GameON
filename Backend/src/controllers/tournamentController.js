// src/controllers/tournamentController.js
const TournamentModel = require("../models/tournamentModel");
const { v4: isUUID } = require("uuid");

const tournamentController = {
  // Get all tournaments
  async getAllTournaments(req, res) {
    try {
      const tournaments = await TournamentModel.getAllTournaments();
      res.status(200).json({ tournaments });
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      res.status(500).json({
        message: "Error fetching tournaments",
        error: error.message,
      });
    }
  },

  // Get tournament by ID
  async getTournamentById(req, res) {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res
          .status(400)
          .json({ message: "Invalid tournament ID format" });
      }

      const tournament = await TournamentModel.getTournamentById(id);
      if (!tournament) {
        return res.status(404).json({ message: "Tournament not found" });
      }

      res.status(200).json({ tournament });
    } catch (error) {
      console.error("Error fetching tournament:", error);
      res.status(500).json({
        message: "Error fetching tournament",
        error: error.message,
      });
    }
  },

  // Create tournament
  async createTournament(req, res) {
    try {
      const { id: academyId } = req.params;

      // Validate academyId is a valid UUID
      if (!isUUID(academyId)) {
        return res.status(400).json({ message: "Invalid academy ID format" });
      }

      // Map the request body to match database field names
      const tournamentData = {
        academyId,
        Name: req.body.Name,
        Start_Date: req.body.Start_Date,
        End_Date: req.body.End_Date,
        Location: req.body.Location,
        Max_Teams: req.body.Max_Teams,
        description: req.body.Description,
        category: req.body.Category,
        registration_deadline: req.body.Registration_Deadline,
        registration_fee: req.body.Registration_fee,
        prize_pool: req.body.Prize_Pool,
        rules: req.body.Rules,
        contact_phone: req.body.Contact_phone,
        contact_email: req.body.Contact_email,
        Min_Teams: req.body.Min_Teams,
      };

      // Validate required fields
      const requiredFields = [
        "Name",
        "Start_Date",
        "End_Date",
        "Location",
        "Max_Teams",
      ];
      const missingFields = requiredFields.filter(
        (field) => !tournamentData[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }
      // Add this right before the tournamentService.academy.create() call
      console.log("Submitting tournament data:", tournamentData);
      await TournamentModel.createTournament(tournamentData);
      res.status(201).json({ message: "Tournament created successfully" });
    } catch (error) {
      console.error("Error creating tournament:", error);
      res.status(500).json({
        message: "Error creating tournament",
        error: error.message,
      });
    }
  },

  async getAcademyTournaments(req, res) {
    try {
      const { id: academyId } = req.params;

      if (!isUUID(academyId)) {
        return res.status(400).json({ message: "Invalid academy ID format" });
      }

      const tournaments = await TournamentModel.getTournamentsByAcademyId(
        academyId
      );
      res.status(200).json({ tournaments });
    } catch (error) {
      console.error("Error fetching academy tournaments:", error);
      res.status(500).json({
        message: "Error fetching academy tournaments",
        error: error.message,
      });
    }
  },

  // Update tournament
  async updateTournament(req, res) {
    try {
      const { id: academyId } = req.params;
      const { tournamentId } = req.body;

      if (!isUUID(academyId)) {
        return res.status(400).json({ message: "Invalid academy ID format" });
      }

      if (!isUUID(tournamentId)) {
        return res
          .status(400)
          .json({ message: "Invalid tournament ID format" });
      }

      const tournamentData = req.body;
      delete tournamentData.tournamentId;

      // Verify academy owns this tournament
      const tournament = await TournamentModel.getTournamentById(tournamentId);
      if (!tournament || tournament.Academy_id !== academyId) {
        return res.status(403).json({
          message: "Not authorized to update this tournament",
        });
      }

      await TournamentModel.updateTournament(tournamentId, tournamentData);
      res.status(200).json({ message: "Tournament updated successfully" });
    } catch (error) {
      console.error("Error updating tournament:", error);
      res.status(500).json({
        message: "Error updating tournament",
        error: error.message,
      });
    }
  },

  // Delete tournament
  async deleteTournament(req, res) {
    try {
      const { id: academyId } = req.params;
      const { tournamentId } = req.body;

      if (!isUUID(academyId)) {
        return res.status(400).json({ message: "Invalid academy ID format" });
      }

      if (!isUUID(tournamentId)) {
        return res
          .status(400)
          .json({ message: "Invalid tournament ID format" });
      }

      // Verify academy owns this tournament
      const tournament = await TournamentModel.getTournamentById(tournamentId);
      if (!tournament || tournament.Academy_id !== academyId) {
        return res.status(403).json({
          message: "Not authorized to delete this tournament",
        });
      }

      await TournamentModel.deleteTournament(tournamentId);
      res.status(200).json({ message: "Tournament deleted successfully" });
    } catch (error) {
      console.error("Error deleting tournament:", error);
      res.status(500).json({
        message: "Error deleting tournament",
        error: error.message,
      });
    }
  },
};

module.exports = tournamentController;
