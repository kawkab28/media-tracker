const express = require("express");
const router = express.Router();
const db = require("../models/db");

// GET all media
router.get("/", (req, res) => {
  db.all("SELECT * FROM media", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// SEARCH media
router.get("/search", (req, res) => {
  const query = req.query.q;

  const sql = `
    SELECT * FROM media
    WHERE title LIKE ?
    OR creator LIKE ?
    OR genre LIKE ?
    OR status LIKE ?
    OR release_date LIKE ?
    OR id LIKE ?
  `;

  db.all(
    sql,
    [
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`
    ],
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(rows);
    }
  );
});

// ADD media
router.post("/", (req, res) => {
  const { title, creator, genre, release_date, status, user_id } = req.body;

  const sql = `
    INSERT INTO media (title, creator, genre, release_date, status, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [title, creator, genre, release_date, status, user_id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json({
        message: "Media added successfully",
        id: this.lastID,
      });
    }
  );
});

// DELETE media
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM media WHERE id = ?", req.params.id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: "Media deleted",
      changes: this.changes,
    });
  });
});

module.exports = router;