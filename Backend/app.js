// Required dependencies
const express = require("express");
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Database connection pool
const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

// Auth Routes
app.post("/auth/player/register", async (req, res) => {
  try {
    await poolConnect;
    const {
      name,
      email,
      password,
      gender,
      preferred_position,
      skill_level,
      dob,
      contact_number,
    } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const request = pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword)
      .input("gender", sql.NVarChar, gender)
      .input("preferred_position", sql.NVarChar, preferred_position)
      .input("skill_level", sql.NVarChar, skill_level)
      .input("dob", sql.Date, new Date(dob))
      .input("contact_number", sql.NVarChar, contact_number);

    const query = `
      INSERT INTO Players (Name, Email, Password, Gender, Preferred_position, Skill_level, Dob, Contact_number)
      VALUES (@name, @email, @password, @gender, @preferred_position, @skill_level, @dob, @contact_number)
    `;

    await request.query(query);
    res.status(201).json({ message: "Player registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering player" });
  }
});

app.post("/auth/player/login", async (req, res) => {
  try {
    await poolConnect;
    const { email, password } = req.body;

    const request = pool.request().input("email", sql.NVarChar, email);

    const result = await request.query(
      "SELECT * FROM Players WHERE Email = @email"
    );
    const player = result.recordset[0];

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    const validPassword = await bcrypt.compare(password, player.Password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: player.Player_id, email: player.Email, role: "player" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Vacancy Routes
app.post("/academy/vacancies", authenticateToken, async (req, res) => {
  try {
    await poolConnect;
    const {
      tournament_id,
      academy_id,
      position,
      requirements,
      vacancy_count,
      gender_preference,
      age_limit,
    } = req.body;

    const request = pool
      .request()
      .input("tournament_id", sql.Int, tournament_id)
      .input("academy_id", sql.Int, academy_id)
      .input("position", sql.NVarChar, position)
      .input("requirements", sql.NVarChar, requirements)
      .input("vacancy_count", sql.Int, vacancy_count)
      .input("gender_preference", sql.NVarChar, gender_preference)
      .input("age_limit", sql.NVarChar, age_limit);

    const query = `
      INSERT INTO Vacancies (Tournament_id, Academy_id, Position, Requirements, Vacancy_count, Gender_preference, Age_limit)
      VALUES (@tournament_id, @academy_id, @position, @requirements, @vacancy_count, @gender_preference, @age_limit)
    `;

    await request.query(query);
    res.status(201).json({ message: "Vacancy created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating vacancy" });
  }
});

app.get(
  "/academy/tournaments/:id/vacancies",
  authenticateToken,
  async (req, res) => {
    try {
      await poolConnect;
      const tournamentId = req.params.id;

      const request = pool
        .request()
        .input("tournament_id", sql.Int, tournamentId);

      const query = `
      SELECT v.*, a.name as academy_name, t.name as tournament_name
      FROM Vacancies v
      JOIN Academies a ON v.Academy_id = a.Academy_id
      JOIN Tournaments t ON v.Tournament_id = t.Tournament_id
      WHERE v.Tournament_id = @tournament_id
    `;

      const result = await request.query(query);
      res.json(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching vacancies" });
    }
  }
);

app.get(
  "/player/tournaments-with-vacancies",
  authenticateToken,
  async (req, res) => {
    try {
      await poolConnect;
      const query = `
      SELECT DISTINCT t.*, 
        (SELECT COUNT(*) FROM Vacancies v WHERE v.Tournament_id = t.Tournament_id) as vacancy_count
      FROM Tournaments t
      INNER JOIN Vacancies v ON t.Tournament_id = v.Tournament_id
    `;

      const result = await pool.request().query(query);
      res.json(result.recordset);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching tournaments with vacancies" });
    }
  }
);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
