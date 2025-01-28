// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const playerRoutes = require("./src/routes/playerRoutes");
const academyRoutes = require("./src/routes/academyRoutes");
const vacancyRoutes = require("./src/routes/vacancyRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/player", playerRoutes);
app.use("/api/academy", academyRoutes);
app.use("/api/vacancy", vacancyRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
