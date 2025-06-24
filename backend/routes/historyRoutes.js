const express = require('express');
const { getHistory, deleteHistory } = require('../controllers/historyController');

const router = express.Router();

// Get all code conversions for session
router.get('/:sessionId', getHistory);

// Delete a history entry
router.delete('/:sessionId/:historyId', deleteHistory);

module.exports = router;