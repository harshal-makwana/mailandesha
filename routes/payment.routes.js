const express = require('express');
const { createCheckoutSession } = require('../services/payment.service');

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;

  try {
    const sessionId = await createCheckoutSession(amount);
    res.json({ id: sessionId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
