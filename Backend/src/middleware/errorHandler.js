// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.code === "EREQUEST") {
    return res.status(400).json({
      message: "Database request error",
      error: err.message,
    });
  }

  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "An error occurred",
  });
};

module.exports = errorHandler;
