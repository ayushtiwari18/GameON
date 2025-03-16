const express = require("express");
const cors = require("cors");
const session = require("express-session");
const SequelizeStore = require("express-session-sequelize")(session.Store);
const { Sequelize } = require("sequelize");
const { pool, poolConnect } = require("./src/config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const http = require("http");
const setupSocketIO = require("./src/config/socket");

const playerRoutes = require("./src/routes/playerRoutes");
const academyRoutes = require("./src/routes/academyRoutes");
const vacancyRoutes = require("./src/routes/vacancyRoutes");
const tournamentRoutes = require("./src/routes/tournamentRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");

const errorHandler = require("./src/middleware/errorHandler");
const auth = require("./src/middleware/auth");

const app = express();
const server = http.createServer(app);
const io = setupSocketIO(server);

// Make io available to all routes
app.set("io", io);

// Add cookie parser before other middleware
app.use(cookieParser());

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://gameonat.netlify.app",
      process.env.FRONTEND_URL, // Ensure this is set correctly
    ],
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME, // Make sure this is "gamedb"
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true, // Try setting this to true
      },
    },
  }
);

// Define the sessions model explicitly
const Session = sequelize.define(
  "Session",
  {
    session_id: {
      type: Sequelize.STRING(100), // Increase the size to handle longer session IDs
      primaryKey: true,
    },
    expires: Sequelize.DATE,
    data: Sequelize.TEXT,
  },
  {
    tableName: "Sessions",
    timestamps: true,
  }
);

// Initialize Sequelize Store with the model
const myStore = new SequelizeStore({
  db: sequelize,
  table: Session,
  checkExpirationInterval: 15 * 60 * 1000, // Clean up expired sessions every 15 minutes
  expiration: 24 * 60 * 60 * 1000, // Session expiration (24 hours)
});

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "GAMEONISHERE",
    resave: false,
    saveUninitialized: false,
    store: myStore,
    cookie: {
      httpOnly: true,
      secure: true, // Ensure cookies are sent over HTTPS
      sameSite: "none", // Required for cross-site requests
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    name: "gameon.sid",
  })
);

app.use(express.json());

// Routes
app.use("/player", playerRoutes);
app.use("/academy", academyRoutes);
app.use("/vacancy", vacancyRoutes);
app.use("/tournament", tournamentRoutes);
app.use("/notifications", notificationRoutes);

// Session test route
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

// Initialize database and start server in the correct sequence
async function startServer() {
  try {
    // First sync the Sessions table
    // Use force: true only for the first run to create the table
    await sequelize.authenticate();
    console.log("Database connection established successfully");
    console.log("Sessions table synchronized!");

    // Start the server only after database setup is complete
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Unable to sync tables:", err);
    process.exit(1);
  }
}

// Start everything
startServer();
