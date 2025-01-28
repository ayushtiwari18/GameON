const AcademyModel = require("../models/academyModel");

// Register a new academy
const registerAcademy = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    city,
    state,
    description,
    isActive,
    logo,
    website,
    establishedYear,
  } = req.body;

  const academyData = {
    name,
    email,
    password,
    phone,
    address,
    city,
    state,
    description,
    isActive,
    logo,
    website,
    establishedYear,
  };

  try {
    await AcademyModel.create(academyData);
    res.status(201).json({ message: "Academy registered successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error registering academy", error: error.message });
  }
};

// Get academy details by email
const getAcademyByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const academy = await AcademyModel.findByEmail(email);
    if (academy) {
      res.status(200).json({ academy });
    } else {
      res.status(404).json({ message: "Academy not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching academy", error: error.message });
  }
};

// Get academy details by ID
const getAcademyById = async (req, res) => {
  const { id } = req.params;

  try {
    const academy = await AcademyModel.findById(id);
    if (academy) {
      res.status(200).json({ academy });
    } else {
      res.status(404).json({ message: "Academy not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching academy", error: error.message });
  }
};

// Update academy information
const updateAcademy = async (req, res) => {
  const { id } = req.params;
  const academyData = req.body;

  try {
    await AcademyModel.update(id, academyData);
    res.status(200).json({ message: "Academy updated successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating academy", error: error.message });
  }
};

// Deactivate an academy
const deactivateAcademy = async (req, res) => {
  const { id } = req.params;

  try {
    await AcademyModel.deactivate(id);
    res.status(200).json({ message: "Academy deactivated successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deactivating academy", error: error.message });
  }
};

// Get all active academies
const getAllActiveAcademies = async (req, res) => {
  try {
    const academies = await AcademyModel.getAllActive();
    res.status(200).json({ academies });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching active academies",
      error: error.message,
    });
  }
};

module.exports = {
  registerAcademy,
  getAcademyByEmail,
  getAcademyById,
  updateAcademy,
  deactivateAcademy,
  getAllActiveAcademies,
};
