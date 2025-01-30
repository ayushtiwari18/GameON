const express = require("express");
const cors = require("cors");
require("dotenv").config();

const playerRoutes = require("./src/routes/playerRoutes");
const academyRoutes = require("./src/routes/academyRoutes");
const vacancyRoutes = require("./src/routes/vacancyRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

// Debug middleware to log requests
// app.use((req, res, next) => {
//   console.log("\n--- Incoming Request ---");
//   console.log("Method:", req.method);
//   console.log("Path:", req.path);
//   console.log("Headers:", req.headers);
//   console.log("Body:", req.body);
//   console.log("----------------------\n");
//   next();
// });

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware after body parsing
// app.use((req, res, next) => {
//   console.log("\n--- After Body Parsing ---");
//   console.log("Parsed Body:", req.body);
//   console.log("------------------------\n");
//   next();
// });

// Routes
app.use("/player", playerRoutes);
app.use("/academy", academyRoutes);
app.use("/vacancy", vacancyRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  next(err);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
