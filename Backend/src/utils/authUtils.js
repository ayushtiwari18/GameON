// Helper functions for authentication (you can put this in a utils file)

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");
const authUtils = {
  // Set up session and cookies after successful authentication
  setupAuthSession: (req, res, user, role) => {
    // Generate token
    const token = jwt.sign(
      {
        id: user.id || user.Player_id || user.Academy_id,
        email: user.email || user.Email || user.contact_email,
        role: role,
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    // Store user info in session
    req.session.user = {
      id: user.id || user.Player_id || user.Academy_id,
      email: user.email || user.Email || user.contact_email,
      role: role,
    };

    // Save session
    req.session.save();

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return token;
  },

  // Handle logout
  clearAuthSession: (req, res) => {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          reject(err);
          return;
        }

        // Clear the auth cookie
        res.clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        // Clear session cookie
        res.clearCookie("gameon.sid");

        resolve();
      });
    });
  },
};

module.exports = authUtils;
