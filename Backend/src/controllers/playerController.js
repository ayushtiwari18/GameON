const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PlayerModel = require("../models/playerModel");
const { jwtSecret } = require("../config/auth");

const playerController = {
  async register(req, res, next) {
    // Added next parameter
    try {
      const { password, ...playerData } = req.body;

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      await PlayerModel.create({
        ...playerData,
        password: hashedPassword,
      });

      res.status(201).json({ message: "Player registered successfully" });
    } catch (error) {
      next(error); // Now next is defined
    }
  },

  async login(req, res, next) {
    // Added next parameter
    try {
      const { email, password } = req.body;
      const player = await PlayerModel.findByEmail(email);

      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      const validPassword = await bcrypt.compare(password, player.Password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: player.Player_id, email: player.Email, role: "player" },
        jwtSecret,
        { expiresIn: "24h" }
      );

      res.json({ token });
    } catch (error) {
      next(error); // Now next is defined
    }
  },
};

module.exports = playerController;
