const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/distance', async (req, res) => {
  try {
    const { from_id, to_id } = req.body;

    const response = await axios.post(
      'http://localhost:8080/distance-from-db',
      { from_id, to_id }
    );

    return res.json(response.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Geo-service unavailable' });
  }
});

module.exports = router;
