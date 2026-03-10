const sqlite3 = require("sqlite3").verbose();

// Create database file
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Database error:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create tables
db.serialize(() => {

  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  // Media table
  db.run(`
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      creator TEXT,
      genre TEXT,
      release_date TEXT,
      status TEXT,
      user_id INTEGER
    )
  `);

});

module.exports = db;