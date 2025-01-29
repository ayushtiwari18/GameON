const AcademyModel = require("../models/academyModel");
const { v4: isUUID } = require("uuid"); // Import UUID validator
const sql = require("mssql");
const { pool, poolConnect } = require("../config/database"); // Import database connection

// Register a new academy
const registerAcademy = async (req, res) => {
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
    } = req.body;

    if (!name || !contact_email || !contact_phone || !city) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const academyData = {
      name,
      location,
      contact_email,
      contact_phone,
      city,
      description,
      website_url,
      specialization,
    };

    console.log("Registering academy:", academyData);
    await AcademyModel.create(academyData);

    res.status(201).json({ message: "Academy registered successfully!" });
  } catch (error) {
    console.error("Error registering academy:", error);
    res
      .status(500)
      .json({ message: "Error registering academy", error: error.message });
  }
};

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

const updateAcademy = async (req, res) => {
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
};

// Helper function to validate GUID
function isValidGUID(guid) {
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(guid);
}

// Deactivate an academy
const deactivateAcademy = async (req, res) => {
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
};

// Get academies by city
const getAcademyByCity = async (req, res) => {
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
};

module.exports = {
  registerAcademy,
  getAcademyByEmail,
  getAcademyById,
  updateAcademy,
  deactivateAcademy,
  getAcademyByCity,
};
