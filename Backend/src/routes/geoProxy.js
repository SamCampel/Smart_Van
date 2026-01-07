const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/distance', async (req, res) => {
  try {
    const { lat1, lon1, lat2, lon2 } = req.body;

    const response = await axios.post('http://localhost:8080/distance', {
      lat1,
      lon1,
      lat2,
      lon2
    });

    return res.json({
      source: 'node -> go',
      result: response.data
    });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Erro ao chamar serviço Go' });
  }
});

module.exports = router;