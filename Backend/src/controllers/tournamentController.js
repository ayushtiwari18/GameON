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
      const tournamentData = {
        academyId,
        ...req.body,
      };

      // Validate required fields
      const requiredFields = ["Name", "Date", "Location", "Max_Teams"];

      console.log(tournamentData);
      console.log(requiredFields);

      const missingFields = requiredFields.filter(
        (field) => !tournamentData[field]
      );
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

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

  // Update tournament
  async updateTournament(req, res) {
    try {
      const { id: academyId } = req.params;
      const { tournamentId } = req.body;

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
