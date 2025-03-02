const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Add this
require("dotenv").config();

const playerRoutes = require("./src/routes/playerRoutes");
const academyRoutes = require("./src/routes/academyRoutes");
const vacancyRoutes = require("./src/routes/vacancyRoutes");
const tournamentRoutes = require("./src/routes/tournamentRoutes");
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

// Add cookie parser before other middleware
app.use(cookieParser());

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow required methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

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
app.use("/tournament", tournamentRoutes);

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
