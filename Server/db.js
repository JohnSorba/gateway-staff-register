const { Pool } = require("pg");

// Connect to PostgreSQL database
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "GPS Staff Attendance",
  password: "magdanny",
  port: 5432,
});

module.exports = pool;
