require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models/db");
const mediaRoutes = require("./routes/media");
const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/media", mediaRoutes);
app.use("/auth", authRoutes);
app.use("/ai", aiRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Media Tracker API is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});