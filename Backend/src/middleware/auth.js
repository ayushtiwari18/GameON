// src/middleware/auth.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");

const auth = {
  // Verify token or session
  authenticateToken: (req, res, next) => {
    // First check session
    if (req.session && req.session.user) {
      req.user = req.session.user;
      return next();
    }

    // Then check cookie token
    const token = req.cookies.token;

    // Finally check Authorization header (for API clients)
    const authHeader = req.headers.authorization;
    const headerToken = authHeader && authHeader.split(" ")[1];

    const finalToken = token || headerToken;

    if (!finalToken) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const decoded = jwt.verify(finalToken, jwtSecret);
      req.user = decoded;

      // Regenerate session with user info for future requests
      req.session.user = decoded;

      next();
    } catch (error) {
      // Clear invalid token
      if (token) res.clearCookie("token");
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  },

  // Role-based middleware
  isAcademy: (req, res, next) => {
    if (req.user && req.user.role === "academy") {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Access denied: Academy role required" });
  },

  isPlayer: (req, res, next) => {
    if (req.user && req.user.role === "player") {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Access denied: Player role required" });
  },

  // Verify ownership of resource
  checkOwnership: (paramIdField) => {
    return (req, res, next) => {
      const resourceId = req.params[paramIdField];

      if (req.user.id === resourceId) {
        return next();
      }
      return res
        .status(403)
        .json({ message: "Access denied: Not the owner of this resource" });
    };
  },
};

module.exports = auth;
