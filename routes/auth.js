const express = require("express");
const router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey";

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users (username, password)
    VALUES (?, ?)
  `;

  db.run(sql, [username, hashedPassword], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "User registered successfully",
      userId: this.lastID,
    });
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM users WHERE username = ?`;

  db.get(sql, [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token: token,
    });
  });
});

module.exports = router;