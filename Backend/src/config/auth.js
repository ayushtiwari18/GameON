// src/config/auth.js
module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: "24h",
};
