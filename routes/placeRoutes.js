const express = require('express');
const Place = require('../models/Place');
const router = express.Router();

router.get('/popular', async (req, res) => {
  try {
    const places = await Place.aggregate([{ $sample: { size: 3 } }]); // 3 случайных места
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch popular places' });
  }
});

module.exports = router;