const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./auth");

const setupSocketIO = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        process.env.FRONTEND_URL,
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Middleware to authenticate socket connections
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, jwtSecret);
      socket.user = decoded;
      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Join an academy or player room
    socket.on("join", (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
    });

    // Leave a room
    socket.on("leave", (room) => {
      socket.leave(room);
      console.log(`Socket ${socket.id} left room: ${room}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

module.exports = setupSocketIO;
