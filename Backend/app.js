const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const http = require("http"); // Add this import
const setupSocketIO = require("./src/config/socket"); // Add this import

const playerRoutes = require("./src/routes/playerRoutes");
const academyRoutes = require("./src/routes/academyRoutes");
const vacancyRoutes = require("./src/routes/vacancyRoutes");
const tournamentRoutes = require("./src/routes/tournamentRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes"); // Add the notifications routes

const errorHandler = require("./src/middleware/errorHandler");
const auth = require("./src/middleware/auth");

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = setupSocketIO(server); // Initialize Socket.IO

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

// Make io available to all routes
app.set("io", io);

// Add cookie parser before other middleware
app.use(cookieParser());

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174", // Add this to allow requests from port 5174
      process.env.FRONTEND_URL, // Keep the production frontend URL
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Enhance the session middleware configuration
// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "GAMEONISHERE",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    name: "gameon.sid", // Custom name for the session cookie
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
app.use("/notifications", notificationRoutes); // Add the notifications routes

// Add to your main app.js or in a test route file
app.get("/api/test-session", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.json({
      message: `You have visited this page ${req.session.views} times`,
      sessionID: req.sessionID,
      session: req.session,
      cookies: req.cookies,
    });
  } else {
    req.session.views = 1;
    res.json({
      message: "Welcome to this page for the first time!",
      sessionID: req.sessionID,
      session: req.session,
      cookies: req.cookies,
    });
  }
});

// Test auth
app.get("/api/protected", auth.authenticateToken, (req, res) => {
  res.json({
    message: "You have accessed a protected route",
    user: req.user,
  });
});

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
