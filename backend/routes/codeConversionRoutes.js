const express  = require('express');
const router = express.Router();
const { convertCode } = require('../controllers/convertCodeController');
const { limitPerIP } = require('../utils/rateLimiter'); // useing this for demo version, limit to 5 requests per IP per hour.

router.post('/', limitPerIP(5), convertCode);
//router.post('/', convertCode);

module.exports = router;