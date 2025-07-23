// Express router: Routes for user registration and login.

const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.send("Auth route works!");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
