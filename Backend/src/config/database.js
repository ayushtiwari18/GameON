const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: 1433, // ✅ Explicitly define port
  options: {
    encrypt: true, // ✅ Required for Azure MSSQL
    enableArithAbort: true, // ✅ Helps prevent arithmetic errors
    trustServerCertificate: false, // ✅ Change to 'true' for local testing
  },
};

// Create a pool connection
const pool = new sql.ConnectionPool(dbConfig);

const poolConnect = pool
  .connect()
  .then(() => {
    console.log("✅ MSSQL Database connected successfully.");
  })
  .catch((err) => {
    console.error("❌ MSSQL Connection Error:", err.message);
    console.error(err);
  });

module.exports = { sql, pool, poolConnect };
