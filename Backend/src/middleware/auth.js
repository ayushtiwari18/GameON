// src/middleware/auth.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // if (!token) {
  //   return res.status(401).json({ message: "Authentication token required" });
  // }

  // try {
  //   const decoded = jwt.verify(token, jwtSecret);
  //   req.user = decoded;
  //   next();
  // } catch (error) {
  //   return res.status(403).json({ message: "Invalid token" });
  // }
};

module.exports = { authenticateToken };
