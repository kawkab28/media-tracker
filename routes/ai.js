const express = require("express");
const router = express.Router();
const { getRecommendations } = require("../services/ai");

// AI recommendations
router.get("/recommend", async (req, res) => {

  const title = req.query.title;

  if (!title) {
    return res.status(400).json({ error: "Title required" });
  }

  try {

    const recommendations = await getRecommendations(title);

    res.json({
      input: title,
      recommendations
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;