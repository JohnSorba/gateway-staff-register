const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const pool = require("./db");

// responsible for connection to frontend
app.use(cors());

// ensures data is sent in the right format
app.use(bodyParser.json());
app.use(express.json());

// ROUTES
const attendanceRoutes = require("./routes/attendance");
const staffRoutes = require("./routes/staff");

// API endpoint

app.get("/", (req, res) => {
  res.send("<h1>Hello! I am the staff attendance app. Connected...</h1>");
});

app.get("/api/attendance", async (req, res) => {
  try {
    const query = "SELECT * FROM attendance";
    const { rows } = await pool.query(query);
    res.json(rows);
    console.log(rows);
  } catch {
    console.error(error);
    res.status(500).json({ error: "Server errors" });
  }
});

app.use("/attendance", attendanceRoutes);
app.use("/staff", staffRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
