const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });
const connectDB = require("./config/db");

let studentRoutes;
try {
  studentRoutes = require("./routes/StudentRoutes");
} catch (e) {
  studentRoutes = require("./routes/studentRoutes");
}

const opportunityRoutes = require("./routes/opportunityRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get("/api/test", (req, res) => {
  res.json({
    message: "OppurtuNest backend is running",
  });
});

app.use("/api/students", studentRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/recommendations", recommendationRoutes);

// 404 Handler for unknown endpoints
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

module.exports = app;