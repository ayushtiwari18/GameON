const sql = require("mssql");
const { pool, poolConnect } = require("../config/database"); // Import database connection
// src/controllers/academyController.js
const AcademyModel = require("../models/academyModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");
const { v4: isUUID } = require("uuid");

// Get academy details by email
const getAcademyByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const academy = await AcademyModel.findByEmail(email);

    if (!academy) {
      return res.status(404).json({ message: "Academy not found" });
    }
    res.status(200).json({ academy });
  } catch (error) {
    console.error("Error fetching academy by email:", error);
    res
      .status(500)
      .json({ message: "Error fetching academy", error: error.message });
  }
};

// Get academy details by ID
const getAcademyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({ message: "Invalid UUID format." });
    }

    await poolConnect;
    const result = await pool
      .request()
      .input("id", sql.NVarChar, id)
      .query("SELECT * FROM Academies WHERE Academy_id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Academy not found" });
    }
    res.status(200).json({ academy: result.recordset[0] });
  } catch (error) {
    console.error("Error fetching academy by ID:", error);
    res
      .status(500)
      .json({ message: "Error fetching academy", error: error.message });
  }
};

// Helper function to validate GUID
function isValidGUID(guid) {
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(guid);
}

module.exports = {
  getAcademyByEmail,
  getAcademyById,
};

const academyController = {
  async registerAcademy(req, res) {
    try {
      const {
        name,
        location,
        contact_email,
        contact_phone,
        city,
        description,
        website_url,
        specialization,
        password, // Added for authentication
      } = req.body;

      if (!name || !contact_email || !contact_phone || !city || !password) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      // Check if academy already exists
      const existingAcademy = await AcademyModel.findByEmail(contact_email);
      if (existingAcademy) {
        return res
          .status(409)
          .json({ message: "Academy already registered with this email" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const academyData = {
        name,
        location,
        contact_email,
        contact_phone,
        city,
        description,
        website_url,
        specialization,
        password: hashedPassword,
      };

      await AcademyModel.create(academyData);
      res.status(201).json({ message: "Academy registered successfully!" });
    } catch (error) {
      console.error("Error registering academy:", error);
      res
        .status(500)
        .json({ message: "Error registering academy", error: error.message });
    }
  },

  // Add this method to your academyController object

  async getAllAcademies(req, res) {
    try {
      const academies = await AcademyModel.getAll();
      res.status(200).json(academies);
    } catch (error) {
      console.error("Error fetching all academies:", error);
      res
        .status(500)
        .json({ message: "Error fetching academies", error: error.message });
    }
  },

  // Academy Login Handler
  async loginAcademy(req, res) {
    try {
      const { email, password } = req.body;

      // Input validation
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      console.log("Login request for academy:", email, password);

      const academy = await AcademyModel.findByEmail(email);
      if (!academy) {
        return res.status(404).json({ message: "Academy not found" });
      }
      console.log("Academy found:", academy.Password);

      // Add defensive check for stored password
      if (!academy.Password) {
        console.error("Stored password hash is missing for academy:", email);
        return res.status(500).json({ message: "Authentication error" });
      }

      // Validate password
      try {
        const validPassword = await bcrypt.compare(password, academy.Password);
        if (!validPassword) {
          return res.status(401).json({ message: "Invalid password" });
        }
      } catch (bcryptError) {
        console.error("Password comparison error:", bcryptError);
        return res.status(500).json({ message: "Authentication error" });
      }

      const token = jwt.sign(
        {
          id: academy.Academy_id,
          email: academy.contact_email,
          role: "academy",
        },
        jwtSecret,
        { expiresIn: "24h" }
      );

      res.json({
        token,
        academy: {
          id: academy.Academy_id,
          name: academy.name,
          email: academy.contact_email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Error during login",
        error: error.message,
      });
    }
  },

  async logoutAcademy(req, res) {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully", redirect: "/home" });
  },

  async getAcademyHome(req, res) {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const [calendar, updates, tournaments] = await Promise.all([
        AcademyModel.getCalendarEvents(id),
        AcademyModel.getUpdates(id),
        AcademyModel.getUpcomingTournaments(id),
      ]);

      res.json({
        calendar,
        updates,
        tournaments,
      });
    } catch (error) {
      console.error("Error fetching academy home data:", error);
      res
        .status(500)
        .json({ message: "Error fetching home data", error: error.message });
    }
  },

  async getAcademyProfile(req, res) {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({ message: "Invalid UUID format" });
      }

      const academy = await AcademyModel.findById(id);
      if (!academy) {
        return res.status(404).json({ message: "Academy not found" });
      }

      // Remove sensitive data
      delete academy.password;
      res.json(academy);
    } catch (error) {
      console.error("Error fetching academy profile:", error);
      res
        .status(500)
        .json({ message: "Error fetching profile", error: error.message });
    }
  },

  async getUpdateForm(req, res) {
    try {
      const { id } = req.params;
      const academy = await AcademyModel.findById(id);

      if (!academy) {
        return res.status(404).json({ message: "Academy not found" });
      }

      // Remove sensitive data
      delete academy.password;
      res.json(academy);
    } catch (error) {
      console.error("Error fetching update form:", error);
      res
        .status(500)
        .json({ message: "Error fetching form data", error: error.message });
    }
  },

  // Existing methods remain the same:
  // - updateAcademy
  async updateAcademy(req, res) {
    try {
      const { id } = req.params;
      const academyData = req.body;

      // Ensure the id is a valid GUID format if Academy_id is a uniqueidentifier
      const academyId = id; // Assuming id is a GUID in string format
      if (!isValidGUID(academyId)) {
        return res.status(400).json({ message: "Invalid academy ID format" });
      }

      if (Object.keys(academyData).length === 0) {
        return res.status(400).json({ message: "No data provided for update" });
      }

      await AcademyModel.update(academyId, academyData);
      res.status(200).json({ message: "Academy updated successfully!" });
    } catch (error) {
      console.error("Error updating academy:", error);
      res
        .status(500)
        .json({ message: "Error updating academy", error: error.message });
    }
  },
  // - deleteAcademy
  // Deactivate an academy
  async deleteAcademy(req, res) {
    try {
      const { id } = req.params;
      await AcademyModel.delete(id);
      res.status(200).json({ message: "Academy deactivated successfully!" });
    } catch (error) {
      console.error("Error deactivating academy:", error);
      res
        .status(500)
        .json({ message: "Error deactivating academy", error: error.message });
    }
  },
  // - getAcademyByCity
  // Get academies by city
  async getAcademyByCity(req, res) {
    try {
      const { city } = req.params;
      const academies = await AcademyModel.findByCity(city);
      res.status(200).json({ academies });
    } catch (error) {
      console.error("Error fetching academies by city:", error);
      res
        .status(500)
        .json({ message: "Error fetching academies", error: error.message });
    }
  },
};

module.exports = academyController;
