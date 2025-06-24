const express  = require('express');
const router = express.Router();
const { summarizeText } = require('../controllers/summarizeController');
const { limitPerIP } = require('../utils/rateLimiter'); // useing this for demo version, limit to 5 requests per IP per hour.

router.post('/', limitPerIP(5), summarizeText);

module.exports = router;