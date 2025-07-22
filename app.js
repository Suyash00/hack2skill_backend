// Main entry point: Sets up Express app, connects to MongoDB, applies routes and middleware.

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log("Server running on " + PORT));
});
