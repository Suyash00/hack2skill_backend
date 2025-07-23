// Main entry point: Sets up Express app, connects to MongoDB, applies routes and middleware.

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Root route for health check
app.get("/", (req, res) => {
  res.send("Hack2Skill Backend is Running!");
});

// Route handlers
app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));

// 404 fallback for unmatched routes
app.use((req, res, next) => {
  res.status(404).send("Route Not Found");
});

const PORT = process.env.PORT || 5000;

// DB connection + start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log("Server running on port " + PORT));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
