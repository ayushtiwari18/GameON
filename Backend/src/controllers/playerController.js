// src/controllers/playerController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PlayerModel = require("../models/playerModel");
const { jwtSecret } = require("../config/auth");

const playerController = {
  // Existing register and login methods remain the same...
  async register(req, res, next) {
    try {
      // Debug log to see incoming request body
      console.log("Registration request body:", req.body);

      const {
        Password,
        Email,
        Name,
        Gender,
        Dob,
        Contact_number,
        Skill_level = "Beginner",
      } = req.body;

      // Debug log to see destructured values
      console.log("Destructured values:", {
        Password: Password || "missing",
        Email: Email || "missing",
        Name: Name || "missing",
      });

      // Check if the body is being parsed correctly
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          message: "Empty request body",
          tip: "Ensure Content-Type header is set to application/json",
        });
      }

      // More detailed validation
      const missingFields = [];
      if (!Password) missingFields.push("Password");
      if (!Email) missingFields.push("Email");
      if (!Name) missingFields.push("Name");

      if (missingFields.length > 0) {
        return res.status(400).json({
          message: "Required fields missing",
          required: missingFields,
          received: Object.keys(req.body),
        });
      }

      // Validate password strength
      if (Password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters long",
        });
      }

      // Check if email already exists
      const existingPlayer = await PlayerModel.findByEmail(Email);
      if (existingPlayer) {
        return res.status(409).json({
          message: "Email already registered",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(Password, 10);

      // Create player with validated data
      const playerData = {
        Name,
        Email,
        Password: hashedPassword,
        Gender,
        Dob,
        Contact_number,
        Skill_level,
      };

      // Debug log the data being sent to model (with password redacted)
      console.log("Data being sent to model:", {
        ...playerData,
        Password: "[REDACTED]",
      });

      await PlayerModel.create(playerData);

      res.status(201).json({ message: "Player registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { Email, Password } = req.body;

      // Input validation
      if (!Email || !Password) {
        return res.status(400).json({
          message: "Email and Password are required",
        });
      }

      const player = await PlayerModel.findByEmail(Email);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      const validPassword = await bcrypt.compare(Password, player.Password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        {
          id: player.Player_id,
          email: player.Email,
          role: "player",
        },
        jwtSecret,
        { expiresIn: "24h" }
      );

      res.json({
        token,
        player: {
          id: player.Player_id,
          email: player.Email,
          name: player.Name,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      next(error);
    }
  },
  async logout(req, res) {
    // Clear token from client-side
    res.clearCookie("token");
    res.json({ message: "Logged out successfully", redirect: "/home" });
  },

  async getHome(req, res, next) {
    try {
      const playerId = req.params.id;

      // Fetch all required data for home page
      const [calendar, updates, tournaments] = await Promise.all([
        PlayerModel.getCalendarEvents(playerId),
        PlayerModel.getAcademyUpdates(),
        PlayerModel.getUpcomingTournaments(),
      ]);

      res.json({
        calendar,
        academyUpdates: updates,
        upcomingTournaments: tournaments,
      });
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req, res, next) {
    try {
      const playerId = req.params.id;
      const profile = await PlayerModel.findById(playerId);

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.json(profile);
    } catch (error) {
      next(error);
    }
  },

  async getBySkillSet(req, res, next) {
    try {
      const skillSet = req.params.skillSet;
      const players = await PlayerModel.findBySkillSet(skillSet);
      res.json(players);
    } catch (error) {
      next(error);
    }
  },

  async getUpdateForm(req, res, next) {
    try {
      const playerId = req.params.id;
      const playerData = await PlayerModel.findById(playerId);

      if (!playerData) {
        return res.status(404).json({ message: "Player not found" });
      }

      res.json(playerData);
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const playerId = req.params.id;
      const updateData = req.body;

      // Validate if player exists
      const existingPlayer = await PlayerModel.findById(playerId);
      if (!existingPlayer) {
        return res.status(404).json({ message: "Player not found" });
      }

      // If password is being updated, hash it
      if (updateData.Password) {
        updateData.Password = await bcrypt.hash(updateData.Password, 10);
      }

      await PlayerModel.update(playerId, updateData);
      res.json({ message: "Profile updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  async deletePlayer(req, res, next) {
    try {
      const playerId = req.params.id;

      // Check if player exists
      const player = await PlayerModel.findById(playerId);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      await PlayerModel.delete(playerId);
      res.json({ message: "Player deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = playerController;
