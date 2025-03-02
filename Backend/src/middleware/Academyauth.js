const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");

const authenticateToken = async (req, res, next) => {
  const token = req.cookies?.token; // Read token from HTTP-only cookie

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateToken };
